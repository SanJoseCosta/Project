
    function requestTranslation(tolang, fromlang, text) //, callback)
    {
        var base = "https://translation.googleapis.com/language/translate/v2?";
        var params = "target=" + tolang + "&source=" + fromlang + 
        "&key=" + "AIzaSyC3" +
                "1GV2BJqC" +
                "IoXCM6Nj" +
                "OtLohY-l" +
                "WV1bQ3Q" + "=&q=" + text; // key 

        pageRequest(base, params, recieveTranslation);

        // todo set a timeout in case the translation doesnt return
    }

    function parseTranslationResponse(r)
    {
        var search = "\"translatedText\": \"";
        var k = r.indexOf(search);

        if (k >= 0)
        {
            r = r.substring(k + search.length);
            k = r.indexOf("\"");
            if (k > 0)
            {
                return r.substring(0, k);
            }
        }

        return null;
    }

    function recieveTranslation(r)
    {
        var translateResponse = r.responseText;

        if (debug) log("received translation response " + translateResponse);

        var translation;
        if (translateResponse == null)
        {
            translation = "-unknown response from translator-";
        } 
        else
        {
            // now pull out the translated text

            translation = parseTranslationResponse(translateResponse);
            if (translation == null)
                translation = "-unknown response from translator-";
        }

        completeTranslation(translation);
    }
    
    function pageRequest(url, params, processfunction)
    {
        var encodedMessage = encodeURI(params);
        url = url + encodedMessage;

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send(null);

        log("page request for " + url);

        request.onload =
        function (e)
        {
            processfunction(request);
        }
    }

    function completeTranslation(translation)
    {
        var mid = id();

        var m = JSON.stringify(
            {
                type: "message",
                message: messageBeingTranslated,
                translation: translation,
                mid: mid
            });

        var status;
        try
        {
            socketsend(m);
            status = 1;
        } 
        catch (err)
        {
            logError("*** error while sending message to server: " + err.message);
            status = -1;
        }

        var msg = makeMessage(mid, messageBeingTranslated, translation, true, status);
                
        addMessage(msg, false);

        pageUpdate(true);
    }

