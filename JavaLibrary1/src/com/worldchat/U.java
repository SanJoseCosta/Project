package com.worldchat;

import java.util.*;
import java.io.*;
import java.net.*;
import org.java_websocket.WebSocket;
import com.sun.net.httpserver.HttpExchange;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Address;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Provider;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;

public class U 
{
    static long lastlog = 0;
    
    static PrintStream req;
    static PrintStream inf;
    
    static String GoogleUser =  "support@comprendo.chat";
    static String PasswordSave = null;

    static String Password()
    {
        if (PasswordSave == null)
        {
            PasswordSave = readString("/home/ec2-user/ep");
            PasswordSave = PasswordSave.substring(0, 8);
        }
        return PasswordSave;
    }

    static String getIpAddress(InetSocketAddress i)
    {
        String a = i.toString();
        
        int k;
        
        k = a.indexOf("/");
        if (k >= 0) a = a.substring(k + 1);
        
        k = a.indexOf(":");
        if (k > 0) a = a.substring(0, k);

        return a;
    }

    static String getIpAddress(HttpExchange currentMessage)
    {
        return getIpAddress(currentMessage.getRemoteAddress());
        
        /*
        int k;
        
        k = a.indexOf("/");
        if (k > 0) a = a.substring(k + 1);
        
        k = a.indexOf(":");
        if (k > 0) a = a.substring(0, k);

        return a;
        */
    }

    static String getIPLocationData(HttpExchange currentMessage)
    {   
        String base = "https://json.geoiplookup.io/"; ///191.235.224.185
        String a = getIpAddress(currentMessage);
        String url = base + a;
        
        //U.req("remote address " +  a + " url: " + url);
        
        try
        {
            String r = U.getPageDirect(url);
            return r;
        }
        catch (Exception e)
        {
            return null;
        }
    }
    
    static String id()
    {
        String s = "" + System.currentTimeMillis();
        for (int i = 0; i < 10; ++i)
            s += "" + (int) (Math.random() * 10);
        return s;
    }
    
    static String random() 
    {
        String s = "";
        for (int i = 0; i < 32; ++i) {
            s += "" + (int) (Math.random() * 10);
        }
        return s;
    }

    static String byteDisplay(byte[] b) {
        String s = "";
        for (int i = 0; i < b.length; ++i) {
            s += ((int) b[i]) + ", ";
            if (i % 32 == 0) {
                s += "\n";
            }
        }
        return s;
    }
    
    static void sendError(String s, Object o) 
    {
        log("should send error: " + s, o);
        // send error
    }
    
    public static void pause(int n) {
        try {
            Thread.sleep(n);
        } catch (Exception e) {
            Log.stackTrace(e);
        }
    }

    public static ArrayList<String[]> getData(String file) throws Exception {
        if (!new File(file).exists()) {
            return null; // throw new Exception("File " + file + " does not exist");
        }
        ArrayList<String[]> r = new ArrayList<String[]>();
        LineNumberReader in = null;

        try {
            in = new LineNumberReader(new InputStreamReader(new FileInputStream(file), "UTF8"));

            while (true) {
                String s = in.readLine();
                if (s == null) {
                    break;
                }
                String[] fields = splitFields(s, ",");
                r.add(fields);
                //n++;
                //if (n % 10000 == 0) UT.msg("line " + n);
            }

            in.close();
        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                throw new Exception(e);
            }
        }

