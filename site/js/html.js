function chatsPage()
{
	var s =
	`
        <div class="grid-container">
            <div id=header class=hdr></div>
    
            <div id=chats class=men>
        
                <div id=chats-header></div>
                <div id=chats-list></div>
                <div id=chats-footer></div>
    
            </div>
    
            <div class=foo id=footer></div>
        </div>
   	`;
   	return s;
}
function conversationPage()
{
	var s =
	`
		<div class="grid-container">
            <div id=header class=hdr></div>
    
            <div id=conversation class=mai>
    
                <div id=conversation-header></div>          
                <div id=messages-list></div>
                <div id=conversation-footer>




<div style="background-color: #c0c0ff;">
                <div style="background-color: #c0c0ff;">
                <b>Conversations</b> 
                </div>

               
                <textarea rows="1" columns="50" onkeyup="chatsInput();" id=search placeholder="search by username or email"></textarea>

            </div>
                    <textarea onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                    <i class="fa fa-paper-plane" onclick="messageBoxSend();" aria-hidden="true"></i>
                
                </div>
    
            </div>
    
            <div class=foo id=footer></div>
        </div>
	`;
	return s;
}
function communityPage()
{
	var s =
    `
        <style>

            html, body 
            {
                height: 100vh;
                margin: 0;
            }

            body 
            {
                  height: 100vh;
                  width: 100vw;
            }


            #wrapper 
            {
              display: flex;
              height: 100%;
            }

            #container 
            {
              display: flex;
              height: 100%;
            }

            #chats 
            {
              flex: 0 0 40%;
            }

            #conversation 
            {
              flex: 1;
            }

            #messages-list
            {
                overflow: auto;
                height: 70%;
            }

            #chats-list
            {
                overflow: auto;
                height: 70%;
            }

        </style>

        <div id=wrapper>
            <div id=header></div>

                <div id="container">
        
                    <div id=chats class=child>
                
                        <div id=chats-header></div>
                        <div id=chats-list></div>
                        <div id=chats-footer></div>
            
                    </div>
            
                    <div id=conversation class=child>
            
                        <div id=conversation-header>

                                <img style="border-radius: 50%;" src="https://malt.chat/images/default.png" height="60"> 
                                <span><b> ... last seen 2 days ago</b></span><br>

                        </div>          

                        <div id=messages-list>

                                <div align="right" style="display: flex; align-items: flex-end; justify-content: flex-end; font-size: 20px;">
                                <div style="width: 40%; padding: 10px; background-color: blue; color: white; border-radius: 5px; margin-right: 10px;">
                                <br><br>
                                </div>
                                <img style="border-radius: 50%;" src="https://malt.chat/images/default.png" width="50" height="50">
                                <img style="border-radius: 50%;" src="images/status0.png" width="15" height="15">
                                </div>

                        </div>

                        <div id=conversation-footer style="background-color: #c0c0ff;font-size: 25px; align-items: center; justify-content: center; padding:10px;">

                            <textarea rows=1 cols=50 onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                            <img src=>

                        </div>
            
                    </div>

                </div>
        
            <div class=foo id=footer></div>
        </div>
    `;
    return s;
}
function styleLoginCreate()
{
    var s =
    `
        <style>
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
    width: 350px;
    margin: 100px auto 30px auto;
    text-align: center;
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

        </style>
`;
return s;
} 
function createPage()
{
	var s =
	`
    <div class="container">

        <div class="row">
            <center>
            <a href="https://malt.chat" class="navbar-brand">
                <img src="assets/images/malt-logo.svg" width="100px" alt="MALT">
            </a>
            </center>
        </div>

        <div class="login-form ">  
                    
                <div class="form-group">
                    
                    <div class="width-50 float-left"><p class="text-left big" style="color:#000;font-size:18px">Create an Account</p>
                    </div>

                    <div class="width-50 float-right">
                        <p class="text-center small">or 
                            <a href="javascript:changePage('login');" style="color:blue;">
                                Sign In 
                            </a>
                        </p>
                    </div>
                      
                </div>

                <div class="imageUp">
                    <center>
                        <img src="./images/default.png" height=40 id=previewimage>
                            <div>
                                <label for="file-upload" class="custom-file-upload">Upload a profile photo</label>
                                <input id=file-upload type="file"/>
                            </div>
                    </center>
                </div>
            


                <div class="form-group">
                   <input id=username type="text" class="form-control" placeholder="Username" required="required">
                </div>
                <div class=smalltext id=usernameerror> 
                </div>
                

                <div class="form-group">
                   <input id=email type="text" class="form-control" placeholder="Your email address" required="required">
                </div>
                <div id=emailerror> 
                </div>
            

                <div class="form-group">
                    <input id=p1 type="password" class="form-control" placeholder="Your password" required="required">
                </div>        
                <div id=p1error> 
                </div>


                <div class="form-group">
                    <input id=p2 type="password" class="form-control" placeholder="Confirm password" required="required">
                </div>        
                <div id=p2error> 
                </div>


                <div class="form-group">
                    <span id=language></span>
                </div>
                <div class=smalltext id=languageerror> 
                </div>



                <div class="form-group" style="display:block;overflow:hidden;line-height:40px">
                     <label for="checkbox-terms" class="text-info float-left">
                        <input id="checkbox-terms" type="checkbox"> 
                            <span style="text-info"> I agree to Malt.chat <span onclick="changePage('terms');"><u>terms and conditions</span></u>.</span> 
                            <span></span>
                     </label>
               
                    <button id=loginb onclick="processAccount(true);" class="btn btn-primary btn-lg float-right">Create Account</button>
                </div>

            
        </div>
      
    </div>   
	`;
	return styleLoginCreate() + s;
}
function editPage()
{
    var s =
    `
            <div class="container">

        <div class="row">
            <center>
            <a href="https://malt.chat" class="navbar-brand">
                <img src="assets/images/malt-logo.svg" width="100px" alt="MALT">
            </a>
            </center>
        </div>

        <div class="login-form ">  
                    
                <div class="form-group">
                    
                    <div class="width-50 float-left"><p class="text-left big" style="color:#000;font-size:18px">Edit Account</p>
                    </div>

                    <div>
                    </div>
                      
                </div>

                <div class="imageUp">
                    <center>
                        <img src="./images/default.png" height=40 id=previewimage>
                            <div>
                                <label for="file-upload" class="custom-file-upload">Upload a new profile photo</label>
                                <input id=file-upload type="file"/>
                            </div>
                    </center>
                </div>
            


                <div class="form-group">
                   <h4 id=username placeholder="Username" size=50>&nbsp;</h4>
                </div>
                

                <div class="form-group">
                   <input id=email type="text" class="form-control" placeholder="Your email address" required="required">
                </div>
                <div id=emailerror> 
                </div>
            

                <div class="form-group">
                    <input id=p1 type="password" class="form-control" placeholder="Your NEW password" required="required">
                </div>        
                <div id=p1error> 
                </div>


                <div class="form-group">
                    <span id=language></span>
                </div>
                <div class=smalltext id=languageerror> 
                </div>



                <div class="form-group" style="display:block;overflow:hidden;line-height:40px">
                     
                        <button class="btn btn-primary btn-lg float-right" onclick="processAccount(false);" id=loginb>Update Account</button>
                        <br><br>
                        <button class="btn btn-primary btn-lg float-left" onclick="logout();">Logout</button>
                        <button class="btn btn-primary btn-lg float-right" onclick="cancelEdit();">Cancel</button>
               
                </div>

            
        </div>
      
    </div>   
    `;
    return styleLoginCreate() + s;
}
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
function pageHeaderDiv()
{







    if (true) return "";








    var s = getMobile() ?

    `
        <div style="padding-top: 10px; padding-right: 10px;padding-bottom: 10px;padding-left: 10px;">
        <a href=base.html><img style="float:left; cursor: pointer;" src=assets/images/malt-logo.svg height=100></a>
        <img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=$$picurl$$ height=100>
        </div>
    `
    :

    `
        <div style="padding-top: 10px; padding-right: 10px;padding-bottom: 10px;padding-left: 10px;">
            <a href=base.html><img style="float:left; cursor: pointer;" src=assets/images/malt-logo.svg height=40></a> 
            <img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=$$picurl$$ height=40>
        </div>
    `

    ;
    return s;
}
function chatsHeaderDiv()
{
    var s = getMobile() ?

    `

        <div style="border-color: gray; font-size: 25px; align-items: center; justify-content: center; padding:10px; background-color: white;">
        
       
        <textarea rows=1 cols=50 onkeyup="chatsInput();" id=search placeholder="username or email of person to find"></textarea>
        </div>
    `

    :

    `
        <style>

        </style>

        

        <div style="font-size: 20px; align-items: center; padding:0px; height: 130px; background-color: #c0c0ff;">

            <div style="min-height: 50px;background-color: white">
                <a href=base.html><img style="padding: 10px;float:left; cursor: pointer; height:30px" src=assets/images/malt-logo.svg></a> 
            </div>



        


            <div style="background-color: #c0c0ff;">
               



           
                    <div style="float:left;padding:2px">
                        <b>Conversations</b> 
                    </div>

                    <div style="float:right;">
                        <a href=z12>
                        <svg viewBox="0 0 36 36" class="a8c37x1j ms05siws hwsy1cff b7h9ocf4" height="28" width="28"><path d="M12.5 18A2.25 2.25 0 118 18a2.25 2.25 0 014.5 0zm7.75 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm5.5 2.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"></path></svg>
                        </a>
                    </div>
            



               

               
                <textarea rows="1" columns="50" onkeyup="chatsInput();" id=search placeholder="search by username or email"></textarea>

            </div>
        </div>
    `

    ;
    return s;
}
function chatsFooterDiv()
{
    var s = getMobile() ?

    `
        <div style="padding: 0 0 0 20px; background-color: lightblue;">
       
        </div>
    `

    :

    `
        <div id=id style="max-height:70px; padding: 0px; background-color: #c0c0ff;font-size: 25px;">
   
   <br><br><br><br><br><br>
        </div>
    `

    ;
    return s;
}
function singleChatSummary()
{
    var s = getMobile() ?

    `
        <div onclick=$$click$$ 
        style=
"display: flex; align-items: center; justify-content: center; background-color: gray; min-height: 100px; padding: 10px 20px; margin: 10px; border-radius: 5px; cursor: pointer;">
            <div style="width: 80px; float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=100 width=60>
            </div>
            <br><br><br> <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                $$msg$$ $$time$$
            </div> <br><br><br>
        </div>
    `

    :

    `
        <div onclick=$$click$$ style="display: flex; align-items: center; justify-content: center; margin: 10px; background-color: #5845f0; min-height: 60px; padding: 10px 20px; border-radius: 10px; cursor: pointer;">
            <div style="width: 80px; float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=60 width=60>
            </div>
            <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                $$msg$$
                <br>
                <span>
                $$time$$
                </span>
            </div> 
        </div>
    `

    ;
    return s;
}




