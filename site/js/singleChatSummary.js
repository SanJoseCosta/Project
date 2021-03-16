function singleChatSummary()
{
    //  $$msg$$ $$time$$

    var s = getMobile() ?

    `
        <style>

        .summarybox
        {
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                background-color: #5845f0; 
                padding: 10px; 
                border-radius: 10px; 
                cursor: pointer;
        }
        </style>

        <div onclick=$$click$$ class=summarybox>
            <div style="float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>
            </div>
            <div style="padding: 10px; flex-grow: 1;">

                <span>$$name$$</span>
               
            </div> 
        </div>
        <br>
    `

    :

    `
        <style>

        .summarybox
        {
                display: flex; 
                align-items: center; 
                justify-content: center; 
                color: white; 
                background-color: #5845f0; 
                padding: 10px; 
                border-radius: 10px; 
                cursor: pointer;
        }

        .photocontainer {
            width: 50px;
            height: 50px;
            position: relative;
          }
          .photobox {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0.7;
          }
          .photooverlay {
            z-index: 9;
            background: #009938;
          }
        
        </style>

        <div onclick=$$click$$ style="font-size: 12px; min-height: 60px;" class=summarybox>

            <div style="width: 80px; float: left;">


            <div class=photocontainer>

                <div class=photobox>
                    <img style="border-radius: 50%; width: 60px; height: 60px;" src=$$picurl$$>
                </div>

                <div class="photobox photooverlay" 
                style="position: absolute; background-color: $$color$$; top: 45px; left: 45px; width: 16px; height: 16px; border-radius: 50%; z-index: 1; opacity: 85%"> 
                </div>

            </div>



            </div>
            <div style="flex-grow: 1;">

                <span><b>$$name$$</b></span><br>
                $$msg$$
                <br>
                <span>
                $$time$$
                </span>
            </div> 
        </div>
        <br>
    `

    ;
    return s;
}