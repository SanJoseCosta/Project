function createPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">
            <div class="login-page">
                <div id=form class="form">
                    <div class="login-form">
                        <input id=username type="text" placeholder=

                            "<blah>Your username</blah>"

                        />
                        <div id=usernameerror></div>

                        <input id=email type="text" placeholder=

                            "<blah>Your email address</blah>"

                        />
                        <div id=emailerror></div>

                        <input id=p1 type="password" placeholder=

                            "<blah>Your new password</blah>"

                        />
                        <div id=p1error></div>

                        <span id=language></span>
                        <div class=smalltext id=languageerror></div>
                        <br>

                        <img src="./images/default.png" height=50 id=previewimage style="cursor:hand;" onclick="document.getElementById('chooser').style.display = 'block';">
                        
                        <div>
                            <div onclick="document.getElementById('chooser').style.display = 'block';">
                                <p>
                                    <a style="cursor:hand;">

                                        <blah>Upload a profile photo</blah>

                                    </a>
                                </p>
                            </div>
                            <div id=chooser style="display: none;">
                                <input id=file-upload type="file"/>
                            </div>
                        </div>

                        <button onclick="processAccount(true);">

                            <blah>Create account</blah>

                        </button>
                        <p class="message">

                            <blah>Already registered?</blah>

                            <a style="cursor:hand;" onclick="changePage('login');">

                                <blah>Login</blah>

                            </a>
                        </p>

                        <p class="message">

                            <blah>By creating an account, you agree to Comprendo.chat's</blah>

                            <a style="cursor:hand;" onclick="changePage('terms');">
                                
                                <u><blah>terms and conditions.</blah></u>

                            </a>
                        </p>
                    </div>
                </div>
            </div>
	`
    ;
	return s;
}




