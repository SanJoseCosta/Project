package com.worldchat;

import java.util.ArrayList;
import org.json.*;
import com.sun.net.httpserver.HttpExchange;

public class Message 
{
    // status 
    //
    //	1 = received at server
    //  2 = sent to recipient
    //	3 = delivered
    //	4 = read

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
            Log.stackTrace(e);
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
    
    static void saveInitMessage(String nuser, Object o)
    {
        String from = Main.SupportUser;
        if (nuser.equals(from)) return;
        
        String cnvName = Conversation.conversationName(from, nuser);
        
        String mid = timeRandomString();
        
        String m1 = "Welcome! Click the icons to Find a user, or, Invite someone new.";

        User u = User.findUserByUsername(nuser, o);
        if (u == null)
        {
            U.log("cannot find user " + nuser + " in saveInitMessage", o);
        }

        String m2 = U.requestTranslation(u.language, "en", m1, o);

        if (m2 == null) m2 = "";
        
        Message message = new Message(Main.SupportUser,  m1, m2, mid, 2, nuser);

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
            
            boolean result = Database.addMessage(fields, mid, o);

            if (!result)
                U.log("***** returns false on attempt to store message ", o);
            else
                U.inf("stored message " + message, o);
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
    }
    
    static void saveDummyMessage(String from, String nuser, Object o)
    {
        if (nuser.equals(from)) return;
        
        String cnvName = Conversation.conversationName(from, nuser);
                
        Message message = new Message(from, "dummy", "", "0", 2, nuser);

        U.log("new dummy message " +  message, o);
        
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
            
            boolean result = Database.addMessage(fields, "0", o);

            if (!result)
                U.log("***** returns false on attempt to store message ", o);
            else
                U.inf("stored message " + message, o);
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
    }
    
    static String timeRandomString()
    {
        String mid = System.currentTimeMillis() + "";
        
        for (int i = 0; i < 10; ++i)
            mid += (int) (Math.random() * 10) + "";
        
        return mid;
    }

    static void storeMessage(Message m, Conversation c, Object o) 
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
            
            boolean result = Database.addMessage(fields, m.mid, o);

            if (!result)
                U.log("*****database returns false on attempt to store message ", o);
            else
                U.inf("stored message ", o);
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
    }
    
    String jsonToSend(boolean local)
    {
        Json j = new Json();
        j.add("message", message);
        j.add("translation", translation);
        j.add("mid", mid);
        j.add("status", status + "");
        j.add("localSender", (local ? "true" : "false"));
        return j.get();
    }

    String jsonToSend(Connection to)
    {
       return jsonToSend(fromUserName.equals(to.username)); 
    }

    static String jsonToSend(String msg0, String translation0, String mid0, int status0, boolean local0)
    {
        Json j = new Json();
        j.add("message", msg0);
        j.add("translation", translation0);
        j.add("mid", mid0);
        j.add("status", status0 + "");
        j.add("localSender", (local0 ? "true" : "false"));
        return j.get();
    }
}
