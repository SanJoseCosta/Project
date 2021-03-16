function chatsHeaderDiv()
{
    var s = getMobile() ?

    `

            <div style="min-height: 50px;background-color: white">
                <a href=index.html>
                    <img style="padding: 10px;float:left; cursor: pointer; height:30px" src=assets/images/malt-logo.svg>
                </a> 
            </div>


            <div style="min-height: 90px; background-color: #96d872; ">
               
                <div style="font-size:12px; float:left;padding:10px">
                    Conversations 
                </div>

                
    
                <textarea rows=1 onkeyup="chatsInput();" id=search placeholder="new"></textarea>

            </div>
            
    `

    :

    `
            <div style="min-height: 50px;background-color: white">
                <a href=index.html>
                    <img height=30 style="padding: 10px;float:left; cursor: pointer;" src=assets/images/malt-logo.svg>
                </a> 
            </div>


            <div style="min-height: 100px; background-color: #96d872; ">
               
                <div>
                    <span style="float:left; padding:10px;">
                        <b>Conversations</b> 
                    </span>

                    <span style="float:right;">
                        <img src=/images/hamburger.png height=30>
                    </span>
                </div>
                
                <div style="background-color:#96d872; padding:10px;">
                    <textarea rows=1 style="width:80%;" onkeyup="chatsInput();" id=search placeholder="new"></textarea>
                </div>

            </div>

       
    `

    ;
    return s;
}