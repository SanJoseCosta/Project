function communityPage()
{
    var s = getMobile() ?

    `   
        <style>

            .row {
              display: flex;
            }

            .column1 
            {
              flex: 20%;
              background-color:#76b333;;
            }

            .column2
            {
              flex: 80%;
              background-color:#76b333;;
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

            <table style="width: 100%; height: 100%;">

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
                            <textarea rows=1 onkeyup="messageBoxInput();" placeholder="New message ..." id=msg></textarea>
                        </div>
                    </td>
                </tr>

            </table>

        </div>
    `

    ;

    return s;
}
