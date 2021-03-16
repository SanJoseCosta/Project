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

                <input id="checkbox-remember" type="checkbox" checked="">Remember me

              <button onclick="login();">login</button>
              <p class="message">Not registered? <div onclick="changePage('create');"><b>Create an account</b></div></p>
            </div>
          </div>
        </div>

        <script>

        function onclick()
        {   
            document.getElementById("form").animate({height: "toggle", opacity: "toggle"}, "slow");
        }

        </script>


            
    `;
    return s; // styleLoginCreate() + s;
}