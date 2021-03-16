function communityPage()
{
    var s = getMobile() ?

	


    `
        <style>

            html, body 
            {
                height: 90vh;
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
                flex: 0 0 30%;
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
    `


    :



    
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
