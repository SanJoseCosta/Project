package com.worldchat;

import org.java_websocket.WebSocket;
import java.util.ArrayList;

public class MessageProcessingThread extends Thread 
{
    //JobQueue queue = new JobQueue();

    static ArrayList<Long> messageProcessedTimes = new ArrayList<Long>();

    public void runxxx() 
    {
        //U.pause(100 * 3600 * 1000);
        //while (true) 
        //{
            //Job j = queue.get();
            //if (j != null) 
            //{
            //   process(j);
            //} 
            //else 
            
          //      U.pause(3);
            
        //}
        
    }
    
    static void process(Job j)
    {
        long time = System.currentTimeMillis();
        try
        {
            if (processMessage(j.conn, j.message)) 
            {
                return;
            }
        }
        catch (Exception e)
        {
            // do invalid message process
            U.log("*** Exception processing message");
            e.printStackTrace();
        }

        time = System.currentTimeMillis() - time;
        U.log("processed the message in " + time + " ms");

        messageProcessedTimes.add(new Long(System.currentTimeMillis()));
        
        //U.log("messages received: " + messageProcessedTimes.size());
    }

    static void addJob(Job j) 
    {
        //queue.add(j);
        process(j);
    }
    
    static boolean processMessage(WebSocket socket, String message) 
    {
        U.log("received " + message.substring(0, 1) + " =========================================================");
        Connection.setLastActivityTime(socket);
        
        Connection connection = Connection.findConnection(socket);
        String[] parts = message.split(WSServer.separator);
        
        String messageType = "";
        if (parts != null && parts.length > 0)  messageType = parts[0];
        
        try 
        {
            if (messageType.equals("s"))
            {
               if (connection != null)
                {
                    Connection.stopConnection(socket);
                    if (connection.conversation != null)
                        Conversation.deleteConversation(connection.conversation);
                }  
            }
            else if (messageType.equals("S"))
            {
                if (connection != null)
                {
                    Connection.stopConnection(socket);
                    if (connection.conversation != null)
                        Conversation.deleteConversation(connection.conversation);
                }
                            
                return signIn(socket, parts); 
            }
            else if (messageType.equals("1"))
            {
                // type=1 request=checkusername param=username
                if (parts[1].equals("checkusername"))
                {
                    String username = parts[2].toLowerCase();
                    String response = (User.findUserByUsername(username) != null) ? "dup" : "ok";
                    sendx(socket, "2" + WSServer.separator + response);
                }
                // type=1 request=checkemail param=email
                else if (parts[1].equals("checkemail"))
                {
                    String email = parts[2].toLowerCase();
                    String response = (User.findUserByEmail(email) != null) ? "dup" : "ok";
                    sendx(socket, "2" + WSServer.separator + response);                
                }
                // type=1 request=checklogin param=username param=password
                else if (parts[1].equals("checklogin"))
                {
                    String username = parts[2].toLowerCase();
                    String password = parts[3].toLowerCase();
                    
                    // xwrongpassword or token
                    
                    String response = HTTPSWebRequestHandler.login(username, password);
                    sendx(socket, "2" + WSServer.separator + response);
                }
            }
            else if (connection == null)
            {
                // havent seen this guy before sending valid messages

                if (isOneOf(messageType, "SC"))
                {
                   return handleNewMessage(socket, parts); 
                }
                else
                {
                    throw new CommunicationsException("xinvalidFirstMessage:" + message + " " + parts[0]);
                }                
            }
            else if (connection.conversation == null)
            {
                // community connection

                if (isOneOf(messageType, "CFRIS"))
                {
                   return handleCommunityMessage(parts, connection); 
                }
                else
                {
                    U.log("not one of: " + message);
                    throw new CommunicationsException("xinvalidCommunityMessage:" + message);
                }            
            }
            else
            {
                // chat connection

                if (isOneOf(messageType, "VMARCIF"))
                {
                   return handleChatMessage(parts, connection); 
                }
                else
                {
                    U.log("not one of: " + message);
                    throw new CommunicationsException("xinvalidChatMessage:" + message);
                }            
            }
        }
        catch (CommunicationsException e)
        {
            U.log("exception message " + e.getMessage());
            U.log("original message " + message);
            sendx(socket, e.getMessage());
        }
        
        return false;
    }
    
