

function chatsHeaderDiv()
{
    var s = getMobile() ?

    `
    <div style="min-height: 50px; background-color: #ffffff;">
        <div>
            <span style="float:left; padding:5px;">
                <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/logo.png></a> 
                <b>

                    <blah>Conversations</blah>

                </b> 
            </span>
            <span style="float:right; padding:5px;">
                <img onclick="newchat();" style="cursor: pointer" src=images/newchat.png height=30>
                <img onclick="invitation();" style="cursor: pointer" src=images/invitation.png height=30>
                <img onclick="edit();" style="cursor: pointer"src=images/edit.png height=30>
            </span>
        </div>

    </div>
    `

    :

    `
    <div style="min-height: 50px; background-color: #ffffff;">
        <div>
            <span style="float:left; padding:5px;">
                <a href=index.html><img height=30 style="padding: 5px; cursor: pointer;" src=images/logo.png></a> 
                <b>

                    <blah>Conversations</blah>

                </b> 
            </span>
            <span style="float:right; padding:5px;">
                <img onclick="newchat();" style="cursor: pointer" src=images/newchat.png height=30>
                <img onclick="invitation();" style="cursor: pointer" src=images/invitation.png height=30>
            </span>
        </div>
    </div>
    `

    ;
    return s;
}
