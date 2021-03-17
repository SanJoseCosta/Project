package com.worldchat;

import org.java_websocket.WebSocket;

public class Job 
{
    WebSocket conn;
    String message;

    Job(WebSocket w, String m)
    {
        conn = w;
        message = m;
    }

    public String toString()
    {
        return conn + " " + message;
    }
}
