function conversationPage()
{
	var s =
	`
		<div>
    
            <div id=conversation>
    
                <div id=conversation-header style="height: 10%;"></div>          

                <div id=messages-list style="overflow: auto; height: 80%;"></div>



                <div id=conversation-footer style="height: 10%; background-color: #eeeeee;">
               
                    <textarea style="width:80%;" rows=1 placeholder="Type your message..." id=msg></textarea>

                    &nbsp;
                    
                    <img src=images/send.png style="height:48px;" onclick="messageBoxSend();">
                
                </div>
    


            </div>
    
        </div>
	`;
	return s;
}