function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
       

        <div style="float:right;">
                <img style="cursor: pointer; border-radius: 50%; padding: 0px;" $$click$$ src=$$local$$ height=30>    
        </div>
        <div style="float:left;">
                <span>chatting with <b>$$name$$</b></span>
                <br>
                <span>
                $$time$$
                </span>
        </div> 

      
    `

    :

    `
        <div style="background-color: blue;">
            <div style="float:left; align:center; color: white; cursor: pointer;">
                
                <div style="margin: 0 10px;">
                    <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
                </div>

                <div style="font-size:12;">
                    <span>chatting with <b>$$name$$</b>
                
                    last seen $$time$$
                    </span>
                </div> 

            </div>

             <div style="float:right; align:center;">
                <img style="cursor: pointer; align:center; border-radius: 50%;  padding: 0px;" $$click$$ src=$$local$$ height=30 width=30>

                <div style="font-size:12; text-align: center; color: white;">
                    signed in as <b>$$localusername$$<b>
                </div>
            </div>
        </div>
    `

    ;
    return s;
}
