function chatsFooterDiv()
{
    var s = getMobile() ?

    `
        <div style="padding: 0 0 0 20px; background-color: lightblue;">
       
        </div>
    `

    :

    `
        <div>
            <br><br><br><br>
        </div>
    `

    ;
    return s;
}