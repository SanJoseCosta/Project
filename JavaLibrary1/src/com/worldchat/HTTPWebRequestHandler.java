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
            //U.log("HTTPWebRequestHandler redirecting " + t.getRequestURI());
            
            t.getResponseHeaders().add("Location", "https://" + Main.ProductName + ".chat" + t.getRequestURI()) ;
            t.sendResponseHeaders(302, 0);
            
            OutputStream os = t.getResponseBody();
            os.write("---".getBytes());
            os.close();
        }
        catch (IOException e)
        {
            U.log("IO error on sending redirect");
        }
    }
}
