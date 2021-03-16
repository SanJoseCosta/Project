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