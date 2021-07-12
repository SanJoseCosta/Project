function conversationPage()
{
	var s =
	`
		<div>
    
            <div id=conversation>
    
                <div id=conversation-header style="height: 10%;"></div>          

                <div id=messages-list style="overflow: auto; height: 80%;"></div>



                 <div id=conversation-footer style="background-color: #eeeeee;">

                            <div style="float:left; padding:15px;">
                                <textarea rows=1 placeholder="Type your message ..." id=msg></textarea>
                            </div>

                            <img src=images/send.png style="height:50px;" onclick="messageBoxSend();">
                        
                </div>

    


            </div>
    
        </div>
	`;
	return s;
}