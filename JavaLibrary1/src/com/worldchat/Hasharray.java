
package com.worldchat;

import java.util.ArrayList;
import java.util.HashMap;
/*
public class Hasharray {

    private ArrayList<User> items = new ArrayList<User>();
    private HashMap<String, User> byemail = new HashMap<String, User>();
    private HashMap<String, User> byusername = new HashMap<String, User>();

    static boolean UseMaps = false;

    void addUser(User u) throws Exception {
        // if exists then error

//		if (findByEmail(u.email()) != null || findByUsername(u.username()) != null)
//		{
//			String msg = "trying to add a user but that user already exists";
//			U.log(msg);
//			throw new Exception(msg);
//		}
        //put(byemail, u.email(), u);
        put(byusername, u.username(), u);

        items.add(u);
    }

    void put(HashMap hm, String key, User user) {
        if (UseMaps) {
            hm.put(key, user);
        } else {

        }
    }

    void remove(HashMap hm, String key) {
        if (UseMaps) {
            hm.remove(key);
        } else {

        }
    }

    void changeUsername(String oldvalue) {
        if (!UseMaps) {
            User u = findByUsername(oldvalue);
            if (u != null) {
                remove(byusername, oldvalue);
                put(byusername, u.username(), u);
            } else {
                U.log("changeUsername cannot find olduser " + oldvalue);
            }
        }
    }

    void changeEmail(String oldvalue) {
        if (!UseMaps) {
            User u = findByEmail(oldvalue);
            if (u != null) {
                remove(byemail, oldvalue);
                //put(byemail, u.email(), u);
            } else {
                U.log("changeEmail cannot find olduser " + oldvalue);
            }
        }
    }
    
    void replaceUser(User newuser, User olduser) throws Exception {
        // if doesnt exist error

        //User e = findByEmail(olduser.email());
        User v = findByUsername(olduser.username());

        if (e == null || v == null) {
            String msg = "trying to replace a user but that user doesnt exist " + e + " " + v;
            U.log(msg);
            throw new Exception(msg);
        }

        if (!UseMaps) {
            if (e == v) {
                // replace

                put(byemail, newuser.email(), newuser);
                put(byusername, newuser.username(), newuser);

                items.remove(olduser);
                items.add(newuser);
            }
        } else {
            items.remove(olduser);
            items.add(newuser);
        }
    }
    
    int size() {
        return items.size();
    }

    User getByIndex(int n) {
        if (n >= 0 && n < items.size()) {
            return items.get(n);
        } else {
            return null;
        }
    }

    User findByEmail(String email) {
        long t = System.currentTimeMillis();

        if (UseMaps) {
            return byemail.get(email);
        } else {
            for (int i = 0; i < items.size(); ++i) {
                if (items.get(i).email().equals(email)) {
                    return items.get(i);
                }
            }
            U.log("findbyemail " + email + " in milliseconds " + (System.currentTimeMillis() - t));
            return null;
        }
    }

    User findByUsername(String username) {
        if (username == null) {
            return null;
        }

        long t = System.currentTimeMillis();

        if (UseMaps) {
            User u = byusername.get(username);
            return u;
        } else {
            for (int i = 0; i < items.size(); ++i) {
                if (items.get(i).username().equals(username)) {
                    return items.get(i);
                }
            }
            U.log("findbyusername " + username + " in milliseconds " + (System.currentTimeMillis() - t));
            return null;
        }
    }

    User findByTokenxxx(String token) {
        if (token == null) {
            return null;
        }

        for (int i = 0; i < items.size(); ++i) 
        {
            ArrayList<String> tokens = null;//items.get(i).tokens();
            if (tokens != null) {
                for (int j = 0; j < tokens.size(); ++j) {
                    if (tokens.get(j).equals(token)) {
                        return items.get(i);
                    }
                }
            }
        }
     
        //U.log("findbytoken " + token + " in milliseconds " + (System.currentTimeMillis() - t));
        
        return null;
    }
}
*/