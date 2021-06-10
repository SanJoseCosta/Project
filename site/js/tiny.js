

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
            return "just now";
        if (time < 60)
            return t2(time, "sec");
        time = time / 60;
        if (time < 200)
            return t2(time, "min");
        time = time / 60;
        if (time < 50)
            return t2(time, "hr");
        time = time / 24;
        if (time < 25)
            return t2(time, "day");
        time = time / 7;
            return t2(time, "week");
        
        //else
        //{
        //    var d = new Date(time);
        //    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
        //}
    }

    function t2(t, s)
    {
        t = Math.floor(t);
        if (t == 1)
            return t + " " + s + " ago";
        else
            return t + " " + s + "s ago";
    }

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

