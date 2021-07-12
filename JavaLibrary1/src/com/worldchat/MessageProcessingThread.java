package com.worldchat;

import org.java_websocket.WebSocket;
import java.util.ArrayList;
import org.json.*;

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
            U.log("-- Exception processing message", j.conn);
            Log.stackTrace(e);
        }

        time = System.currentTimeMillis() - time;
        U.inf("processed the message in " + time + " ms", j.conn);

        messageProcessedTimes.add(new Long(System.currentTimeMillis()));
        
        //U.inf("messages received: " + messageProcessedTimes.size());
    }

    static void addJob(Job j) 
    {
        //queue.add(j);
        process(j);
    }

    // socket.getRemoteSocketAddress()
    
    static boolean processMessage(WebSocket socket, String message) 
    {
        U.inf("received: " + message, socket);

        try 
        {
            Connection.setLastActivityTime(socket);
            Connection connection = Connection.findConnection(socket);

            JSONObject json = new JSONObject(message);
            String messageType = json.getString("type");

            if (messageType.equals("signout"))
            {
               if (connection != null)
                {
                    Connection.stopConnection(socket);
                    if (connection.conversation != null)
                        Conversation.deleteConversation(connection.conversation);
                }  
            }
            else if (messageType.equals("checkusername"))
            {
                String username = json.getString("username").toLowerCase();
                String response = (User.findUserByUsername(username, socket) != null) ? "dup" : "ok";

                String[] m = {"type", "checkusername", "response", response};
                sendx(socket, m);

                //"2" + WSServer.separator + response);
            }
            else if (messageType.equals("checkemail"))
            {
                String email = json.getString("email").toLowerCase();
                String response = (User.findUserByEmail(email, socket) != null) ? "dup" : "ok";

                String[] m = {"type", "checkemail", "response", response};
                sendx(socket, m);

                //sendx(socket, "2" + WSServer.separator + response);                
            }
            else if (messageType.equals("checklogin"))
            {
                String username = json.getString("emailorusername").toLowerCase();
                String password = json.getString("password");

                String response = login(username, password, socket);

                String[] m = {"type", "checklogin", "response", response};
                sendx(socket, m);

                //sendx(socket, "2" + WSServer.separator + response);
            }
            else if (messageType.equals("reset")) 
            {
                return sendReset(json, socket);
            }
            else if (messageType.equals("changepassword")) 
            {
                return changePassword(json, socket);
            }
            else if (connection == null)
            {
                return handleNewMessage(socket, json);           
            }
            else if (connection.conversation == null)
            {
                return handleCommunityMessage(json, connection);       
            }
            else
            {
                return handleChatMessage(json, connection);     
            }
        }
        catch (CommunicationsException e)
        {
            U.log("-- exception message " + e.getMessage(), socket);
            U.log("-- original message " + message, socket);

            String[] m = {"type", "error", "response", e.getMessage()};
            sendx(socket, m);
        }
        
        return false;
    }
    
    static boolean handleNewMessage(WebSocket socket, JSONObject json) throws CommunicationsException
    {
        String messageType = json.getString("type");
        if (messageType.equals("connect")) 
            return startConversation(null, socket, json, socket);
        else if (messageType.equals("signin")) 
            return signIn(socket, json); 
        else
            throw new CommunicationsException("xinvalidMessageType");
    }
    
    static boolean handleCommunityMessage(JSONObject json, Connection connection) throws CommunicationsException
    {
        String messageType = json.getString("type");
        if (messageType.equals("connect")) 
            return startConversation(connection, null, json, connection.socket);
        else if (messageType.equals("find")) 
            return sendMatchingUsers(connection, json);
        else if (messageType.equals("refresh")) 
            return sendRefreshUsers(connection, json);
        else if (messageType.equals("invite")) 
            return sendInvite(connection, json);
        else
            throw new CommunicationsException("invalidMessageType");
    }
    
    static boolean handleChatMessage(JSONObject json, Connection connection) throws CommunicationsException
    {
        String messageType = json.getString("type");
        if (messageType.equals("connect")) 
            return startConversation(connection, null, json, connection.socket);
        else if (messageType.equals("message")) 
        {
            String message = json.getString("message").toLowerCase();
            String translation = json.getString("translation").toLowerCase();
            String mid = json.getString("mid").toLowerCase();

            connection.conversation.newMessage(message, translation, mid, connection);
            return false;
        }
        else if (messageType.equals("ack")) 
        {
            String mid = json.getString("mid").toLowerCase();
            String status = json.getString("status").toLowerCase();

            connection.conversation.ackReceived(mid, new Integer(status).intValue(), connection, connection.socket);
            return false;
        }
        else if (messageType.equals("refresh")) 
            return sendRefreshUsers(connection, json);
        else if (messageType.equals("invite")) 
            return sendInvite(connection, json);
        else if (messageType.equals("find")) 
            return sendMatchingUsers(connection, json);
        else
            throw new CommunicationsException("xinvalidMessageType");
    }
    
    static boolean signIn(WebSocket socket, JSONObject json) throws CommunicationsException
    {
        String token = json.getString("token").toLowerCase();

        User u = User.findUserByToken(token, socket);

        if (u == null) 
            throw new CommunicationsException("xuserNotFoundByToken");
        
        U.inf("signing in " + u.username(), socket);
        
        Connection connection = new Connection(socket, u.username(), null, socket);
        Connection.addConnection(connection);
        
        sendLCU(connection);
        
        return false;
    }
   
    static boolean startConversation(Connection connection, WebSocket socket, JSONObject json, Object o) throws CommunicationsException
    {
        String username = json.getString("username").toLowerCase();
        String token = json.getString("token").toLowerCase();

        User local = User.findUserByToken(token, socket);
        
        if (local == null) 
            throw new CommunicationsException("xlocalUserNotFoundByToken");
        
        User remote = User.findUserByUsernameOrEmail(username, socket);
        
        if (remote == null) 
            throw new CommunicationsException("xremoteUserNotFoundByNameOrEmail");
        
        U.inf("start conversation between " + local.username() + " and " + remote.username(), o);
        
        if (connection == null)
        {
            connection = new Connection(socket, local.username(), null, socket);
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
                U.inf("Conversation already in progress for local user " + local.username() + " closing connection " + toclose, toclose.socket);
                
                String[] m = {"type", "error", "response", "xlogoutPreviousConnectionInSameConversation"};
                sendx(toclose.socket, m);
            }
        }
        
        U.inf("New conversation between " + local + " and " + remote, o);

        connection.conversation = Conversation.createConversation(local.username(), remote.username(), socket);
        
        sendLCU(connection);
        connection.conversation.sendHistory(connection);
        
        return false;
    }

    static boolean sendMatchingUsers(Connection connection, JSONObject json) throws CommunicationsException
    {
        String token = json.getString("token").toLowerCase();;
        String username = json.getString("username").toLowerCase();
        
        U.inf("search user ***" + username + "***", connection.socket);

        ArrayList<User> list = new ArrayList<User>();
    
        User user = User.findUserByUsernameOrEmail(username, connection.socket);

        if (user != null && !user.username().equals(connection.username))
        {
            U.inf("found user " + user, connection.socket);
            Message.saveDummyMessage(connection.username, user.username, connection.socket);

            list.add(user);
            sendUserList(connection, list, "find");
        }
        else
        {
            // return an empty list

            sendUserList(connection, list, "find");
        }
        
        return false;
    }

    static boolean sendInvite(Connection connection, JSONObject json)
    {
        String email = json.getString("email").toLowerCase();
        
        if (email != null && email.indexOf("@") > 0 && email.indexOf(".") > 0)
        {
        	User u = User.findUserByUsername(connection.username, connection.socket);
        	String invite = HTTPSWebRequestHandler.returnToken(u, connection.socket);
        	
            boolean r = U.sendemail(email, "Invitation to chat on " + Main.ProductName + ".chat", 
                        connection.username + 
                        " has sent you an invitation to chat. " + 
                        "Please follow this link to login or create a new account and begin chatting: " +
                        Main.Login + "&invite=" + invite,
                        connection.socket
            		);
            if (r)
            {
                String[] m = {"type", "invite", "response", "ok"};
                sendx(connection, m);
                return true;
            }
        }
        
        String[] m = {"type", "invite", "response", "error"};
        sendx(connection, m);
        
        //sendx(connection, "I" + WSServer.separator + "error");

        return false;
    }

    static boolean changePassword(JSONObject json, WebSocket socket)
    {
        String token = json.getString("token");
        String password = json.getString("password");

        if (token == null || password == null || password.length() == 0)
        {
            U.inf("change password parameter error " + token + " " + password, socket);
            return false;
        }

        User u = User.findUserByToken(token, socket);

        if (u == null)
        {
            U.inf("change password user not found " + token, socket);
            return false;
        }

        // new password
                
        u.password = password;
             
        try 
        {
            User.storeUser(u, socket);
            U.inf("changed user " + u, socket);
            return true;
        } 
        catch (Exception e)
        {
            Log.stackTrace(e);
            return false;
        }
    }

    static boolean sendReset(JSONObject json, WebSocket socket)
    {
        String email = json.getString("email").toLowerCase();
        
        if (email != null && email.indexOf("@") > 0 && email.indexOf(".") > 0)
        {
            User u = User.findUserByEmail(email, socket);
            if (u != null)
            {
                String reset = HTTPSWebRequestHandler.returnToken(u, socket);
                
                boolean r = U.sendemail(email, "Reset password link for " + Main.ProductName + ".chat", 
                           
                            "Please follow this link to reset your password: " +
                            Main.Reset + "&token=" + reset,
                            socket
                        );
                if (r)
                {
                    //String[] m = {"type", "reset", "response", "ok"};
                    //sendx(connection, m);
                    return true;
                }
            }
        }
        
        //String[] m = {"type", "reset", "response", "error"};
        //sendx(connection, m);
        
        //sendx(connection, "I" + WSServer.separator + "error");

        return false;
    }
    
    static User remoteUser(Connection connection)
    {
        User remote = null;
        
        User local = User.findUserByUsername(connection.username, connection.socket);

        //U.inf("in remoteuser, connection.username = " + connection.username + ", local=" + local + ", conversation=" + connection.conversation);
        
        if (connection.conversation != null)
            remote = connection.conversation.otherSide(local);
        
        return remote;
    }
    
    static void sendLCU(Connection connection) 
    {
        boolean Community = false;

        if (Community)
        {
            ArrayList<User> users = Database.allUsers(connection.socket);

            for (int i = 0; i < users.size(); ++i)
            {   
                User u = users.get(i);
                u.lastMessage = Conversation.getLastMessage(Conversation.conversationName(connection.username, u.username()));
            }

            sendUserList(connection, users, "users");
        }
        else
        {
            ArrayList<User> conversingUsers = new ArrayList<User>();
            
            User local = User.findUserByUsername(connection.username, connection.socket);
            conversingUsers.add(local);
            
            ArrayList<String> correspondents = Message.correspondents(connection.username);
            
            for (int i = 0; i < correspondents.size(); ++i)
            {   
                User u = User.findUserByUsername(correspondents.get(i), connection.socket);
                if (u == null)
                    U.log("-- cannot find in sendLCU " + correspondents.get(i), connection.socket);
                else
                {
                    u.lastMessage = Conversation.getLastMessage(Conversation.conversationName(connection.username, u.username()));
                    conversingUsers.add(u);
                }
            }
            
            sendUserList(connection, conversingUsers, "users");
        }
    }
    
    static boolean sendRefreshUsers(Connection connection, JSONObject json)
    {
        sendLCU(connection);        
        return false;
    }
    
    static void sendUserList(Connection connection, ArrayList<User> list, String type)
    {
        User remote = remoteUser(connection);

        ArrayList<String> users = new ArrayList<String>();
        
        for (int i = 0; i < list.size(); ++i)
        {
            User user = list.get(i);
            
            boolean isRemote = (remote != null && user.username().equals(remote.username));
            boolean isLocal = user.username().equals(connection.username);

            String j2send = user.jsonToSend(isLocal, isRemote);
            users.add(j2send);
        }
      
        String a = Json.array(type, "users", users);
        
        sendx(connection, a);
    }

    static boolean sendx(Connection connection, String[] p)
    {
        return sendx(connection.socket, p);
    }

    static boolean sendx(WebSocket socket, String[] p)
    {
        Json json = new Json();

        for (int i = 0; i < p.length; i = i + 2)
            json.add(p[i], p[i + 1]);
        
        return sendx(socket, json.get());
    }
    
    static boolean sendx(Connection connection, String msg)
    {
        return sendx(connection.socket, msg);
    }
    
    static boolean sendx(WebSocket socket, String msg)
    {
        try 
        {
            socket.send(msg);
            U.inf("sendx sent the string " + U.truncate(msg, 100), socket);
            return true;
        } 
        catch (Exception e) 
        {
            U.log("-- FAILED to send string " + msg, socket);
            Log.stackTrace(e);
            return false;
        }
    }

    static String login(String username, String password, WebSocket socket) 
    {
        U.inf("login", socket);
        
        String r;
        User u = User.findUserByUsername(username, socket);
        
        if (u == null) 
            u = User.findUserByEmail(username, socket);
        
        if (u == null) 
            r = "invaliduser";
        else
        {
            U.inf("login " + u.password + " " + password, socket);
            if (!u.password.equals(password)) 
            {
                r = "invalidpassword";
            }
            else
            {
                String t = HTTPSWebRequestHandler.returnToken(u, socket);
                U.inf("token " + t, socket);
                r = t;
            }
        }
        
        return r;
    }
}
