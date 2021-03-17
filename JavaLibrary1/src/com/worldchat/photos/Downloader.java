/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.worldchat.photos;

import java.io.DataInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 * @author matt
 */
public class Downloader 
{
    public static void main(String[] a)
    {
        String s = getPageDirect("https://tubitv.com/movies/502411/daphne");
        System.out.println(s);
        
        int k = s.indexOf("m3u8");
        System.out.println(k);
        
        String h = s.substring(k - 100, k + 4);
        h = h.replaceAll("\\\\u002F", "/");
        System.out.println(h);
    }
    
    
    
    public static String getPageDirect(String url) {
        int r;
        String s = null;
        int rs = 0;

        try {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB;     rv:1.9.2.13) Gecko/20101203 Firefox/3.6.13 (.NET CLR 3.5.30729)");

            rs = connection.getResponseCode();

            //if (rs != 200 && rs != 404 && rs != 500)
            //	;//Utils.log("Getpage Response: " + rs);
            InputStream is = connection.getInputStream();
            DataInputStream input = new DataInputStream(is);

            int t = 0;
            int Size = 100000000;
            byte[] b = new byte[Size];

            while ((r = input.read(b, t, Size - t)) > 0) {
                t += r;
                if (t > Size - 1000) {
                    ;//throw new Exception("Overflow of buffer on read in getPage()");
                }
            }

            s = new String(b, 0, t, "UTF-8");
        } catch (Exception e) {
            if (rs != 200 && rs != 404 && rs != 500)
				;//Utils.log("GetPage of " + url + " throws " + e.getMessage());
            //stackTrace(e);
        }

        return s;
    }
}
