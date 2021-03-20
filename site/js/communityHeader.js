function communityHeader()
{
    var s = getMobile() ?

    `
        <div style="display: flex; justify-content: center;  align-items: center; background-color: white; border-spacing: 0px; width: 100%;">

        	<img onclick="home();" height=30 style="padding: 10px;float:left; cursor: pointer;" src=images/logo.png>

        	&nbsp;&nbsp;

        	<img height=30 src=$$picurl$$ style="border-radius: 50%;">

        	&nbsp;&nbsp;

        	<div style="flex-grow: 1;">
                <b>$$name$$</b> active $$time$$
        	</div>

        	<span style="float:right; padding:10px;">
	            <img onclick="newchat();" style="cursor: pointer" src=/images/newchat.png height=30>
	            <img onclick="invitation();" style="cursor: pointer"src=/images/invitation.png height=30>
	            <img $$click$$ style="cursor: pointer"src=/images/edit.png height=30>
            </span>

        </div>
    `

    :


    `
    	not used
    `

    ;

    return s;
}
