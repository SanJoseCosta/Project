package com.worldchat;

import java.util.*;

public class Json
{
	ArrayList<String> keys = new ArrayList<String>();
	ArrayList<String> values = new ArrayList<String>();
	
	static String[] escapes = 	

	{
		"&lt;", "<",
		"&gt;", ">",
		"&amp;", "&",
		"&quot;", "\"",
		"&apos;", "'"
	};

	Json()
	{

	}

	void add(String key, String value)
	{
		keys.add(key);
		values.add(value);
	}

	String get()
	{
		String s = "";

		for (int i = 0; i < keys.size(); ++i)
        	s += "\"" + keys.get(i) + "\": \"" + values.get(i) + "\"" + (i < keys.size() - 1 ? "," : "");

     	return "{ " + s + " }";
  	}

  	static String array(String type, String aname, ArrayList a)
  	{
  		String s = "{ ";

  		s += "\"type\": \"" + type + "\",";

  		s += "\"" + aname + "\": [ ";

		for (int i = 0; i < a.size(); ++i)
        	s += a.get(i) + (i < a.size() - 1 ? "," : "");

     	s += " ] ";

     	s += "}";

     	return s;
  	}
}
