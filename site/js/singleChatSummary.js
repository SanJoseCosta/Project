function singleChatSummary()
{
    //  $$msg$$ $$time$$

    var s = getMobile() ?

    `
        <div onclick=$$click$$ class=summaryboxm>
            
            
            <img style="border-radius: 50%;" src=$$picurl$$ height=30 width=30>

            <span style="background-color: $$color$$; min-width: 16px; min-height: 16px; border-radius: 50%; z-index: 1; opacity: 85%">
                abc &nbsp; &nbsp; &nbsp; 
            </span>

            

            $$name$$
            
        </div>
        
        <br>
    `

    :

    `
        <div onclick=$$click$$ style="font-size: 12px;" class=summarybox>

            <div style="width: 80px; float: left;">
                    
                <img style="border-radius: 50%; width: 60px; height: 60px;" src=$$picurl$$>
                    
                <span style="background-color: $$color$$; min-width: 16px; min-height: 16px; border-radius: 50%; z-index: 1; opacity: 85%">
                        &nbsp; &nbsp; &nbsp; 
                </span>

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