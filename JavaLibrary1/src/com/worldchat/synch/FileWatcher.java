package com.worldchat.synch;

import com.worldchat.U;
import java.util.*;
import java.io.*;

class FileWatcher extends Thread 
{
    boolean stop = false;

    ArrayList<String> files = new ArrayList<String>();
    SyncSimpleClient client;
    String basedir;

    private int waitingForAcks = 0;

    synchronized void incWaitingForAcks() {
        waitingForAcks++;
        System.out.println("waiting for " + waitingForAcks + " acks");
    }

    synchronized void decWaitingForAcks() {
        waitingForAcks--;
        System.out.println("waiting for " + waitingForAcks + " acks");
    }

    FileWatcher(String dir, SyncSimpleClient c) 
    {
        System.out.println("new filewatcher");

        client = c;
        basedir = dir;
    }

    void getFilesTop(String dir) {
        files = new ArrayList<String>();
        getFiles(basedir);
    }

    void getFiles(String dir) 
    {
        //U.log("get files under " + dir);
        String[] list = new File(dir).list();
        for (int i = 0; i < list.length; ++i) {
            String nextdir = dir + list[i] + "/";
            String file = dir + list[i];
            if (new File(nextdir).isDirectory()) {
                getFiles(nextdir);
            } else {
                files.add(file);
            }
        }
    }

    long lastcheck = 0;

    private boolean sendfiles() 
    {
        getFilesTop(basedir);
        long l = lastcheck;
        lastcheck = System.currentTimeMillis();

        ArrayList<String> tosend = new ArrayList<String>();

        for (int i = 0; i < files.size(); ++i) 
        {
            File file = new File(files.get(i));
            long t = file.lastModified();
            
            String[] allTypes = {
                "class",
                "java",
                "js",
                "html",
                "css",
                "woff",
                "woff2",
                "eot",
                "jpg",
                "jpeg",
                "png",
                "svg",
                "ttf"
            };

            if (t > l && matches(files.get(i).toLowerCase(), allTypes))
            {
                tosend.add(files.get(i));
                U.log("add " + files.get(i));
            }
        }

        for (int i = 0; i < tosend.size(); ++i) 
            if (!sendTheFile(tosend.get(i), i)) 
                return false;
        
        return true;
    }
    
    boolean matches(String name, String[] list)
    {
        for (int i = 0; i < list.length; ++i) if (name.endsWith(list[i])) return true;
        return false;
    }

    boolean sendTheFile(String file, int k) 
    {
        byte[] b = getFile(file);
        if (b == null) 
            return true;
        
        String s = Base64.getEncoder().encodeToString(b);
        String f = file.replace(basedir, "");

        s = f + SuperSimpleSynchronizer.separator + s;

        System.out.println("send file " + k);
        
        try {
            client.send(s);
        } catch (Exception e) {
            System.out.println("***** FAILED to send " + file);
            // + " - returning to wait for next cycle ...");
            e.printStackTrace();
            return false;
        }

        incWaitingForAcks();
        return true;
    }

    public void run() 
    {
        int waitloops = 0;

        while (true) 
        {
            U.log(Thread.currentThread().getId() + " periodic check");
            
            if (waitingForAcks > 0) 
            { 
                waitloops++;
                if (waitloops > 1000) 
                {
                    System.out.println("!!! waitloops is now " + waitloops + " possible server error ...");
                }
            } 
            else 
            {
                waitloops = 0;
                boolean r = !sendfiles();
                if (r) break;
            }
            pause(3000);
            if (stop)
            {
                U.log("*** returning from run()");
                return;
            }
        }

        U.log("run returning");
    }
    
    public static void pause(int n) {
        try {
            Thread.sleep(n);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    byte[] getFile(String hr) {
        byte[] rb = null;
        try {
            rb = read(hr);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("cannot read " + hr);
        }
        return rb;
    }

    byte[] read(String file) throws Exception {
        byte[] b = new byte[300000000];
        FileInputStream f = null;
        try {
            f = new FileInputStream(file);
            int r = f.read(b);
            if (f.available() > 0) {
                try {
                    if (f != null) {
                        f.close();
                    }
                } catch (IOException ee) {
                    ee.printStackTrace();
                }
                throw new Exception("***** Overflow of buffer on read in read()");
            }
            f.close();

            if (r < 0) r = 0;
            
            byte[] rb = new byte[r];
            for (int i = 0; i < r; ++i) {
                rb[i] = b[i];
            }

            return rb;
        } catch (IOException e) {
            //e.printStackTrace();
            System.out.println("cannot read " + file);
            try {
                if (f != null) {
                    f.close();
                }
            } catch (IOException ee) {
                ee.printStackTrace();
            }
            return null;
        }
    }
}
