
package com.worldchat.test;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.*;

public class Mail1 
{
    static int N = 100;
    static float pop = 1000000;
    static float r = 2f; 
    
    public static void mainxxx(String[] args)  
    {
        float[] results0 = run(true, 0.05f, false);
        float[] results1 = run(true, 0.05f, true);
        
        for (int i = 0; i < N; ++i)
        {
            System.out.println(i + "," + results0[i] + "," + results1[i]);
        }
    }
    
    static float[] run(boolean sp, float vf, boolean vg)
    {
        float[] results = new float[N];
        
        float[] infected = {0, 0};
        float rec = 0;
        
        float totalHealthy;
        float pcSpreaders;
        float recoveryRate;
        
        float[] healthies = new float[2];
        float rates[] = new float[2];
        
       
        
        if (sp)
        {
            pcSpreaders = 0.20f;
            recoveryRate = 1;
            
            rates[0] = 4f;
            rates[1] = 0.25f;
        }
        else
        {
            pcSpreaders = 0.50f;
            recoveryRate = 1;
            
            rates[0] = 1f;
            rates[1] = 1f;
        }
        
        
       
        
        
        healthies[0] = pcSpreaders * pop;
        healthies[1] = pop - healthies[0];
        
        float tstart = 0.01f;
        
        float m = healthies[0] * tstart;
        
        
        //System.out.println(tstart + "," + m);
        
        healthies[0] -= m;
        infected[0] += m;
        
        m = healthies[1] * tstart;
        healthies[1] -= m;
        infected[1] += m;
        
        
        for (int i = 0; i < N; ++i)
        {
            totalHealthy = healthies[0] + healthies[1];
            
            if (totalHealthy == 0.0f) break;
            
            System.out.println(i + "\t" + healthies[0] + "\t" + healthies[1] + "\t" + infected[0] + "\t" + infected[1]);

            
            float infectionss = 0;
            for (int j = 0; j < 2; ++j)
            {
                infectionss += (totalHealthy/pop) * infected[j] * r * rates[j];
            }
            
            // amonng healthy of each group
            
            float[] chg = new float[2];
            chg[0] = infectionss * (healthies[0]/totalHealthy);
            chg[1] = infectionss * (healthies[1]/totalHealthy);
            
            System.out.println(i + "\t" + chg[0] + "\t" + chg[1]);// + "\t" + healthies[0] + "\t" + healthies[1] + "\t" + infected[0] + "\t" + infected[1] + "," + rec);

            
            // move healthy -> infected

            for (int j = 0; j < 2; ++j)
            {
                float k = recoveryRate * infected[j];
                infected[j] -= k;
                rec += k;
                healthies[j] -= chg[j];
                infected[j] += chg[j];
            }
            
            System.out.println(i + "\t" + healthies[0] + "\t" + healthies[1] + "\t" + infected[0] + "\t" + infected[1]);

            
            if (vg)
            {
                float v = vf * pop;
                if (v > healthies[0]) 
                {
                    float k = healthies[0];
                    
                    // some go to 0
                    healthies[0] = 0;
                    rec += healthies[0];
                    
                    // some go to 1
                    healthies[1] -= (v - k);
                    rec += (v - k);
                }
                else
                {
                    healthies[0] -= v;
                    rec += v;
                }
            }
            else
            {
                float v = vf * pop * pcSpreaders;
                if (v > healthies[0]) v = healthies[0];
                healthies[0] -= v;
                rec += v;
                v = vf * pop * (1 - pcSpreaders);
                if (v > healthies[1]) v = healthies[1];
                healthies[1] -= v;
                rec += v;
            }
            
            
            results[i] = (chg[0] + chg[1]);
            
            //System.out.println(i + "\t" + healthies[0] + "\t" + healthies[1] + "\t" + infected[0] + "\t" + infected[1] + "," + rec);
            System.out.println("===");
        }
        
        return results;
    }
    
    
    
    
    
    
    
    
    
    
    public static void main(String[] args) 
    {
        sendemail("matt.kuenzel@gmail.com", "Hi", "This is body");
    }
    
    static boolean sendemail(String to, String subject, String content)
    {
        //String to = "hxsquid@gmail.com";

        String from = "77george@gmail.com";

        String host = "smtp.gmail.com";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        // Get the Session object.// and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() 
        {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("hxsquid", "plexus11");
            }
        });

        session.setDebug(true);

        try 
        {
            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            message.setSubject(subject);
            message.setText(content);

            
            Transport.send(message);
            System.out.println("Sent message successfully....");
            return true;
        } 
        catch (MessagingException mex) 
        {
            mex.printStackTrace();
            return false;
        }
    }
}

    // Send the actual HTML message.
      // message.setContent(
             // "<h1>This is actual message embedded in HTML tags</h1>",
             //"text/html");