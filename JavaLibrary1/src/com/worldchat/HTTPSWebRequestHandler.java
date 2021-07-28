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

public class HTTPSWebRequestHandler implements HttpHandler 
{    
    static String TextMime = "text/html";
    static String HtmlMime = "text/html";
    static int SecondsTillExpire = 1;
    
    HttpExchange currentMessage;
    String NoChange = "**********";
    
    public void handle(HttpExchange t) 
    {        
        currentMessage = t;
        
        String r = null;
        String q = null;
        int result = -1;
            
        try 
        {
            //if (Log.isGarbage(currentMessage))
            //    return;

            r = t.getRequestURI().getPath();
            q = t.getRequestURI().getQuery();
            
            if (q == null) q = "";
 
            if (t.getRequestMethod().toLowerCase().equals("head")) 
            {
                Log.log("reject head request " + t, currentMessage);
                return;
            }
            
            //----------------------------------------------------------

            String username = getparameter(q, "username").toLowerCase();
            String email = getparameter(q, "email").toLowerCase();
            String password = getparameter(q, "password");
            
            if (r.trim().equals("/") || r.equals("")) 
            {
                r = "/index.html";
            }

            if (r.trim().startsWith("/nym"))
            {
                r = "/stories/index.html";
            }
            
            Log.log("request for  " + r + " " + q, currentMessage);

            //----------------------------------------------------------

            String language = "en";
            String l = getparameter(q, "language");

            if (l != null && !l.equals(""))
            {
                language = l;
                Log.setLanguage(currentMessage, language);
            }
            else
            {
                language = Log.getLanguage(currentMessage);
            }

            System.out.println("request for  " + r + " " + q + " language is " + language + " " + (Log.isGarbage(currentMessage) ? "garbage" : ""));

             if (Log.isGarbage(currentMessage))
                return;
            
            // todo: check that it is in the 
            // list of langauges

            if (r.trim().startsWith("/status7722"))
            {
                String days = getparameter(q, "days");
                if (days == null) days = "1";
                int n = U.toInt(days);

                String ip = getparameter(q, "ip");

                String response = Database.print(n, ip, currentMessage);
                result = sendMsg(response.getBytes(), t, HtmlMime, null, currentMessage);
            }
            else if (r.trim().startsWith("/del7722"))
            {
                String mid = getparameter(q, "mid");

                if (mid != null)
                {
                    U.inf("delete " + mid, currentMessage);
                    String[] f = { "mid", mid};
                    Database.delete(Database.Messages, f);
                }

                String response = Database.print(1, null, currentMessage);
                result = sendMsg(response.getBytes(), t, HtmlMime, null, currentMessage);
            }
            else if (r.trim().startsWith("/createuser") || r.trim().startsWith("/edituser")) 
            {
                if (t.getRequestMethod().equals("POST")) 
                {
                    byte[] rbody = getRequestBody(t);

                    if (rbody != null) 
                    {
                        String so = new String(rbody);
                        ArrayList<Pair> pairs = postparse(so, currentMessage);

                        String response = create(pairs, r.trim().startsWith("/createuser"), currentMessage);
                        U.inf("create/edit user sending " + response, currentMessage);
                        result = sendMsg(response.getBytes(), t, TextMime, null, currentMessage);
                    } 
                    else 
                    {
                        send404(t);
                        result = -1;
                    }
                }
                else
                {
                    result = sendMsg("duh".getBytes(), t, TextMime, null, currentMessage);
                }
            } 
            else 
            {
                //String tolanguage = language; // getAcceptLanguage(currentMessage);
                result = sendFile(r, language, t);
            }
        } 
        catch (Exception e) 
        {
            Log.log("failed to send response to request " + r, currentMessage);
            Log.stackTrace(e);
            send404(t);
            
            result = -1;
        }
        
        Log.log("response for " + r + " " + q + " --- " + result, currentMessage);
    }

    String getAcceptLanguage(HttpExchange currentMessage)
    {
        return "es";
    }

