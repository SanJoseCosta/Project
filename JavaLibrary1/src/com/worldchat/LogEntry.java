package com.worldchat;

import java.util.*;
import java.io.*;
import java.net.*;

public class LogEntry implements ISortable
{
	String ip;
	String location;
	long time0;
	long time1;
	int nrequests;
	String agent;
	String host;
	String acceptlanguage;
	String referer;
	ArrayList<LogMessage> messages = new ArrayList<LogMessage>();
	boolean isGarbage = false;
	String language = "en";

	class LogMessage
	{
		String msg;
		long date;

		LogMessage(long d, String m)
		{
			date = d;
			msg = m;
		}
	}

	public boolean isGarbage()
	{
		if (isGarbage) return true;

		if (nrequests > 100) return false;

		int notfound = 0;

		for (int i = 0; i < messages.size(); ++i)
		{
			LogMessage m = messages.get(i);
			if (m.msg.indexOf("XDEBUG_SESSION_START") > 0 || m.msg.indexOf("phpunit") > 0 || m.msg.indexOf("wp-includes") > 0)
			{
				isGarbage = true;
				System.out.println("GARBAGE " + latest() + " " + ip + " " + location + " " + nrequests);
				return true;
			}

			if (m.msg.indexOf("response for") >= 0 && m.msg.indexOf("--- -1") >= 0)
				notfound++;
		}

		if (nrequests > 20 && ((notfound * 100) / (nrequests + 1)) > 50)
		{
			isGarbage = true;
			System.out.println("GARBAGE " + latest() + " " + ip + " " + location + " " + nrequests);
			return true;
		}

		return false;
	}

	public int compareTo(ISortable b)
    {
        return compareTo((LogEntry) b);
    }
    
    public int compareTo(LogEntry b)
    {
        if (time1 > b.time1)
            return 1;
        else if (time1 < b.time1)
            return -1;
        else
        	return 0;
    }

	String latest()
	{
		return new Date(time1) + "";
	}

	String summary()
	{
		return 

		"<tr>" +

		td(latest()) + td(ip) + td(location) + td("" + nrequests) + td("<a href=https://comprendo.chat/status7722?ip=" + ip + ">Details</a>")

		+ "</tr>";
	}

	public String toString()
	{
		StringBuffer b = new StringBuffer();
		for (int i = 0; i < messages.size(); ++i)
		{
			LogMessage m = messages.get(i);
			b.append(row(m.date, m.msg));
		}
		return b.toString();
	}

	public String row(long date, String msg)
	{
		return 

		"<tr>" +

		td(new Date(date) + "") + 
		//td(ip) + td(location) + 
		td(acceptlanguage) + 
		//td(agent) + 
		td(mobile()) + td(referer) + td(msg)

		+ "</tr>";
	}

	void addMessage(long date, String msg)
	{
		messages.add(new LogMessage(date, msg));
	}

	String td(String s)
	{
		return "<td>" + s + "</td>";
	}

	String mobile()
	{
		return agent.toLowerCase().indexOf("mobile") > 0 ? "mobile" : "desktop";
	}

	long timeSpent()
	{
		return ((time1 - time0) / 1000);
	}

	boolean isBot()
	{
		String[] bots = {
			"chrome-lighthouse",
			"adsbot",
			"bingbot",
			"mj12bot",
			"googlebot",
			"bingpreview"
		};

		if (agent == null)
			return true;

		String a = agent.toLowerCase();

		for (int i = 0; i < bots.length; ++i)
		{
			if (a.indexOf(bots[i]) >= 0)
				return true;
		}

		return false;
	}
}