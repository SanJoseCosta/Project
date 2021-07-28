package com.worldchat;

import com.sun.net.httpserver.HttpExchange;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimeZone;
import java.util.Locale;
import java.text.SimpleDateFormat;
import com.sun.net.httpserver.HttpHandler;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.*;
import java.util.Iterator;
import java.util.ArrayList;
import java.io.*;

public class Translator
{
	static String t0 = "<blah>";
    static String t1 = "</blah>";
    static String errorentry = "???===???";

    static Hashtable<String, String> store = new Hashtable<String, String>();

    static String replaceWithTranslation(String s, int k, int q, String tolanguage, Object o)
    {
        String t = s.substring(k + t0.length(), q);

        //U.log("translate *" + t + "*", null);

        String r = store.get(tolanguage + "-" + t);
        if (r == null)
        {
        	String trans = U.requestTranslation(tolanguage, "en", t, o);

        	boolean error = false;
        	if (trans == null) error = true;
        	// if other errors set error = true

        	String tostore;
        	if (error)
        		tostore = errorentry;
        	else
        		tostore = trans;

        	store.put(tolanguage + "-" + t, tostore);

        	r = tostore;
    	}

    	if (r.equals(errorentry))
    		r = t;

        return s.substring(0, k) + r + s.substring(q + t1.length(), s.length());
    }

    static String languageReplace(String s, String tolanguage, Object o)
    {
        while (true)
        {
            int k = s.indexOf(t0);
            if (k <= 0) break;
            int l = s.indexOf(t1, k + 1);
            if (l < 0)
            {
                // error in string
                U.log("error in string - non matching blah tags", o);
                break;
            }
            //U.log(k + " " + l, null);
            s = replaceWithTranslation(s, k, l, tolanguage, o);
        }
        return s;
    }






}