    int sendFile(String file, String tolanguage, HttpExchange t) 
    {
        byte[] rb = getFile(Main.Site + file);

        if (rb == null || rb.length == 0) 
        {
            send404(t);
            return -1;
        }
        else
        {
            if (file.toLowerCase().endsWith(".js") || file.toLowerCase().endsWith(".html"))
                rb = Translator.languageReplace(new String(rb), tolanguage, t).getBytes();
            return sendMsg(rb, t, getMimeType(file), file, t);
        }
    }

    String create(ArrayList<Pair> pairs, boolean create, HttpExchange currentMessage) 
    {
        String username = U.findInPairs(pairs, "username").toLowerCase();
        String email = U.findInPairs(pairs, "email").toLowerCase();
        String password = U.findInPairs(pairs, "password");
        String language = U.findInPairs(pairs, "language");
        String picurl = U.findInPairs(pairs, "picurl");
        String invite = U.findInPairs(pairs, "invite");

        if  (      nullempty(username)
                || nullempty(email)
                || nullempty(password)
                || nullempty(language)
                || nullempty(picurl)
            ) 
        {
            U.log("-- null parameter values in create/edit user", currentMessage);
            return "xcannotadd";
        } 
        else 
        {
            String imagedata = U.findInPairs(pairs, "image");

            if (imagedata != null) 
            {
                String stringdata = ImageUtils.getBase64DataFromString(imagedata);
                
                if (stringdata != null) 
                {
                    BufferedImage b = ImageUtils.regularize(stringdata, 128);

                    String n = (picurl.equals("2")) ? "2" : "";

                    String filename = Main.Site + "/images/" + username + n + ".png";
                    ImageUtils.save(b, filename, currentMessage);
                }
            }
            
            long lastActivity = System.currentTimeMillis();
            
            if (!create)
            {
                User p = User.findUserByUsername(username, currentMessage);

                if (p == null)
                {
                    U.log("-- cant find user being updated " + username, currentMessage);
                    return "cantfindusererror";
                }
                
                // keep password the same if necessary

                if (password.equals(NoChange))
                    password = p.password;
                
                // for existing user

                lastActivity = p.lastActivityTime();
            }
            
            try 
            {
                // set up new user
                
                User u = new User(username, email, password, language, picurl, lastActivity + "", currentMessage);
            
                U.inf("add user " + u, currentMessage);
                
                User.storeUser(u, currentMessage);
                
                if (create)
                {
                    Message.saveInitMessage(username, currentMessage);

                    if (invite != null)
                    {
                        User inviter = User.findUserByToken(invite, currentMessage);

                        U.inf("invite code is " + invite, currentMessage);
                        U.inf("invitee is " + u.username, currentMessage);
                        U.inf("inviter is " + inviter.username, currentMessage);

                        Message.saveDummyMessage(inviter.username, u.username, currentMessage);
                    }
                }
                
                return returnToken(u, currentMessage);
            } 
            catch (Exception e)
            {
                Log.stackTrace(e);
                return e.getMessage();
            }
        }
    }

    static String returnToken(User u, Object o) 
    {
        String token = U.random();
        
        String[] fields = {"token", token, "username", u.username()};
        boolean result = Database.addToken(fields, o);

        if (!result) 
        {
            U.log("-- database returns false on attempt to store token for " + u.username(), o);
        } 
        
        return token;
    }

    boolean nullempty(String s) 
    {
        return s == null || s.equals("");
    }

    int sendMsg(byte[] rb, HttpExchange t, String mime, String name, Object o) 
    {        
        try 
        {
            t.getResponseHeaders().set("Content-Type", mime);
            t.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            
            if (mime.indexOf("image") >= 0 && false)
            {
                t.getResponseHeaders().set("Expires", httpDate(300 * 1000));
                t.sendResponseHeaders(304, 0);
                rb = "ok".getBytes();
            }
            else
            {
                t.getResponseHeaders().set("Expires", httpDate(SecondsTillExpire * 1000));
                t.sendResponseHeaders(200, 0);
            }
            
            OutputStream os = t.getResponseBody();
            os.write(rb);
            os.close();

            return rb.length;
        } 
        catch (Exception e) 
        {
            String m = e.getMessage();
            if (m.indexOf("Broken pipe") >= 0)
                U.inf("-- failed to fulfill request for  " + name + " beacuse " + m, o);
            else
                U.log("-- failed to fulfill request for  " + name + " beacuse " + m, o);
            return -1;
        }
    }

