package com.worldchat;

import java.net.InetSocketAddress;
import java.io.*;

public class Main 
{
    // one cpu on the server handles about 200 http requests for static files per second
    // todo: same calculation with ws connection
    
    static String ProductName = "comprendo";

    static String Home;
    static String RequestLog;
    static String InfoLog;
    static String Site;
    static String Login = "https://" + ProductName + ".chat/base.html?a=create";
    static String host = "0.0.0.0";
    static int port = 8887;
    static boolean Secure = true;
    static String SupportUser = "support";
    
    public static void main(String[] args) 
    {
        if (new File("/home/ec2-user/").exists())
        {
            Site = "/home/ec2-user/put/site";
            Home = "/home/ec2-user/put/";
        }
        else
        {
            Site = "/Users/matt/Dropbox/Rainbow/site";
            Home = "/Users/matt/Dropbox/Rainbow/";
        }
        
        RequestLog = Home + "/logs/r";
        InfoLog = Home + "/logs/i";
        
        U.log("STARTUP version 1.1");

        new StopDetector().start();
        
        new Database();
        
        while (true)
        {
            try 
            {
                WebServer.startWebServer();
                U.log("Web server started");
                if (Secure)
                {
                    new SecureServer();
                    U.log("Secure server started");
                }
                new WSServer(new InetSocketAddress(host, port));
                break;
            } 
            catch (Exception e) 
            {
                e.printStackTrace();
                
                shutdown();
                U.pause(10000);
                
                U.log("retrying ...");
            }
        }
    }
    
    static void shutdown()
    {
        WSServer.stopserver();
        WebServer.stop();
        SecureServer.stop();
    }
    
    static void stop()
    {
        //User.storeAllUsers();
        shutdown();
        System.exit(0);
    }
}
