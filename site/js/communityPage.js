function communityPage()
{
    var s = getMobile() ?


    `   
        <style>

            .t1
            {
                
                background-color:#76b333;;
                width: 30%;
                
            }

            .t2
            {
                
                background-color:#76b222;;
                width: 70%;
                
            }

        </style>

        <div>

            <table style="border-spacing: 0px; width: 100%; height: 100%;">

                <tr>
                    <td td class=t1>
                        <div id=chats-header>
                        </div>
                    </td>

                    <td class=t2>
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
                        <div id=messages-list style="display: flex; flex-direction: column;">
                            
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class=t1 style="background-color:#96d872;">
                        <div id=chats-footer>
                        </div>
                    </td>
                    <td class=t2 style="background-color:#96d872;">
                        <div id=conversation-footer style="background-color:#96d872; padding:15px;">
                            <textarea rows=1 onkeyup="messageBoxInput();" placeholder="Type ..." id=msg></textarea>
                        </div>
                    </td>
                </tr>

            </table>

        </div>
        <br>

    `

    :

    `
        <style>

            .t1
            {
                
                background-color:#76b852;;
                width:20%;
                
            }

            .t2
            {
                
                background-color:#76b852;;
                width:75%;
                
            }
            
        </style>

        <div>

            <table style="border-spacing: 0px; width: 100%; height: 100%;">

                <tr>
                    <td class=t1>
                        <div id=chats-header>
                        </div>
                    </td>

                    <td class=t2>
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
                        <div id=messages-list style="display: flex; flex-direction: column;">
                            
                        </div>
                    </td>
                </tr>

                <tr>
                    <td class=t1 style="background-color:#96d872;">
                        <div id=chats-footer>
                        </div>
                    </td>
                    <td class=t2 style="background-color:#96d872;">
                        <div id=conversation-footer style="background-color:#96d872; padding:15px;">
                            <textarea rows=1 onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                        </div>
                    </td>
                </tr>

            </table>

        </div>
    `

    ;

    return s;
}
