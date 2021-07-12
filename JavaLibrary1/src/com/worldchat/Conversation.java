package com.worldchat;

import java.util.*;
import com.sun.net.httpserver.HttpExchange;

public class Conversation 
{
    String username1;
    String username2;
    
    User user1;
    User user2;

    boolean EmailSent;
    
    private static HashMap<String, Conversation> conversations = new HashMap<String, Conversation>();
    
    private Conversation(String id1, String id2, Object o) 
    {
        username1 = id1;
        username2 = id2;
                
        user1 = User.findUserByUsername(username1, o);
        user2 = User.findUserByUsername(username2, o);
        
        conversations.put(conversationName(), this);
    }
    
    static void deleteConversation(Conversation c)
    {
        conversations.remove(c.conversationName());
    }
    
    static Conversation createConversation(String u1, String u2, Object o)
    {
        Conversation c = conversations.get(conversationName(u1, u2));
        
        if (c == null)
        {
            c = new Conversation(u1, u2, o);        
            conversations.put(c.conversationName(), c);
        }
        
        return c;
    }
    
    static Conversation get(String cv)
    {
        Conversation c = conversations.get(cv);
        return c;
    }
    
    static Conversation get(String u1, String u2)
    {
        Conversation c = conversations.get(conversationName(u1, u2));
        return c;
    }
    
    public boolean equals(Conversation c) 
    {
        if (user1.username().equals(c.user1.username()) &&
            user2.username().equals(c.user2.username())) 
            return true;
        if (user1.username().equals(c.user2.username()) &&
            user2.username().equals(c.user1.username())) 
            return true;
        return false;
    }
    
    String conversationName() 
    {
        if (user1.username().compareTo(user2.username()) < 0) 
            return user1.username() + WSServer.separator + user2.username();
        else
            return user2.username() + WSServer.separator + user1.username();
    }
    
    static String conversationName(String username11, String username22) 
    {
        if (username11.compareTo(username22) < 0) 
            return username11 + WSServer.separator + username22;
        else
            return username22 + WSServer.separator + username11;
    }
    
    void newMessage(String msg, String translation, String mid, Connection fromcon) 
    {
        U.inf("received new message " + msg + " from " + fromcon.username, fromcon.socket);
        
        Connection tocon = Connection.findOtherConnection(fromcon);
        int status = 1;
        
        if (tocon != null) 
        {
            // if message is not successfully sent then status = 1
            // if message is successfully sent then status = 2

            status = 1;

            ArrayList<String> messages = new ArrayList<String>();
            String message = Message.jsonToSend(msg, translation, mid, 2, false); 
            messages.add(message);

            String mstring = Json.array("message", "messages", messages);
            U.log("******** message: " + mstring, fromcon.socket);

            boolean r = MessageProcessingThread.sendx(tocon, mstring);
            U.log((r ? "Successfuly " : "Failed to ") + "forward message " + U.truncate(mstring, 30) + " to " + tocon.username, fromcon.socket);
            
            if (r) status = 2;
        }
       
        String oside = otherSide(User.findUserByUsername(fromcon.username, fromcon.socket)).username();
        
        Message m = new Message(fromcon.username, msg, translation, mid, status, oside);
        
        U.inf("storing new message " + m, fromcon.socket);
        
        Message.storeMessage(m, this, fromcon.socket);
        
        /* previous logic:
        User ouser = User.findUserByUsername(oside);
        Connection oconn = Connection.findConnection(ouser);
        if (oconn != null) MessageProcessingThread.sendLCU(oconn);
        */

        if (tocon != null) 
        {
            // update the other person's chat list info if that person is online
            MessageProcessingThread.sendLCU(tocon);
        }
        else
        {
            // notify if other person is not online
            // this should be done only once per conversation
            notifyRecipient(fromcon, fromcon.socket);
        }
    }

    void notifyRecipient(Connection fromcon, Object o)
    {
        User to = otherSide(User.findUserByUsername(fromcon.username, o));

        //if (!to.username.equals("support")) return;

        // if message arrives and recipient is not online then send an email
        // but todo ***track it*** so that only one message is sent in this conversation
        
        U.sendemail(    to.email, 
                        "You have a new message from " + fromcon.username, 

                        "You have a new message from " + 
                        fromcon.username +
                        ". Please login and read your new message: " + Main.Login,
                        o
                    );

        //EmailSent = true;
    }

    Message findMessage(String mid) 
    {
        String[] fields = {"mid", mid};
        ArrayList<Record> ms = Database.getMessages(fields);
        if (ms.size() > 0)
            return new Message(ms.get(0));
        else
            return null;
    }
    
    void ackReceived(String mid, int userstatus, Connection fromcon, Object o) 
    {
        U.inf("Ack received for " + mid + " from " + fromcon.username + " with status " + userstatus, o);
        
        Message m = findMessage(mid);

        if (m == null) 
        {
            U.log("***** no message found " + mid, o);
            return;
        }
        
        // the status parameter here indicates 
        // the attention user status for this msg
        //
        // 3 sleeping (delivered)
        // 4 awake  (read)

        // find other user connection
        Connection tocon = Connection.findOtherConnection(fromcon);

        if (tocon != null)    
        {
            ArrayList<String> messages = new ArrayList<String>();
            String message = Message.jsonToSend(m.message, m.translation, mid, userstatus, false); 
            messages.add(message);

            String mstring = Json.array("ack", "messages", messages);
            U.inf("******** ack: " + mstring, o);
            
            boolean r = MessageProcessingThread.sendx(tocon, mstring);
            U.inf((r ? "Successfuly " : "Failed to ") + "forward ack " + mid + " from " + fromcon.username + " to " + tocon.username, o);
        }
        else
        {
            U.inf("Cannot forward ack " + mid + " from " + fromcon.username + " other user not online, notifying recipient ", o);
        }
        
        if (m.status() != userstatus)
        {
            U.inf("Message " + mid + " status updated to  " + userstatus + ", storing", o);
            m.status(userstatus);
            Message.storeMessage(m, this, o);
        }
    }

    User otherSide(User u) 
    {
        if (u.username().equals(username1)) 
            return user2;
        else
            return user1;
    }
    
    void sendHistory(Connection tocon) 
    {
        if (tocon == null) return;
        
        String[] fields = {"conversation", conversationName()};

        ArrayList<Record> ms = Database.getMessages(fields);

        ArrayList<String> messages = new ArrayList<String>();
        
        for (int i = 0; i < ms.size(); ++i)
        {
            Message m = new Message(ms.get(i));
            String j2send = m.jsonToSend(tocon);
            messages.add(j2send);
        }
      
        String a = Json.array("history", "messages", messages);
        
        boolean r = MessageProcessingThread.sendx(tocon, a);
    }
  
    public String toString() 
    {
        return "conversation between " + username1 + " and " + username2;
    }
    
    static Message getLastMessage(String conversationName)
    {
        String[] fields = {"conversation", conversationName};
            
        ArrayList<Record> ms = Database.getMessages(fields);
            
        long max = -1;
        Message last = null;
        
        for (int i = 0; i < ms.size(); ++i)
        {
            Message m = new Message(ms.get(i));
            long time = 0;
            try
            {
                time = Long.parseLong(m.mid.substring(0, 10));
            }
            catch (Exception e)
            {
                
            }
            if (time > max)
            {
                max = time;
                last = m;
            }
        }
        
        return last;
    }
}
