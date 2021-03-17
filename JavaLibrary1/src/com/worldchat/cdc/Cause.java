package com.worldchat.cdc;

import java.io.PrintStream;
import java.util.*;
import com.worldchat.*;

import java.io.*;

public class Cause
{
	public static void main(String[] a)
	{
            new Cause();
	}
	
	static String dir = "/Users/matt/Dropbox/WebProjects/cv19/";
        
        class Line
        {
            String state;
            int season;
            int week;
            
            String[] data;
            
            Line(String s, String se, String w, String[] r)
            {
                state = s;
                data = r;
                season = new Integer(se).intValue();
                week = new Integer(w).intValue();
                if (season < 2000 || season > 2020 ||  week < 0 || week > 53)
                {
                    U.log(season + "," + week);
                }
                   
            }
        }
	
        Cause()
        {
            ArrayList<String[]> data = null;
            ArrayList<Line> all = new ArrayList<Line>();
            Hashtable h = new Hashtable();
            
            Hashtable states = new Hashtable();
            Hashtable seasons = new Hashtable();
            Hashtable weeks = new Hashtable();
		
            try 
            {
                    data = getData(dir + "cdc.csv");
            } 
            catch (Exception e) 
            {
                    e.printStackTrace();
            }
            
            String[] cols = data.get(0);
            
            for (int i = 1; i < data.size(); ++i)
            {
                String[] r = data.get(i);
                all.add(new Line(r[0], r[1], r[2], r));
                
                String key = r[0] + r[1] + "" + r[2];
                
                if (h.get(key) != null)
                {
                    U.log(key);
                }
                
                h.put(key, r);
                
                states.put(r[0], r[0]);
                seasons.put(r[1], r[1]);
                weeks.put(r[2], r[2]);
            }
            
            U.log(h.size());
            
            //dump(states);
            //dump(seasons);
            //dump(weeks);
            
            try 
            {
                String state = "New York";
                PrintStream n = new PrintStream(new FileOutputStream(dir + state + ".csv"));
                U.log("All Cause,Natural Cause,Septicemia,Malignant neoplasms ,Diabetes mellitus,Alzheimer disease,Influenza and pneumonia,Chronic lower respiratory diseases,Other respiratory ,Nephritis,Other,Heart,Cerebrovascular,COVID-19 Multiple Cause,COVID-19 Underlying Cause of Death,");
                n.println("All Cause,Natural Cause,Septicemia,Malignant neoplasms ,Diabetes mellitus,Alzheimer disease,Influenza and pneumonia,Chronic lower respiratory diseases,Other respiratory ,Nephritis,Other,Heart,Cerebrovascular,COVID-19 Multiple Cause,COVID-19 Underlying Cause of Death,");
                for (int i = 2014; i <= 2020; ++i)
                    for (int j = 1; j <= 52; ++j)
                    {
                        String key = state + "" + i + "" + j;
                        String[] r = (String[]) h.get(key);
                        
                        if (r != null)
                        {
                            U.log(dumpArray(r));
                            n.println(dumpArray(r));
                        }
                    }
                n.close();
            } 
            catch (Exception e) 
            {
                    e.printStackTrace();
            }
            
        }
        
        String dumpArray(String[] a)
        {
            String s = "";
            for (int i = 4; i < a.length; ++i) s += a[i] + ",";
            return s;
        }
        
        void dump(Hashtable h)
        {
            Object[] x = h.keySet().toArray();
            for (int i = 0; i < x.length; ++i) U.log(i + "," + x[i]);
        }
        
        public static ArrayList<String[]> getData(String file) throws Exception
	{
		if (!new File(file).exists())
		{
			U.log("File " + file + " does not exist");
			return null;
		}
		
		ArrayList<String[]> r = new ArrayList<String[]>();
		LineNumberReader in = null;
		
		try
		{
			in = new LineNumberReader(new InputStreamReader(new FileInputStream(file), "UTF8"));

			while (true)
			{
				String s = in.readLine();				
				if (s == null)
					break;
				String[] fields = splitFields(s, ",");
				r.add(fields);
				//U.log(s);
			}
		
			in.close();
		}		
		catch (Exception e)
		{
			throw new Exception(e);
		}
		finally
		{
			try 
			{
				if (in != null)
					in.close();
			} 
			catch (IOException e) 
			{
				throw new Exception(e);
			}
		}
		
		//U.log("return " + r);
		return r;
	}
	
	
	static String[] field = new String[100000];
	
	public static String[] splitFields(String s, String sep)
	{
		int n = 0;
		int start = 0;
		
		// remove commas between " and the "
		
		boolean between = false;
		String r = "";
		
		for (int i = 0; i < s.length(); ++i)
		{
			if (s.charAt(i) == '\"')
				between = !between;
			else if (!between || s.charAt(i) != ',')
				r += s.charAt(i);
		}
		
		s = r;
		
		while (true)
		{
			int k0 = s.indexOf(sep, start);
			
			if (k0 < 0)
				field[n] = s.substring(start).trim();
			else
				field[n] = s.substring(start, k0).trim();
			
			n++;
			start = k0 + 1;
			
			if (k0 < 0)
				break;
		}
				
		String[] f = new String[n];
		
		for (int i = 0; i < n; ++i)
			f[i] = field[i];
		
		return f;
	}
}