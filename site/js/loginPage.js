function loginPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder=

                "<blah>Username or email address</blah>"

              />
              <input id=password type="password" placeholder=

                "<blah>Password</blah>"

              />

              <div id=emailerror></div>
              <div id=passworderror></div>

              <button onclick="login();">

                <blah>login</blah>

              </button>

              <p class="message">

                <blah>Not registered?</blah>

              <a style="cursor:hand;" onclick="changePage('create');">

                <blah>Create an account</blah>

              </a></p>

              <p class="message">

                <blah>Forgot your password?</blah>

                <a style="cursor:hand;" onclick="changePage('reset');">

                  <blah>Reset your password</blah>

                </a>

              </p>
            </div>
          </div>
        </div>
            
    `;
    return s; 
}