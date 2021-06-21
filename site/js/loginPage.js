function loginPage()
{
    var s = 
    `

        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder="username or email address"/>
              <input id=password type="password" placeholder="password"/>

                <div id=emailerror></div>
                <div id=passworderror></div>

              <button onclick="login();">login</button>
              <p class="message">Not registered? <a style="cursor:hand;" onclick="changePage('create');">Create an account</a></p>
            </div>
          </div>
        </div>
            
    `;
    return s; 
}