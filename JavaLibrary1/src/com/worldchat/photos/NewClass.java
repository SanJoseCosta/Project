
package com.worldchat.photos;

import java.awt.image.*;
import java.io.*;
import javax.imageio.*;
import java.util.*;

public class NewClass {
  
	static String outDirectory;
	
	public static void main(String[] a)
        {
            //12903
            analyze("/Users/matt/Desktop/images/k5704.jpg");
        }
        
        static void y()
        {
            go("/Users/matt/Desktop/allimages/");
            System.out.println("===========================================");
            
            System.out.println(undup());
            System.out.println(undup());
            
            list = Sort.sort(list);
            
            for (int i = 0; i < list.size(); ++i) 
                System.out.println(list.get(i));
            
            /*
            for (int i = 0; i < list.size(); ++i)
            {
                Photo p = list.get(i);
                if (p.name.startsWith("k"))
                {
                    Photo s = find(p, false);
                    if (s == null)
                        System.out.println(p.name);
                }
                else
                {
                    Photo s = find(p, true);
                    if (s == null)
                        System.out.println(p.name);
                }
            }
            */
        }
        
        static void x()
        {
            n = 0;
            go("/Users/matt/Desktop/googlephotos/");
            
            System.out.println(undup());
            System.out.println(undup());
            
            System.out.println("===========================================");
            
            for (int i = 0; i < list.size(); ++i)
            {
                System.out.println("cp \"" + list.get(i).path + "\" /Users/matt/Desktop/allimages/k" + i + "." + list.get(i).type());
            }
	}
        
        static int n;
        static ArrayList<Photo> list = new ArrayList<Photo>();
        
        static void go(String dirname)
        {
            String[] dirs = new File(dirname).list();
            if (dirs != null)
                for (int i = 0; i < dirs.length; ++i)
                {
                    String filename = dirname + "/" + dirs[i];
                    if (new File(filename).isDirectory())
                    {
                        go(filename);
                    }
                    else if (filename.toLowerCase().endsWith(".png") || filename.toLowerCase().endsWith(".jpg") || filename.toLowerCase().endsWith(".gif") || filename.toLowerCase().endsWith(".jpeg"))
                    {
                        n++;
                        //System.out.println(n);
                        process(dirs[i], filename);
                    }
                }
        }
        
        static Photo find(Photo s, boolean k)
        {
            for (int i = 0; i < list.size(); ++i)
            {
                Photo p = list.get(i);
                if ((p.name.startsWith("k") && k) || (!p.name.startsWith("k") && !k))
                    if (p.equals(s))
                    {
                        return p;
                    }
            }
            return null;
        }
        
        static boolean undup()
        {
            boolean b = true;
            for (int i = 0; i < list.size(); ++i)
            {
                Photo p = list.get(i);
                for (int j = list.size() - 1; j > i ; --j)
                    if (p.equals(list.get(j)))
                    {
                        //System.out.println(p.name + " " + list.get(j).name);
                        list.remove(j);
                        b = false;
                    }
            }
            return b;
        }
        
        static void analyze(String p)
        {
            try
            {
                File inputFile = new File(p);
                long size = inputFile.length();
                
                BufferedImage inputImage = ImageIO.read(inputFile);
                if (inputImage == null)
                {
                    System.out.println("=== null inputImage");
                    return;
                }
             
                int w = inputImage.getWidth();
                int h = inputImage.getHeight();
             
                System.out.println(w + " " + h);
                
                int[] sample = new int[4];
                   
                float tot = 0;
                int n = 0;
                    
                for (int i = 0; i < w; ++i)
                    for (int j = 0; j < h; ++j)
                    {
                        sample = LongToInts(inputImage.getRGB(i, j), 4, true);
                      
                        float tp = 0;
                        float ave = (sample[0] + sample[1] + sample[2]) / 3; 
                        
                        for (int k = 0; k < 3; ++k)
                        {
                            float y = sample[k] - ave;
                            tp += y * y;
                        }
                        
                        tot += (float) Math.sqrt(tp);
                        n++;
                    }
                
                
                System.out.println(p + " " + tot / n);
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }  
        }
            
        static void process(String s, String p)
        {
            try
            {
                File inputFile = new File(p);
                long size = inputFile.length();
                
                BufferedImage inputImage = ImageIO.read(inputFile);
                if (inputImage == null)
                {
                    System.out.println("=== null inputImage");
                    return;
                }
             
                int w = inputImage.getWidth();
                int h = inputImage.getHeight();
               
                Photo ph = new Photo(s, p, size, w, h);
                
                list.add(ph);
                
                System.out.println(list.size());
                 
                if (false)
                {
                   
                    int[] sample = new int[4];
                    //Raster r = inputImage.getData();
                    
                    for (int i = 0; i < inputImage.getWidth(); ++i)
                        for (int j = 0; j < inputImage.getHeight(); ++j)
                        {
                            //r.getPixel(i, j, sample);
                            
                            sample = LongToInts(inputImage.getRGB(0, 0), 4, true);
                            System.out.print(s + " bytes: ");
                            for (int k = 0; k < 4; ++k)
                                System.out.print(sample[k] + " " );
                            System.out.println(" ");
                            //System.out.println(" " + s + " " + size + " " + h + " " + w);
                        }
                    
                    

                    
                }
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }  
        }
	
        static int colorsx(Raster ras)
        {
            int[] a = new int[4];
                     
            int w = ras.getWidth();
            int h = ras.getHeight();
            
            ras.getPixel(0, 0, a);
            
            if (a[3] != 0)
            {
            for (int i = 0; i < 4; ++i)
                System.out.print(a[i] + " " );
            System.out.println(", " + w +  " " + h);
            }
            return 0;
        }
        
    public static int[] LongToInts(long n, int k, boolean le)
    {
    	int[] x = new int[k];
    	
    	for (int i = 0; i < k; ++i)
    	{
            x[le ? i : k - 1 - i] = (byte) (n & 255);
            n >>= 8;
    	}
        for (int i = 0; i < k; ++i)
            if (x[i] < 0)
                x[i] += 256;
        
    	return x;
    }

    
    
    static void fb()
    {
        LineNumberReader in;
        StringBuilder all = new StringBuilder();
        
        try 
        {
            PrintWriter pw = new PrintWriter(new FileOutputStream(new File("/Users/matt/Desktop/facebook.html")));
            in = new LineNumberReader(new InputStreamReader(new FileInputStream(new File("/Users/matt/Desktop/f.html")), "UTF8"));
             while (true) {
                String s = in.readLine();
                if (s == null) {
                    break;
                }
                //zc
                all.append(s);
                //System.out.println("done");
            }
            in.close();
            
            System.out.println("done");
           
            int n = 0;
            int k = 0;
            while (true)
            {
                //System.out.println(n++);
                
                int m1 = all.indexOf("[[[", k);
                
                
                if (m1 < 0) break;
                
                int m2 = all.indexOf("]]]", m1 + 1);
                
                k = m2 + 3;
                
                String p = all.substring(m1 + 3, m2);
                //System.out.println(p);
                pw.println(p);
                
                System.out.println(++n);
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
