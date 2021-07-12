package com.worldchat;

import java.util.*;
import java.io.*;
import java.net.*;
import org.java_websocket.WebSocket;
import com.sun.net.httpserver.HttpExchange;

public class Log
{
	static Hashtable<String, LogEntry> table = new Hashtable<String, LogEntry>();


	static void log(Object msg, Object x)
	{
		if (x == null)
		{
			String s = (String) x;
			System.out.println(s + " " +  msg);
		}
		else if (x instanceof HttpExchange)
		{
			String s = U.getIpAddress((HttpExchange) x);
			System.out.println(s + " " +  msg);
		}
		else if (x instanceof WebSocket)
		{
			InetSocketAddress i = ((WebSocket) x).getRemoteSocketAddress();
			String s = U.getIpAddress(i);
			System.out.println(s + " " +  msg);
		}
		else if (x instanceof InetSocketAddress)
		{
			String s = U.getIpAddress((InetSocketAddress) x);
			System.out.println(s + " " +  msg);
		}
		else
		{
			System.out.println("************************* " + msg + " --- "  + x.getClass().getName());
		}
	}

	public static void stackTrace(Exception e) 
    {
        StringWriter s = new StringWriter();
        PrintWriter p = new PrintWriter(s);
        e.printStackTrace(p);

        log(s.toString(), null);
    }

	static void log(HttpExchange x)
	{
		String ip = U.getIpAddress(x);

		// r = t.getRequestURI().getPath();
        //    String q = t.getRequestURI().getQuery();
            

		LogEntry e = table.get(ip);

		if (e == null)
		{
			e = new LogEntry();
			e.ip = ip;
			e.time0 = System.currentTimeMillis();
			e.time1 = System.currentTimeMillis();
			e.nrequests = 1;
			e.host = x.getRequestHeaders().getFirst("Host");
			e.agent = x.getRequestHeaders().getFirst("User-Agent");
			e.language = x.getRequestHeaders().getFirst("Accept-Language");
			e.location = U.getLocationFromJson(U.getIPLocationData(x));
			table.put(ip, e);
		}
		else
		{
			e.time1 = System.currentTimeMillis();
			e.nrequests++;
		}

		dump();
	}

	static String dump()
    {
        Object[] x = table.keySet().toArray();
        String s = "";
        for (int i = 0; i < x.length; ++i)
        {
        	LogEntry e = table.get(x[i]);
        	if (e.timeSpent() > 0 && !e.isBot())
        		s += e;
        }
        return "<table>" + s + "</table>";
    }
}