function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
        <img onclick='backButton()' height=64 src=./images/barrow.png>&nbsp;&nbsp;&nbsp;
        
        <div onclick=$$click$$ style="display: flex; align-items: center; justify-content: center; background-color: lightblue; min-height: 100px; padding: 10px 20px;">
            <div style="width: 80px; float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=60 width=60>
            </div>
            <br><br><br> <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                last seen $$time$$
            </div> <br><br><br>
        </div>
    `

    :

    `



        <div style="padding: 5px; height: 40px">
            <img style="float:right; cursor: pointer; border-radius: 50%; padding: 0px;" $$click$$ src=$$local$$ height=40>
        </div>

        <center>
        <div onclick=$$click$$ style="display: flex; background-color: #c0c0ff; min-height: 60px; padding: 10px 20px;">
            <div style="width: 80px;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=60 width=60>
            </div>
            <br><br><br> 
            <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                last seen $$time$$
            </div> 
            <br><br><br>
        </div>
        </center>
    `

    ;
    return s;
}
function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        <div align=left style='display: flex; align-items: flex-end; font-size: 40px;'>
        <img style='border-radius: 50%;' src=$$pic$$ width=50 height=100>
        <div style="width: 40%; padding: 10px; background-color: #2835d0;; color: white; border-radius: 5px; margin-left: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        </div><br>
    `

    :

    `
        <div align=left style='display: flex; align-items: flex-end;'>
        <img style='border-radius: 50%;' src=$$pic$$ width=50 height=50>
        <div style="width: 40%; padding: 10px; background-color: #5845f0;  color: white; border-radius: 5px; margin-left: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        </div><br>
    `

    ;
    return s;
}
function messageDisplayedRight()
{
    var s = getMobile() ?

    `
        <div align=right style='display: flex; align-items: flex-end; justify-content: flex-end; font-size: 40px;'>
        <div style="width: 40%; padding: 10px; background-color: #2835d0; color: white; border-radius: 5px; margin-right: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        <img style='border-radius: 50%;' src=$$pic$$ width=50 height=50>
        <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>
        </div><br>
    `
    :

    `
        <div align=right style='display: flex; align-items: flex-end; justify-content: flex-end;'>
        <div style="width: 40%; padding: 10px; background-color: #5845f0; color: white; border-radius: 5px; margin-right: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
       
        <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>
        </div><br>
    `
    ;
    return s;
}


    var languages = 

    [ 
    "English",
    "en",
    "Español",
    "es",
    "Français",
    "fr",
    "Italiano",
    "it",
    "中文普通话",
    "zh",
    "Русский",
    "ru",
    "Afrikaans",
    "af",
    "Albanian",
    "sq",
    "Amharic",
    "am",
    "Arabic",
    "ar",
    "Armenian",
    "hy",
    "Azerbaijani",
    "az",
    "Basque",
    "eu",
    "Belarusian",
    "be",
    "Bengali",
    "bn",
    "Bosnian",
    "bs",
    "Bulgarian",
    "bg",
    "Catalan",
    "ca",
    "Cebuano",
    "ceb",
    "Chinese (Simplified)",
    "zh",
    "Chinese (Traditional)",
    "zh-TW",
    "Corsican",
    "co",
    "Croatian",
    "hr",
    "Czech",
    "cs",
    "Danish",
    "da",
    "Dutch",
    "nl",
    "English",
    "en",
    "Esperanto",
    "eo",
    "Estonian",
    "et",
    "Finnish",
    "fi",
    "French",
    "fr",
    "Frisian",
    "fy",
    "Galician",
    "gl",
    "Georgian",
    "ka",
    "German",
    "de",
    "Greek",
    "el",
    "Gujarati",
    "gu",
    "Haitian Creole",
    "ht",
    "Hausa",
    "ha",
    "Hawaiian",
    "haw",
    "Hebrew",
    "he",
    "Hindi",
    "hi",
    "Hmong",
    "hmn",
    "Hungarian",
    "hu",
    "Icelandic",
    "is",
    "Igbo",
    "ig",
    "Indonesian",
    "id",
    "Irish",
    "ga",
    "Italian",
    "it",
    "Japanese",
    "ja",
    "Javanese",
    "jv",
    "Kannada",
    "kn",
    "Kazakh",
    "kk",
    "Khmer",
    "km",
    "Kinyarwanda",
    "rw",
    "Korean",
    "ko",
    "Kurdish",
    "ku",
    "Kyrgyz",
    "ky",
    "Lao",
    "lo",
    "Latin",
    "la",
    "Latvian",
    "lv",
    "Lithuanian",
    "lt",
    "Luxembourgish",
    "lb",
    "Macedonian",
    "mk",
    "Malagasy",
    "mg",
    "Malay",
    "ms",
    "Malayalam",
    "ml",
    "Maltese",
    "mt",
    "Maori",
    "mi",
    "Marathi",
    "mr",
    "Mongolian",
    "mn",
    "Myanmar (Burmese)",
    "my",
    "Nepali",
    "ne",
    "Norwegian",
    "no",
    "Nyanja (Chichewa)",
    "ny",
    "Odia (Oriya)",
    "or",
    "Pashto",
    "ps",
    "Persian",
    "fa",
    "Polish",
    "pl",
    "Portuguese",
    "pt",
    "Punjabi",
    "pa",
    "Romanian",
    "ro",
    "Russian",
    "ru",
    "Samoan",
    "sm",
    "Scots Gaelic",
    "gd",
    "Serbian",
    "sr",
    "Sesotho",
    "st",
    "Shona",
    "sn",
    "Sindhi",
    "sd",
    "Sinhala",
    "si",
    "Slovak",
    "sk",
    "Slovenian",
    "sl",
    "Somali",
    "so",
    "Spanish",
    "es",
    "Sundanese",
    "su",
    "Swahili",
    "sw",
    "Swedish",
    "sv",
    "Tagalog",
    "tl",
    "Tajik",
    "tg",
    "Tamil",
    "ta",
    "Tatar",
    "tt",
    "Telugu",
    "te",
    "Thai",
    "th",
    "Turkish",
    "tr",
    "Turkmen",
    "tk",
    "Ukrainian",
    "uk",
    "Urdu",
    "ur",
    "Uyghur",
    "ug",
    "Uzbek",
    "uz",
    "Vietnamese",
    "vi",
    "Welsh",
    "cy",
    "Xhosa",
    "xh",
    "Yiddish",
    "yi",
    "Yoruba",
    "yo",
    "Zulu",
    "zu"
    ];
