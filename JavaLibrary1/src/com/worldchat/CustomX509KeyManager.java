/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.worldchat;
/*
import java.io.*;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.lang.*;
import java.net.URL;
import com.sun.net.httpserver.HttpsServer;
import java.security.KeyStore;
import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.KeyManager;
import javax.net.ssl.X509KeyManager;
import javax.net.ssl.TrustManagerFactory;
import com.sun.net.httpserver.*;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLParameters;
import java.io.*;
import java.util.*;
import java.net.InetSocketAddress;
import java.lang.*;
import java.net.URL;
import com.sun.net.httpserver.HttpsServer;

import java.security.*;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.TrustManagerFactory;
import com.sun.net.httpserver.HttpsServer;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsConfigurator;
import javax.net.ssl.SSLEngine;
import javax.net.ssl.SSLParameters;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.PublicKey;

import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URLConnection;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import java.net.InetAddress;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsExchange;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URLConnection;

import javax.net.ssl.X509ExtendedKeyManager;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;

import java.net.InetAddress;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsExchange;

public class CustomX509KeyManager extends X509ExtendedKeyManager
{
   //private static final Logger LOG = Logger.getLogger( CustomX509KeyManager.class );
   private final X509KeyManager originalKeyManager;
   char[] password = "plexus".toCharArray();
   KeyStore keyStore;
           
   public CustomX509KeyManager(final X509KeyManager keyManager)
   {
      super();
      this.originalKeyManager = keyManager;
      System.out.println("create custom");
   }
   @Override
   public String[] getServerAliases(String s,Principal[] p) 
   {
       String[] a = originalKeyManager.getServerAliases(s, p);
       System.out.println("get server aliases, first = " + a[0]);
       return a;
   }
   @Override
   public String[] getClientAliases(String keyType,Principal[] issuers)
   {
       
       String[] a = originalKeyManager.getClientAliases(keyType, issuers);
       System.out.println("get client aliases, first = " + a[0]);
       return a;
   }

   @Override
   public String chooseServerAlias(final String keyType, final Principal[] issuers, final Socket socket)
   {
      final String serverAliases=
            this.originalKeyManager.chooseServerAlias( keyType, issuers, socket );
      System.out.println("choose client aliases, first = " + serverAliases);
      return serverAliases;
   }

   @Override
   public PrivateKey getPrivateKey(String alias)
   {
       try {
           System.out.println("get private key alias = " + alias);
           PrivateKey p =  (PrivateKey) keyStore.getKey(alias, password);
           int len = p.toString().length() < 100 ? p.toString().length() : 99;
           System.out.println("get private key  = " + p.toString().substring(0, len));
           return p;
       } catch (Exception e) {
            e.printStackTrace();
            return null;
       }
    }
   
   public String chooseClientAlias(String[] keyType,Principal[] issuers,Socket socket)
   {
       String a = originalKeyManager.chooseClientAlias(keyType, issuers, socket);
       System.out.println("choose client aliases = " + a);
       return a;
   }

    @Override
    public X509Certificate[] getCertificateChain(String alias)
    {
        try {
            System.out.println("get certifcate chain");
       
            java.security.cert.Certificate[] certs = keyStore.getCertificateChain(alias);
            if (certs == null || certs.length == 0)
            {
                System.out.println("get certifcate chain - returning null");
                return null;
            }
            X509Certificate[] x509 = new X509Certificate[certs.length];
            for (int i = 0; i < certs.length; i++)
                x509[i] = (X509Certificate)certs[i];
            
            System.out.println("get certifcate chain - returning " + x509.length);
            return x509;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }          
    }
    @Override
    public String chooseEngineClientAlias(String[] s, Principal[] p, SSLEngine e)
    {
        System.out.println("choose engine client alias");
        return super.chooseEngineClientAlias(s, p, e);
    }
            
    @Override
    public String chooseEngineServerAlias(String s, Principal[] p, SSLEngine e)
    {
        System.out.println("choose engine server alias " + s);
        System.out.println("choose engine server alias " + p);
        System.out.println("choose engine server alias " + e);
        String a = super.chooseEngineServerAlias(s, p, e);
        System.out.println("choose engine server alias (not returned) " + a);
        System.out.println("");
        return "rainbow.chat";
    }
}
*/