    String getparameter(String q, String n) 
    {
        if (q == null) {
            return "";
        }

        try {
            q = java.net.URLDecoder.decode(q, StandardCharsets.UTF_8.name());
        } catch (UnsupportedEncodingException e) {
            return null;
        }

        if (q == null) {
            return "";
        }

        String[] p = q.split("&");

        for (int i = 0; i < p.length; ++i) {
            String[] a = p[i].split("=");

            if (a.length == 2) {
                if (a[0].equals(n)) {
                    return a[1];
                }
            }
        }

        return "";
    }

    byte[] getFile(String hr) 
    {
        byte[] rb = null;
        try 
        {
            rb = U.read(hr);
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
        return rb;
    }

    String makefilename(String s) 
    {
        return s.replaceAll(" ", "-");
    }
    
    static byte[] getRequestBody(HttpExchange t) 
    {
        return U.readInputStream(t.getRequestBody());
    }

    ArrayList<Pair> postparse(String s0, HttpExchange currentMessage) 
    {
        String search = "name=\"";

        ArrayList<String> p = U.split(s0);
        ArrayList<Pair> pairs = new ArrayList<Pair>();

        try {
            for (int i = 0; i < p.size(); ++i) {
                if (p.get(i).startsWith("---") && p.get(i + 1).startsWith("Content-Disposition")) {
                    String data = p.get(i + 1);

                    int k = data.indexOf(search);
                    data = data.substring(k + search.length(), data.length());

                    k = data.indexOf("\"");
                    data = data.substring(0, k);

                    String value = correctEnd(p.get(i + 3));

                    Pair pair = new Pair(data, value);
                    pairs.add(pair);

                    String show = p.get(i + 3);
                    if (show.length() > 50) {
                        show = show.substring(0, 40);
                    }

                    U.inf(data + "===" + show, currentMessage);
                }
            }
        } 
        catch (Exception e) 
        {
            Log.stackTrace(e);
        }
        return pairs;
    }

    String correctEnd(String value) 
    {
        if (value.charAt(value.length() - 1) == '\n') {
            value = value.substring(0, value.length() - 1);
        }

        if (value.charAt(value.length() - 1) == '\r') {
            value = value.substring(0, value.length() - 1);
        }

        return value;
    }
    
    String httpDate(int seconds) 
    {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, seconds);
        SimpleDateFormat dateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String r = dateFormat.format(calendar.getTime());
        return r;
    }
    
    String getMimeType(String filename)
    {
            String mime = "text/html";
            boolean expiry = false;
            if (filename.toLowerCase().endsWith(".js")) {
                mime = "application/javascript";
            } else if (filename.toLowerCase().endsWith("png")) {
                mime = "image/png";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("ico")) {
                mime = "image/x-icon";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("css")) {
                mime = "text/css";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("ttf")) {
                mime = "font/ttf";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("jpg")) {
                mime = "image/jpeg";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("jpeg")) {
                mime = "image/jpeg";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("gif")) {
                mime = "image/gif";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("svg")) {
                mime = "image/svg+xml";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("pdf")) {
                mime = "application/pdf";
                expiry = true;
            }
            return mime;
    }
    /*
    void requestLog(Object s, HttpExchange currentMessage) 
    {
        if (currentMessage != null) 
        {
            U.req("Request from " + currentMessage.getRemoteAddress() + ": " + s, currentMessage);
        } 
        else 
        {
            U.req("no remote address found: " + s, currentMessage);
        }
    }
    */

    void send404(HttpExchange t)
    {
        sendMsg("<center><font size=15>404".getBytes(), t, TextMime, null, t);
    }
}
