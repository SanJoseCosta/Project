function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
        <div style="min-height: 50px;background-color: white;">
            <div style="float:right;">
                <img style="cursor: pointer; border-radius: 50%; padding: 0px;" $$click$$ src=$$local$$ height=30>
                <br>
                $$localusername$$
            </div>
        </div>

        <div 
          style="display: flex;  align-items: center; color: white; background-color: #96d872; min-height: 50px; cursor: pointer;">
            <div>
                <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
            </div>

            <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span>
                <br>
                <span>
                $$time$$
                </span>
            </div> 
        </div>
    `

    :

    `
        <div style="min-height: 50px;background-color: white;">
            <div style="float:right;">
                <img style="cursor: pointer; border-radius: 50%; padding: 0px;" $$click$$ src=$$local$$ height=30>
                <br>
                <div style="font-size:10;">
                    $$localusername$$
                </div>
            </div>
        </div>

        <div 
          style="display: flex;  align-items: center; color: white; background-color: #96d872; min-height: 50px; cursor: pointer;">
            <div>
                <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
            </div>

            <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span>
                <br>
                <span>
                $$time$$
                </span>
            </div> 
        </div>

    `

    ;
    return s;
}