

    function sendCheckRequest(obj)
    {
        var m = JSON.stringify(obj);

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending request to server: " + err.message);
        }
    }

    function sendRefreshRequest()
    {
        var m = JSON.stringify(
            {
                type: "refresh"
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending refresh request to server: " + err.message);
        }
    }

    function sendResetRequest(email)
    {
        var m = JSON.stringify(
            {
                type: "reset",
                email: email
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending reset request to server: " + err.message);
        }
    }

    function changePassword(newpassword)
    {
        var m = JSON.stringify(
            {
                type: "changepassword",
                token: currentToken,
                password: newpassword
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending changepassword request to server: " + err.message);
        }
    }

    function searchUsers(token, username)
    {
        //var m = "F" + separator + t + separator + s;

        var m = JSON.stringify(
            {
                type: "find",
                token: token,
                username: username
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending search request to server: " + err.message);
        }
    }

    function inviteUser(email)
    {
        //var m = "I" + separator + email + separator;

        var m = JSON.stringify(
            {
                type: "invite",
                email: email,
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending invite request to server: " + err.message);
        }
    }

    function setLanguage(lan)
    {
        //var m = "I" + separator + email + separator;

        var m = JSON.stringify(
            {
                type: "language",
                language: lan,
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending language to server: " + err.message);
        }
    }

    function sendSignOutMessage()
    {
        //var msg = "s" + separator;

        var m = JSON.stringify(
            {
                type: "signout",
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

     function sendAck(mid, status)
    {
        //var m = "A" + separator + id + separator + status;

        var m = JSON.stringify(
            {
                type: "ack",
                status: status + "",
                mid: mid
            });

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending ack to server: " + err.message);
        }
    }

    function getMobile()
    {
        return mobile;
    }

    function readyString()
    {
        if (socket == null) return "Socket null";
        var n = socket.readyState
        var s = "readyState = ";
        if (n == 0) return s + "Connecting";
        if (n == 1) return s + "Open";
        if (n == 2) return s + "Closing";
        if (n == 3) return s + "Closed";
        return "readyState unknown";
    }

    function serverRequest(s)
    {
        return Protocol() + Domain() + s;
    }

    function imageRequest(s)
    {
        return Protocol() + Domain() + s;
    }

    function htmlRequest(s)
    {
        return "." + s;
    }

    function Protocol() 
    { 
        if (Secure)
            return "https://"; 
        else
            return "http://"; 
    }

    function Domain() 
    { 
        return DomainName;
    }

    function WebSocketProtocol()
    {
        if (Secure)
            return "wss://";
        else
            return "ws://";
    }

    function getUrlVars(s)
    {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        if (vars[s] != null)
          return decodeURI(vars[s]);
        else
          return null;
    }

    function id()
    {
        var d = new Date();
        var n = d.getTime();

        n = n + "";
        for (var i = 0; i < 10; ++i)
            n += Math.floor(Math.random() * 10) + "";

        return n;
    }


    function log(s)
    {
        var d = new Date();
        console.log(d + ": " + s);
    }

    function get(s)
    {
        return document.getElementById(s);
    }

    function clear(n)
    {
        get(n).innerText = "";
    }

    function timeDisplayStringFromUnixTime(t)
    {
        var time = parseInt(t);
        return tds(time);
    }

    function tds(time)
    {
        time = Date.now() - time;
        time = time / 1000;

        if (time < 1)
        {
            return "just now";
        }

        var timelens = [60, 60, 24, 30];

        for (var i = 0; i < timelens.length; ++i)
        {
            if (time < timelens[i])
                return maketimestring(i, time);
            time = time / timelens[i];
        }

        return maketimestring(i, timelens.length);


        /*
        if (time < 60)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "second" + end;
        }
        time = time / 60;

        if (time < 60)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "minute" + end;
        }
        time = time / 60;

        if (time < 24)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "hour" + end;
        }
        time = time / 24;

        if (time < 30)
        {
            if (Math.floor(time) > 1) end = "s";
            units = "day" + end;
        }
        time = time / 30;

        if (Math.floor(time) > 1) end = "s";
        units = "month" + end;
        */
    }

    function maketimestring(i, time)
    {
        var units = "";
        var t = Math.floor(time);
        if (t > 1)
            units = timestrings[5 + i];
        else
            units = timestrings[i];
        return t + " " + units + " <blah>previously</blah>";
    }

    var timestrings =   [   
                        "<blah>second</blah>", 
                        "<blah>minute</blah>", 
                        "<blah>hour</blah>", 
                        "<blah>day</blah>", 
                        "<blah>month</blah>", 

                        "<blah>seconds</blah>", 
                        "<blah>minutes</blah>", 
                        "<blah>hours</blah>", 
                        "<blah>days</blah>", 
                        "<blah>months</blah>"
                        ];
    /*
    function t2(t, s)
    {
        t = Math.floor(t);
        if (t == 1)
            return t + " " + s + " ago";
        else
            return t + " " + s + "s ago";
    }
    */
    
    function replaceAll(base, find, rep)
    {
        while (base.indexOf(find) >= 0)
        {
            base = base.replace(find, rep);
        }
        return base;
    }

    function timeString(m)
    {
        return timeDisplayStringFromUnixTime(m.mid.substring(0, m.mid.length - 10));
    }

    function cleanedString(t)
    {
        var x = t;

        t = t.trim();
        t = t.replace("\n", " ");

        if (x != t)
            log("original message: " + x + " corrected message: " + t);

        return t;
    }

    function truncate(s, n)
    {
        if (s.length < n)
            return s;
        else
            return s.substring(0, n) + " ...";
    } 

    function logError(s)
    {
        log(s);
    }
   
    function reportError(s)
    {
        log(s);
    }

