function createPage()
{
	var s =
	`

            <div class="login-page">
              <div id=form class="form">
                <div class="login-form">
                    <input id=username type="text" placeholder="your username"/>
                    <div id=usernameerror></div>

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


         
                    <button onclick="processAccount(true);">create account</button>
                    <p class="message">Already registered? <a style="cursor:hand;" onclick="changePage('login');">Login</a></p>
                    

                    <p class="message">By creating an account, you agree to Comprendo.chat's 
                        <a style="cursor:hand;" onclick="changePage('terms');">
                            <u>terms and conditions.</u>
                        </a>
                    </p>


                </div>
              </div>
            </div>

	`
    ;
	return s;
}