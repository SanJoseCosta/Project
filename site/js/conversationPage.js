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
               
                    <textarea onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                    <img src=x onclick="messageBoxSend();">
                
                </div>
    
            </div>
    
        </div>
	`;
	return s;
}