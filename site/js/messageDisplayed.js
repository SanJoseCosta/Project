function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        <div class=block>
            <div>

                <div style="color: black; font-size: 10px;">
                    &nbsp;
                    $$time$$
                    <br><br>
                </div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>($$translation$$)
                </div>

            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:left; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">
                    &nbsp;
                    $$time$$
                    <br><br>
                </div>

                <div style="float: left; border-radius: 10px; max-width: 100%; background-color: blue; color: white; padding: 15px;">
                    <img style="border-radius: 50%;" src=$$pic$$ width=30 height=30>
                    $$msg$$<br>($$translation$$)
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
        <div class="block right">
            <div class=textr>
                
                <div style="color: black; font-size: 10px;">
                    &nbsp;
                    $$time$$
                    <br><br>
                </div>
                
                <div style="display: flex; padding: 15px; border-radius: 10px; background-color: blue; color: white;">
                    <div>
                        $$msg$$<br>($$translation$$)
                    </div>
                    <img style="border-radius: 50%;" src=$$status$$ width=15 height=15>
                </div>

            </div>
        </div>
    `

    :

    `
        <div style="clear:both; float:right; max-width:60%;">
            <div>
                <div style="color: black; font-size: 10px;">
                    &nbsp;
                    $$time$$
                    <br><br>
                </div>
                <div style="display: flex; padding: 15px; border-radius: 10px; background-color: blue; color: white;">
                    $$msg$$<br>($$translation$$)
                </div>
            </div>
        </div>
    `

    ;

    return s;
}
