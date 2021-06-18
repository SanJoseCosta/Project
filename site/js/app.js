
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
    var CommunityPageRefreshStarted = false;

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
    var RefreshTimeout = 5000;
    var initTime = 0;
    var Secure = true;
    var DomainName = "comprendo.chat"; //"malt.chat"

    // where to go up on receiving a 2 type response to a 1 type request

    var pendingHandler;
    var message2send;

    // last user list

    var lastListlen = 0;

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

    function remoteMessage(t)
    {
        var status = (document.hidden ? 3 : 4);

        var messages = false;
        var updatePage = true;

        var obj = null;

        try
        {
            obj = JSON.parse(t);
        }
        catch (exception)
        {
            
        }

        // must have type

        if (obj == null || obj.type == null)
        {
            log("*** invalid message received: " + t);
            return;
        }
        else if (obj.type == "history")
        {
            receiveHistoryJson(obj, status);
            pageUpdate(true);
            return;
        }
        else if (obj.type == "ack")
        {
            var m = makeMessageJson(obj.messages[0]);

            // bug ****** / false
            log("receive ack for " + m.message + " local = " + m.localSender);

            m.localSender = true;
            addMessage(m, true);

            pageUpdate(true);
            return;
        }
        else if (obj.type == "message")
        {
            var m = makeMessageJson(obj.messages[0]);
            log("receive message " + m.message + " local = " + m.localSender);

            m.localSender = false;
            addMessage(m, false);

            sendAck(m.mid, status);

            pageUpdate(true);
            return;
        }
        else  if (obj.type == "users")
        {
            if (receiveUsersJson(obj, t.length))
                pageUpdate(false);

            return;
        }
        else if (obj.type == "invite")
        {
             // todo make better notification boxes

            if (obj.response == "ok")
                alert("the invitation email was sent successfully");
            else
                alert("there was an error while trying to send the invitation email");

            document.getElementById("search").style.visibilityState = "hidden";
            return;
        }
        else if (obj.type == "find")
        {
            var json = obj.users;

            if (json.length == 0)
                alert("that username was not found");
            else
            {
                var user = addOrUpdateUser(json[0]); 
                talk(user.username);
            }

            return;
        }
        else if (obj.type == "error")
        {
            logError("***************************** received logout condition: " + t);
            
            //if (parts[0].indexOf("xinvalidSigninMessage") >= 0 || 
            //    parts[0].indexOf("xuserNotFoundByToken") >= 0 ||
            //    parts[0].indexOf("xlogoutPreviousConnectionInSameConversation") >= 0)
            
            logout();

            return;
        }
        else if (obj.type == "checkusername")
        {
            var r = obj.response;
            checkusernameresponse(r);
            return;
        }
        else if (obj.type == "checkemail")
        {
            var r = obj.response;
            checkemailresponse(r);
            return;
        }
        else if (obj.type == "checklogin")
        {
            var r = obj.response;
            checkloginresponse(r);
            return;
        }
        else
        {
            log("*** invalid message received: " + t);
            return;
        }

        // escape all input
        // ...... t = t.replace("<", "V");
        


        if (updatePage)
            pageUpdate(messages);
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

    function edit()
    {
        imageChanged = false;
        changePage("edit");

        // todo not ready until server sends full local user info
    }
    
    function languagePop()
    {
        var s = "<select style='width:270px;' id=languageselect class=language select-css>";
        s += "<option value='' class=lng>Choose your language</option>";

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
            pageMode = 0;
            accountStart(false);
        }
        else if (url == "create") 
        {
            body.innerHTML = createPage();
            pageMode = 0;  
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

    function chatsHeader()
    {
        var p = document.getElementById("chats-header");
        if (p != null)
            p.innerHTML = chatsHeaderDiv();
    }

    function makebox(user, msg, time, isdummy)
    {
        // make the box representing a single chat

        var box = singleChatSummary();
        
        var tsa = Date.now() - user.lastActivityTime;
        
        var color;

        if (tsa <          3 * 60 * 1000) 
            color = "green";
        else if (tsa <    15 * 60 * 1000) 
            color = "yellow";
        else
            color = "red";

        var picfile = picturefile(user);

        var click = "\"talk('" + user.username + "')\"";
        
        box = replaceAll(box, "$$color$$", color);
        box = replaceAll(box, "$$picurl$$", picfile);
        box = replaceAll(box, "$$click$$", click);

        var uname = user.username;
        if (uname.length > 7) uname = uname.substring(0, 7) + "..";

        box = replaceAll(box, "$$name$$", uname);

        if (isdummy)
        {
            box = replaceAll(box, "$$msg$$", "NEW!");
            box = replaceAll(box, "$$time$$", "");
        }
        else
        {
            box = replaceAll(box, "$$msg$$", msg);
            box = replaceAll(box, "$$time$$", time);
        }
        
        //box = replaceAll(box, "$$bkgcolor$$", bkgcolor);

        return box;
    }

    function pageUpdate(msg)
    {
        if (pageMode == 0)
        {
            //log("page update with mode 0");
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
 
            if (u.lastMessage == "null")
            {
                t += makebox(u, "", "", false);
            }
            else
            {
                var ts = "(" + timeDisplayStringFromUnixTime(u.lastMessageId.substring(0, u.lastMessageId.length - 10)) +")";

                // todo might need to use translation !!!!!!!!!!!!!!!!!!!!!

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

                t += makebox(u, m, ts, u.lastMessage == "dummy");
            }
        }

        document.getElementById("chats-list").innerHTML = t;

        //pageHeader();

        chatsHeader();
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

            if (!getMobile())
                log("make conversation header for " + luser.username + " with local pic " + getLocalPic());

            var div = conversationHeaderDiv();

            //if (getMobile())
            //{
                

                div = replaceAll(div, "$$picurl$$", picturefile(ru));
                div = replaceAll(div, "$$local$$", getLocalPic());

                div = replaceAll(div, "$$localusername$$", luser.username);

                div = replaceAll(div, "$$name$$", ru.username);
                div = replaceAll(div, "$$time$$", tds(ru.lastActivityTime));

                div = replaceAll(div, "$$click$$", "onclick=\"edit();\"");

                var p = document.getElementById("conversation-header");

                if (p != null)
                    p.innerHTML = div;

                
            //}
            /*
            else
            {
                

                div = replaceAll(div, "$$picurl$$", picturefile(ru));
                div = replaceAll(div, "$$local$$", getLocalPic());

                div = replaceAll(div, "$$localusername$$", luser.username);

                div = replaceAll(div, "$$name$$", ru.username);
                div = replaceAll(div, "$$time$$", tds(ru.lastActivityTime));

                div = replaceAll(div, "$$click$$", "onclick=\"edit();\"");

                var p = document.getElementById("conversation-header");

                if (p != null)
                    p.innerHTML = div;
            }
            */

        }

        var s = "";

        for (var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            var time = timeString(message);

            if (message.localSender)
                s += rmsg(message.message, message.translation, message.status, getLocalPic(), time);
            else
                s += lmsg(message.translation, message.message, message.status, getRemotePic(), time);
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

        if (mobile)
            changePage("conversation");
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
        log("refresh " + pageMode);
        
        if (pageMode >= 1 && pageMode <= 3)
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

    function chatSettings()
    {
        alert("not available yet");
    }
   
    function backButton()
    {
        changePage(getCommunityStartPage());
        ChatsUpdate();
        //sendRefreshRequest();
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

    function cancelEdit()
    {
        lastListlen = 0;
        changePage(getCommunityStartPage());
        sendRefreshRequest();
    }

    function getCommunityStartPage()
    {
        if (mobile)
            return "chats";
        else
            return "community";
    }

    function forgot()
    {
        alert("hi");
    }

    function terms()
    {
        changePage("terms");
    }

    /*
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
    */
    
    function checkboxclicked()
    {
        var pcheck = true;
        if (document.getElementById("pcheck") != null)
            pcheck = document.getElementById("pcheck").checked;
        document.getElementById("p1").disabled = !pcheck;
        log("checkbox enabled = " + !pcheck);
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

    ////////////////////////////////////////////////////////////////////

    function run()
    {
        initWebSocket();
    }