        return r;
    }

    public static ArrayList<String[]> getData(String file, String sep) throws Exception {
        if (!new File(file).exists()) {
            return null;
        }

        ArrayList<String[]> r = new ArrayList<String[]>();
        LineNumberReader in = null;

        try {
            in = new LineNumberReader(new InputStreamReader(new FileInputStream(file), "UTF8"));

            while (true) {
                String s = in.readLine();
                if (s == null) {
                    break;
                }
                String[] fields = splitFields(s, sep);
                r.add(fields);
            }

            in.close();
        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                throw new Exception(e);
            }
        }

        return r;
    }

    static String[] field = new String[100000];

    public static String[] splitFields(String s, String sep) 
    {
        int n = 0;
        int start = 0;

        while (true) 
        {
            int k0 = s.indexOf(sep, start);
            
            if (k0 < 0)
            {
                field[n++] = s.substring(start).trim();
                break;
            }
            else 
                field[n++] = s.substring(start, k0).trim();
            
            start = k0 + sep.length();
        }

        String[] f = new String[n];

        for (int i = 0; i < n; ++i) {
            f[i] = field[i];
        }

        return f;
    }

    static ArrayList<String> split(String string) {
        ArrayList<String> a = new ArrayList<String>();
        int s = 0;
        while (true) {
            int k = string.indexOf("\n", s);
            if (k < 0) {
                a.add(string.substring(s));
                break;
            }
            a.add(string.substring(s, k));
            s = k + 1;
        }
        return a;
    }

    public static String getPageDirect(String url) throws Exception 
    {
        int r;
        String s = null;
        int rs = -1;

        //System.out.println(url);

        try 
        {
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB;     rv:1.9.2.13) Gecko/20101203 Firefox/3.6.13 (.NET CLR 3.5.30729)");

            rs = connection.getResponseCode();

            //System.out.println(rs);

            InputStream is = connection.getInputStream();
            
            byte[] pbuffer = readInputStream(is);
            s = new String(pbuffer, 0, pbuffer.length, "UTF-8");
        } 
        catch (Exception e) 
        {
            e.printStackTrace();
        }
        
        return s;
    }

    public static void saveObject(byte[] b, String name) throws Exception {
        try {
            FileOutputStream f = new FileOutputStream(name);
            f.write(b);

            f.flush();
            f.close();
        } catch (Exception e) {
            Log.stackTrace(e);
        }
    }

    public static String readString(String file)
    {
        try
        {
            return new String(read(file));
        }
        catch (Exception e)
        {
            return null;
        }
    }

    public static byte[] read(String file) throws Exception 
    {
        long len = new File(file).length();
        FileInputStream f = null;
        try 
        {
            f = new FileInputStream(file);
            
            byte[] rbuffer = new byte[(int) len];
            
            int r = f.read(rbuffer);
            
            if (f.available() > 0 || r < len) 
            {
                try 
                {
                    if (f != null)
                        f.close();
                } 
                catch (IOException ee) 
                {
                    Log.stackTrace(ee);
                }
                throw new Exception("***** Overflow of buffer on read in read()");
            }
            
            f.close();

            byte[] rb = new byte[r];
            for (int i = 0; i < r; ++i) 
            {
                rb[i] = rbuffer[i];
            }

            return rb;
        } 
        catch (IOException e) 
        {
            try {
                if (f != null) {
                    f.close();
                }
            } catch (IOException ee) {
                Log.stackTrace(ee);
            }
            return null;
        }
    }

    static String s1 = "\"city\": \""; 
    static String s2 = "\"country_name\": \"";
    
    static String getLocationFromJson(String s)
    {
       return getBetween(s, s1, "\"") + ", " + getBetween(s, s2, "\"");
    }

    static String getBetween(String s, String pre, String post)
    {
        if (s == null)
            return null;
        
        int k, l;
        
        k = s.indexOf(pre);
        if (k >= 0)
        {
            l = s.indexOf(post, k + pre.length());
            if (l >= 0)
            {
                return s.substring(k + pre.length(), l);
            }
        }
        
        return null;
    }
    
    static String findInPairs(ArrayList<Pair> pairs, String key) 
    {
        for (int i = 0; i < pairs.size(); ++i) {
            if (pairs.get(i).name.equals(key)) {
                return pairs.get(i).value;
            }
        }
        return null;
    }
    
    static boolean nullempty(String s) {
        return s == null || s.equals("");
    }
    
    static boolean sendemail(String to, String subject, String content, Object o)
    {
        try 
        {
            String fromAddress = GoogleUser;
            String host = "smtp.gmail.com";

            // Get system properties
            Properties properties = System.getProperties();

            // Setup mail server
            properties.put("mail.smtp.host", host);
            properties.put("mail.smtp.auth", "true");

            // Get the Session object.// and pass username and password
            Session session = Session.getInstance(properties, new javax.mail.Authenticator() 
            {
                protected javax.mail.PasswordAuthentication getPasswordAuthentication() 
                {
                    return new javax.mail.PasswordAuthentication(fromAddress, Password());
                }
            });
            
            session.setDebug(false);
            session.setProvider(new Provider(Provider.Type.TRANSPORT, "smtp", "com.sun.mail.smtp.SMTPSSLTransport", "Oracle", "1.0"));

            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(fromAddress));
            message.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(to));

            message.setSubject(subject);
            message.setText(content);

            InternetAddress[] addresses = new InternetAddress[1];
            addresses[0] = new InternetAddress(to);
            
            Transport transport = session.getTransport("smtp");
            
            transport.connect(host, GoogleUser, Password());
            transport.send(message, addresses);
            
            U.inf("Sent message successfully....", o);
            return true;
        } 
        catch (Exception e) 
        {
            U.inf("Exception on sending email message", o);
            Log.stackTrace(e);
            return false;
        }
    }
    
    static boolean invalid(String s) 
    {
        if (s == null) {
            return true;
        }
        if (s.equals("")) {
            return true;
        }
        if (s.equals("null")) {
            return true;
        }

        return false;
    }
    
    public static byte[] readInputStream(InputStream stream)
    {
        ArrayList<Buffer> list = new ArrayList<Buffer>();
        try
        {
            while (true)
            {
                Buffer buffer = new Buffer();
                buffer.r = stream.read(buffer.buf, 0, buffer.buf.length);
                if (buffer.r < 0)
                    break;
                list.add(buffer);
            }
            int total = 0;
            for (int i = 0; i < list.size(); ++i)
                total += list.get(i).r;
            byte[] r = new byte[total];
            int index = 0;
            for (int i = 0; i < list.size(); ++i)
            {
                Buffer b = list.get(i);
                for (int j = 0; j < b.r; ++j)
                    r[index++] = b.buf[j];
            }
            return r;
        }
        catch (Exception e) 
        {
            Log.stackTrace(e);
            return null;
        }
    }

    static String truncate(String s, int n)
    {
        if (s.length() < n)
            return s;
        else
            return s.substring(0, n) + " ...";
    }

    static String requestTranslation(String tolang, String fromlang, String text, Object o)
    {
        if (tolang.equals(fromlang))
            return text;

        String base = "https://translation.googleapis.com/language/translate/v2?";
        String params = "target=" + tolang + "&source=" + fromlang + 
                "&key=" + "AIzaSyC3" +
                "1GV2BJqC" +
                "IoXCM6Nj" +
                "OtLohY-l" +
                "WV1bQ3Q" + "=&q=" + URLEncoder.encode(text);

        U.inf("translation request " + (base + params), o);

        //System.out.println("translation request " + (base + params));
        
        String r = null;

        try
        {
            r = getPageDirect(base + params);
        }
        catch (Exception e)
        {
            U.inf("Exception on get of " + (base + params), o);
            return text;
        }

        r = parseTranslationResponse(r);

        U.inf("translation response " + r, o);

        return r;
    }

    static String parseTranslationResponse(String r)
    {
        String search = "\"translatedText\": \"";
        int k = r.indexOf(search);

        if (k >= 0)
        {
            r = r.substring(k + search.length());
            k = r.indexOf("\"");
            if (k > 0)
            {
                return r.substring(0, k);
            }
        }

        return null;
    }

    static int toInt(String s)
    {
        int n = -1;
        try
        {
            n = new Integer(s);
        } 
        catch (Exception e)
        {

        }
        return n;
    }

    public static void req(Object s, Object c) 
    {
        Log.log(s, c);
    }

    public static void inf(Object s, Object c) 
    {
        Log.log(s, c);
    }

    public static void log(Object s, Object c) 
    {
        Log.log(s, c);
    }
}



    /*
    public static void req(Object s, Object c) 
    {
        Log.log(s, c);

        
        try
        {
            if (req == null) req = new PrintStream(Main.RequestLog);
            req.append(new Date() + ": " + s + "\n");
        }
        catch (Exception e)
        {
            e.printxxxStackTrace();
        }
        
    }
    
    public static void inf(Object s, Object c) 
    {
        Log.log(s, c);

        
        try 
        {
            if (inf == null) inf = new PrintStream(Main.InfoLog);
            inf.append(new Date() + ": " + s + "\n");
        }
        catch (Exception e)
        {
            e.printxxxStackTrace();
        }
        
    }

    public static void log(Object s, Object c) 
    {
        // add to log info for ip

        Log.log(s, c);

        
        long now = System.currentTimeMillis();
        if (now - lastlog > 3000)
            System.out.println("");
        lastlog = now;
        System.out.println(new Date() + ": " + s);
        
    }
    */
