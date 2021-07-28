package com.worldchat;

import java.util.*;
import java.io.*;
import java.net.*;
import org.java_websocket.WebSocket;
import com.sun.net.httpserver.HttpExchange;

public class Log
{
	static Hashtable<String, LogEntry> table = new Hashtable<String, LogEntry>();

	public static void setLanguage(HttpExchange h, String l)
	{
		String ip = U.getIpAddress(h);		
		LogEntry e = table.get(ip);
		if (e == null) return;

		e.language = l;
	}

	public static String getLanguage(HttpExchange h)
	{
		String ip = U.getIpAddress(h);		
		LogEntry e = table.get(ip);
		if (e == null) return "en";

		return e.language;
	}

	static boolean isGarbage(HttpExchange h)
	{
		String ip = U.getIpAddress(h);		
		LogEntry e = table.get(ip);

		if (e == null) return false;

		return e.isGarbage();
	}

	static void log(Object msg, Object x)
	{
		if (x == null)
		{
			String s = (String) x;
			System.out.println(s + " " +  msg);
			log("0.0.0.0", msg, null);
		}
		else if (x instanceof HttpExchange)
		{
			String s = U.getIpAddress((HttpExchange) x);
			//System.out.println(s + " " +  msg);
			log(s, msg, (HttpExchange) x);
		}
		else if (x instanceof WebSocket)
		{
			InetSocketAddress i = ((WebSocket) x).getRemoteSocketAddress();
			String s = U.getIpAddress(i);
			//System.out.println(s + " " +  msg);
			log(s, msg, null);
		}
		else if (x instanceof InetSocketAddress)
		{
			String s = U.getIpAddress((InetSocketAddress) x);
			//System.out.println(s + " " +  msg);
			log(s, msg, null);
		}
		else
		{
			System.out.println("************************* unknown obj for inetsocketaddress --- " + msg + " --- "  + x.getClass().getName());
		}
	}

	public static void stackTrace(Exception e) 
    {
        StringWriter s = new StringWriter();
        PrintWriter p = new PrintWriter(s);
        e.printStackTrace(p);

        log(s.toString(), null);
    }

	static void log(String ip, Object msg, HttpExchange x)
	{
		//System.out.println(msg);

		LogEntry e = table.get(ip);

		if (e == null)
		{
			e = new LogEntry();
			e.ip = ip;
			e.time0 = System.currentTimeMillis();
			e.time1 = System.currentTimeMillis();
			e.nrequests = 1;
			table.put(ip, e);
		}
		else
		{
			e.time1 = System.currentTimeMillis();
			e.nrequests++;
		}

		e.addMessage(System.currentTimeMillis(), msg + "");

		if (x != null && e.host == null)
		{
			e.host = x.getRequestHeaders().getFirst("Host");
			e.agent = x.getRequestHeaders().getFirst("User-Agent");
			e.acceptlanguage = x.getRequestHeaders().getFirst("Accept-Language");
			e.location = U.getLocationFromJson(U.getIPLocationData(x));
			e.referer = x.getRequestHeaders().getFirst("Referer");
		}
	}

	static String list()
    {
        Object[] x = table.keySet().toArray();

        if (x == null || x.length == 0)
        	return "empty";

        LogEntry[] y = new LogEntry[x.length];
        for (int i = 0; i < x.length; ++i) y[i] = table.get(x[i]);
       
        Sort.sort(y);

        String s = "";
        for (int i = 0; i < y.length; ++i)
        {
        	LogEntry e = y[i];
        	if (e.timeSpent() > 0 && !e.isBot() && e.nrequests > 10)
        		s += e.summary();
        }

        return "<table>" + s + "</table>";
    }

	static String dumpIp(String ip)
    {
    	LogEntry e = table.get(ip);

        if (e != null && !e.isBot())
        	return "<table>" + e.toString() + "</table>";
       	else
       		return "bot<br><br>";
        	
    	/*

        Object[] x = table.keySet().toArray();
        String s = "";
        for (int i = 0; i < x.length; ++i)
        {
        	LogEntry e = table.get(x[i]);
        	LogEntry e = table.get(ip);
        	if (e.timeSpent() > 0 && !e.isBot())
        	{
        		s += e;
        	}
        }
        return "<table>" + s + "</table>";
        
        */
    }
}