    static boolean handleNewMessage(WebSocket socket, String[] parts) throws CommunicationsException
    {
        if (parts[0].equals("C")) 
            return startConversation(null, socket, parts);
        else if (parts[0].equals("S")) 
            return signIn(socket, parts); 
        else
            throw new CommunicationsException("xinvalidNewMessageType");
    }
    
    static boolean handleCommunityMessage(String[] parts, Connection connection) throws CommunicationsException
    {
        if (parts[0].equals("C")) 
            return startConversation(connection, null, parts);
        else if (parts[0].equals("F")) 
            return sendMatchingUsers(connection, parts);
        else if (parts[0].equals("R")) 
            return sendRefreshUsers(connection, parts);
        else if (parts[0].equals("I")) 
            return sendInvite(connection, parts);
        else
            throw new CommunicationsException("invalidCommunityMessageType");
    }
    
    static boolean handleChatMessage(String[] parts, Connection connection) throws CommunicationsException
    {
        if (parts[0].equals("C")) 
            return startConversation(connection, null, parts);
        else if (parts[0].equals("M")) 
            // type, text, mid
            connection.conversation.newMessage(parts[1], parts[2], parts[3], connection);
        else if (parts[0].equals("A")) 
            // type, mid, received status
            connection.conversation.ackReceived(parts[1], new Integer(parts[2]).intValue(), connection);
        else if (parts[0].equals("R")) 
            return sendRefreshUsers(connection, parts);
        else if (parts[0].equals("I")) 
            return sendInvite(connection, parts);
        else if (parts[0].equals("F")) 
            return sendMatchingUsers(connection, parts);
        else
            throw new CommunicationsException("xinvalidChatMessageType");
        
        return false;
    }
    
    static boolean signIn(WebSocket socket, String[] parts) throws CommunicationsException
    {
        if (parts.length < 2)
            throw new CommunicationsException("xinvalidSigninMessage");
         
        // signin S, token

        User u = User.findUserByToken(parts[1]);

        if (u == null) 
            throw new CommunicationsException("xuserNotFoundByToken " + parts[1]);
        
        //U.log("signing in " + u.username());
        
        Connection connection = new Connection(socket, u.username(), null);
        Connection.addConnection(connection);
        
        sendLCU(connection);
        
        return false;
    }
   
    static boolean startConversation(Connection connection, WebSocket socket, String[] parts) throws CommunicationsException
    {
        if (parts.length < 3)
            throw new CommunicationsException("xinvalidConversationMessage");
        
        // type, token, otherid
        
        User local = User.findUserByToken(parts[1]);
        
        if (local == null) 
            throw new CommunicationsException("xlocalUserNotFoundByToken " + parts[1]);
        
        User remote = User.findUserByUsernameOrEmail(parts[2]);
        
        if (remote == null) 
            throw new CommunicationsException("xremoteUserNotFoundByNameOrEmail " + parts[2]);
        
        U.log("start conversation between " + local.username() + " and " + remote.username());
        
        if (connection == null)
        {
            connection = new Connection(socket, local.username(), null);
            Connection.addConnection(connection);
        }
        
        if (connection.conversation != null)
        {
            // if local user is currently in a conversation 
            // then that conversation is ended
            Conversation.deleteConversation(connection.conversation);
        }
        
        Conversation current = Conversation.get(local.username(), remote.username());
        if (current != null)
        {
            // if the same conversation is already in progress 
            // then the connection to the local user in that previous conversation is closed
            
            Connection toclose = Connection.findConnection(local, current);
            
            if (toclose != null)
            {
                U.log("Conversation already in progress for local user " + local.username() + " closing connection " + toclose);
                sendx(toclose.socket, "xlogoutPreviousConnectionInSameConversation");
            }
        }
        
        U.log("New conversation between " + local + " and " + remote);

        connection.conversation = Conversation.createConversation(local.username(), remote.username());
        
        sendLCU(connection);
        connection.conversation.sendHistory(connection);
        
        return false;
    }

