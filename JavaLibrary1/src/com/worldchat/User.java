package com.worldchat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Collection;

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
   
    void lastActivityTime(long a)
    {
        lastActivityTime = a;
        storeUser(this);
    }
    
    long lastActivityTime()
    {
        return lastActivityTime;
    }
    
    public boolean equals(User u)
    {
        return username.equals(u.username); 
    }

    static void storeUser(User n) 
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

            if (!Database.addUser(fields1, uname))
                U.log("***** database returns false on attempt to store user " + uname);
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
    }
    
    User(Record r)
    {
        username = r.get("username");
        email = r.get("email");
        password = r.get("password");
        language = r.get("language");
        picurl = r.get("picurl");
        try
        {
            lastActivityTime = Long.parseLong(r.get("lastActivityTime"));
        }
        catch(Exception exc)
        {
            lastActivityTime = 0;
            U.log("lastActivityTime set to 0");
        }  
    }
    
    User(String u, String e, String p, String l, String picurl, String t) 
    {
        username = u;
        email = e;
        password = p;
        language = l;
        picurl = picurl;
        try
        {
            lastActivityTime = Long.parseLong(t);
        }
        catch(Exception exc)
        {
            lastActivityTime = 0;
            U.log("lastActivityTime set to 0");
        }  
    }

    public String toString() 
    {
        return  "[" + username + "," + email + "," + password + "," + language + "," + 
                picurl + "," + lastActivityTime + "," + (lastMessage == null ? "no last message" : lastMessage.message) + "]";
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
    /*
    String userAnnounceString(boolean islocaluser, boolean isremoteuser) 
    {
         if (false) 
                    U.log(     

                    "[" +                  
                 
                        username                                                                    + "," + 
                        language                                                                    + "," + 
                        (lastMessage == null ? "no last message" : lastMessage.message)             + "," + 
                        (lastMessage == null ? "no from" : lastMessage.fromUserName)                + "," +
                        "isremote=" + isremoteuser                                                  + "," + 
                        "islocal=" + islocaluser                                                    + "," +
                        "picurl=" + picurl                                                          + "," + 
                 
                    "]")
                 
           
                 ;
         
        return  picurl +                                                            WSServer.separator +
                username +                                                          WSServer.separator +
                lastActivityTime +                                                  WSServer.separator +
                language +                                                          WSServer.separator +
                (isremoteuser ? "true" : "false") +                                 WSServer.separator + 
                (islocaluser ? "true" : "false") +                                  WSServer.separator +
                ((lastMessage != null) ? lastMessage.message : "") +                WSServer.separator +
                ((lastMessage != null) ? lastMessage.translation : "") +            WSServer.separator +
                ((lastMessage != null) ? lastMessage.mid : "") +                    WSServer.separator +
                ((lastMessage != null) ? lastMessage.status : "") +                 WSServer.separator +
                ((lastMessage != null) ? lastMessage.fromUserName : "") +           WSServer.separator +
                email +                                                             WSServer.separator
                ;
    }
    */
    static User findUserByToken(String token) 
    {
        if (U.invalid(token))
        {
            U.sendError("***** invalid token " + token);
            return null;
        }
        
        //U.log("find user by token");
        
        String[] fields = {"token", token};
        ArrayList<Record> results = Database.getTokens(fields);

        if (results != null && results.size() == 1)
        {
            String username = (String) results.get(0).get("username");
            return findUserByUsername(username);
        }
        else
            return null;
    }

    static User findUserByUsername(String username) 
    {
        if (username == null)
        {
            U.log("*** trying to find null username");
            return null;
        }
        
        //U.log("find user by username");
        
        String[] fields = {"username", username.toLowerCase()};
        ArrayList<Record> results = Database.getUsers(fields);
        
        if (results != null && results.size() > 0)
            return  new User(results.get(0));
        else
            return null;
    }

    static User findUserByEmail(String email) 
    {
        if (email == null)
        {
            U.log("*** trying to find null email");
            return null;
        }
        
        //U.log("find user by email");
        
        String[] fields = {"email", email.toLowerCase()};
        ArrayList<Record> results = Database.getUsers(fields);

        if (results != null && results.size() == 1)
            return new User(results.get(0));
        else
            return null;
    }

    static User findUserByUsernameOrEmail(String id) 
    {
        if (id == null)
        {
            U.log("*** trying to find null username");
            return null;
        }
        
        User u = findUserByUsername(id);
        
        if (u == null) 
            u = findUserByEmail(id);
        
        return u;
    }
}
