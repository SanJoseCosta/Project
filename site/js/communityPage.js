function communityPage()
{
    var s = getMobile() ?


     ` not used  `

    :

    `
    <style>

        .t1
        {
            width:20%;
            background-color: #ffffff;
        }

        .t2
        {
            width:75%;
            background-color: #ffffff;
        }
        
    </style>

    <div>
        <table style="width: 100%; height: 100%;">
            <tr>
                <td style="padding:4px;" class=t1>
                    <div id=chats-header>
                    </div>
                </td>
                <td style="padding:4px;" class=t2>
                    <div id=conversation-header>
                    </div>
                </td>
            </tr>
            <tr style="height: 80%;">
                <td class=t1>
                    <div id=chats-list>
                    </div>
                </td>
                <td class=t2>
                    <div id=messages-list>
                    </div>
                </td>
            </tr>
            <tr>
                <td class=t1>
                    <div id=chats-footer>
                    </div>
                </td>
                <td class=t2>
                    <div id=conversation-footer style="width:600px; background-color: #eeeeee;">
                        <div style="float:left; padding:15px; width:500px;">
                            <textarea rows=1 placeholder="<blah>Type your message ...</blah>" id=msg></textarea>
                        </div>
                        <img src=images/send.png style="height:50px;" onclick="messageBoxSend();">
                    </div>
                </td>
            </tr>
        </table>
    </div>
    `

    ;

    return s;
}
