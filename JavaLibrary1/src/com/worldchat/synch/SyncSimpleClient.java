package com.worldchat.synch;

import org.java_websocket.handshake.ServerHandshake;
import java.net.URI;

import java.nio.ByteBuffer;
import org.java_websocket.client.WebSocketClient;

public class SyncSimpleClient extends WebSocketClient {

    String directory;
    FileWatcher fileWatcher;
    static int NumberOfThreads = 10;
    
    public SyncSimpleClient(URI serverURI, String d) {
        super(serverURI);
        directory = d;
    }
    
    static long start = System.currentTimeMillis();

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        System.out.println("new connection opened");
        
        if (fileWatcher != null)
            fileWatcher.stop = true;
        
        fileWatcher = new FileWatcher(directory, this);
        fileWatcher.start();
    }

    @Override
    public void onClose(int code, String reason, boolean remote) 
    {
        System.out.println("onclose: " + reason);
        System.out.println("*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n");
        System.exit(0);
    }

    @Override
    public void onMessage(String message) 
    {
        if (fileWatcher != null)
            fileWatcher.decWaitingForAcks();
    }

    @Override
    public void onMessage(ByteBuffer message) 
    {
    }

    @Override
    public void onError(Exception e) 
    {
        System.out.println("onerror: " + e.getMessage());
        System.out.println("*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n*****\n");
        System.exit(0);
    }
}
