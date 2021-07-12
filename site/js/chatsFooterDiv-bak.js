function chatsFooterDiv()
{
    var s = getMobile() ?

    `
        <div style="padding: 0 0 0 20px;">
       
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