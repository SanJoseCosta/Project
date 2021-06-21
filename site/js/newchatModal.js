function newchatModal()
{
    var s = getMobile() ?

    `
    	<div id="myModal" class="modal">

        <div class="modal-content" style="width: 70%; background-color: white;">
          
          <textarea style="resize:123" placeholder=$$placeholder$$ id=txa></textarea>
          <br>
          <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">Cancel</button>
          <button style="padding:10px;margin:10px;" $$okclick$$ class="close">OK</button>
         
        </div>

      </div>

    `

    :


    `
    	<div id="myModal" class="modal">

  		  <div class="modal-content" style="width: 35%; background-color: white;">
  		    
  		    <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>

          <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">Cancel</button>
          <button style="padding:10px;margin:10px;" $$okclick$$ class="close">OK</button>
         
  		  </div>

  		</div>
    `

    ;
    return s;
}