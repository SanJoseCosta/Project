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

                    <img style="border-radius: 50%;" src="./images/default.png" height=40 id=previewimage>
                    <div>
                        <div onclick="document.getElementById('chooser').style.display = 'block';">
                            <u>Upload a profile photo</u>
                        </div>
                        <div id=chooser style="display: none;">
                            <input id=file-upload type="file"/>
                        </div>
                    </div>

                    <div>

                        <input name=c1 type="checkbox" style="font-size:15px;">
                        
                        <label for="c1"> 
                            I agree to Malt.chat
                            <span onclick="changePage('terms');">
                                <u>terms and conditions.</u>
                            </span>
                        </label>
                    
                    </div>

         
                    <button onclick="processAccount(true);">create account</button>
                    <p class="message">Already registered? <a onclick="changePage('login');">Login</a></p>

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