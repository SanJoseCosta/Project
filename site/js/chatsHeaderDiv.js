function chatsHeaderDiv()
{
    var s = getMobile() ?

    `
            <div style="min-height: 50px; background-color: #96d872; ">
               
                <div>
                    <span style="float:left; padding:5px;">
                        <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/logo.png></a> 
                        <b>Conversations</b> 
                    </span>

                    <span style="float:right; padding:5px;">
                        <img onclick="newchat();" style="cursor: pointer" src=/images/newchat.png height=30>
                        <img onclick="invitation();" style="cursor: pointer" src=/images/invitation.png height=30>
                        <img onclick="help();" style="cursor: pointer" src=/images/help.png height=30>
                    </span>
                </div>

            </div>
    `

    :

    `
            <div style="min-height: 50px; background-color: #96d872; ">
               
                <div>
                    <span style="float:left; padding:5px;">
                        <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/malt-logo.svg></a> 
                        <br>
                        <b>Conversations</b> 
                    </span>

                    <span style="float:right; padding:5px;">
                        <img onclick="newchat();" style="cursor: pointer" src=/images/newchat.png height=30>
                        <img onclick="invitation();" style="cursor: pointer" src=/images/invitation.png height=30>
                        <img onclick="help();" style="cursor: pointer" src=/images/help.png height=30>
                    </span>
                </div>

            </div>
    `

    ;
    return s;
}
