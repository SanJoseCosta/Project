function singleChatSummary()
{
    //  $$msg$$ $$time$$

    var s = getMobile() ?

    `
        <div onclick=$$click$$ class=summaryboxm>
            
            <div style="position: relative; height:30px; width:30px;">
                <img style="border-radius: 50%; width: 30px; height: 30px;" src=$$picurl$$>
                <img src=images/$$color$$.png style="width: 8px; height: 8px; position: absolute; bottom: 0px; right: 0px;">
            </div>
            

            $$name$$
            
        </div>
        
        <br>
    `

    :

    `
        <div onclick=$$click$$ style="font-size: 12px;" class=summarybox>

            <div style="width: 80px; float: left;">
                    
                <div style="position: relative; height:60px; width:60px;">
                    <img style="border-radius: 50%; width: 60px; height: 60px;" src=$$picurl$$>
                    <img src=images/$$color$$.png style="position: absolute; bottom: 0px; right: 0px;">
                </div>
               
            </div>
            
            <div style="flex-grow: 1;">
                <span>
                    <b>$$name$$</b>
                </span>
                <br>
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