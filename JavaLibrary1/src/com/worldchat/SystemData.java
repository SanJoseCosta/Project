
package com.worldchat;

import java.io.*;
import java.util.ArrayList;

public class SystemData
{
    public static void main(String a[])
    {
        System.out.println(looping());
    }
    static String cmdTop = "ps -eo pid,ppid,command,%mem,%cpu ";
    // returns user cpu usage 
    public static boolean looping()
    {
        double cpu = -1;
        try
        {
            // start up the command in child process
            String cmd = cmdTop;
            Process child = Runtime.getRuntime().exec(cmd);

            InputStream lsOut = child.getInputStream();
            InputStreamReader r = new InputStreamReader(lsOut);
            BufferedReader in = new BufferedReader(r);

            String line = null;
            float max = -1;
            
            int k = 0;

            ArrayList<String> lines = new ArrayList<String>();

            while (true)
            {
                if (k++ > 1000)
                    U.log("loop counter " + k, null);
                
                line = in.readLine();
                if (line == null) break;
               
                String n = line.substring(45, 49);
                
                float f = 0;
                
                try
                {
                    f = Float.parseFloat(n);
                }
                catch (Exception e)
                {
                    
                }
                
                if (f > max)
                    max = f;

                if (f > 40)
                {
                    lines.add(line);
                }
            }

            if (max > 40)
            {
                for (int i = 0; i < lines.size(); ++i)
                {
                    U.log(lines.get(i), null);
                }
                
                return true;
            }
        }
        catch (Exception e)
        { 
            Log.stackTrace(e);
        }
        return false;
    }
}