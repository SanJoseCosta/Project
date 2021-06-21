function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
        <div style="display: flex; justify-content: center; align-items: center; color: black; background-color: #ffffff; width: 100%;">

            <img onclick="backButton();" height=30 style="padding: 10px;float:left; cursor: pointer;" src=images/barrow.png>

            &nbsp;&nbsp;

            <img height=30 src=$$picurl$$ style="border-radius: 50%;">

            &nbsp;&nbsp;

            <div style="flex-grow: 1;">
                <b>$$name$$</b> <span style="font-size: 10px;">active $$time$$</span>
            </div>

            <span style="float:right; padding:10px;">
            </span>

        </div>
      
    `

    :

    `
            <div style="float:left; align:center; color: black; cursor: pointer; background-color: #ffffff;">
                
                <div style="margin: 0 10px;">
                    <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
                </div>

                <div style="font-size:12;">
                    <span>chatting with <b>$$name$$</b>

                    <br>
                
                    last seen $$time$$
                    </span>
                </div> 

            </div>

             <div style="float:right; align:center;">
                <img style="cursor: pointer; align:center; border-radius: 50%;  padding: 0px;" $$click$$ src=$$local$$ height=30 width=30>

                <div style="font-size:12; text-align: center; color: black;">
                    signed in as <b>$$localusername$$<b>
                </div>
            </div>
    `

    ;
    return s;
}
