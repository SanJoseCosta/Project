function resetPage()
{
    var s = 
    `
        <link rel="stylesheet" href="forms.css">
        <div class="login-page">
          <div id=form class="form">
           
            <div class="login-form">
              <input id=email type="text" placeholder=

                  "<blah>username or email address</blah>"

              />

                <div id=emailerror></div>

                <button onclick="reset();">

                  <blah>Reset</blah>

                </button>

              <p class="message">

                <blah>Not registered?</blah>

                <a style="cursor:hand;" onclick="changePage('create');">

                  <blah>Create an account</blah>

                </a>
              </p>

            </div>
          </div>
        </div>
            
    `;
    return s; 
}