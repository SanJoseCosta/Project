function communityPage()
{
    var s = getMobile() ?


     ` not used  `

    /*
    `   
        <style>

            .row {
              display: flex;
            }

            .column1 
            {
              flex: 20%;
            }

            .column2
            {
              flex: 80%;
            }

        </style>


        <div style="height: 90%;">
        


            <div class=row id=community-header style="height: 9%;">
            </div>
             
            <div class=row style="height: 85%;">
                <div class=column1>
                    <div id=chats-list>
                    </div>
                </div>

                <div class=column2>
                    <div id=messages-list style="display: flex; flex-direction: column;">
                    </div>
                </div>
            </div>

            <div class=row style="height: 9%;">
                <div id=conversation-footer style="padding: 10px;">
                    <textarea rows=1 onkeyup="messageBoxInput();" placeholder="New message ..." id=msg></textarea>
                </div>
            </div>

            

        </div>

    `
    */

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
                                <textarea rows=1 placeholder="Type your message ..." id=msg></textarea>
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
