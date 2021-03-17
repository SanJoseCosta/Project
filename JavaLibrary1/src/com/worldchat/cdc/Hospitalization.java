
package com.worldchat.cdc;

import java.io.PrintStream;
import java.util.ArrayList;
import com.worldchat.*;

public class Hospitalization 
{
	public static void main(String[] a)
        {
		new Hospitalization();
	}

        static String dir = "/Users/matt/Dropbox/WebProjects/cv19/";

        Hospitalization() //throws Exception
	{
		ArrayList<String[]> data = null;
		
		try 
                {
                    data = CDC.getData(dir + "hsp.csv");
		} 
                catch (Exception e) 
		{
                    e.printStackTrace();
		}
		
                ArrayList states = new ArrayList();
		ArrayList<String[]> recs = new ArrayList<String[]>();
                
                String state = "";
                
                for (int i = 1; i < data.size(); ++i)
                {
                    String[] r = data.get(i);
                    
                    if (r.length < 2)
                    {
                        U.log("*** " + r.length);
                    }
                    else if (!r[1].equals(state))
                    {
                        states.add(recs);
                        //U.log("states: " + states.size());
                        
                        state = r[1];
                        recs = new ArrayList<String[]>();
                        recs.add(r);
                    }
                    else
                    {
                        recs.add(r);
                        if (i == data.size() - 1)
                            states.add(recs);
                    }
                }
                
               
                
                for  (int i = 2; i < states.size(); ++i)
                {
                    ArrayList<String[]> a = (ArrayList<String[]>) states.get(i);
                    String s = "";
                    
                    //String st = a.get(0)[1];
                    
                   
                    
                    boolean start = false;
                    
                    for  (int j = 0; j < a.size(); ++j)
                    {
                        // normalize to 2020-04-01 through 2020-11-21
                        if (a.get(j)[2].startsWith("2020-04-01")) start = true;
                        
                        if (start)
                            s += a.get(j)[3] + ", ";
                        
                        if (a.get(j)[2].startsWith("2020-11-21")) start = false;
                    }
                    
                    System.out.println(a.get(0)[1] + ", " + s);
                }
                
                System.out.println("");
                System.out.println("");
                System.out.println("");   
        }
}
		