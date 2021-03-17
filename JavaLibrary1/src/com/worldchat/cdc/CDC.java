
package com.worldchat.cdc;

import java.io.PrintStream;
import java.util.ArrayList;
import com.worldchat.*;

import java.io.*;
///
public class CDC 
{
	public static void main(String[] a)
	{
            new CDC();
	}
	
	static String dir = "/Users/matt/Desktop/WebProjects/cv19/";
        
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
	
        CDC()
        {
            ArrayList<String[]> data = null;
            ArrayList<Line> all = new ArrayList<Line>();
		
            try 
            {
                    data = getData(dir + "cdc.csv");
            } catch (Exception e) 
            {
                    e.printStackTrace();
            }
            
            for (int i = 1; i < data.size(); ++i)
            {
                String[] r = data.get(i);
                all.add(new Line(r[0], r[1], r[2], r));
                
            }
        }
        
	static void CDC1() //throws Exception
	{
		ArrayList<String[]> data = null;
		
		try 
                {
			data = getData(dir + "cdc.csv");
		} catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		//U.log("start");
		
		ArrayList<ArrayList<String[]>> states = new ArrayList<ArrayList<String[]>>();
		
		ArrayList<String[]> ny = null;
		ArrayList<String[]> nyc = null;
		
		for (int i = 1; i < data.size(); ++i)
		{
			String[] r = (String[]) data.get(i);
			String name = r[1];
                        
                        //for (int j = 0; j < r.length; ++ j) U.log(j + " " + r[j]);

			ArrayList<String[]> state = null;
			
			for (int j = 0; j < states.size(); ++j) 
			{
				ArrayList<String[]> s = states.get(j);
				if (s.get(0)[1].equals(name)) 
				{ 
					state = s; 
					break; 
				} 
			}
				
			if (state == null) 
			{
				state = new ArrayList<String[]>(); 
				states.add(state);
				
				if (name.equals("New York City"))
					nyc = state;
				else if (name.equals("New York"))
					ny = state;
			}
			
			state.add(r);
		}
		
		for (int i = 0; i < ny.size(); ++i)
		{
			String[] nystr = ny.get(i);
			String[] nycstr = nyc.get(i);
			
			nystr[8] = (toInt(nystr[8]) + toInt(nycstr[8])) + "";
			
			//U.log(show(nystr));
			//U.log(show(nycstr));
		}
		
		ArrayList<State> nstates = new ArrayList<State>();
                
                U.log("states " + states.size());
		
		for (int i = 0; i < states.size(); ++i)
		{
			ArrayList<String[]> statearray = states.get(i);
			String name = ((String[])statearray.get(0))[1];
			
			U.log(name + " " + statearray.size());
			
			State state = new State(name);
			nstates.add(state);
			
			for (int j = 0; j < statearray.size(); ++j)
			{
				String[] record = statearray.get(j);
				String sname = record[3];
				
				Season season = null;
				for (int k = 0; k < state.seasons.size(); ++k) 
				{
					Season s = state.seasons.get(k);
					if (s.name.equals(sname)) 
					{ 
						season = s;
						break; 
					} 
				}
					
				if (season == null) 
				{
					season = new Season(sname);
					state.seasons.add(season); 
				}
				
				int in, f, p = -1;
				
				try
				{
					in = toInt(record[4]);
				}
				catch (Exception e)
				{
					in = 0;
					f = 0;
					show(record);
				}
				
				try
				{
					f = toInt(record[8]);
				}
				catch (Exception e)
				{
					f = -1;
                                        show(record);
				}
                                float percent = 0;
                                float influenza = 0;
                                float pneumonia = 0;
				try
				{
					percent = toFloat(record[5]);
                                        influenza = toFloat(record[6]);
                                        pneumonia = toFloat(record[7]);
				}
				catch (Exception e)
				{
					show(record);
				}
				
					
				if (record[9].equals("> 100%"))
				{
					p = 100;
					Week w = new Week(in, f, 100, percent, influenza, pneumonia);
					season.weeks.add(w);
				}
				else
				{
					try
					{
						p = toInt(record[9].substring(0, 2));
					}
					catch (Exception e)
					{
						p = -1;
					}
					
					//U.log(season.name + " " + in + " " + p + " " + f + percent + " " + influenza+ " " + pneumonia);
					
					Week w = new Week(in, f, p, percent, influenza, pneumonia);
					season.weeks.add(w);
				}		
					
				//U.log(name + " " + sname + " " + in  + " " + p + " " + f);
			}
		}
                
                U.log("states " + nstates.size());
                
                U.log("output");

		try
		{
			out = new PrintStream(dir + "cdc.txt");
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}

                for (int i = 0; i < nstates.size(); ++i)
			graph(nstates.get(i), i);
		
                U.log("close");
		out.close();
	}
	
