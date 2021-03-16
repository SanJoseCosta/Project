function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        
        <div align=left style="display: flex; align-items: flex-end; font-size: 15px;">
            <img style='border-radius: 50%;' src=$$pic$$ width=50 height=50>
            <div>
                <div style='font-size: 8px;'>
                    &nbsp;
                    $$time$$
                    <br>
                </div>
                
                <div style="width: 100%; padding: 10px; background-color: #2835d0;; color: white; border-radius: 5px; margin-left: 10px;">
                    $$msg$$<br>($$translation$$)
                </div>
            </div>
        </div><br>
    `

    :

    `
        <style>
                            #ml
                            {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: flex-start;
                            }
        </style>

        <div id=ml>
            <img style='border-radius: 50%;' src=$$pic$$ width=50 height=50>
            <div>
                <div style='font-size: 10px;'>
                    &nbsp;
                    $$time$$
                    <br>
                </div>
                
                <div style="width: 100%; padding: 10px; background-color: #2835d0;; color: white; border-radius: 5px;">
                    $$msg$$<br>($$translation$$)
                </div>
            </div>
        </div><br>
    `

    ;
    return s;
}
function messageDisplayedRight()
{
    var s = getMobile() ?

    `
        <div style="width: 70%; float: right; font-size: 15px;">
            <div>


                <div style='font-size: 8px;'>
                    &nbsp;
                    $$time$$
                    <br>
                </div>
                
                <div style="width: 100%; padding: 10px; background-color: #2835d0;; color: white; border-radius: 5px; margin-left: 10px;">
                    $$msg$$<br>($$translation$$)
                </div>
           
                <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>


            </div>
        </div><br>


    `
    :

    `
         <style>
                            #mr
                            {
                                display: flex;
                                flex-direction: column;
                                justify-content: left;
                                align-items: flex-end;
                            }
        </style>
        <div id=mr>
            <div style="float: right; font-size: 15px;">
                

                <div style='font-size: 8px;'>
                    &nbsp;
                    $$time$$
                    <br>
                </div>

                <div style="max-width: 70%; padding: 10px; background-color: #2835d0;; color: white; border-radius: 5px;">
                    $$msg$$<br>($$translation$$)
                    <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>
                </div>


            </div>
        </div><br>

    `
    ;
    return s;
}