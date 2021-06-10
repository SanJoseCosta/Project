
    function makeMessageJson(json)
    {
        var m = {};

        m.mid =                 json.mid;
        m.message =             json.message;
        m.translation =         json.translation;
        m.localSender =         json.localSender == "true";
        m.status =              parseInt(json.status);

        log("make message: " + m.mid + ", " + m.message + ", " + m.translation + ", " + m.localSender + ", " + m.status);

        return m;
    }
    
    function makeMessage(id, msg, tr, lg, s)
    {
        var m = {};

        m.mid = id;
        m.message = msg;
        m.translation = tr;
        m.localSender = lg;
        m.status = parseInt(s);

        return m;
    }
    
    function addMessage(msg, mustExist)
    {
        var replaced = false;

        for (var i = 0; i < messages.length; ++i)
        {
            if (messages[i].mid == msg.mid)
            {
                messages.splice(i, 1, msg);
                replaced = true;
                break;
            }
        }

        if (!replaced)
        {
            if (mustExist)
            {
                logError("*** cannot find message: " + msg);
                return;
            }

            messages.push(msg);
            if (debug) log("Added message: " + msg.mid + " " + msg.message + " " + msg.status);
        }
    }
    
    function receiveHistoryJson(json, status)
    {
        json = json.messages;

        for (var i = 0; i < json.length; ++i)
        {
            if (json[i].mid != "0")
            {
                var m = makeMessageJson(json[i], false);
                addMessage(m);

                if (!m.localSender && m.status != 4 && status == 4)
                    sendAck(m.mid, status);
            }
        }
    }
