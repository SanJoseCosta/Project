
package com.worldchat.test;
/*
import com.mongodb.*;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.WriteResult;

*/

import com.worldchat.U;

class Test extends Thread
{
        public static void main(String[] a)
        {
            Test[] tests = new Test[60];
            
            for (int i = 0; i < 60; ++i)
            {
                tests[i] = new Test();
                tests[i].start();
            }
        }
        
        static long total = 0;
        static long start = System.currentTimeMillis();
        
        static synchronized long itotal()
        {
            return total++;
        }
        
        public void run()
        {
            long last = System.currentTimeMillis();
            while (true)
            {
                try
                {
                    String r = U.getPageDirect("https://malt.chat/base.html");
                    U.log((itotal() * 1000)/(System.currentTimeMillis() - start + 1));
                    last = System.currentTimeMillis();
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
                U.pause(10);
            }
        }
        
        
        
        
        /*
	public static void testMongo(String[] a)
	{
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		DB database = mongoClient.getDB("myMongoDb");
		
		Logger mongoLogger = Logger.getLogger("com.mongodb.driver"); 
		mongoLogger.setLevel(Level.SEVERE);
		//((LoggerContext) LoggerFactory.getILoggerFactory()).getLogger("org.mongodb.driver").setLevel(Level.ERROR);

		//database.setLogLevel(0);

		mongoClient.getDatabaseNames().forEach(name -> 
		{
    		System.out.println(name);
		});
		database.createCollection("customers", null);
		database.getCollectionNames().forEach(System.out::println);


		DBCollection collection = database.getCollection("customers");
		

		for (int i = 0; i < 0; ++i)
		{
			BasicDBObject document = new BasicDBObject();
			String n = "R" + (int)(Math.random() * 1000);
			System.out.println(n);
			document.put("name", n);
			document.put("company", "Baeldung");
			collection.insert(document);
		}

		System.out.println("complete inserts");

		if (false)
		{
    	DBCursor cursor1 = collection.find();
    	int k = 0;
    	while(cursor1.hasNext()) System.out.println(k++ + ": " + cursor1.next());
    	}

	    System.out.println("find test");

	    long t = System.currentTimeMillis();

	    for (int i = 0; i < 1000; i = i + 50)
	    {
			BasicDBObject searchQuery = new BasicDBObject();
			searchQuery.put("name", "R" + i);
			DBCursor cursor = collection.find(searchQuery);

			System.out.println(i + ":" + (System.currentTimeMillis() - t));
			t = System.currentTimeMillis();
		}
		
	}
        */
}