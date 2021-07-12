package com.worldchat;

import java.io.*;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class HTTPWebRequestHandler implements HttpHandler 
{
    @Override
    public void handle(HttpExchange t) 
    {
        try
        {                      
            t.getResponseHeaders().add("Location", "https://" + Main.ProductName + ".chat" + t.getRequestURI()) ;
            t.sendResponseHeaders(302, 0);
            
            OutputStream os = t.getResponseBody();
            os.write("---".getBytes());
            os.close();
        }
        catch (IOException e)
        {
            U.inf("IO error on sending redirect", t);
        }
    }
}
