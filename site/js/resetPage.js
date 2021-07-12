function resetPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder="username or email address"/>

                <div id=emailerror></div>

              <button onclick="reset();">reset</button>
              <p class="message">Not registered? <a style="cursor:hand;" onclick="changePage('create');">Create an account</a></p>

            </div>
          </div>
        </div>
            
    `;
    return s; 
}