package com.worldchat.synch;

import java.util.*;
import java.io.*;
import java.net.InetSocketAddress;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import java.net.URI; 

public class SuperSimpleSynchronizer extends WebSocketServer {

    static String separator = "~aaa~";
    static String host = "0.0.0.0";
    static int port = 8899;

    static String dir;
    static boolean server;
    static String ip;

    public SuperSimpleSynchronizer(InetSocketAddress address, String d) {
        super(address);
        dir = d;
        run();
    }
    
    @Override
    public void onMessage(WebSocket conn, String message) 
    {
            // decode and store
            if (message.indexOf(separator) > 0) {
                // decode and store

                String[] parts = message.split(separator);
                
                try {
                    if (parts.length < 2)
                    {
                        System.out.println("Not saving " + dir + parts[0]);
                    }
                    else
                    {
                        byte[] b = Base64.getDecoder().decode(parts[1]);

                        System.out.println("saved");
                        new File(dir + parts[0]).getParentFile().mkdirs();

                        FileOutputStream out = new FileOutputStream(dir + parts[0]);
                        out.write(b);
                        out.close();
                    }

                    conn.send("ok");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                System.out.println("no separator");
            }
    }

    @Override
    public void onClose(WebSocket conn, int code, String reason, boolean remote) 
    {
        System.out.println("closed " + conn.getRemoteSocketAddress() + " with exit code " + code + " additional info: " + reason);
    }

    @Override
    public void onError(WebSocket conn, Exception ex) {
        System.out.println("***** an error occurred on connection ");
        ex.printStackTrace();
    }

    //@Override
    public void onStart() {
        System.out.println("server started successfully on " + host);
    }

    @Override
    public void onOpen(WebSocket conn, ClientHandshake handshake) {
        System.out.println("new connection to " + conn.getRemoteSocketAddress());
    }

    // args 
    //	flag
    //		0 = sender/client
    //		1 = reciever/server
    //  dir - directory to read from (client) or to write to (server)
    //  ipaddress of server (if client)
    public static void main(String[] args) { 
        
        if (args.length == 0)
        {
            port = 3399;
            server = false;
            dir = "/Users/matt/Dropbox/Rainbow/";
            ip = "54.84.69.177:" + port;
            
        }
        else
        {
            server = !(new Integer(args[0]).intValue() == 0);
            dir = args[1];
            ip = args[2];
        }
        
      
        System.out.println("START!! as " + (server ? "server" : "client") + " using directory " + dir + " ip " + ip);

        if (server) {
            SuperSimpleSynchronizer s = null;
            
            // clear out the / delete the target directory and remake it 
            
            System.out.println("delete result: " + new File("~/put/").delete());
            
            System.out.println("mkdir result: " + new File("~/put/").mkdir());

            try {
                System.out.println("start socket server on " + new InetSocketAddress(host, port));
                s = new SuperSimpleSynchronizer(new InetSocketAddress(host, port), dir);
            } catch (Exception e) {
                stopserver(s);
            }
        } else {
            startclient();
        }
    }

    static SyncSimpleClient dostartclient() {
        SyncSimpleClient client = null;
        try {
            URI uri = new URI("ws://" + ip + "/");
            System.out.println("start client and connect to " + uri);
            client = new SyncSimpleClient(uri, dir);

            client.connect();
            return client;
        } catch (Exception e) {
            e.printStackTrace();
            client.close();
            return null;
        }
    }

    static void startclient() 
    {
        SyncSimpleClient client = dostartclient();
        pause(5000);
        //if (client.isOpen()) 
        //    System.out.println("Client started successfully ...");
    }
    
    public static void pause(int n) {
        try {
            Thread.sleep(n);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static void stopserver(SuperSimpleSynchronizer s) {
        System.out.println("stop server");

        try {
            s.stop();
        } catch (Exception ee) {
            ee.printStackTrace();
        }

        try {
            s.stop();
        } catch (Exception e) {

        }

        System.exit(0);
    }
}
