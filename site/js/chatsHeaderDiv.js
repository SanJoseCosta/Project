function chatsHeaderDiv()
{
    var s = getMobile() ?

    `

        <div style="min-height: 50px;background-color: white">

                <a href=index.html>
                    <img height=30 style="padding: 10px;float:left; cursor: pointer;" src=assets/images/malt-logo.svg>
                </a> 
            
            </div>

            <div style="min-height: 50px; background-color: #96d872; ">
               
                <div>
                    <span style="float:left; padding:10px;">
                        <b>Conversations</b> 
                    </span>

                    <span style="float:right; padding:10px;">
                        <img onclick="newchat();" style="cursor: pointer" src=/images/newchat.png height=30>
                        <img onclick="invitation();" style="cursor: pointer"src=/images/invitation.png height=30>
                    </span>
                </div>

            </div>

            
    `

    :

    `
            <div style="min-height: 50px;background-color: white">

                <a href=index.html>
                    <img height=30 style="padding: 10px;float:left; cursor: pointer;" src=assets/images/malt-logo.svg>
                </a> 
            
            </div>

            <div style="min-height: 50px; background-color: #96d872; ">
               
                <div>
                    <span style="float:left; padding:10px;">
                        <b>Conversations</b> 
                    </span>

                    <span style="float:right; padding:10px;">
                        <img onclick="newchat();" style="cursor: pointer" src=/images/newchat.png height=30>
                        <img onclick="invitation();" style="cursor: pointer"src=/images/invitation.png height=30>
                    </span>
                </div>

            </div>
       
    `

    ;
    return s;
}
