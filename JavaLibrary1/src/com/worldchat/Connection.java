package com.worldchat;

import java.util.ArrayList;
import org.java_websocket.WebSocket;

public class Connection 
{
    WebSocket socket;
    String username;
    Conversation conversation;

    private static ArrayList<Connection> connections = new ArrayList<Connection>();
    
    Connection(WebSocket s, String u, Conversation c) 
    {
        username = u;
        conversation = c;
        socket = s;
        
        if (username != null)
        {
            User a = User.findUserByUsername(username);
            if (a != null) a.lastActivityTime(System.currentTimeMillis());
        }
    }
    
    static void setLastActivityTime(WebSocket socket)
    {
        Connection c = findConnection(socket);
        if (c != null && c.username != null)
        {
            User.findUserByUsername(c.username).lastActivityTime(System.currentTimeMillis());
        }
    }
    
    static Connection findConnection(User u) 
    {
        for (int i = 0; i < connections.size(); ++i) 
        {
            if (connections.get(i).username.equals(u.username()))
                return connections.get(i);
        }
        return null;
    }

    static Connection findConnection(User u, Conversation c) 
    {
        for (int i = 0; i < connections.size(); ++i) 
        {
            if (connections.get(i).username.equals(u.username()) && 
                hasConversationName(connections.get(i), c.conversationName()))
                return connections.get(i);
        }
        return null;
    }
    
    static boolean hasConversationName(Connection connection, String name)
    {
        Conversation conversation = connection.conversation;
        if (conversation == null) return false;
        return conversation.conversationName().equals(name);
    }

    static Connection findConnection(WebSocket s) 
    {
        for (int i = 0; i < connections.size(); ++i) 
            if (connections.get(i).socket == s) 
                return connections.get(i);
        
        return null;
    }

    static Connection findOtherConnection(Connection connection) 
    {
        for (int i = 0; i < connections.size(); ++i) 
        {
            Connection c = connections.get(i);
            
            if (c != connection)
                if (c.conversation != null && connection.conversation != null)
                    if (c.conversation.conversationName().equals(connection.conversation.conversationName())) 
                        if (!connection.username.equals(c.username)) 
                            return c;
        }
        return null;
    }

    static void listx() 
    {
        U.log("all connections:");
        for (int i = 0; i < connections.size(); ++i) 
        {
            Connection c = connections.get(i);
            U.log(c);
        }
    }

    static void stopall() 
    {
        for (int i = 0; i < connections.size(); ++i) {
            Connection c = connections.get(i);
            c.socket.close(0);
        }
    }
    
    static void addConnection(Connection c) 
    {
        connections.add(c);
    }

    static void removeConnection(Connection c) 
    {
        for (int i = 0; i < connections.size(); ++i) 
        {
            if (connections.get(i) == c) {
                connections.remove(i);
                break;
            }
        }
    }

    static void removeConnection(WebSocket s) 
    {
        for (int i = 0; i < connections.size(); ++i) 
        {
            if (connections.get(i).socket == s) 
            {
                connections.remove(i);
                break;
            }
        }
    }
    
    static void stopConnection(WebSocket socket) 
    {
        removeConnection(socket);
    }

    public String toString() 
    {
        return "to " + username + " in conversation " + conversation;
    }
}
