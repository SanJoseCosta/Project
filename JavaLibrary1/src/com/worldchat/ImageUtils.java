
package com.worldchat;
 
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.*;
import java.io.File;
import java.io.IOException;
import java.util.Base64;
import javax.imageio.ImageIO;

public class ImageUtils 
{
    static BufferedImage get(String so)
    {
        BufferedImage bim = null;
        byte[] imageByte = Base64.getDecoder().decode(so);
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        
        try
        {
            bim = ImageIO.read(bis);
            bis.close();
            return bim;
        }
        catch (Exception e)
        {
            Log.stackTrace(e);
            return null;
        }
    }
    
    static String searchpng = "data:image/png;base64,";
    static String searchjpg = "data:image/jpeg;base64,";
    
    static String getBase64DataFromString(String so)
    {
        boolean png = so.startsWith(searchpng);
        boolean jpg = so.startsWith(searchjpg);
        
        if (!png && !jpg) return null;
        
        String data;
        
        if (png)
            data = imageDataFromHttpString(so, true);
        else
            data = imageDataFromHttpString(so, false);
            
        return data;
    }
    
    static String imageDataFromHttpString(String s, boolean png) 
    {
        String search = png ? searchpng : searchjpg;
        int k = s.indexOf(search);

        if (k >= 0) 
        {
            s = s.substring(k + search.length(), s.length());
            k = s.indexOf("\n");
            if (k > 0) 
                return s.substring(0, k);
            else
                return s;
        }

        return null;
    }
    
    static BufferedImage regularize(String so, int side)
    {
        BufferedImage bim = get(so);
        if (bim != null)
        {
            bim = cropToSquare(bim);
            try
            {
                //U.log("resize " + side);
                
                if (side > 0)
                    bim = resize(bim, side, side);
                
                return bim;
            }
            catch (Exception e)
            {
                Log.stackTrace(e);
            }
        }
        
        return null;
    }
    
    public static BufferedImage resize(BufferedImage bim, int w, int h) throws IOException 
    {
        BufferedImage out = new BufferedImage(w, h, bim.getType());
        
        //U.log("resize " + w + " " + h);
 
        Graphics2D g2d = out.createGraphics();
        g2d.drawImage(bim, 0, 0, w, h, null);
        g2d.dispose();
        
        return out;
    }
    
    static boolean save(BufferedImage bim, String filename, Object o)
    {
        if (bim != null)
        {
            try
            {
                ImageIO.write(bim, "png", new File(filename));
                U.inf("saved image at " + filename, o);
                return true;
            }
            catch (Exception e)
            {
                Log.stackTrace(e);
                U.log("*** image not saved " + filename, o);
                return false;
            }
        }
        
        return false;
    }

    static BufferedImage cropToSquare(BufferedImage image)
    {
        int w = image.getWidth(null);
        int h = image.getHeight(null);
        
        int x0 = 0, y0 = 0, wn = w, hn = h;
        
        if (w > h)
        {
            x0 = (w - h) / 2;
            wn = h;
        }
        else
        {
            y0 = (h - w) / 2;
            hn = w;
        }
        
        BufferedImage img = image.getSubimage(x0, y0, wn, hn);
        BufferedImage copyOfImage = new BufferedImage(img.getWidth(), img.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D g = copyOfImage.createGraphics();
        g.drawImage(img, 0, 0, null);
        return img;
    }
    
    public static void main(String[] args) 
    {
        try
        {
            File inputFile = new File("/Users/matt/Desktop/support.png");
            BufferedImage inputImage = ImageIO.read(inputFile);
            BufferedImage b = cropToSquare(inputImage);
            BufferedImage br = resize(b, 200, 200);
            ImageIO.write(br, "png", new File("/Users/matt/Desktop/22.png"));
        }
        catch (IOException e) 
        {
            System.out.println("Error resizing the image.");
            Log.stackTrace(e);
        }
    }
    
    public static String imgToBase64String(BufferedImage img, String formatName)
    {
      final ByteArrayOutputStream os = new ByteArrayOutputStream();

      try
      {
        ImageIO.write(img, formatName, os);
        return Base64.getEncoder().encodeToString(os.toByteArray());
      }
      catch (Exception e)
      {
        Log.stackTrace(e);
      }
      
      return null;
    }
}
