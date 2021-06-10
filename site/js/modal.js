
    function popModal(p1, p2, p3)
    {
        var r = newchatModal();

        r = replaceAll(r, "$$okclick$$", p1);

        r = replaceAll(r, "$$cancelclick$$", p2);

        r = replaceAll(r, "$$placeholder$$", p3);

        var modal = document.getElementById("myModal");

        if (modal != null)
            modal.remove();

        var body = document.getElementsByTagName("BODY")[0];
        body.innerHTML += r;
        
        modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    function closeModalReturnValue()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        var textarea = document.getElementById("txa");
        var r = textarea.value;
        return r;
    }

    function newchat()
    {
        log("newchat");
        popModal("onclick='searchForNewChat();'", "onclick='xModal();'", "username or email");
    }

    function searchForNewChat()
    {
        var r = closeModalReturnValue();
        searchUsers(currentToken, r);
    }

    function invitation()
    {
        log("invitation");
        popModal("onclick='sendInvitation();'", "onclick='xModal();'", "email");
    }

    function sendInvitation()
    {
        var r = closeModalReturnValue();
        inviteUser(r);
    }

    function xModal()
    {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    function help()
    {
        talk("support");
    }
