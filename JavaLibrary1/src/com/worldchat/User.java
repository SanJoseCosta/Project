package com.worldchat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Collection;
import com.sun.net.httpserver.HttpExchange;

public class User 
{
    static String LastActivityTime = "1603224165167";
    static String UsersTable = "User0";
    
    String username;
    String email;
    String password;
    String language;
    String picurl;
    Message lastMessage;
    private long lastActivityTime;
    
    String username() 
    {
        return username;
    }
   
    void lastActivityTime(long a, Object o)
    {
        lastActivityTime = a;
        storeUser(this, o);
    }
    
    long lastActivityTime()
    {
        return lastActivityTime;
    }
    
    public boolean equals(User u)
    {
        return username.equals(u.username); 
    }

    static void storeUser(User n, Object o) 
    {
        try 
        {
            String uname = n.username.toLowerCase();
            String email = n.email.toLowerCase();
            
            String[] fields1 = 
            {
                "username", uname, 
                "email", email, 
                "password", n.password,
                "language", n.language,
                "picurl", n.picurl,
                "lastActivityTime", n.lastActivityTime + ""
            };

            if (!Database.addUser(fields1, uname, o))
                U.log("***** database returns false on attempt to store user " + uname, o);
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
    }
    
    User(Record r, Object o)
    {
        username = r.get("username");
        email = r.get("email");
        password = r.get("password");
        language = r.get("language");
        picurl = r.get("picurl");

        picurl = validate(picurl);

        try
        {
            lastActivityTime = Long.parseLong(r.get("lastActivityTime"));
        }
        catch(Exception exc)
        {
            lastActivityTime = 0;
            U.log("lastActivityTime set to 0", o);
        }  
    }
    
    User(String u, String e, String p, String l, String pp, String t, Object o) 
    {
        username = u;
        email = e;
        password = p;
        language = l;
        picurl = pp;

        picurl = validate(picurl);

        try
        {
            lastActivityTime = Long.parseLong(t);
        }
        catch(Exception exc)
        {
            lastActivityTime = 0;
            U.log("lastActivityTime set to 0", o);
        }  
    }

    public String toString() 
    {
        return  "[" +   username + "," + 
                        email + "," + 
                        password + "," + 
                        language 
                        + ", picurl: " + picurl + 
                        ", lastActivityTime: " + 
                        lastActivityTime + "," + 
                        (lastMessage == null ? "no last message" : lastMessage.message) + 

                "]";
    }

    String jsonToSend(boolean islocaluser, boolean isremoteuser)
    {
        Json j = new Json();

        j.add("picurl",             picurl);
        j.add("username",           username);
        j.add("lastActivityTime",   lastActivityTime + "");
        j.add("remote",             (isremoteuser ? "true" : "false"));
        j.add("local",              (islocaluser ? "true" : "false"));
        j.add("language",           language);
        j.add("email",              email);

        if (lastMessage == null)
        {
            j.add("lastMessage",        "null");
            j.add("lastTranslation",    "null");
            j.add("lastMessageId",      "null");
            j.add("lastStatus",         "null");
            j.add("lastMessageSender",  "null");
        }
        else
        {
            j.add("lastMessage",        lastMessage.message);
            j.add("lastTranslation",    lastMessage.translation);
            j.add("lastMessageId",      lastMessage.mid);
            j.add("lastStatus",         lastMessage.status + "");
            j.add("lastMessageSender",  lastMessage.fromUserName);
        }

        return j.get();
    }
    
    static User findUserByToken(String token, Object o) 
    {
        if (U.invalid(token))
        {
            U.sendError("***** invalid token " + token, o);
            return null;
        }
                
        String[] fields = {"token", token};
        ArrayList<Record> results = Database.getTokens(fields);

        if (results != null && results.size() == 1)
        {
            String username = (String) results.get(0).get("username");
            return findUserByUsername(username, o);
        }
        else
            return null;
    }

    static User findUserByUsername(String username, Object o) 
    {
        if (username == null)
        {
            //U.log("*** trying to find null username");
            return null;
        }
                
        String[] fields = {"username", username.toLowerCase()};
        ArrayList<Record> results = Database.getUsers(fields);
        
        if (results != null && results.size() > 0)
            return  new User(results.get(0), o);
        else
            return null;
    }

    static User findUserByEmail(String email, Object o) 
    {
        if (email == null)
        {
            //U.log("*** trying to find null email");
            return null;
        }
        
        //U.log("find user by email");
        
        String[] fields = {"email", email.toLowerCase()};
        ArrayList<Record> results = Database.getUsers(fields);

        if (results != null && results.size() == 1)
            return new User(results.get(0), o);
        else
            return null;
    }

    static User findUserByUsernameOrEmail(String id, Object o) 
    {
        if (id == null)
        {
            //U.log("*** trying to find null username");
            return null;
        }
        
        User u = findUserByUsername(id, o);
        
        if (u == null) 
            u = findUserByEmail(id, o);
        
        return u;
    }

    static String validate(String picurl)
    {
        if (picurl == null) picurl ="0";
        
        if (picurl.equals("null")) picurl ="0";
        if (picurl.equals("undefined")) picurl ="0";

        if (picurl.equals("true")) picurl ="1";

        return picurl;
    }
}
