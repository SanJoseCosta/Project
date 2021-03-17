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
    
    HttpExchange currentMessage;
    String host;
    String NoChange = "**********";
    
    public void handle(HttpExchange t) 
    {        
        currentMessage = t;
        host = currentMessage.getRequestHeaders().getFirst("Host");
        
        String r = null;
        int result;
            
        try 
        {
            r = t.getRequestURI().getPath();
            String q = t.getRequestURI().getQuery();
            
            //U.log("request " + r);
            
            //currentMessage.getRequestHeaders().entrySet().forEach(n -> U.log("header:" + n));
            
            if (q == null) q = "";
 
            if (t.getRequestMethod().toLowerCase().equals("head")) 
            {
                requestLog("Reject head request " + t);
                return;
            }
            
            //requestLog("Request: " + r + ", query string: " + q);

            String username = getparameter(q, "username").toLowerCase();
            String email = getparameter(q, "email").toLowerCase();
            String password = getparameter(q, "password");
            
            if (r.trim().equals("/") || r.equals("")) 
            {
                r = "/index.html";

                String ip = U.getIPLocationData(currentMessage);
                requestLog("IP location: " + U.getLocationFromJson(ip));
            } 
            
            /////
            
            if (r.trim().startsWith("/status.html"))
            {
                String response = Database.print();
                result = sendMsg(response.getBytes(), t, TextMime, null);
            }
            else if (r.trim().startsWith("/checkusername")) 
            {
                String response = (User.findUserByUsername(username) != null) ? "dup" : "ok";
                U.log("checkusername sending " + response);
                result = sendMsg(response.getBytes(), t, TextMime, null);
            } 
            else if (r.trim().startsWith("/checkemail")) 
            {
                String response = (User.findUserByEmail(email) != null) ? "dup" : "ok";
                U.log("checkemail sending " + response);
                result = sendMsg(response.getBytes(), t, TextMime, null);
            }
            else if (r.trim().startsWith("/checkboth")) 
            {
                String response;
                if (User.findUserByEmail(email) != null)
                {
                   response = "dupemail";
                }
                else if (User.findUserByUsername(username) != null)
                {
                    response = "dupusername";
                }
                else
                {
                    response = "ok";
                }
                U.log("checkboth sending " + response);
                result = sendMsg(response.getBytes(), t, TextMime, null);
            }
            else if (r.trim().startsWith("/checklogin")) 
            {
                String response = login(username, password);
                U.log("checklogin sending " + response);
                result = sendMsg(response.getBytes(), t, TextMime, null);
            } 
            else if (r.trim().startsWith("/createuser") || r.trim().startsWith("/edituser")) 
            {
                if (t.getRequestMethod().equals("POST")) 
                {
                    byte[] rbody = getRequestBody(t);

                    if (rbody != null) 
                    {
                        String so = new String(rbody);
                        ArrayList<Pair> pairs = postparse(so);

                        String response = create(pairs, r.trim().startsWith("/createuser"));
                        U.log("create/edit user sending " + response);
                        result = sendMsg(response.getBytes(), t, TextMime, null);
                    } 
                    else 
                    {
                        send404(t);
                        result = -1;
                    }
                }
                else
                {
                    result = sendMsg("duh".getBytes(), t, TextMime, null);
                }
            } 
            else 
            {
                result = sendFile(r, t);
            }
        } 
        catch (Exception e) 
        {
            requestLog("failed to send response to request " + r);
            e.printStackTrace();
            send404(t);
            
            result = -1;
        }
        
        U.log("https request for " +  r + " from " + currentMessage.getRemoteAddress().toString() + " result " + result);
    }

    int sendFile(String file, HttpExchange t) 
    {
        //U.log("send file " + file);
        
        byte[] rb = getFile(Main.Site + file);

        if (rb == null || rb.length == 0) 
        {
            send404(t);
            return -1;
        }
        else
        {
            //U.log("sending " + file);
            return sendMsg(rb, t, getMimeType(file), file);
        }
    }

    static String login(String username, String password) 
    {
        U.log("login");
        
        String r;
        User u = User.findUserByUsername(username);
        
        if (u == null) 
            u = User.findUserByEmail(username);
        
        if (u == null) 
            r = "xnouser";
        else
        {
            U.log("login " + u.password + " " + password);
            if (!u.password.equals(password)) 
            {
                r = "xwrongpassword";
            }
            else
            {
                String t = returnToken(u);
                U.log("token " + t);
                r = t;
            }
        }
        
        return r;
    }

    String create(ArrayList<Pair> pairs, boolean create) 
    {
        String username = U.findInPairs(pairs, "username").toLowerCase();
        String email = U.findInPairs(pairs, "email").toLowerCase();
        String password = U.findInPairs(pairs, "password");
        String language = U.findInPairs(pairs, "language");
        String picurl = U.findInPairs(pairs, "picurl");

        if (       nullempty(username)
                || nullempty(email)
                || nullempty(password)
                || nullempty(language)
                || nullempty(picurl)) {
            U.log("***** null parameter values in create/edit user");
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
                    String filename = Main.Site + "/images/" + username + ".png";
                    ImageUtils.save(b, filename);
                }
            }
            
            // for new user
            long lastActivity = System.currentTimeMillis();
            
            if (!create)
            {
                U.log("edit user");
                
                User p = User.findUserByUsername(username);
                if (p == null)
                {
                    U.log("Cant find user being updated " + username);
                    return "cantfindusererror";
                }
                
                // keep password the same if necessary
                if (password.equals(NoChange))
                    password = p.password;
                
                // for existing user
                lastActivity = p.lastActivityTime();
                
                if (p.picurl.equals("true")) 
                    picurl = "true";
            }
            
            try 
            {
                // set up new / changed user
                User u = new User(username, email, password, language, picurl, lastActivity + "");
            
                U.log("add user " + u);
                
                User.storeUser(u);
                
                if (create)
                    Message.saveInitMessage(username);
                
                return returnToken(u);
            } 
            catch (Exception e)
            {
                e.printStackTrace();
                return e.getMessage();
            }
        }
    }

    static String returnToken(User u) 
    {
        String token = U.random();
        
        String[] fields = {"token", token, "username", u.username()};
        boolean result = Database.addToken(fields);

        if (!result) 
        {
            U.log("***** database returns false on attempt to store token for " + u.username());
        } 
        
        return token;
    }

    boolean nullempty(String s) 
    {
        return s == null || s.equals("");
    }

    int sendMsg(byte[] rb, HttpExchange t, String mime, String name) 
    {
        boolean modified = false;
        
        try 
        {
            t.getResponseHeaders().set("Content-Type", mime);
            t.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            
            
            //==//============ expires in 60 secs
            
            
            t.getResponseHeaders().set("Expires", httpDate(200000));
            
            if (!modified && mime.indexOf("image") >= 0 && false)
            {
                t.sendResponseHeaders(304, 0);
                rb = "ok".getBytes();
            }
            else
            {
                t.sendResponseHeaders(200, 0);
            }
            
            OutputStream os = t.getResponseBody();
            os.write(rb);
            os.close();

            //U.log("sending response, length = " + rb.length);
            return rb.length;
        } 
        catch (Exception e) 
        {
            U.log("***** failed to fulfill request for  " + name + " beacuse " + e.getMessage());
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
            e.printStackTrace();
        }
        return rb;
    }

    String makefilename(String s) 
    {
        return s.replaceAll(" ", "-");
    }
    
    static byte[] getRequestBody(HttpExchange t) 
    {
        /*
        int k = 0;
        
        // this can be a buffer that expands as necessary
        
        byte[] bodybuffer = U.getBuffer();

        while (true) 
        {
            try 
            {
                
                int rq = t.getRequestBody().read(bodybuffer, k, bodybuffer.length - k);
                if (rq < 0) 
                {
                    break;
                } 
                else 
                {
                    k += rq;
                }
                
            } 
            catch (Exception e) 
            {
                e.printStackTrace();
                break;
            }
        }
        
        byte[] r = new byte[k];
        
        for (int i = 0; i < k; ++i) 
        {
            r[i] = bodybuffer[i];
        }
        
        return r;
        */
        
        
        return U.readInputStream(t.getRequestBody());
    }

    ArrayList<Pair> postparse(String s0) 
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

                    U.log(data + "===" + show);
                }
            }
        } catch (Exception e) 
        {
            e.printStackTrace();
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
            } else if (filename.toLowerCase().endsWith("svg")) {
                mime = "image/svg+xml";
                expiry = true;
            } else if (filename.toLowerCase().endsWith("pdf")) {
                mime = "application/pdf";
                expiry = true;
            }
            return mime;
    }
    
    void requestLog(Object s) 
    {
        if (currentMessage != null) 
        {
            U.req("Request from " + currentMessage.getRemoteAddress() + ": " + s);
        } 
        else 
        {
            U.req("no remote address found: " + s);
        }
    }
    
    void send404(HttpExchange t)
    {
        sendMsg("<center><font size=5>404".getBytes(), t, TextMime, null);
    }
}
