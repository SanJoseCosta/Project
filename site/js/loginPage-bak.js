function loginPage()
{
	var s = 
	`
	        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
            html, body 
            {
                font-family: 'Roboto', sans-serif;
                margin: 0;
                padding: 0;
                background: #EDEEF6;
                height: 100vh;
                padding-left: 10px;
                padding-right: 10px;
            }


            textarea 
            {
                width:100%;
                resize: vertical;
                padding:15px;
                border-radius:15px;
                border:0;
                box-shadow:4px 4px 10px rgba(0,0,0,0.55);
                height:50px;
            }
            .form-control {
                min-height: 41px;
                background: #f2f2f2;
                box-shadow: none !important;
                border: transparent;
            }
            .form-control:focus {
                background: #e2e2e2;
            }
            .form-control, .btn {        
                border-radius: 2px;
            }
            .login-form {
                /*width: 350px;*/
                /*margin: 100px auto 30px auto;*/
                text-align: center;
                margin: auto;
                background: #fff;
                max-width: 640px;
                padding: 40px 80px 60px 80px;
            }
            .login_tit{
                font-size: 26px;
                font-weight: 700;
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .newtom{
                font-size: 13px;
                color: #5A5D70;

            }
            .newtom a{
                color: #0028FB !important;
                text-decoration: none !important;
            }
            .imgoflogo{
                max-width: 170px;
                width: 100%;
            }
            .login-form h2 {
                margin: 10px 0 25px;
            }
            .login-form form {
                color: #7a7a7a;
                border-radius: 3px;
                margin-bottom: 15px;

                padding: 30px;
            }
            .login-form .btn {        
                font-size: 16px;
                font-weight: bold;
                background: #3598dc;
                border: none;
                outline: none !important;
                font-weight: 300;
            }
            .login-form .btn:hover, .login-form .btn:focus {
                background: #2389cd;
            }
            .login-form a {
                color: #fff;
                text-decoration: underline;
            }
            .login-form a:hover {
                text-decoration: none;
            }
            .login-form form a {
                color: #7a7a7a;
                text-decoration: none;
            }
            .login-form form a:hover {
                text-decoration: underline;
            }
            .full-height{
                min-height:100vh;
            }
            .width-50{
              width:50%  
            }
            .form-group{
                margin-top: 20px;
                width: 100%;
            }
            .form-group input{
                width: 100%;
                color: #000;
                border-radius: 7px;
                padding: 15px 20px;
                font-size: 15px;
            }
            .form-group input:focus{
                outline: none;
            }
            .form-group input::-webkit-input-placeholder { /* Edge */
              color: #A0A8AE;
            }

            .form-group input:-ms-input-placeholder { /* Internet Explorer 10-11 */
              color: #A0A8AE;
            }

            .form-group input::placeholder {
              color: #A0A8AE;
            }
            .form-group{
                position: relative;
            }
            .rembemberme{
                position: absolute;
                left: 0;
                font-size: 12px;
                color: #7a7a7a;
            }
            .rembemberme input{
                width: unset;
                display: inline-block;
                vertical-align: top;
                margin-top: 0px;
            }
            .forgotpassword{
                position: absolute;
                right: 0;
                top: 0;
                color: #0028FB !important;
                text-decoration: none !important;
                font-size: 13px;
            }
            .login-form .btn{
                margin-top: 30px;
                width: 100%;
                color: #fff;
                border-radius: 20px;
                display: block;
                padding-top: 15px;
                padding-bottom: 15px;
                text-transform: uppercase;
                background: #0728FB;
                font-size: 14px;
                border-radius: 100px;
            }
            .container{
                height: 100vh;
                min-height: 550px;
                position: relative;
            }
            .container .login-form {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: 0;
                right: 0;
            }
            a,button{
                -webkit-transition: all .25s ease;
                   -moz-transition: all .25s ease;
                    -ms-transition: all .25s ease;
                     -o-transition: all .25s ease;
                        transition: all .25s ease;
            }
            a:hover{
                opacity: 0.7;
            }
            @media(max-width: 700px){
                .login-form{
                    padding: 30px 30px 40px 30px;
                }
            }
            @media(max-width: 400px){
                html, body{
                    padding-left: 5px;
                    padding-right: 5px;
                }
                .login-form {
                    padding: 30px 20px 40px 20px;
                }
            }
            @media(min-width: 992px){
                .login-form{
                    max-width: 800px;
                }
                .newtom {
                    font-size: 20px;
                }
                .imgoflogo {
                    max-width: 310px;
                }
                .login_tit{
                    font-size: 40px;
                    margin-top: 25px;
                    margin-bottom: 25px;
                }
                .form-group input{
                    padding: 20px 25px;
                    font-size: 20px;
                }
                .form-group {
                    margin-top: 23px;
                }
                .forgotpassword, .rembemberme{
                    font-size: 20px;
                }
                .rembemberme input{
                    margin-top: 6px;
                }
                .login-form .btn{
                    font-size: 20px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                }
            }
        </style>

    <div class="container">
        
       
        
        <div class="login-form ">  

        <div class="row"> 
            
            <a href="https://malt.chat/">
                <img src="https://malt.chat/assets/images/malt-logo.svg" class="imgoflogo" alt="MALT">
            </a>
        </div>
                    
            <div class="form-group">
                    
                    <div><p class="login_tit">Log In</p>
                        <span class="newtom"> New to MALT? 
                            <a href="javascript:changePage('create');" style="">
                                Create an account 
                            </a>
                        </span>
                    </div>
                      
                </div>
            
                <div class="form-group has-error">
                   <input id="email" type="text" class="form-control" placeholder="Username or Email Address" required="required">
                </div>
                
                <div id="emailerror"> 
                </div>
            
                <div class="form-group">
                    <input id="password" type="password" class="form-control" placeholder="Your Password" required="required">
                </div>        
               
                <div id="passworderror"> 
                </div>

                <div class="form-group" style="">
                     <label for="checkbox-remember" class="text-info float-left rembemberme">
                        <input id="checkbox-remember" type="checkbox" checked=""> 
                            <span style="text-info"> Remember me</span>
                     </label>
                    <a href="javascript:changePage('reset');" class="forgotpassword">Forgot Password?</a>
               
                    <br>
                    <button id="loginb" onclick="login();" class="btn btn-primary btn-lg float-right">Sign in</button>
                </div>


            </div>

        </div>
            
	`;
	return s; // styleLoginCreate() + s;
}