	PrintStream out;
	
	void show(String[] a)
	{
		String s = "";
		for (int i = 0; i < a.length - 1; ++i) s += a[i] + ", ";
		U.log(a[8] + "===" + s);
                
	}
	
	void graph(State state, int n)
	{
		int top = -1;
		
		int[] mins = new int[53];
		int[] maxs = new int[53];
		
		for (int w = 0; w < 53; ++w)
		{
			mins[w] = 9999999;
			maxs[w] = -999999;
			
			for (int i = 0; i < state.seasons.size() - 1; ++i)
			{
				Season season = state.seasons.get(i);
				
				if (w < season.weeks.size())
				{
					Week wk = season.weeks.get(w);
					
					if (wk.fatalities > maxs[w]) maxs[w] = wk.fatalities;
					if (wk.fatalities < mins[w]) mins[w] = wk.fatalities;
					
					if (wk.fatalities > top) top = wk.fatalities;
				}
			}
		}

		try 
		{
                    
                    U.log("states " + state.seasons.size());
			for (int i = 0; i < state.seasons.size() - 1;++i)
			{
				//Color c = colors[i];
				Season season = state.seasons.get(i);
				
				for (int w = 0; w < 53; ++w)
				{
					if (w < season.weeks.size())
					{
						String s = plotpt(	state.name, top, season.name, w, mins[w], maxs[w], 
								season.weeks.get(w).fatalities, season.weeks.get(w).pc, i,
								season.weeks.get(w).percent, season.weeks.get(w).influenza, season.weeks.get(w).pneumonia);
						out.println(s);
                                                //U.log(s);
					}
				}
			}
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}	
	}
	
	String plotpt(String name, int t, String sname, int week, int min, int max, int f, int pc, int c, float t1, float t2, float t3)
	{
		String[] data = new String[12];
		data[0] = "" + name;
		data[1] = "" + t;
		data[2] = "" + sname;
		data[3] = "" + week;
		data[4] = "" + min;
		data[5] = "" + max;
		data[6] = "" + f;
		data[7] = "" + pc;
		data[8] = "" + c;
		data[9] = "" + t1;
		data[10] = "" + t2;
		data[11] = "" + t3;
		String s = "";
		for (int i = 0; i < data.length; ++i)
		{
			if (i > 0) s += ",";
			s += data[i];
		}
		return s;
	}
	
	void plotbg(int[] mins, int[] maxs)
	{
		
	}
	
	class Week
	{
		Week(int i, int f, int p, float t1, float t2, float t3)
		{
			index = i;
			fatalities = f;
			pc = p;
			percent = t1;
			influenza = t2;
			pneumonia = t3;
		}
		public String toString()
		{
			return index + " " + fatalities + " " + pc;
		}
		int index;
		int fatalities;
		int pc;
		float percent;
		float influenza;
		float pneumonia;
	}
	
	class Season
	{
		Season(String s)
		{
			name = s;
		}
		String name;
		ArrayList<Week> weeks = new ArrayList<Week>();
	}
	
	class State
	{
		State(String n)
		{
			name = n;
		}
		String name;
		ArrayList<Season> seasons = new ArrayList<Season>();
	}
        
        
	public static int toInt(String a)
	{
		return new Integer(a).intValue();
	}
	
	public static float toFloat(String a)
	{
		return new Float(a).floatValue();
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
