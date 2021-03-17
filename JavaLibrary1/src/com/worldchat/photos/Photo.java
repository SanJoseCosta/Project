/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.worldchat.photos;

/**
 *
 * @author matt
 */
public class Photo implements ISortable
{
    String name;
    String path;
    long size;
    int w;
    int h;
    
    public int compareTo(ISortable b)
    {
        return compareTo((Photo) b);
    }
    
    public int compareTo(Photo b)
    {
        if (size > b.size)
            return 1;
        else
            return -1;
    }
    
    Photo(String n, String p, long s, int ww, int hh)
    {
        name = n;
        path = p;
        size = s;
        w = ww;
        h = hh;
    }
    
    public boolean equals(Photo p)         
    {
        return p.size == size && p.w == w && p.h == h;
    }
    
    public String toString()
    {
        return "\"" + path + "\"," +size;
    }
    
    public String type()
    {
        String n = name.toLowerCase();
        if (n.endsWith("png")) return "png";
        if (n.endsWith("gif")) return "gif";
        if (n.endsWith("jpeg")) return "jpg";
        if (n.endsWith("jpg")) return "jpg";
        return "UNKNOWN";
    }
           
}
