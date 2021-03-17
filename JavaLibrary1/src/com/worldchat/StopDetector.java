package com.worldchat;

import java.io.*;

public class StopDetector extends Thread 
{

    static String lightfilered = "/home/ec2-user" + "/red";
    static String lightfilegreen = "/home/ec2-user" + "/green";
    
    public void run() 
    {
        this.setName("stop detector");
        
        int k = 1;
        
        while (true) 
        {
            if (k % 30 == 0)
                if (SystemData.looping())
                    U.log("*********************** warning: program is looping!!!");
            
            k++;
            
            if (new File(lightfilered).exists()) 
            {
                U.log(("stop detector saw red light"));
                new File(lightfilered).renameTo(new File(lightfilegreen));
                Main.stop();
            }
            
            U.pause(1000);
        }
    }
}
