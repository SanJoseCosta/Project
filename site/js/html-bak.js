function supportPage()
{
	var s =
	`
		<div>
    		<img src="assets/images/malt-logo.svg" alt="MALT">
      	</div>
       	<h1>Support</h1>
 	`;
 	return s;
}
function resetPage()
{
	var s =
	`
		<div>
    		<img src="assets/images/malt-logo.svg" alt="MALT">
      	</div>
       	<h1>Reset password</h1>
 	`;
 	return s;
}
function chatsPage()
{
	var s =
	`
        <div class="grid-container">
            <div id=header class=hdr></div>
    
            <div id=chats class=men>
        
                <div id=chats-header></div>
                <div id=chats-list></div>
                <div id=chats-footer></div>
    
            </div>
    
            <div class=foo id=footer></div>
        </div>
   	`;
   	return s;
}
function conversationPage()
{
	var s =
	`
		<div class="grid-container">
            <div id=header class=hdr></div>
    
            <div id=conversation class=mai>
    
                <div id=conversation-header></div>          
                <div id=messages-list></div>
                <div id=conversation-footer>
                    <textarea onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                    <i class="fa fa-paper-plane" onclick="messageBoxSend();" aria-hidden="true"></i>
                </div>
    
            </div>
    
            <div class=foo id=footer></div>
        </div>
	`;
	return s;
}
function communityPage()
{
	var s =
	`


        <style>

        #gc {
              position: absolute;
              top: 0;
              left: 0; 
              right: 0;
              bottom: 0;
              background: #f5f5ff;
            }

        </style>

		<div id=gc class="grid-container">
            <div id=header class=hdr></div>
    
            <div id=chats class=men>
        
                <div id=chats-header></div>
                <div id=chats-list></div>
                <div id=chats-footer></div>
    
            </div>
    
            <div id=conversation class=mai>
    
                <div id=conversation-header></div>          
                <div id=messages-list></div>
                <div id=conversation-footer>
                    <textarea onkeyup="messageBoxInput();" placeholder="Type your message..." id=msg></textarea>
                    <i class="fa fa-paper-plane" onclick="messageBoxSend();" aria-hidden="true"></i>
                </div>
    
            </div>
    
            <div class=foo id=footer></div>
        </div>
	`;
	return s;
}
function editPage()
{
	var s =
	`
		<div id=header></div>

		<div class="signBox fd">
			<h3>Edit Account</h3>

			<h4 id=username placeholder="Username" size=50>&nbsp;</h4>
			<div class=smalltext id=usernameerror> </div>
				
			<input id=email placeholder="Your email address" class="inputEnt" size=50 type="email">
			<div class=smalltext id=emailerror> </div>
			
			<div>
				<input type=checkbox id=pcheck onchange="checkboxclicked();">
				<label for=vehicle1>Change password</label><br>
			</div>

			<input id=p1 disabled placeholder="New password" class="inputEnt" size=50 type="password">
			<div class=smalltext id=p1error> </div>

			<span id=language></span>
			<div class=smalltext id=languageerror> </div>

			<div class="imageUp">
				<img src="./images/default.png" height=70 id=previewimage>
				<div>
					<label for="file-upload" class="custom-file-upload">
						Upload a profile photo
					</label>
					<input id=file-upload type="file"/>
				</div>
			</div>
			
			<input type="checkbox" class="custom-control-input" checked="" id="checkbox-remember">
	     	<label class="custom-control-label" for="checkbox-remember">Remember me</label>

	        <div class=loginbutton>
	            <button onclick="processAccount(false);" id=loginb>Update</button>
	        </div>
			
			<div class="editEnd">
				<button onclick="logout();">Logout</button>
				<button onclick="cancelEdit();">Cancel</button>
			</div>

		</div>
	`;
	return s;
}
function createPage()
{
	var s =
	`
		<div id=header></div>

	    <div class="signBox fd">
			<h3>Sign Up</h3>

			<input id=username placeholder="Username" class="inputEnt" size=50>
			<div class=smalltext id=usernameerror> </div>		
			
			<input id=email placeholder="Your email address" class="inputEnt" size=50 type="email">
			<div class=smalltext id=emailerror> </div>
		
			<input id=p1 placeholder="Your password" size=50 class="inputEnt" type="password">
			<div class=smalltext id=p1error> </div>
			
			<input id=p2 placeholder="Confirm password" size=50 class="inputEnt" type="password">
			<div class=smalltext id=p2error> </div>

			<span id=language></span>
			<div class=smalltext id=languageerror> </div>


			<div class="imageUp">
				<img src="./images/default.png" height=40 id=previewimage>
				<div>
					<label for="file-upload" class="custom-file-upload">Upload a profile photo</label>
					<input id=file-upload type="file"/>
				</div>
			</div>

			<p>Already have an account? <a href="javascript: changePage('login', '');">Login here</a>.</p>
			
			<input type="checkbox" class="custom-control-input" checked="" id="checkbox-remember">
	     	<label class="custom-control-label" for="checkbox-remember">Remember me</label>

	        <div class=loginbutton>
	            <button onclick="processAccount(true);" id=loginb>Sign up</button>
			</div>		
		</div>
	`;
	return s;
}
function loginPage()
{
    var s = 
    `
        <style>

        #gc {
              position: absolute;
              top: 0;
              left: 0; 
              right: 0;
              bottom: 0;
              background: #f5f5ff;
            }

        </style>

        <div id=gc>
            <img src="assets/images/malt-logo.svg" alt="MALT">

            <h3>Sign in to start messaging</h3>

            <p>New to MALT? <a href="javascript: changePage('create', '');">
            Create an account</a>.</p>
        
            <input id=email placeholder="Username or email" size=50>
            <div id=emailerror> </div>
                
            <input id=password placeholder="Your password" size=50 type="password">
            <div id=passworderror> </div>
                
            <input type="checkbox" checked="" id="checkbox-remember">

            <label for="checkbox-remember">Remember me</label>
                        
            <a href="javascript: changePage('reset', '');">
            Forgot your password?</a>
        
            <div>
                <button onclick="login();" id=loginb>Log In</button>
            </div>
        </div>         
    `;
    return s;
}
function pageHeaderDiv()
{
    var s = getMobile() ?

    `
        <a href=base.html><img style="float:left; cursor: pointer;" src=assets/images/malt-logo.svg height=100></a>
        
        <img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=$$picurl$$ height=100>

        &nbsp;<img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=./images/3dots.png height=40> 

    `
    :

    `
        <a href=base.html><img style="float:left; cursor: pointer;" src=assets/images/malt-logo.svg height=40></a> 
        
        <img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=$$picurl$$ height=40>

        &nbsp;<img style="float:right; cursor: pointer; border-radius: 50%;" $$click$$ src=./images/3dots.png height=40> 

    `

    ;
    return s;
}
function chatsHeaderDiv()
{
    var s = getMobile() ?

    `
        <div style='font-size: 80px'>
        <h3>Chats</h3>
        
        <textarea cols=50 onkeyup="chatsInput();" id=search placeholder="username or email of person to find"></textarea>
        </div>
    `

    :

    `
        <div style='font-size: 40px'>
        <h3>Chats</h3>
        
        <textarea cols=50 onkeyup="chatsInput();" id=search placeholder="username or email of person to find"></textarea>
        </div>
    `

    ;
    return s;
}
function chatsFooterDiv()
{
    var s = getMobile() ?

    `
        <div style="padding: 0 0 0 20px; background-color: #eeeeee;">
        <img height=30 width=30 src=images/icon.png  class=rc onclick=support>
        <img height=30 width=30 src=images/icon.png  class=rc onclick=contact>
        <img height=30 width=30 src=images/icon.png  class=rc onclick=faq>
        </div>
    `

    :

    `
        <div style="padding: 0 0 0 20px; background-color: #eeeeee;">
        <img height=30 width=30 src=images/icon.png  class=rc onclick=support>
        <img height=30 width=30 src=images/icon.png  class=rc onclick=contact>
        <img height=30 width=30 src=images/icon.png  class=rc onclick=faq>
        </div>
    `

    ;
    return s;
}
function singleChatSummary()
{
    var s = getMobile() ?

    `
        <div onclick=$$click$$ style="display: flex; align-items: center; justify-content: center; background-color: #fcfcff; min-height: 100px; padding: 10px 20px; margin-top: 20px; border-radius: 5px; cursor: pointer;">
            <div style="width: 80px; float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=100 width=60>
            </div>
            <br><br><br> <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                $$msg$$ $$time$$
            </div> <br><br><br>
        </div><br>
    `

    :

    `
        <div onclick=$$click$$ style="display: flex; align-items: center; justify-content: center; background-color: #fcfcff; min-height: 100px; padding: 10px 20px; margin-top: 20px; border-radius: 5px; cursor: pointer;">
            <div style="width: 80px; float: left;">
                <img style="border-radius: 50%;" src=$$picurl$$ height=60 width=60>
            </div>
            <br><br><br> <div style="flex-grow: 1;">
                <span><b>$$name$$</b></span><br>
                $$msg$$ $$time$$
            </div> <br><br><br>
        </div><br>
    `

    ;
    return s;
}
function conversationHeaderDiv()
{
    var s = getMobile() ?

    `
        <img onclick='backButton()' height=64 src=./images/barrow.png>&nbsp;&nbsp;&nbsp;
        <img style="border-radius: 50%;" src=$$picurl$$ height=100> 
        <span><b>$$name$$ ... last seen $$time$$</b></span><br>
    `

    :

    `
        <img style="border-radius: 50%;" src=$$picurl$$ height=60> 
        <span><b>$$name$$ ... last seen $$time$$</b></span><br>
    `

    ;
    return s;
}
function messageDisplayedLeft()
{
    var s = getMobile() ?

    `
        <div align=left style='display: flex; align-items: flex-end; font-size: 40px;'>
        <img style='border-radius: 50%;' src=$$pic$$ width=50 height=100>
        <div style="width: 40%; padding: 10px; background-color: blue; color: white; border-radius: 5px; margin-left: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        </div><br>
    `

    :

    `
        <div align=left style='display: flex; align-items: flex-end; font-size: 20px;'>
        <img style='border-radius: 50%;' src=$$pic$$ width=50 height=50>
        <div style="width: 40%; padding: 10px; background-color: blue; color: white; border-radius: 5px; margin-left: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
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
        <div align=right style='display: flex; align-items: flex-end; justify-content: flex-end; font-size: 40px;'>
        <div style="width: 40%; padding: 10px; background-color: blue; color: white; border-radius: 5px; margin-right: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>
        </div><br>
    `
    :

    `
        <div align=right style='display: flex; align-items: flex-end; justify-content: flex-end; font-size: 20px;'>
        <div style="width: 40%; padding: 10px; background-color: blue; color: white; border-radius: 5px; margin-right: 10px;">
        $$time$$
        <br>$$msg$$<br>($$translation$$)
        </div>
        <img style='border-radius: 50%;' src=$$status$$ width=15 height=15>
        </div><br>
    `
    ;
    return s;
}


    var languages = 

    [ 
    "English",
    "en",
    "Español",
    "es",
    "Français",
    "fr",
    "Italiano",
    "it",
    "中文普通话",
    "zh",
    "Русский",
    "ru",
    "Afrikaans",
    "af",
    "Albanian",
    "sq",
    "Amharic",
    "am",
    "Arabic",
    "ar",
    "Armenian",
    "hy",
    "Azerbaijani",
    "az",
    "Basque",
    "eu",
    "Belarusian",
    "be",
    "Bengali",
    "bn",
    "Bosnian",
    "bs",
    "Bulgarian",
    "bg",
    "Catalan",
    "ca",
    "Cebuano",
    "ceb",
    "Chinese (Simplified)",
    "zh",
    "Chinese (Traditional)",
    "zh-TW",
    "Corsican",
    "co",
    "Croatian",
    "hr",
    "Czech",
    "cs",
    "Danish",
    "da",
    "Dutch",
    "nl",
    "English",
    "en",
    "Esperanto",
    "eo",
    "Estonian",
    "et",
    "Finnish",
    "fi",
    "French",
    "fr",
    "Frisian",
    "fy",
    "Galician",
    "gl",
    "Georgian",
    "ka",
    "German",
    "de",
    "Greek",
    "el",
    "Gujarati",
    "gu",
    "Haitian Creole",
    "ht",
    "Hausa",
    "ha",
    "Hawaiian",
    "haw",
    "Hebrew",
    "he",
    "Hindi",
    "hi",
    "Hmong",
    "hmn",
    "Hungarian",
    "hu",
    "Icelandic",
    "is",
    "Igbo",
    "ig",
    "Indonesian",
    "id",
    "Irish",
    "ga",
    "Italian",
    "it",
    "Japanese",
    "ja",
    "Javanese",
    "jv",
    "Kannada",
    "kn",
    "Kazakh",
    "kk",
    "Khmer",
    "km",
    "Kinyarwanda",
    "rw",
    "Korean",
    "ko",
    "Kurdish",
    "ku",
    "Kyrgyz",
    "ky",
    "Lao",
    "lo",
    "Latin",
    "la",
    "Latvian",
    "lv",
    "Lithuanian",
    "lt",
    "Luxembourgish",
    "lb",
    "Macedonian",
    "mk",
    "Malagasy",
    "mg",
    "Malay",
    "ms",
    "Malayalam",
    "ml",
    "Maltese",
    "mt",
    "Maori",
    "mi",
    "Marathi",
    "mr",
    "Mongolian",
    "mn",
    "Myanmar (Burmese)",
    "my",
    "Nepali",
    "ne",
    "Norwegian",
    "no",
    "Nyanja (Chichewa)",
    "ny",
    "Odia (Oriya)",
    "or",
    "Pashto",
    "ps",
    "Persian",
    "fa",
    "Polish",
    "pl",
    "Portuguese",
    "pt",
    "Punjabi",
    "pa",
    "Romanian",
    "ro",
    "Russian",
    "ru",
    "Samoan",
    "sm",
    "Scots Gaelic",
    "gd",
    "Serbian",
    "sr",
    "Sesotho",
    "st",
    "Shona",
    "sn",
    "Sindhi",
    "sd",
    "Sinhala",
    "si",
    "Slovak",
    "sk",
    "Slovenian",
    "sl",
    "Somali",
    "so",
    "Spanish",
    "es",
    "Sundanese",
    "su",
    "Swahili",
    "sw",
    "Swedish",
    "sv",
    "Tagalog",
    "tl",
    "Tajik",
    "tg",
    "Tamil",
    "ta",
    "Tatar",
    "tt",
    "Telugu",
    "te",
    "Thai",
    "th",
    "Turkish",
    "tr",
    "Turkmen",
    "tk",
    "Ukrainian",
    "uk",
    "Urdu",
    "ur",
    "Uyghur",
    "ug",
    "Uzbek",
    "uz",
    "Vietnamese",
    "vi",
    "Welsh",
    "cy",
    "Xhosa",
    "xh",
    "Yiddish",
    "yi",
    "Yoruba",
    "yo",
    "Zulu",
    "zu"
    ];


