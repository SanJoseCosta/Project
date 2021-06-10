package com.worldchat;

import java.io.FileInputStream;
import java.security.KeyStore;
import javax.net.ssl.KeyManager;
import java.net.InetSocketAddress;
import java.security.SecureRandom;
import javax.net.ssl.KeyManagerFactory;
import com.sun.net.httpserver.HttpsServer;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsConfigurator;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLParameters;
import javax.net.ssl.SSLContext;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class SecureServer 
{
    // !!! Your keystore file name goes here:
    static String filename = "/home/ec2-user/" + Main.ProductName + "keystore.jks";

    // !!! Your password goes here
    static char[] password = "plexus".toCharArray();
    static int Port = 443;
    
    static HttpsServer httpsServer;
    static KeyStore keyStore;

    SecureServer() 
    {
        try {
            InetSocketAddress address = new InetSocketAddress(Port);

            httpsServer = HttpsServer.create(address, 0);
            SSLContext sslContext = getSslContext();

            httpsServer.setHttpsConfigurator(new HttpsConfigurator(sslContext) 
            {
                public void configure(HttpsParameters params) 
                {
                    try 
                    {
                        SSLContext context = getSSLContext();
                        SSLEngine engine = context.createSSLEngine();
                        params.setNeedClientAuth(false);
                        params.setCipherSuites(engine.getEnabledCipherSuites());
                        params.setProtocols(engine.getEnabledProtocols());

                        SSLParameters sslParameters = context.getSupportedSSLParameters();
                        params.setSSLParameters(sslParameters);
                    } 
                    catch (Exception ex) {
                        System.out.println("Failed to create HTTPS port");
                    }
                }
            });

            httpsServer.createContext("/", new HTTPSWebRequestHandler());
            
            ExecutorService executor = Executors.newCachedThreadPool();
            httpsServer.setExecutor(executor);
            
            httpsServer.start();

            System.out.println("Started HTTPS server on port " + Port);
        } 
        catch (Exception exception) 
        {
            System.out.println("Failed to create HTTPS server on port " + Port);
            exception.printStackTrace();
        }
    }

    static KeyManager[] getKeyManagers(final KeyManagerFactory keyManagerFactory) {
        final KeyManager[] keyManagers = keyManagerFactory.getKeyManagers();
        return keyManagers;
    }

    static SSLContext getSslContext() throws Exception {
        createKeyStore();
        final KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        keyManagerFactory.init(keyStore, password);

        final SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(getKeyManagers(keyManagerFactory), null, new SecureRandom());
        return sslContext;
    }

    static void createKeyStore() throws Exception {
        keyStore = KeyStore.getInstance("JKS");
        FileInputStream fis = new FileInputStream(filename);
        keyStore.load(fis, password);
    }
    
    static void stop() 
    {
        U.log("https server stopping");
        if (httpsServer != null) {
            httpsServer.stop(0);
        }
    }
}
