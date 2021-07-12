package com.worldchat;

import java.util.concurrent.*;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;

// this receives requests to HTTP

public class WebServer 
{ 
    static HttpServer server;

    public static void startWebServer() throws Exception 
    {
        server = HttpServer.create(new InetSocketAddress(80), 0);
        
        if (Main.Secure)
        {
            // if we are in Secure mode,
            // this redirects HTTP requests to HTTPS
            server.createContext("/", new HTTPWebRequestHandler());
        }
        else
        {
            // otherwise it is handled by RequestHandler
            server.createContext("/", new HTTPSWebRequestHandler()); 
        }
        
        ExecutorService executor = Executors.newCachedThreadPool();
        server.setExecutor(executor);

        server.start();
    }

    public static void stop() 
    {
        U.log("http server stopping " + server, null);
        if (server != null) {
            server.stop(0);
        }
    }
}