function termsPage()
{
    // should have a back button

    var s =
    `
    <p style="margin-left:15%; margin-right:15%;">
Terms and Conditions<br><br>
Welcome to MALT.CHAT<br><br>
February 20, 2021<br><br>
These terms and conditions outline the rules and regulations for the use of MALT.CHAT, located at malt.chat.<br><br>
By accessing this website we assume you accept these terms and conditions. Do not continue to use MALT.CHAT if you do not agree to take all of the terms and conditions stated on this page.<br><br>
The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of the United States. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.<br><br>
Cookies<br><br>
We employ the use of cookies. By accessing MALT.CHAT, you agreed to use cookies in agreement with the MALT.CHAT's Privacy Policy.<br><br>
Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. <br><br>
License<br><br>
Unless otherwise stated, MALT.CHAT and/or its licensors own the intellectual property rights for all material on MALT.CHAT. All intellectual property rights are reserved. You may access this from MALT.CHAT for your own personal use subjected to restrictions set in these terms and conditions.<br><br>
You must not:<br><br>
Republish material from MALT.CHAT<br><br>
Sell, rent or sub-license material from MALT.CHAT<br><br>
Reproduce, duplicate or copy material from MALT.CHAT<br><br>
Redistribute content from MALT.CHAT<br><br>
This Agreement shall begin on the date hereof.<br><br>
This website offer an opportunity for users to exchange messages. MALT.CHAT does not filter, edit, publish or review Messages prior to their presence on the website. Messages do not reflect the views and opinions of MALT.CHAT, its agents and/or affiliates. Messages reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, MALT.CHAT shall not be liable for the Messages or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Messages on this website.<br><br>
You warrant and represent that:<br><br>
You are entitled to post the Messages on our website and have all necessary licenses and consents to do so;<br><br>
The Messages do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;<br><br>
The Messages do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy.<br>
You are responsible for any activity that occurs under your username.<br><br>
You are responsible for keeping your password secure.<br><br>
You must not abuse, harass, threaten, impersonate or intimidate other MALT.CHAT users.<br><br>
You may not use the MALT.CHAT service for any illegal or unauthorised purpose. International users agree to comply with all local laws regarding online conduct and acceptable content.<br><br>
You are solely responsible for your conduct and any data, text, information, screen names, graphics, photos, profiles, links (“Content”) that you submit, post, and display on the MALT.CHAT service.<br><br>
You must not modify, adapt or hack MALT.CHAT or modify another website so as to falsely imply that it is associated with MALT.CHAT.<br><br>
You must not access MALT.CHATs private API by any other means other than the MALT.CHAT application itself.<br><br>
You must not crawl, scrape, or otherwise cache any content from MALT.CHAT including but not limited to user profiles and photos.<br><br>
You must not create or submit unwanted email or comments to any MALT.CHAT members (“Spam”).<br><br>
You must not use web URLs in your name without prior written consent from MALT.CHAT.<br><br>
You must not transmit any worms or viruses or any code of a destructive nature.<br><br>
You must not, in the use of MALT.CHAT, violate any laws in your jurisdiction (including but not limited to copyright laws).<br><br>
Violation of any of these agreements will result in the termination of your MALT.CHAT account. While MALT.CHAT prohibits such conduct and content on its site, you understand and agree that MALT.CHAT cannot be responsible for the Content posted on its web site and you nonetheless may be exposed to such materials and that you use the MALT.CHAT service at your own risk.<br><br>
No use of MALT.CHAT's logo or other artwork will be allowed for linking absent a trademark license agreement.<br><br>
iFrames<br><br>
Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.<br><br>
Content Liability<br><br>
We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.<br><br>
Reservation of Rights<br><br>
We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.<br><br>
Removal of links from our website<br><br>
If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br><br>
We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.<br><br>
Disclaimer<br><br>
To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. 
<br><br>
The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br><br>
As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.<br><br>

MALT.CHAT will not be liable to you for any modification, suspension, or discontinuation of the Messenger Services, or the loss of any Content.<br><br>

We reserve the right to modify or terminate the Messenger service for any reason, without notice at any time.<br><br>
We reserve the right to alter these Terms of Use at any time. We may or may not inform you about changed Terms so check back from time to time.<br><br>
We reserve the right to refuse service to anyone for any reason at any time.<br><br>
We reserve the right to force forfeiture of any username that becomes inactive, violates trademark, or may mislead other users.<br><br>
We may, but have no obligation to, remove Content and accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Use.<br><br>
We reserve the right to reclaim usernames on behalf of businesses or individuals that hold legal claim or trademark on those usernames.<br><br>
<br><br>
Privacy Policy
<br><br>
Your privacy is important to us. It is MALT.CHAT's policy to respect your privacy and comply with any applicable law and regulation regarding any personal information we may collect about you, including across our website, https://malt.chat, and other sites we own and operate.
<br><br>
This policy is effective as of 20 February 2021 and was last updated on 20 February 2021.
<br><br>
Information We Collect
Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.
<br><br>
Log Data
When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter.
<br><br>
Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons.
<br><br>
Personal Information
We may ask for personal information which may include one or more of the following:
<br><br>
Email
<br><br>
Legitimate Reasons for Processing Your Personal Information
We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.
<br><br>
Collection and Use of Information
We may collect personal information from you when you do any of the following on our website:
<br><br>
Use a mobile device or web browser to access our content
Contact us via email, social media, or on any similar technologies
When you mention us on social media
We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
<br><br>
We may collect, hold, use, and disclose information for the following purposes, and personal information will not be further processed in a manner that is incompatible with these purposes:
<br><br>
to enable you to access and use our website, associated applications, and associated social media platforms
Please be aware that we may combine information we collect about you with general information or research data we receive from other trusted sources.
<br><br>
Security of Your Personal Information
When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use, or modification.
<br><br>
Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach.
<br><br>
You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.
<br><br>
How Long We Keep Your Personal Information
We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you.
<br><br>
However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes or statistical purposes.
<br><br>
Children’s Privacy
We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
<br><br>
International Transfers of Personal Information
The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.
<br><br>
Your Rights and Controlling Your Personal Information
You always retain the right to withhold personal information from us, with the understanding that your experience of our website may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you.
<br><br>
If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us.
<br><br>
If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email-database or opt out of communications. Please be aware we may need to request specific information from you to help us confirm your identity.
<br><br>
If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date.
<br><br>
If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.
<br><br>
Use of Cookies
We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on preferences you have specified.
<br><br>
Limits of Our Policy
Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.
<br><br>
Changes to This Policy
At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy.
<br><br>
If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.
<br><br>
Contact Us
For any questions or concerns regarding your privacy, you may contact us using the following details:
<br><br>
Harold Squid
<br><br>
hxsquid@gmail.com
<br><br>
`;
    return s;
}

