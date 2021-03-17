package com.worldchat;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import javax.net.ssl.SSLContext;
import org.java_websocket.server.DefaultSSLWebSocketServerFactory;

public class WSServer extends WebSocketServer 
{
    static String separator = "-a7e3i-";
    
    MessageProcessingThread processor;

    static WSServer singleton;

    public WSServer(InetSocketAddress address) 
    {
        super(address);
        if (Main.Secure)
        {
            try
            {
                SSLContext s = SecureServer.getSslContext();
                setWebSocketFactory(new DefaultSSLWebSocketServerFactory(s));
            }
            catch (Exception e)
            {
                U.log("Error starting simple server");
                e.printStackTrace();
            }
        }
        singleton = this;
        
        processor = new MessageProcessingThread();
        processor.start();
        
        start();
    }

    @Override
    public void onMessage(WebSocket conn, String message) 
    {
        processor.addJob(new Job(conn, message));
    }

    void closeConnection(WebSocket socket) 
    {
        Connection c = Connection.findConnection(socket);

        if (c != null) 
        {
            Connection.stopConnection(socket);
            Connection.removeConnection(c);
        } 
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) 
    {
        U.log("closed " + conn.getRemoteSocketAddress() + " with exit code " + code + " additional info: " + reason);
        closeConnection(conn);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) 
    {
        U.log("***** an error occurred on connection " + ":" + ex);
        ex.printStackTrace();

        if (conn.isOpen())
            closeConnection(conn);
    }

    //@Override
    public void onStart() 
    {
        U.log("WS server started successfully " + this.getAddress());
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) 
    {
        U.log("new connection to " + conn.getRemoteSocketAddress());
    }

    static void stopserver() 
    {
        U.log("stop server");
        U.log("connections stopped");

        WebServer.stop();

        try {
            if (singleton != null) {
                singleton.stop();
            }
        } catch (Exception ee) {
            ee.printStackTrace();
        }

        System.exit(0);
    }
}
