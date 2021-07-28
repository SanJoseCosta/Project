function newchatModal()
{
    var s = getMobile() ?

    `
    <style>
    .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    
    xxxoverflow: auto; /* Enable scroll if needed */
    
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
    background-color: #ffffff;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 70%; /* Could be more or less, depending on screen size */
    }

    .close {
    color: #aaa;
    float: right;
    font-size: 16px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }

    </style>

	<div id="myModal" class="modal">
  
        <div class="modal-content">
          
            <div>
                <b>$$header$$</b>
            </div>
            <br>

            <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>
            <br><br>

            <div style="height:50px;">
                <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">

                    <blah>Cancel</blah>

                </button>
                <button style="padding:10px;margin:10px;" $$okclick$$ class="close">

                    <blah>OK</blah>

                </button>
            </div>
        </div>
    </div>

    `

    :


    `
    <style>
    .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
    background-color: #ffffff;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 35%; /* Could be more or less, depending on screen size */
    }

    .close {
    color: #aaa;
    float: right;
    font-size: 16px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }
    </style>

    <div id="myModal" class="modal">
        <div class="modal-content">
            <div>
                <b>$$header$$</b>
            </div>
            <br>

            <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>

            <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">

                <blah>Cancel</blah>

            </button>
            <button style="padding:10px;margin:10px;" $$okclick$$ class="close">

                <blah>OK</blah>

            </button>
        </div>
    </div>
    `

    ;
    return s;
}