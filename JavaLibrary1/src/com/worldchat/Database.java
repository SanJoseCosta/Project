
package com.worldchat;

import com.mongodb.*;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;
import java.util.logging.*;
import java.util.ArrayList;

public class Database 
{
    static String Messages = "Messages";
    static String Users = "Users";
    static String Tokens = "Tokens";
    
    static MongoClient mongoClient;
    static DB database;    
    
    static
    {
        U.log("database startup");
        
        mongoClient = new MongoClient("localhost", 27017);
        database = mongoClient.getDB("malt10");
        
        Logger mongoLogger = Logger.getLogger("com.mongodb.driver"); 
        mongoLogger.setLevel(Level.SEVERE);

        mongoClient.getDatabaseNames().forEach(name -> 
        {
            U.log("database: " + name);
        });

        database.getCollectionNames().forEach(name -> 
        {
            U.log("collection: " + name);
        });
        
        String[] fields1 = {"username", Main.SupportUser};
        
        if (getUsers(fields1).size() == 0)
        {
            String[] fields2 = 
            {
                "username", "support", 
                "email", "support@gmail.com", 
                "password", "plexus11", 
                "language", "en", 
                "picurl", "false", 
                "lastActivityTime", "" + System.currentTimeMillis()
            };
            Database.addUser(fields2, "support");
        }
        
        U.log("database startup complete =======================================");
        
        print();
    }
    
    static DBCollection getCollection(String tablename)
    {
        DBCollection collection = database.getCollection(tablename);
        if (collection == null)
        {
            U.log("create " + tablename);

            database.createCollection(tablename, null);
            collection = database.getCollection(tablename);
        }
        return collection;
    }
    
    static BasicDBObject makeDocument(String[] fields)
    {
       BasicDBObject document = new BasicDBObject();
           
        for (int i = 0; i < fields.length; i = i + 2)
        document.put(fields[i], fields[i + 1]);
        
        return document;
    }

    private static boolean add(String tablename, String[] fields)
    {
        try 
        {
            //U.log("Add record to table " + tablename);

            DBCollection collection = getCollection(tablename);
        
            BasicDBObject document = makeDocument(fields);
            
            collection.insert(document);
        }
        catch (Exception e) 
        {
            U.log(e.getMessage());
            return false;
        }

        return true;
    }
    
    static boolean addMessage(String[] fields, String mid)
    {
        /////////////////////////
        // assuming id is index 3: { "conversation", "x-y", "mid", "1661626712881819172", ... }
        /////////////////////////
        
        String[] f = { "mid", mid};
        ArrayList<Record> result = getMessages(f);
        
        if (result.size() > 0)
        {
            delete(Messages, f);
        }
       
        return add(Messages, fields);
    }
    static boolean addUser(String[] fields, String username)
    {
        String[] f = { "username", username};
        ArrayList<Record> result = getUsers(f);
        
        //U.log("add user " + username + ", finding " + result.size() + " matches");
        
        if (result.size() > 0)
        {
            delete(Users, f);
        }
        
        return add(Users, fields);
    }
    static boolean addToken(String[] fields)
    {
        return add(Tokens, fields);
    }
    
    static ArrayList<Record> getMessages(String[] fields)
    {
        return get(Messages, fields);
    }
    static ArrayList<Record> getUsers(String[] fields)
    {
        return get(Users, fields);
    }
    static ArrayList<Record> getTokens(String[] fields)
    {
        return get(Tokens, fields);
    }
    
    private static WriteResult delete(String tablename, String[] fields)
    {
        //U.log("delete from " +  tablename);
        
        DBCollection collection = getCollection(tablename);
        BasicDBObject query = makeDocument(fields);

        WriteResult result = collection.remove(query);
        
        //U.log("delete  result " + result);
        
        return result;
    }
    
    private static ArrayList<Record> get(String tablename, String[] fields)
    {
        ArrayList<Record> results = new ArrayList<Record>();
        
        try 
        {
            DBCollection collection = getCollection(tablename);
            BasicDBObject query = makeDocument(fields);
            
            DBCursor cursor = collection.find(query);

            while (cursor.hasNext())
            {
                Object o = cursor.next();
                Record r = new Record((DBObject) o, tablename);
                results.add(r);
            }
            
            //U.log(  "----- Mongo get: " + tablename + ", " + q + ", results: " + results.size());

            return results;
        }
        catch (Exception e) 
        {
            e.printStackTrace();
            return null;
        }
    }

    static ArrayList<User> allUsers()
    {
        DBCollection collection;
        DBCursor cursor1;
        int k;

        ArrayList<User> users = new ArrayList<User>();

        collection = database.getCollection(Users);
        cursor1 = collection.find();
        k = 0;
        
        while(cursor1.hasNext()) 
        {
            Record r = new Record((DBObject) cursor1.next(), Users);
            User u = new User(r);
            users.add(u);
        }

        return users;
    }

    static String print()
    {
        DBCollection collection;
        DBCursor cursor1;
        int k;
        
        String status = "";
        
        collection = database.getCollection(Messages);
        cursor1 = collection.find();
        k = 0;
        
        long Day = 24 * 3600;
        
        while(cursor1.hasNext())
        {
            Record r = new Record((DBObject) cursor1.next(), Messages);
            Message m = new Message(r);
            
            int time;
            try
            {
                time = Integer.parseInt(m.mid.substring(0, 10));
            }
            catch(Exception e)
            {
                //U.log("*** invalid time " + m.mid);
                time = -1;
            }
            
            long t = (System.currentTimeMillis() / 1000) - time;
            if (t < Day)
                status += (m + " " + t) + "<br>"; // + " " + time + " " + System.currentTimeMillis());
        }

        status += ("========================"); 
        
        collection = database.getCollection(Users);
        cursor1 = collection.find();
        k = 0;
        
        while(cursor1.hasNext()) 
        {
            Record r = new Record((DBObject) cursor1.next(), Users);
            User u = new User(r);
            long time = u.lastActivityTime();
            
            long t = (System.currentTimeMillis() - time) / 1000;
            if (t < Day)
                status += (u + " " + t) + "<br>";
        }

        status += ("========================"); 
        
        
        ArrayList<Long> z = MessageProcessingThread.messageProcessedTimes;

        int l = 10;
        
        for (int i = 0; i < 3; ++i)
        {
            int count = 0;
            for (int j = 0; j < z.size(); ++j)
                if (z.get(j).longValue() > (System.currentTimeMillis() - (l * 1000)))
                    count++;
            status += "<br>messages in last " + l + " seconds: " + count + "<br>";
            l = l * 10;
        }
        
        return status;
    }
}
