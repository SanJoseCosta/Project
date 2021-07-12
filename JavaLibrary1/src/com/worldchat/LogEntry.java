package com.worldchat;

import java.util.*;
import java.io.*;
import java.net.*;

public class LogEntry
{
	String ip;
	String location;
	long time0;
	long time1;
	int nrequests;
	String agent;
	String host;
	String language;

	public String toString()
	{
		return 

		"<tr>" +

		td(ip) + td(location) + td(language) +td(agent) + td("" + timeSpent()) + td("" + nrequests) + td(mobile())

		+ "</tr>";
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