package com.worldchat;

import java.util.*;

public class Conversation 
{
    String username1;
    String username2;
    
    User user1;
    User user2;

    boolean EmailSent;
    
    private static HashMap<String, Conversation> conversations = new HashMap<String, Conversation>();
    
    private Conversation(String id1, String id2) 
    {
        username1 = id1;
        username2 = id2;
        
        U.log("new conversation");
        
        user1 = User.findUserByUsername(username1);
        user2 = User.findUserByUsername(username2);
        
        conversations.put(conversationName(), this);
    }
    
    static void deleteConversation(Conversation c)
    {
        conversations.remove(c.conversationName());
    }
    
    static Conversation createConversation(String u1, String u2)
    {
        Conversation c = conversations.get(conversationName(u1, u2));
        
        if (c == null)
        {
            c = new Conversation(u1, u2);        
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
        U.log("received new message " + msg + " from " + fromcon.username);
        
        Connection tocon = Connection.findOtherConnection(fromcon);
        int status = 1;
        
        if (tocon != null) 
        {
            // if message is not successfully sent then status = 1
            status = 1;
            // if message is successfully sent then status = 2
            String t = Message.formatToSend("M", msg, translation, mid, 2, false); 
            
            if (U.sendStringToCon(t, tocon, false))
            {
                status = 2;
                U.log("Forwarded message " + msg + " from " + fromcon.username + " to " + tocon.username);
                
                // should receive an ack very soon
            }
        }
        /*
        else if (!EmailSent)
        {
            // if message arrives and recipient is not online then send an email
            // but track it so that only one message is sent in this conversation
            if (false)
            {
                User to = otherSide(User.findUserByUsername(fromcon.username));
                U.sendemail(to.email, "New message from " + to.username(), 
                            to.username() + 
                            " has sent you a new message on MALT.chat. Please click this link to login and read your new message: " +
                            Main.Login);
                EmailSent = true;
            }
        }
        */
       
        String oside = otherSide(User.findUserByUsername(fromcon.username)).username();
        
        Message m = new Message(
                fromcon.username, 
                msg, translation, mid, status, 
                oside);
        
        
        U.log("storing new message " + m);
        
        Message.storeMessage(m, this);
        
        // update the other person's chat list info if that person is online
        
        User ouser = User.findUserByUsername(oside);
        Connection oconn = Connection.findConnection(ouser);
        if (oconn != null) MessageProcessingThread.sendLCU(oconn);
    }
    
    Message findMessage(String mid) 
    {
        U.log("find message " + mid);
        String[] fields = {"mid", mid};
        ArrayList<Record> ms = Database.getMessages(fields);
        if (ms.size() > 0)
            return new Message(ms.get(0));
        else
            return null;
    }
    
    void ackReceived(String mid, int userstatus, Connection fromcon) 
    {
        U.log("Ack received for " + mid + " from " + fromcon.username + " with status " + userstatus);
        
        Message m = findMessage(mid);

        if (m == null) 
        {
            U.log("***** no message found " + mid);
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
            String t = Message.formatToSend("A", m.message, m.translation, mid, userstatus, false);
            boolean r = U.sendStringToCon(t, tocon, false);
            U.log((r ? "Successfuly " : "Failed to ") + "forward ack " + mid + " from " + fromcon.username + " to " + tocon.username);
        }
        else
        {
            U.log("Cannot forward ack " + mid + " from " + fromcon.username + " other user not online ");
        }
        
        if (m.status() != userstatus)
        {
            U.log("Message " + mid + " status updated to  " + userstatus + " storing");
            m.status(userstatus);
            Message.storeMessage(m, this);
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
        if (tocon != null)
        {
            String s = "H" + WSServer.separator;
            
            String[] fields = {"conversation", conversationName()};
            ArrayList<Record> ms = Database.getMessages(fields);
            
            for (int i = 0; i < ms.size(); ++i)
            {
                Message m = new Message(ms.get(i));
                String tc = m.formatToSend(tocon);
                
                s += tc;
                if (i < ms.size() - 1) s += WSServer.separator;
            }
            boolean r = U.sendStringToCon(s, tocon, false);
            U.log((r ? "Successfuly " : "Failed to ") + "send history message " + U.truncate(s, 30) + " to " + tocon.username);
        }
    }

    boolean sendMessageTo(Message m, Connection tocon) 
    {
        boolean local = (m.fromUserName.equals(tocon.username));
        
        String t = Message.formatToSend("H", m.message, m.translation, m.mid, m.status(), local);
        boolean r = U.sendStringToCon(t, tocon, false);
        U.log((r ? "Successfuly " : "Failed to ") + "send history message " + t + " from " + m.fromUserName + " to " + tocon.username);

        return r;
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
