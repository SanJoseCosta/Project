function changePassPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">

            <div class="login-page">
              <div id=form class="form">
                <div class="login-form">

                    <h4 id=username placeholder="Username" size=50>&nbsp;</h4>

                    <input id=p1 type="password" placeholder="your new password"/>
                    <div id=p1error></div>

                    <button onclick="newPassword();">change password</button>
                    <br><br>
               
                </div>
              </div>
            </div>
	`
    ;
	return s;
}