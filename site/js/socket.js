
    function onopen(event)
    {
        log("websocket opened");
        whenOpened();
    }

    function onerror(error)
    {
        var s = "null socket";

        if (socket != null)
            s = readyString();

        log("socket error: " + error + ", " + s);

        // todo we should restart everything
    }

    function onclose(event)
    {
        var s = "null socket";

        if (socket != null)
            s = readyString();

        log("websocket connection closed, code = " + event.code + ", reason = " + event.reason + ", " + s + ", wait the restart timeout ...");
    }

    function onmessage(event)
    {
        log("\n--- new message");
        log("Message received: " +  truncate(event.data, 30));
        remoteMessage(event.data);
    }

    function initWebSocket()
    {
        var waitTime = new Date().getTime() - initTime;

        if (socket == null)
        {
            log("initWebSocket - socket is null");
            iws();
        }
        else if (socket.readyState == Closed)
        {
            log("initWebSocket - socket is Closed -- restart");
            iws();
        }
        else if (socket.readyState == Open)
        {
            //log("initWebSocket - " + readyString());
        }
        else if (socket.readyState == Connecting || socket.readyState == Closing)
        {
            if (waitTime > RestartTimeout)
            {
                // close then wait

                log("initWebSocket - timeout exceeded -  closing");
                socket.close();
                initTime = new Date().getTime();
            }
            else
            {
                log("initWebSocket - already " + readyString() + " ... waiting " + waitTime);
            }
        }

        setTimeout(initWebSocket, RestartTimeout / 10);
    }

    function iws()
    {
        log("------------------ beging iws- " + readyString());
        initTime = new Date().getTime();

        var ep = WebSocketProtocol() + Domain() + ":8887/";

        socket = new WebSocket(ep);

        log("initWebSocket - created new websocket, " + readyString());

        socket.onopen = onopen;
        socket.onclose = onclose;
        socket.onerror = onerror;

        socket.onmessage = onmessage;
    }
    
    function connect(currentToken, ru)
    {
        messages = [];
        users = [];
        lastListlen = 0;
        
        sendConnectMessage(currentToken, ru);
    }

    function sendConnectMessage(token, username)
    {
        if (username == null || username == "undefined") 
        {
            logError("*** trying to send connect message with null user");
            return;
        }

        //var msg = "C" + separator + token + separator + u;

        var m = JSON.stringify(
            {
                type: "connect",
                token: token,
                username: username
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

    function signin(currentToken)
    {
        messages = [];
        users = [];
        sendSignInMessage(currentToken);
    }

    function sendSignInMessage(token)
    {
        var m = JSON.stringify(
            {
                type: "signin",
                token: token,
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

    // if closed and reopened this must be changed

    function whenOpened()
    {
        if (getUrlVars("a") == "create")
            changePage("create");
        else
            changePage("login");

        if (!CommunityPageRefreshStarted) setInterval(CommunityPageRefresh, RefreshTimeout);
        CommunityPageRefreshStarted = true;

        document.addEventListener("visibilitychange", function() 
        {
            statusUpdate();
        });

        document.addEventListener('input', function (event) 
        {
            if (event.target.tagName.toLowerCase() !== 'textarea') return;
            autoExpand(event.target);
        }, false);
    }

    function socketsend(msg)
    {
        message2send = msg;
        socketsender();
    }

    function socketsender()
    {
        if (socket == null)
        {
            logError("*** cannot send - socket is null");
            return;
        }
        else if (socket.readyState != Open)
        {
            setTimeout(socketsender, 50);
            if (debug) log("wait till socket open");
            return;
        }

        socket.send(message2send);

        log("*** msg sent via websocket: " + message2send);
    }
