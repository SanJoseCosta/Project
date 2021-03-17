package com.worldchat;

import com.mongodb.*;
import org.json.*;

public class Record
{
    String stype;
    String json;
    JSONObject tree;
    
    Record(DBObject k, String t)
    {
        stype = t;
        json = ((BasicDBObject) k).toJson();
        
        tree = new JSONObject(json);
    }

    String get(String s)
    {
        String r;
        
        try
        {
            r = tree.getString(s);
        }
        catch (Exception e)
        {
            r = null;
        }
        
        return r;
    }
}