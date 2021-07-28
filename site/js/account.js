
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
            get("emailerror").innerText = 

                "<blah>please enter your username or email address</blah>"

            ;
        } 
        else if (password== null || password == (""))
        {
            stop = true;
            get("passworderror").innerText = 

                "<blah>please enter your password</blah>"

            ;
        }

        if (stop)
            return;

        sendCheckRequest(
            { 
                type: "checklogin", 
                emailorusername: email, 
                password: password 
            });

        pendingHandler = checkloginresponse;
    }

    function checkloginresponse(r)
    {
        var email = get("email").value.trim();
        var password = get("password").value.trim();

        // invaliduser / invalidpassword / token

        log("checkloginresponse: " +  r);

        var token = r;

        currentToken = token;

        if (token.startsWith("invalid"))
        {
            inputError("emailerror", 

                "<blah>Sorry, that email / username and password aren't correct</blah>"

            );
            return;
        }

        localStorage.setItem("token", token);
        
        signin(currentToken);
        changePage(getCommunityStartPage());
    }

    function loginStart()
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

        makeBody(loginPage());

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

        if (!creating)
            if (password1 == "")
                password1 = NoChangePassword; 

        log("password value is [" + password1 + "]");

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
            inputError("usernameerror", 

                "<blah>username should have at least 3 characters</blah>"

            );
        } 
        else if (creating && (username.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("usernameerror", 

                "<blah>username cannot contain space characters</blah>"

            );
        } 
        else if (email.indexOf("@") < 0 || email.indexOf(" ") >= 0)
        {
            stop = true;
            inputError("emailerror", 

                "<blah>please enter a valid email address</blah>"

            );
        } 
        else if (pcheck && (password1 == null || password1 == ("") || password1.length < 8 || password1.indexOf(" ") >= 0))
        {
            stop = true;
            inputError("p1error", 

                "<blah>password should have at least 8 characters</blah>"

            );
        } 
        else if (language == null || language == ("") || language.length < 2)
        {
            stop = true;
            inputError("languageerror", 

                "<blah>please choose a language</blah>"

            );
        }

        if (stop)
            return;

        if (creating)
        {
            sendCheckRequest(
                { 
                    type: "checkusername", 
                    username: username 
                });

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
                sendCheckRequest(
                    {
                        type: "checkemail", 
                        email: email 
                    });

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
        log("checkusername response " + r);

        if (r == "dup")
        {
            inputError("usernameerror", 

                "<blah>that username is already taken, please choose another</blah>"

            );
            return;
        }

        var email = get("email").value.trim();
        sendCheckRequest(
            {
                type: "checkemail", 
                email: email 
            });

        pendingHandler = checkemailresponse;
    }

    function checkemailresponse(r)
    {
        log("checkemail response " + r); 

        if (r == "dup")
        {
            inputError("emailerror", 

                "<blah>that email already has an account, please choose another</blah>"

            );
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

        // ??? todo how is this working

        if (get("username").tagName == "H4")
        {
            log("password value is [" + password1 + "]");

            if (password1 == "")
                password1 = NoChangePassword; 

            log("password value is [" + password1 + "]");
        }

        // logic for changed picture

        var picurl2send = "0";
        
        if (isCreating)
        {
            if (imageChanged)
                picurl2send = "1";
        }
        else
        {
             var local = findLocalUser();

            if (local == null)
            {
                log("!!!!!!!! cannot get current picurl -- no local user");
                if (imageChanged)
                    picurl2send = "1";
            }
            else
            {
                var lp = local.picurl;
        
                if (imageChanged)
                {
                    if (lp == "0")
                        picurl2send = "1";
                    else if (lp == "1")
                        picurl2send = "2";
                    else if (lp == "2")
                        picurl2send = "1";
                }
                else
                    picurl2send = lp;
            }
        }

        var userdata = ["username", username, "email", email, "password", password1, "language", language, "picurl", picurl2send];

        log(userdata);

        var v = getUrlVars("invite");

        log("invite is " + v);

        if (v != null && v != "")
        {
            userdata.push("invite");
            userdata.push(v);
        }

        log(userdata);

        if (isCreating)
            upload(userdata, createduser, imageSrc, null);
        else
            upload(userdata, editeduser, imageSrc, currentToken);
    }

    function accountStart(creating)
    {
        log("create/edit with token " + currentToken);

        var username =  get("username");
        var email =     get("email");

        var password1 = get("p1");
        var languageElement = get("language");
        
        var fileupload = document.getElementById("file-upload");
        
        if (fileupload != null)
        {
            fileupload.addEventListener("change", function () 
            {
                changeImage(this);
            });
        }

        setInnerHTML(languageElement, languagePop(false));

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

    function upload(userdata, callback, imageSrc, token)
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

        if (token == null)
        {
            ajax.open("POST", serverRequest("/createuser"));
        }
        else
        {
            var params = "token=" + token;
            var encodedMessage = encodeURI(params);
            var page = serverRequest("/edituser?") + encodedMessage;

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

    function allclear()
    {
        log("clear");
        clear("usernameerror");
        clear("emailerror");
        clear("p1error");
        //clear("p1error");
        //clear("p2error");
        clear("languageerror");
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

    function reset()
    {
        var email = get("email").value.trim();
        sendResetRequest(email);
        changePage("login");
    }

    function changePass()
    {
        log("change password with token " + currentToken);

        pageMode = 0; 

        var local = findLocalUser();

        if (local == null)
        {
            log("cannot change password -- no local user");
            return;
        }

        var username =  get("username");
        get("username").innerText = local.username;

        pageMode = 99;
    }

    function newPassword()
    {
        var p = get("p1").value.trim();
        log("new password " + p);

        changePassword(p);
        logout();
        loadHomePage(languageSelected);
    }

    function loadHomePage(l)
    {
        window.location.href = Protocol() + Domain() + "/index.html?language=" + l;
    }
