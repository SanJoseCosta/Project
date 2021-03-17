
    var separator = "-a7e3i-";

// this is a test
    
    var numberOfFieldsInUserDescriptor = 12;
    var numberOfFieldsInMessageDescriptor = 5;
    var DefaultProfilePic = "/images/default.png";
    var users = [];
    var messages = [];
    var mobile = /Mobi|Android/i.test(navigator.userAgent);
    var socket = null;

    var messageBeingTranslated;
    var imageChanged;
    var isCreating;

    var remoteUsername;

    var pageMode = 99;
    var currentToken = null;

    // pageMode values
    // 0 = edit/create
    // 1 = community
    // 2 = chats
    // 3 = conversation

    var debug = false;
    var NoChangePassword = "**********";

    // readystate

    var Connecting = 0;
    var Open = 1;
    var Closing = 2;
    var Closed = 3;

    var RestartTimeout = 3000;
    var initTime = 0;

    var Secure = true;

    // where to go up on receiving a 2 type response to a 1 type request
    var pendingHandler;

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
        return "malt.chat"; 
    }

    function WebSocketProtocol()
    {
        if (Secure)
            return "wss://";
        else
            return "ws://";
    }

    function localInput(t)
    {
        var text = cleanedString(t);

        messageBeingTranslated = text;

        var tolang = findRemoteUser().language;
        var fromlang = findLocalUser().language;

        if (fromlang == tolang)
            completeTranslation(text);
        else
            requestTranslation(tolang, fromlang, text) //, completeTranslation);
    }

    function completeTranslation(translation)
    {
        var mid = id();

        // send to server
        var m = "M" + separator + messageBeingTranslated + separator + translation + separator + mid;

        var status;
        try
        {
            socketsend(m);
            status = 1;
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message);
            status = -1;
        }

        var msg = makeMessage(mid, messageBeingTranslated, translation, true, status);
                
        // add to conversation and display
        addMessage(msg, false);

        pageUpdate(true);
    }

    function remoteMessage(t)
    {
        // todo filter html from messages

        t = t.replace("<", "V");
        var parts = t.split(separator);

        if (parts[0] == "M")
            if (parts.length < 4) 
            {
                logError("*** invalid message received: " + t);
                return;
            }
        if (parts[0] == "A")
            if (parts.length < 5) 
            {
                logError("*** invalid message received: " + t);
                return;
            }
        if (parts[0] == "H")
            if (parts.length < 6 && parts[1] != "") 
            {
                logError("*** invalid message received: " + t + " length " + parts.length);
                return;
            }

        var status = 4;
        if (document.hidden)
            status = 3;

        // M, text, translation, id
        // A, text, translation, id, receivedStatus
        // H, text, translation, id, receivedStatus, local ...

        var messages = false;

        if (parts[0] == "M")
        {
            var m = makeMessage(parts[3], parts[1], parts[2], false, "0");
            addMessage(m, false);
            sendAck(parts[3], status);

            messages = true;
        }
        else if (parts[0] == "A")
        {
            var m = makeMessage(parts[3], parts[1], parts[2], true, parts[4]);
            addMessage(m, true);
            messages = true;
        } 
        else if (parts[0] == "H")
        {
            receiveHistory(parts, status);
            messages = true;
        } 
        else if (parts[0] == "U" || parts[0] == "X")
        {
            receiveUsers(parts);
        }
        else if (parts[0] == "I")
        {
            // todo make better notification boxes

            if (parts[1] == "ok")
                alert("the invitation email was sent successfully");
            else
                alert("there was an error while trying to send the invitation email");

            document.getElementById("search").style.visibilityState = "hidden";
        }
        else if (parts[0] == "F")
        {
            if (parts.length < 2)
            {
                // todo make better notification boxes

                alert("that username was not found");
            }
            else
            {
                // start conversation

                receiveUsers(parts);
                talk(parts[2]);
            }

            //document.getElementById("search").style.visibilityState = "hidden";
        }
        else if (parts[0].startsWith("x"))
        {
            logError("***************************** received error: " + parts[0]);
            
            if (parts[0].indexOf("xinvalidSigninMessage") >= 0 || 
                parts[0].indexOf("xuserNotFoundByToken") >= 0 ||
                parts[0].indexOf("xlogoutPreviousConnectionInSameConversation") >= 0)
            {
                logout();
                return;
            }
        }
        else if (parts[0] == "2")
        {
            log("reponse is " + parts[1]);
            pendingHandler(parts[1]);
        }
        else
        {
            logError("*** invalid message received: " + t);
        }

        pageUpdate(messages);
    }

    function sendAck(id, status)
    {
        var m = "A" + separator + id + separator + status;

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending ack to server: " + err.message);
        }
    }

    function statusUpdate()
    {
        if (document.hidden)
            return;

        for (var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            if (message.status != 4 && !message.localSender)
            {
                message.status = 4;
                sendAck(message.mid, 4);
            }
        }
    }

    function sendCheckRequest(type, p1, p2)
    {
        var m = "1" + separator + type + separator + p1 + separator;
        if (p2 != null) m += p2;

        log("send " + m);

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
        var m = "R" + separator;

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending refresh request to server: " + err.message);
        }
    }

    function searchUsers(t, s)
    {
        var m = "F" + separator + t + separator + s;

        log("send " + m);

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
        var m = "I" + separator + email + separator;

        try
        {
            socketsend(m);
        } 
        catch (err)
        {
            logError("*** error while sending invite request to server: " + err.message);
        }
    }

    function edit()
    {
        imageChanged = false;
        changePage("edit");

        // server will send full local user info
    }
    
    function languagePop()
    {
        var s = "<select id=languageselect class=language select-css>";
        s += "<option value='' class=lng>Choose Language</option>";

        for (var i = 0; i < languages.length; i = i + 2)
            s += "<option value=" + languages[i + 1] + " class=lng>" + languages[i] + "</option>"

        s += "</select>";
        
        return s;
    }

    function logout()
    {
        localStorage.setItem("token", null);
        sendSignOutMessage();
        changePage("login");
    }

    function makeUser(p, u, o, l, i, h, lastMessage , lastTranslation, lastMessageId, lastStatus, lastMessageSender, em)
    {
        var m = {};

        m.pic = (p == "true");
        m.username = u;
        m.onlinestatus = parseInt(o);
        m.language = l;
        m.remote = i == "true";
        m.local = h  == "true";
        m.lastMessage =             lastMessage;
        m.lastTranslation =         lastTranslation;
        m.lastMessageId =           lastMessageId;
        m.lastStatus =              lastStatus;
        m.lastMessageSender =       lastMessageSender;  
        m.email = em;

        return m;
    }

    function allUsers()
    {
        for (var i = 0; i < users.length; ++i) displayUserInfo(users[i]);
    }

