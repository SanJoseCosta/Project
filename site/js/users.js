
    function makeUser(json)
    {
        var user = {};

        user.picurl =                       json.picurl;
        user.username =                     json.username
        user.lastActivityTime =             parseInt(json.lastActivityTime);
        user.language =                     json.language;
        user.remote =                       json.remote == "true";
        user.local =                        json.local == "true";
        user.lastMessage =                  json.lastMessage;
        user.lastTranslation =              json.lastTranslation;
        user.lastMessageId =                json.lastMessageId;
        user.lastStatus =                   json.lastStatus;
        user.lastMessageSender =            json.lastMessageSender;  
        user.email =                        json.email;

        return user;
    }

    function allUsers()
    {
        for (var i = 0; i < users.length; ++i) displayUserInfo(users[i]);
    }

    function displayUserInfo(user)
    {
        log("----- user info:");
        log("picurl:                            " + user.picurl);
        log("username:                          " + user.username);
        log("lastActivityTime:                  " + user.lastActivityTime);
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
        if (user.picurl != "0")
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

    function addOrUpdateUser(json)
    {
        var newuser = makeUser(json);
        
        //displayUserInfo(newuser);

        for (var i = 0; i < users.length; ++i)
        {
            var u = users[i];
            if (u.username == newuser.username)
            {
                users.splice(i, 1, newuser);
                //log("updated user: " + newuser.username);
                return newuser;
            }
        }

        users.push(newuser);
        //log("added user: " + newuser.username);
        return newuser;
    }

    function receiveUsersJson(json, len)
    {
        var updatePage = false;

        // todo  ---------------- also for F need to get the user returned
         
        if (lastListlen != len)
            updatePage = true;
        else if (Math.random() < 0.1)
            updatePage = true;
            
        lastListlen = len;

        json = json.users;

        for (var i = 0; i < json.length; ++i)
            addOrUpdateUser(json[i]); 

        if (debug)
        {
            log("--------------------------------------------");
            allUsers();
            log("--------------------------------------------");
        }

        log("received " + json.length + " users");

        return updatePage;
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

            var max = 0;
            var index = -1;

            for (var i = k; i < gu.length; ++i)
            {
                var time;

                if (gu[i].lastMessage != "null")
                    time = parseInt(gu[i].lastMessageId.substring(0, gu[i].lastMessageId.length - 10));
                else
                    time = 2000000000;

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
    