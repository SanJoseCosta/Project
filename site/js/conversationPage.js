function conversationPage()
{
	var s =
	`
        <style>
        
            #messages-list
            {
                overflow: auto;
                height: 70%;
            }


        </style>
        
		<div class="grid-container">
    
            <div id=conversation>
    
                <div id=conversation-header></div>          

                <div id=messages-list></div>

                <div id=conversation-footer>
               
                    <textarea style="width:80%;"
                    onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                    <img src=images/send.png style="height:60px;" onclick="messageBoxSend();">
                
                </div>
    
            </div>
    
        </div>
	`;
	return s;
}