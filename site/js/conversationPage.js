function conversationPage()
{
	var s =
	`
    <div id=conversation>
        <div id=conversation-header style="height: 10%;">
        </div>          
        <div id=messages-list style="overflow: auto; height: 80%;">
        </div>
        <div id=conversation-footer style="background-color: #eeeeee;">
            <div style="float:left; padding:15px;">
                <textarea rows=1 placeholder="<blah>Type your message ...</blah>" id=msg></textarea>
            </div>
            <img src=images/send.png style="height:50px;" onclick="messageBoxSend();">
        </div>
    </div>
	`;
	return s;
}