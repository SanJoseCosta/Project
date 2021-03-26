package com.worldchat;

import java.util.ArrayList;

// message statuses
// process 1
// 1 successfully received
// 2 sent to the recipient
// 3 ack received from recipient
// 4 ack1 sent to sender (with message status of 1)
// 5 recipient receives message and updates server
// 6 ack2 sent to sender (with message status of 2)
// process 2
// 1 successfully received
// 2 sent to the recipient
// 3 ack received from recipient
////////////////////// 4 ack1 sent to sender (with message status of 1)
////////////////////// 5 recipient receives message and updates server
// 6 ack2 sent to sender (with message status of 2)

public class Message 
{
    // status 
    //
    //	1 = received at server
    //  2 = sent to recipient
    //	3 = delivered
    //	4 = read

    //private User from;
    String fromUserName;
    String toUsername;
    String message;
    String mid;
    String translation;
    int status;
    
    int status()
    {
        return status;
    }
    
    void status(int s)
    {
        status = s;
    }
    
    Message(Record r)
    {
        //U.log("in Message() " + r.json);
        
        fromUserName = r.get("from");
        message = r.get("message");
        translation = r.get("translation");
        try
        {
            status = Integer.parseInt(r.get("status"));
        }
        catch(Exception exc)
        {
            status = 0;
        }  
        toUsername = r.get("to");
        mid = r.get("mid");
    }

    Message(String f, String m, String x, String i, int s, String t) 
    {
        //U.log("in Message() " + f + " " + m + " " + x + " " + i + " " + s + " " + t);
        
        fromUserName = f;
        message = m;
        translation = x;
        mid = i;
        status = s;
        toUsername = t;
    }

    public String toString() 
    {
        return  "[from=" +  fromUserName + 
                ", to=" + toUsername + 
                ", message=" + message + 
                ", translation=" + translation + 
                ", mid=" + mid + "]"; 
    }
   
    static ArrayList<String> correspondents(String username) 
    {
        ArrayList<String> correspondents = new ArrayList<String>();
        String name = username.toLowerCase();
                
        try 
        {
            getRecords(1, name, correspondents);
            getRecords(2, name, correspondents);
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
        
        return correspondents;
    }
    
    static void getRecords(int n, String name, ArrayList<String> correspondents)
    {
        String[] fieldsuser1 = {"from", name};
        String[] fieldsuser2 = {"to", name};
            
        //ArrayList<Record> results = get("Message", (n == 1) ? fieldsuser1 : fieldsuser2, null, false);
        
        ArrayList<Record> results = Database.getMessages((n == 1) ? fieldsuser1 : fieldsuser2);
        
        for (int i = 0; i < results.size(); ++i) 
        {
            String c = (String) results.get(i).get((n == 1) ? "to" : "from");
            if (c == null)
            {
                
            }
            addUnique(c, correspondents);
        }
    }
    
    static void addUnique(String s, ArrayList<String> a)
    {
        for (int i = 0; i < a.size(); ++i)
            if (s.equals(a.get(i)))
                return;
        a.add(s);
    }
    
    static void addUnique(Message s, ArrayList<Message> a)
    {
        if (s == null) return;
        for (int i = 0; i < a.size(); ++i)
            if (s.mid.equals(a.get(i).mid))
                return;
        a.add(s);
    }
    
    static void saveInitMessage(String nuser)
    {
        String from = Main.SupportUser;
        if (nuser.equals(from)) return;
        
        String cnvName = Conversation.conversationName(from, nuser);
        
        String mid = timeRandomString();
        
        // todo add the translation

        String m1 = "Welcome to MALT.chat. To get started, click the icons to Find another user, or, Invite someone new.";
        
        Message message = new Message(Main.SupportUser,  m1, m1, mid, 2, nuser);

        try 
        {
            String[] fields = 
            { 
                "conversation", cnvName, 
                "mid", mid, 
                "from", from, 
                "to", nuser,
                "message", message.message,
                "translation", message.translation,
                "status", 2 + ""
            };
            
            boolean result = Database.addMessage(fields, mid);

            if (!result)
                U.log("***** returns false on attempt to store message ");
            else
                U.log("stored message " + message);
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
    
    static void saveDummyMessage(String from, String nuser)
    {
        if (nuser.equals(from)) return;
        
        String cnvName = Conversation.conversationName(from, nuser);
                
        Message message = new Message(from, "dummy", "", "0", 2, nuser);

        U.log("new dummy message " +  message);
        
        try 
        {
            String[] fields = 
            { 
                "conversation", cnvName, 
                "mid", "0", 
                "from", from, 
                "to", nuser,
                "message", message.message,
                "translation", message.translation,
                "status", 2 + ""
            };
            
            boolean result = Database.addMessage(fields, "0");

            if (!result)
                U.log("***** returns false on attempt to store message ");
            else
                U.log("stored message " + message);
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
    
    static String timeRandomString()
    {
        String mid = System.currentTimeMillis() + "";
        
        for (int i = 0; i < 10; ++i)
            mid += (int) (Math.random() * 10) + "";
        
        return mid;
    }

    static void storeMessage(Message m, Conversation c) 
    {
        try 
        {
            String conversation = c.conversationName();
            String f = m.fromUserName;
            String to = c.user1.username().equals(f) ? c.user2.username() : c.user1.username();
            
            String[] fields = 
            { 
                "conversation", conversation, 
                "mid", m.mid, 
                "from", f, 
                "to", to,
                "message", m.message,
                "translation", m.translation,
                "status", m.status + ""
            };
            
            boolean result = Database.addMessage(fields, m.mid);

            if (!result)
                U.log("*****database returns false on attempt to store message ");
            else
                U.log("stored message ");
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
    
    String formatToSend(Connection to)
    {
       return formatToSend(fromUserName.equals(to.username)); 
    }
    
    static String formatToSend(String type0, String msg0, String translation0, String mid0, int status0, boolean local0)
    {
        return      type0 + WSServer.separator
                    + msg0 + WSServer.separator
                    + translation0 + WSServer.separator
                    + mid0 + WSServer.separator
                    + status0 + WSServer.separator
                    + (local0 ? "true" : "false")
                ;
    }
    
    String formatToSend(boolean local)
    {
        return  
                      message + WSServer.separator
                    + translation + WSServer.separator
                    + mid + WSServer.separator
                    + status + WSServer.separator
                    + (local ? "true" : "false")
                ;
    }
    
    /*
    static String tc()
            {
                boolean local = (m.fromUser().username().equals(tocon.username));
                String t =  m.msg() +         WSServer.separator + 
                            m.translation + WSServer.separator + 
                            m.mid +          WSServer.separator + 
                            m.status() +    WSServer.separator + 
                            (local ? "true" : "false");
            }
    */
    /*
    static String formatToSavexxx(Message m, String from)
    {
        return      (from != null ? from : m.fromUser.username()) + WSServer.separator
                    + m.msg + WSServer.separator
                    + m.translation + WSServer.separator
                    + m.id + WSServer.separator
                    + m.status;
    }
    */
}
