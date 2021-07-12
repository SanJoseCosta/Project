function editPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">

            <div class="login-page">
              <div id=form class="form">
                <div class="login-form">

                    <h4 id=username placeholder="Username" size=50>&nbsp;</h4>

                    <input id=email type="text" placeholder="your email address"/>
                    <div id=emailerror></div>

                    <input id=p1 type="password" placeholder="your new password"/>
                    <div id=p1error></div>

                    <span id=language></span>
                    <div class=smalltext id=languageerror></div>
                    <br>
         

                    <img src="./images/default.png" height=50 id=previewimage>
                    <div>
                        <div onclick="document.getElementById('chooser').style.display = 'block';">
                            <p><a style="cursor:hand;">Upload a profile photo</a></p>
                        </div>
                        <div id=chooser style="display: none;">
                            <input id=file-upload type="file"/>
                        </div>
                    </div>

         

                    <button onclick="processAccount(false);">update account</button>
                    <br><br>

                    <button onclick="logout();">Logout</button>
                    <br><br>
                    
                 	<button onclick="cancelEdit();">Cancel</button>
               
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