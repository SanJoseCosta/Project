function changePassPage()
{
	var s =
	`
            <link rel="stylesheet" href="forms.css">

            <div class="login-page">
              <div id=form class="form">
                <div class="login-form">

                    <h4 id=username placeholder=

                        "<blah>Username</blah>" 

                    size=50>
                        &nbsp;
                    </h4>

                    <input id=p1 type="password" placeholder=

                        "<blah>your new password</blah>"
                    />

                    <div id=p1error></div>

                    <button onclick="newPassword();">

                        <blah>change password</blah>

                    </button>
                    <br><br>
               
                </div>
              </div>
            </div>
	`
    ;
	return s;
}