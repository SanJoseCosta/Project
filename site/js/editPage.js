function editPage()
{
	var s =
	`
    <link rel="stylesheet" href="forms.css">

    <div class="login-page">
        <div id=form class="form">
            <div class="login-form">

                <h4 id=username size=50>&nbsp;</h4>

                <input id=email type="text"/>
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

                <button onclick="processAccount(false);">

                    <blah>Update account</blah>

                </button>
                <br><br>

                <button onclick="logout();">

                    <blah>Logout</blah>

                </button>
                <br><br>

                <button onclick="cancelEdit();">

                    <blah>Cancel</blah>

                </button>
            </div>
        </div>
    </div>

    <script>

        function onclick()
        {   
            document.getElementById("form").animate({height: "toggle", opacity: "toggle"}, "slow");
        }

    </script>

	`
    ;
	return s;
}