// lm li ls

    function displayUserInfo(user)
    {
        log("----- user info:");
        log("pic:                               " + user.pic);
        log("username:                          " + user.username);
        log("online status:                     " + user.onlinestatus);
        log("language:                          " + user.language);
        log("is this remote user:               " + user.remote);
        log("is this local user:                " + user.local);
        log("lastMessage:                       " + user.lastMessage);
        log("lastTranslation:                   " + user.lastTranslation);
        log("lastMessageId:                     " + user.lastMessageId);
        log("lastStatus:                        " + user.lastStatus);
        log("lastMessageSender:                 " + user.lastMessageSender);
        log("email:                             " + user.email);
        log("-----")
    }

    function picturefile(user)
    {
        //log("========= picture file finder " + user.username + " " + user.pic);

        if (user.pic)
            return picturepath(user.username); 
        else
            return defaultPic();
    }

    function defaultPic()
    {
        return imageRequest(DefaultProfilePic);
    }

    function picturepath(username)
    {
        return imageRequest("/images/" + username + ".png"); 
    }

    function addOrUpdateUser(pic, username, onlinestatus, language, remote, local, msg, trans, mid, status, sender, email)
    {
        var newuser = makeUser(pic, username, onlinestatus, language, remote, local, msg, trans, mid, status, sender, email);

        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.username == username)
            {
                users.splice(i, 1, newuser);
                if (debug) log("updated user: " + username);
                return;
            }
        }

        users.push(newuser);
        if (debug) log("added user: " + username);
    }

    function receiveUsers(s)
    {
        for (var i = 1; i < s.length; i += numberOfFieldsInUserDescriptor)
        {
            if (i + numberOfFieldsInUserDescriptor - 1 < s.length)
                addOrUpdateUser(s[i + 0], s[i + 1], s[i + 2], s[i + 3], s[i + 4], s[i + 5], s[i + 6], s[i + 7], s[i + 8], s[i + 9], s[i + 10], s[i + 11]);
        }
        if (debug)
        {
            log("--------------------------------------------");
            allUsers();
            log("--------------------------------------------");
        }
    }

    function findLocalUser()
    {
        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.local)
                return u;
        }
        return null;
    }

    function findRemoteUser()
    {
        if (debug) log("find remote user with id " + remoteUsername);

        if (debug) log("---all users");
        if (debug) for (var i = 0; i < users.length; ++i) log(i + " " + users[i].username + " is remote = " + users[i].remote);
        if (debug) log("---end users");

        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.username == remoteUsername)
            {
                if (debug) log("findremoteuser returns");
                if (debug) displayUserInfo(u);
                return u;
            }
        }

        if (debug) log("findremoteuser returns null");
        return null;
    }

    function getLocalPic()
    {
        if (findLocalUser() != null)
            return picturefile(findLocalUser());
        else
            return defaultPic();
    }

    function getRemotePic()
    {
        if (findRemoteUser() != null)
            return picturefile(findRemoteUser());
        else
            return defaultPic();
    }

    function sortedUsersExceptLocal()
    {
        var gu = [];
        
        for (var i = 0; i < users.length; ++i) 
            if (!users[i].local)
                gu.push(users[i]);

        var k = 0;

        while (true)
        {
            // find latest

            var max;
            var index = -1;

            for (var i = k; i < gu.length; ++i)
            {
                var time = parseInt(gu[i].lastMessageId.substring(0, gu[i].lastMessageId.length - 10));
                if (time > max || index < 0)
                {
                    max = time;
                    index = i;
                }
            }

            if (index < 0)
                break;

            if (index != k)
            {
                var h = gu[index];
                gu[index] = gu[k];
                gu[k] = h;
            }
            
            k++;
        }

        return gu;
    }

    function changeImage(input)
    {
        var reader;
        imageChanged = true;

        if (debug) log("image changed");

        if (input.files && input.files[0]) 
        {
            reader = new FileReader();

            reader.onload = 
                function (e) 
                {
                    get("previewimage").setAttribute("src", e.target.result);
                }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function upload(userdata, imageChanged, callback, imageSrc, token)
    {
        var formData = new FormData();
        
        if (imageChanged)
        {
            formData.append("image", imageSrc);
        }

        for (var i = 0; i < userdata.length; i = i + 2)
        {
            formData.append(userdata[i], userdata[i + 1]);
            if (debug) log(userdata[i] + "=" + userdata[i + 1]);
        }

        var ajax = new XMLHttpRequest();

        /// todo the .html on these calls is unnecessary

        if (token == null)
        {
            ajax.open("POST", serverRequest("/createuser.html"));
        }
        else
        {
            var params = "token=" + token;
            var encodedMessage = encodeURI(params);
            var page = serverRequest("/edituser.html?") + encodedMessage;

            if (debug) log("upload to " + page);

            ajax.open("POST", page);
        }
        
        ajax.onload = function (e)
        {
            callback(ajax);
        }

        ajax.onreadystatechange = function(e) 
        {
            if (ajax.readyState === 4) 
            {
                if (debug) 
                    if (ajax.status === 200) 
                        log("post request successful");
                    else
                        log("post request error: " + ajax.status);
            }
        }

        // ajax.upload.onprogress = function (e) {};

        ajax.send(formData);

        log("uploaded data");
    }

    function requestTranslation(tolang, fromlang, text) //, callback)
    {
        var base = "https://translation.googleapis.com/language/translate/v2?";
        var params = "target=" + tolang + "&source=" + fromlang + 
        "&key=" + "AIzaSyC3" +
                "1GV2BJqC" +
                "IoXCM6Nj" +
                "OtLohY-l" +
                "WV1bQ3Q" + "=&q=" + text; // key 

        pageRequest(base, params, recieveTranslation);

        // todo set a timeout in case the translation doesnt return
    }

    function parseTranslationResponse(r)
    {
        var search = "\"translatedText\": \"";
        var k = r.indexOf(search);

        if (k >= 0)
        {
            r = r.substring(k + search.length);
            k = r.indexOf("\"");
            if (k > 0)
            {
                return r.substring(0, k);
            }
        }

        return null;
    }

    function recieveTranslation(r)
    {
        var translateResponse = r.responseText;

        if (debug) log("received translation response " + translateResponse);

        var translation;
        if (translateResponse == null)
        {
            translation = "-unknown response from translator-";
        } 
        else
        {
            // now pull out the translated text

            translation = parseTranslationResponse(translateResponse);
            if (translation == null)
                translation = "-unknown response from translator-";
        }

        completeTranslation(translation);
    }
    
    function pageRequest(url, params, processfunction)
    {
        var encodedMessage = encodeURI(params);
        url = url + encodedMessage;

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send(null);

        log("page request for " + url);

        request.onload =
        function (e)
        {
            processfunction(request);
        }
    }

    function changePage(url)
    {
        log("go to " + url + " with token " + currentToken);

        var body = document.getElementsByTagName("BODY")[0];

        if (url == "login") 
        {
            loginStart(body);
        }
        else if (url == "edit") 
        {
            body.innerHTML = editPage();
            accountStart(false);
        }
        else if (url == "create") 
        {
            body.innerHTML = createPage();
            //log("body " + body.innerHTML);
            accountStart(true);
        }
        else if (url == "community") 
        {
            body.innerHTML = communityPage();
            pageMode = 1;
            remoteUsername = null;
        }
        else if (url == "chats") 
        {
            body.innerHTML = chatsPage();
            pageMode = 2;
            remoteUsername = null;
        }
        else if (url == "conversation") 
        {
            body.innerHTML = conversationPage();
            log("start conversation with " + remoteUsername);
            pageMode = 3;
        }
        else if (url == "support") 
        {
            body.innerHTML = supportPage();
        }
        else if (url == "reset") 
        {
            body.innerHTML = resetPage();
        }
        else if (url == "terms") 
        {
            body.innerHTML = termsPage();
        }
    }

    function makeMessage(id, t, tr, lg, s)
    {
        var m = {};

        m.mid = id;
        m.text = t;
        m.translation = tr;
        m.localSender = lg;
        m.status = parseInt(s);

        return m
    }

    function timeString(m)
    {
        return timeDisplayStringFromUnixTime(m.mid.substring(0, m.mid.length - 10));
    }

    function addMessage(msg, mustExist)
    {
        var replaced = false;

        for (var i = 0; i < messages.length; ++i)
        {
            if (messages[i].mid == msg.mid)
            {
                messages.splice(i, 1, msg);
                replaced = true;
                break;
            }
        }

        if (!replaced)
        {
            if (mustExist)
            {
                logError("*** cannot find message: " + msg);
                return;
            }

            messages.push(msg);
            if (debug) log("Added message: " + msg.mid + " " + msg.text + " " + msg.status);
        }
    }

    function receiveHistory(s, status)
    {
        for (var i = 1; i < s.length; i += numberOfFieldsInMessageDescriptor)
        {
            if (i + numberOfFieldsInMessageDescriptor - 1 < s.length)
            {
                if (s[i + 2] != "0")
                {
                    var m = makeMessage(s[i + 2], s[i + 0], s[i + 1], s[i + 4] == "true", s[i + 3]);
                    addMessage(m, false);

                    if (!m.localSender)
                        if (m.status != 4 && status == 4)
                            sendAck(m.mid, status);
                }
            }
        }
    }

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
        //if (debug) 
            log("\n--- new message");
        //if (debug) 
            log("Message received: " +  event.data);
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
        sendConnectMessage(currentToken, ru);
    }

    function sendConnectMessage(token, u)
    {
        if (u == null || u == "undefined") 
        {
            logError("*** trying to send connect message with null user");
            return;
        }

        //if (debug) 

        log("send connect with token " + token + " and user " + u);

        var msg = "C" + separator + token + separator + u;

        try
        {
            socketsend(msg);
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


    function sendSignInMessage(t)
    {
        var msg = "S" + separator + t;

        log("send signin with token " + t);

        try
        {
            socketsend(msg);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

    function sendSignOutMessage()
    {
        var msg = "s" + separator;

        try
        {
            socketsend(msg);
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message + ", " + readyString());
        }
    }

    var message2send;

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

        if (message2send.length > 20) message2send = message2send.substring(0, 20) + "(truncated)";
        log("msg sent via websocket: " + message2send);
    }

    /*
    function communityHeaderxxx()
    {
        var div = pageHeaderDiv();
        var picurl;
        var lu = findLocalUser();

        if (lu == null) 
        {
            logError("*** the local user is null in header()");
            return;
        }

        if (lu != null)
            picurl = picturefile(lu);
        else
            picurl = imageRequest(DefaultProfilePic);

        // clicking this goes to edit user settings

        var click = "onclick=\"edit();\""; 

        div = replaceAll(div, "$$picurl$$", picurl);
        div = replaceAll(div, "$$click$$", click);

        document.getElementById("header").innerHTML = div;
    }
    */

    function chatsHeader()
    {
        document.getElementById("chats-header").innerHTML = chatsHeaderDiv();
    }

    function chatsFooter()
    {
        document.getElementById("chats-footer").innerHTML = chatsFooterDiv();
    }

    function makebox(user, msg, time)
    {
        // make the box representing a single chat

        var box = singleChatSummary();
        
        //var timeSinceActive = tds(user.onlinestatus);

        var tsa = Date.now() - user.onlinestatus;
        
        //log("tsa " + tsa);

        var color;

        if (tsa <          3 * 60 * 1000) 
            color = "green";
        else if (tsa <    15 * 60 * 1000) 
            color = "yellow";
        else
            color = "red";

        var picurl = picturefile(user);

        var click = "\"talk('" + user.username + "')\"";
        
        //var bkgcolor = "blue";
        //box = replaceAll(box, "$$timesinceactive$$", timeSinceActive);
        
        box = replaceAll(box, "$$color$$", color);
        box = replaceAll(box, "$$time$$", time);
        box = replaceAll(box, "$$picurl$$", picurl);
        box = replaceAll(box, "$$click$$", click);
        box = replaceAll(box, "$$msg$$", msg);
        box = replaceAll(box, "$$name$$", user.username);
        
        //box = replaceAll(box, "$$bkgcolor$$", bkgcolor);

        return box;
    }

    function pageUpdate(msg)
    {
        if (pageMode == 0)
        {
            log("page update with mode 0");
        }
        else if (pageMode == 1)
        {
            log("update community");
            ChatsUpdate();

            if (remoteUsername == null)
            {
                var ru = defaultConversationUsername();
                if (ru == null)
                {
                    logError("*** cannot connect yet - no default conversation");
                }
                else
                {
                    remoteUsername = ru;

                    log("current default remoteUsername " + remoteUsername);

                    connect(currentToken, ru);
                }
            }
            else
            {
                log("current remoteUsername " + remoteUsername);
            }

            if (msg)
                ConversationUpdate();
        }
        else if (pageMode == 2)
        {
            if (debug) log("update chat only");
            ChatsUpdate();
        }
        else if (pageMode == 3)
        {
            if (debug) log("update conversation only");
            ConversationUpdate();
        }
        else
        {
            logError("*** CommunityUpdate with invalid page mode " + pageMode);
        }
    }

    function ChatsUpdate()
    {
        var t = "";

        var gu = sortedUsersExceptLocal();

        log("ChatsUpdate with " + gu.length + " users");

        for (var i = 0; i < gu.length; ++i)
        {
            var u = gu[i];
 
            if (u.lastMessageSender == null || u.lastMessageSender == "")
            {
                t += makebox(u, "", "");
            }
            else
            {
                var ts = "(" + timeDisplayStringFromUnixTime(u.lastMessageId.substring(0, u.lastMessageId.length - 10)) +")";

                // todo might need to use translation

                var unread = false;

                if (findLocalUser().username != u.lastMessageSender)
                    if (u.lastStatus != "4")
                    {
                        log("unread message: " + u.lastMessage + " status " + u.lastStatus + " from " + u.lastMessageSender);
                        unread = true;
                    }


                var b1 = unread ? "<b><i>" : "";
                var b2 = unread ? "</b></i>" : "";

                var lm = u.lastMessage;
                if (lm.length > 18)
                    lm = lm.substring(0, 18) + "..";

                var m = b1 + u.lastMessageSender + ": " + lm + b2;

                t += makebox(u, m, ts);
            }
        }

        document.getElementById("chats-list").innerHTML = t;

        pageHeader();

        chatsHeader();
        chatsFooter();
    }

    function ConversationUpdate()
    {
        log("ConversationUpdate ...");

        var ru = findRemoteUser();

        if (ru == null)
        {
            logError("*** cannot make conversation header with null user");
        }
        else
        {
            var luser = findLocalUser();

            log("make conversation header for " + luser.username + " with local pic " + getLocalPic());

            var div = conversationHeaderDiv();

            div = replaceAll(div, "$$picurl$$", picturefile(ru));
            div = replaceAll(div, "$$local$$", getLocalPic());

            div = replaceAll(div, "$$localusername$$", luser.username);

            div = replaceAll(div, "$$name$$", ru.username);
            div = replaceAll(div, "$$time$$", tds(ru.onlinestatus));

            div = replaceAll(div, "$$click$$", "onclick=\"edit();\"");

            document.getElementById("conversation-header").innerHTML = div;
        }

        var s = "";

        for (var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            var time = timeString(message);

            //log("message: " + message.text);

            if (message.localSender)
                s += rmsg(message.text, message.translation, message.status, getLocalPic(), time);
            else
                s += lmsg(message.translation, message.text, message.status, getRemotePic(), time);
        }

        var ml = document.getElementById("messages-list");

        ml.innerHTML = s;
        ml.scrollTop = ml.scrollHeight;
    }

    function talk(p)
    {
        log("begin conversation with " + p);

        remoteUsername = p;

        connect(currentToken, p);
    }

    function defaultConversationUsername()
    {
        var gu = sortedUsersExceptLocal();

        if (debug) log("defaultConversationUsername, "  + gu.length + " users")

        if (gu.length > 0)
        {
            if (debug) log("defaultConversationUsername " + gu[0].username);
            return gu[0].username;
        }
        else
        {
            logError("*** defaultConversationUsername, there are no users with whom to start conversation");
            return null;
        }
    }

    function CommunityPageRefresh()
    {
        log("refresh");
        setTimeout(CommunityPageRefresh, 50000);

        if (pageMode <= 4)
            sendRefreshRequest();
    }

    // put on left side
    function lmsg(msg, translation, status, pic, time)
    {
        var m = messageDisplayedLeft();

        m = replaceAll(m, "$$pic$$", pic);
        m = replaceAll(m, "$$time$$", time);

        m = replaceAll(m, "$$msg$$", msg);
        m = replaceAll(m, "$$translation$$", translation);

        return m;
    }

    // put on right side
    function rmsg(msg, translation, status, pic, time)
    {
        var statusImage;

        if (status == 4)
            statusImage = "images/status4.png";
        else if (status == 3)
            statusImage = "images/status3.png";
        else
            statusImage = "images/status0.png";

        var m = messageDisplayedRight();

        m = replaceAll(m, "$$pic$$", pic);
        m = replaceAll(m, "$$status$$", statusImage);
        m = replaceAll(m, "$$time$$", time);

        m = replaceAll(m, "$$msg$$", msg);
        m = replaceAll(m, "$$translation$$", translation);

        return m;
    }

    function messageBoxInput(e)
    {
        //log(e);

        var textarea = document.getElementById("msg");
        var n = textarea.value.charCodeAt(textarea.value.length - 1);

        if (n == 10)
        {
            localInput(textarea.value.substring(0, textarea.value.length - 1));
            ConversationUpdate();

            textarea.value = "";
            textarea.blur();

            return false;
        }

        return true;
    }

    function messageBoxSend()
    {
        var textarea = document.getElementById("msg");

        localInput(textarea.value);
        ConversationUpdate();
        textarea.value = "";
    }

    function inviteUser()
    {
        //log("invite");

        document.getElementById("search").style.visibilityState = "visible";
        document.getElementById("search").placeholder="invite: enter email of person to invite"
    }
    /*
    function searchUsersx()
    {
        log("search");

        document.getElementById("search").style.visibilityState = "visible";
        document.getElementById("search").placeholder="search: username or email of person to find"
    }
    */
    function chatSettings()
    {
        alert("not available yet");
    }

    function chatsInput()
    {
        var e = document.getElementById("search");

        var n = e.value.charCodeAt(e.value.length - 1);
        var v = e.value.substring(0, e.value.length - 1);

        log("**" + v + "**, " + n);

        if (n == 10)
        {
            if (true)
            {
                e.blur();
                searchUsers(currentToken, v);
            }
            else
            {
                 // check input
                inviteUser(v);
            }

            e.value = "";

            return false;
        }

        return true;
    }

    function backButton()
    {
        changePage(getCommunityStartPage());
        sendRefreshRequest();
    }

    function login()
    {
        var email = get("email").value.trim();
        var password = get("password").value.trim();

        // if errors back to same page
        
        var stop = false;

        if (debug) log("login " + email + ", " + password);

        if (email == null || email == (""))
        {
            stop = true;
            get("emailerror").innerText = "please enter your username or email address";
        } 
        else if (password== null || password == (""))
        {
            stop = true;
            get("passworderror").innerText = "please enter your password";
        }

        if (stop)
            return;

        //log("page request");

        //var params = "username=" + email + "&password=" + password;
        //pageRequest(serverRequest("/checklogin.html?"), params, checklogin);

        sendCheckRequest("checklogin", email, password);
        pendingHandler = checkloginresponse;
    }

    function checkloginresponse(r)
    {
        var email = get("email").value.trim();
        var password = get("password").value.trim();


        var token = r;//.responseText;
        

        currentToken = token;

        if (token.startsWith("x"))
        {
            inputError("emailerror", "Sorry, that email / username and password aren't correct");
            return;
        }
       
        if (get("checkbox-remember").checked)
            localStorage.setItem("token", token);
        else
            localStorage.setItem("token", null);

        signin(currentToken);
        changePage(getCommunityStartPage());
    }

    function loginStart(body)
    {
        pageMode = 99;

        var token = localStorage.getItem("token");

        // if token is invalid then the return message will be invalidSignIn or 
        // similar ... receiving that message will trigger the app to return to login

        if (token != null && token != "null" && token != "")
        {
            currentToken = token;

            signin(currentToken);
            changePage(getCommunityStartPage());

            return;
        }

        body.innerHTML = loginPage();

        get("email").addEventListener("onfocus", function(){ allclear(); });
        get("password").addEventListener("onfocus", function(){ allclear(); });
    }

    function processAccountCreate()
    {
        processAccount(true);
    }

    function processAccountEdit()
    {
        processAccount(false);
    }

    function processAccount(creating)
    {
        var pcheck = true;

        isCreating = creating;

        var username = null;

        if (get("username").value != null)
            username = get("username").value.trim();

        var email = get("email").value.trim();

        var password1 = get("p1").value.trim();

        //log("password value is [" + password1 + "]");

        if (!creating)
            if (password1 == "")
                password1 = NoChangePassword; 

        log("password value is [" + password1 + "]");

        var password2 = null;
        if (creating) password2 = get("p2").value.trim();

        var language = null;
        var languageElement = get("languageselect");

        if (languageElement != null)
        {
            var k = languageElement.selectedIndex;
            
            //log("language index " + k);

            language = languageElement.options[k].value
            if (languageElement.selectedIndex == 0)
                language = null;
        }

        // if errors back to same page

        var stop = false;

        if (creating && (username == null || username == ("") || username.length < 3))
        {
            stop = true;
            inputError("usernameerror", "username should have at least 3 characters");
        } 
        else if (creating && (username.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("usernameerror", "user name cannot contain space characters");
        } 
        else if (email.indexOf("@") < 0 || email.indexOf(" ") >= 0)
        {
            stop = true;
            inputError("emailerror", "please enter a valid email address");
        } 
        else if (pcheck && (password1 == null || password1 == ("") || password1.length < 8 || password1.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("p1error", "password should have at least 8 characters");
        } 
        else if (creating && (password2 == null || password2 == ("") || password2.length < 8))
        {
            stop = true;
            inputError("p2error", "password should have at least 8 characters");
        } 
        else if (creating && (password1 != password2))
        {
            stop = true;
            inputError("p2error", "please make sure passwords match");
        } 
        else if (language == null || language == ("") || language.length < 2)
        {
            stop = true;
            inputError("languageerror", "please choose a language");
        }

        //log("errors on page = " + stop);

        if (stop)
            return;

        if (creating)
        {
            //var params = "username=" + username;
            //pageRequest(serverRequest("/checkusername.html?"), params, checkusername);

            sendCheckRequest("checkusername", username, null);
            pendingHandler = checkusernameresponse;
        }
        else 
        {
            var local = findLocalUser();

            if (local == null) 
            {
                if (debug) log("local user is " + local);
                return;
            }

            if (debug) log("local username=" + local.username + " picture file=" + picturefile(local) + " local=" + local);

            if (email != local.email)
            {
                //var params = "email=" + email;
                //pageRequest(serverRequest("/checkemail.html?"), params, checkemail);

                sendCheckRequest("checkemail", email, null);
                pendingHandler = checkemailresponse;
            }
            else
            {
                continueUpload();
            }
        }
    }

    function checkusernameresponse(r)
    {
        var email = get("email").value.trim();

        log("checkusername response " + r.responseText);

        //if (r.responseText == "dup")
        
        if (r == "dup")
        {
            inputError("usernameerror", "that username is already taken, please choose another");
            return;
        }

        //var params = "email=" + email;
        //pageRequest(serverRequest("/checkemail.html?"), params, checkemail);

        sendCheckRequest("checkemail", email, null);
        pendingHandler = checkemailresponse;
    }

    function checkemailresponse(r)
    {
        log("checkemail response " + r); //r.responseText);

        //if (r.responseText == "dup")

        if (r == "dup")
        {
            inputError("emailerror", "that email already has an account, please choose another or login");
            return;
        }

        continueUpload();
    }

    function continueUpload()
    {
        var username;

        if (get("username").value != null && get("username").value != "")
            username = get("username").value.trim();
        else
            username = get("username").innerText;

        log("continueUpload for " + username + " username tag = " + get("username").tagName + " creating = " + isCreating);

        var email =     get("email").value.trim();
        var password1 = get("p1").value.trim();

        var language = "en";
        var languageElement = get("languageselect");
        language = languageElement.options[languageElement.selectedIndex].value.trim();
        
        var imageSrc = get("previewimage").src;

        if (get("username").tagName == "H4")
        {
            log("password value is [" + password1 + "]");

            if (password1 == "")
                password1 = NoChangePassword; 

            log("password value is [" + password1 + "]");
        }

        var userdata = ["username", username, "email", email, "password", password1, "language", language, "picurl", imageChanged];

        if (isCreating)
            upload(userdata, imageChanged, createduser, imageSrc, null);
        else
            upload(userdata, imageChanged, editeduser, imageSrc, currentToken);
    }

    function createduser(r)
    {
        currentToken = r.responseText;
        
        signin(currentToken);
        changePage(getCommunityStartPage());
    }

    function editeduser(r)
    {
        currentToken = r.responseText;

        sendSignOutMessage();
        signin(currentToken);

        sendRefreshRequest();
        changePage(getCommunityStartPage());
    }

    function accountStart(creating)
    {
        log("create/edit with token " + currentToken);

        var username =  get("username");
        var email =     get("email");
        var password1 = get("p1");
        var password2 = get("p2");
        var languageElement = get("language");

        //log("accountStart username " + username);
        //log("accountStart p1 " + p1);
        //log("accountStart languageElement " + languageElement);
        
        var fileupload = document.getElementById("file-upload");
        
        if (fileupload != null)
        {
            fileupload.addEventListener("change", function () 
            {
                changeImage(this);
            });
        }

        languageElement.innerHTML = languagePop();

        pageMode = 99;

        if (!creating)
         {
            pageMode = 0; 

            var local = findLocalUser();

            if (local == null)
            {
                log("cannot edit -- no local user");
                return;
            }

            log("Edit update ... render the page header for " + local.username + " picture file = " + picturefile(local));

            var languageElement = get("language");

            get("username").innerText = local.username;
            get("email").value = local.email;
            get("previewimage").src = picturefile(local);

            var e = document.getElementById("languageselect");
            for (var i = 0; i < e.options.length; i++) 
            {
               if (e.options[i].value == local.language) 
               {
                    e.options[i].selected = true;
                    break;
               }
            }
        }
    }
    
    function pageHeader()
    {
        /*
        var div = pageHeaderDiv();

        var picurl;
        var lu = findLocalUser();

        if (lu != null)
            picurl = picturefile(lu);
        else
            picurl = imageRequest(DefaultProfilePic);

        // clicking this goes to edit user settings

        var click = "onclick=\"edit();\""; 

        div = replaceAll(div, "$$picurl$$", picurl);
        div = replaceAll(div, "$$click$$", click);

        log("=================================================== make pageheader " + div);

        document.getElementById("header").innerHTML = div;
        */
    }

    function cancelEdit()
    {
        changePage(getCommunityStartPage());
        sendRefreshRequest();
    }

    function getCommunityStartPage()
    {
        //if (mobile)
        //    return "chats";
        //else
            
        return "community";
    }

    function cleanedString(t)
    {
        var x = t;

        t = t.replace("\n", " ");

        if (x != t)
            log("original message: " + x + " corrected message: " + t);

        return t;
    }

    function forgot()
    {
        alert("hi");
    }

    function terms()
    {
        changePage("terms");
    }

    function inputError(n, t)
    {
        var f = ["usernameerror", "emailerror", "p1error", "p2error", "languageerror"];
        for (var i = 0; i < f.length; ++i)
            if (get(f[i]) != null)
                    get(f[i]).innerText = "";
        log("inputerror set " + n + " with " + t);
        if (get(n) != null)
            get(n).innerText = t;
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

    function allclear()
    {
        log("clear");
        clear("usernameerror");
        clear("emailerror");
        clear("p1error");
        clear("p1error");
        clear("p2error");
        clear("languageerror");
    }

    function clear(n)
    {
        get(n).innerText = "";
    }

    // this handles community and chat

    function setUnload()
    {
        window.addEventListener("beforeunload", function (event)
        {
            //if (socket != null)
             //   socket.close();
            //socket = null;
        }
        );
        window.addEventListener("unload", function (event)
        {
            //if (socket != null)
            //    socket.close();
            //socket = null;
        }
        );
    
        pageSetup()
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
            return t2(time, "second");
        time = time / 60;
        if (time < 60)
            return t2(time, "minute");
        time = time / 60;
        if (time < 24)
            return t2(time, "hour");
        time = time / 24;
        if (time < 7)
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

    function logError(s)
    {
        log(s);
    }
   
    function reportError(s)
    {
        log(s);
    }

    function checkboxclicked()
    {
        var pcheck = true;
        if (document.getElementById("pcheck") != null)
            pcheck = document.getElementById("pcheck").checked;
        document.getElementById("p1").disabled = !pcheck;
        log("checkbox enabled = " + !pcheck);
    }

    function replaceAll(base, find, rep)
    {
        while (base.indexOf(find) >= 0)
        {
            base = base.replace(find, rep);
        }
        return base;
    }

    function run()
    {
        initWebSocket();
    }

    // if closed and reopened this must be changed

    function whenOpened()
    {
        if (getUrlVars("a") == "create")
            changePage("create");
        else
            changePage("login");

        setTimeout(CommunityPageRefresh, 50000);

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

    var autoExpand = function (field) 
    {
        // Reset field height
        field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';

    };

    function newchat()
    {
        log("newchat");

        if (document.getElementById("myModal") == null)
        {
            var body = document.getElementsByTagName("BODY")[0];
            body.innerHTML += newchatModal();
        }
        
        openModal();
    }

    function invitation()
    {
        log("invitation");
        
        if (document.getElementById("myModal") == null)
        {
            var body = document.getElementsByTagName("BODY")[0];
            body.innerHTML += newchatModal();
        }

        openModal();
    }


    function openModal()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    function okModal()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function xModal()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
        
    run();
