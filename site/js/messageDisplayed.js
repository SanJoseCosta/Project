function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        <div style="clear:both; float:left; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px; margin: 5px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:left; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px; margin: 5px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    ;
    return s;
}
function messageDisplayedRight()
{
    var s = getMobile() ?

    `
         <div style="clear:both; float:right; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>
                
                <div style="padding: 15px; margin: 5px; border-radius: 10px; background-color: blue; color: white;">
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:right; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">$$time$$<br></div>
                <div style="padding: 15px; margin: 5px; border-radius: 10px; background-color: blue; color: white;">
                    $$msg$$<br>
                    <div style="font-size: 12px;">
                    ($$translation$$)
                    </div>
                </div>
            </div>
        </div>
    `

    ;

    return s;
}