    static boolean sendMatchingUsers(Connection connection, String[] parts) throws CommunicationsException
    {
        if (parts.length < 3)
            throw new CommunicationsException("xinvalidSearchMessage"); 
        
        String token = parts[1];
        String match = parts[2];
        
        U.log("search user ***" + match + "***");
    
        User user = User.findUserByUsernameOrEmail(match);
        if (user != null)
        {
            if (!user.username().equals(connection.username))
            {
                ArrayList<User> list = new ArrayList<User>();
                U.log("found user " + user);
                
                Message.saveDummyMessage(connection.username, user.username);
                
                list.add(user);
                sendUserList(connection, list, "F");
            }
        }
        else
        {
            // send not found message = "F" 
            sendx(connection, "F");
        }
        
        return false;
    }

    static boolean sendInvite(Connection connection, String[] parts)
    {
        String email = parts[1];
        
        if (email != null && email.indexOf("@") > 0 && email.indexOf(".") > 0)
        {
        	User u = User.findUserByUsername(connection.username);
        	String invite = HTTPSWebRequestHandler.returnToken(u);
        	
            boolean r = U.sendemail(email, "Invitation to chat on Malt.chat", 
                        connection.username + 
                        " has sent you an invitation to chat. " + 
                        "Please click this link to login or create a new account and begin chatting: " +
                        Main.Login + "&invite=" + invite

            		);
            if (r)
            {
                sendx(connection, "I" + WSServer.separator + "ok");
                return true;
            }
        }
        
        sendx(connection, "I" + WSServer.separator + "error");
        return false;
    }
    
    static User remoteUser(Connection connection)
    {
        User remote = null;
        
        User local = User.findUserByUsername(connection.username);
        
        if (connection.conversation != null)
            remote = connection.conversation.otherSide(local);
        
        return remote;
    }
    
    static void sendLCU(Connection connection) 
    {
        boolean Community = false;

        if (Community)
        {
            ArrayList<User> users = Database.allUsers();

            for (int i = 0; i < users.size(); ++i)
            {   
                User u = users.get(i);
                u.lastMessage = Conversation.getLastMessage(Conversation.conversationName(connection.username, u.username()));
            }

            sendUserList(connection, users, "X");
        }
        else
        {
            ArrayList<User> conversingUsers = new ArrayList<User>();
            
            User local = User.findUserByUsername(connection.username);
            conversingUsers.add(local);
            
            ArrayList<String> correspondents = Message.correspondents(connection.username);
            
            for (int i = 0; i < correspondents.size(); ++i)
            {   
                User u = User.findUserByUsername(correspondents.get(i));
                if (u == null)
                    U.log("***** cannot find " + correspondents.get(i));
                else
                {
                    u.lastMessage = Conversation.getLastMessage(Conversation.conversationName(connection.username, u.username()));
                    conversingUsers.add(u);
                }
            }
            
            sendUserList(connection, conversingUsers, "X");
        }
    }
    
    static boolean sendRefreshUsers(Connection connection, String[] parts)
    {
        sendLCU(connection);        
        return false;
    }
    
    static void sendUserList(Connection connection, ArrayList<User> list, String code)
    {
        String t = code + WSServer.separator;
        
        for (int i = 0; i < list.size(); ++i) 
        {
            User user = list.get(i);
            
            User remote = remoteUser(connection);
            boolean isRemote = false;
            if (remote != null)
                if (user.username().equals(remote.username))
                    isRemote = true;
            boolean isLocal = user.username().equals(connection.username);
              
            t += user.userAnnounceString(isLocal, isRemote);
        }
        
        sendx(connection, t);
    }
    
    static void sendx(Connection connection, String msg)
    {
        sendx(connection.socket, msg);
    }
    
    static void sendx(WebSocket socket, String msg)
    {
        try 
        {
            socket.send(msg);
            U.log("sendx sent the string " + U.truncate(msg, 20));
        } 
        catch (Exception e) 
        {
            U.log("***** FAILED to send string " + msg);
            e.printStackTrace();
        }
    }

    static boolean isOneOf(String m, String choices)
    {
        for (int i = 0; i < choices.length(); ++i)
            if (choices.substring(i, i + 1).equals(m)) return true;
        return false;
    }
}