function waitPage()
{
  var s =
    `
<style>
  .container {
  height: 100vh;
  width: 100vw;
  font-family: Helvetica;
}

.loader {
  height: 20px;
  width: 250px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.loader--dot {
  animation-name: loader;
  animation-timing-function: ease-in-out;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: black;
  position: absolute;
  border: 2px solid white;
}
.loader--dot:first-child {
  background-color: #8cc759;
  animation-delay: 0.5s;
}
.loader--dot:nth-child(2) {
  background-color: #8c6daf;
  animation-delay: 0.4s;
}
.loader--dot:nth-child(3) {
  background-color: #ef5d74;
  animation-delay: 0.3s;
}
.loader--dot:nth-child(4) {
  background-color: #f9a74b;
  animation-delay: 0.2s;
}
.loader--dot:nth-child(5) {
  background-color: #60beeb;
  animation-delay: 0.1s;
}
.loader--dot:nth-child(6) {
  background-color: #fbef5a;
  animation-delay: 0s;
}
.loader--text {
  position: absolute;
  top: 200%;
  left: 0;
  right: 0;
  width: 4rem;
  margin: auto;
}
.loader--text:after {
  font-weight: bold;
  animation-name: loading-text;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

@keyframes loader {
  15% {
    transform: translateX(0);
  }
  45% {
    transform: translateX(230px);
  }
  65% {
    transform: translateX(230px);
  }
  95% {
    transform: translateX(0);
  }
}

</style>

<center>
  <br><br><br><br><br><br><br>
<div class="container">
  <div class="loader">
    <div class="loader--dot"></div>
    <div class="loader--dot"></div>
    <div class="loader--dot"></div>
    <div class="loader--dot"></div>
    <div class="loader--dot"></div>
    <div class="loader--dot"></div>
  </div>
</div>
`;
  return s;
}
function supportPage()
{
    // should have a back button

    var s =
    `
        <div>
            <img src="assets/images/malt-logo.svg" alt="MALT">
        </div>
        <h1>Support</h1>
    `;
    return s;
}
function resetPage()
{
    // should have a back button

    var s =
    `
        <div>
            <img src="assets/images/malt-logo.svg" alt="MALT">
        </div>
        <h1>Reset password</h1>
    `;
    return s;
}