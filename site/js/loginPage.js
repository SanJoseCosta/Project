function loginPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder="username or email address"/>
              <input id=password type="password" placeholder="password"/>

                <div id=emailerror></div>
                <div id=passworderror></div>

              <button onclick="login();">login</button>
              <p class="message">Not registered? <a style="cursor:hand;" onclick="changePage('create');">Create an account</a></p>

              <p class="message">Forgot your password? <a style="cursor:hand;" onclick="changePage('reset');">Reset your password</a></p>
            </div>
          </div>
        </div>
            
    `;
    return s; 
}