function newchatModal()
{
    var s = getMobile() ?

    `
    	<div id="myModal" class="modal">

  		  <div class="modal-content">
  		    
  		    <button class="close">Cancel</button>
  		    &nbsp;
  		    <button class="close">OK</button>

  		    Username or email: <textarea style="resize:none" placeholder=$$placeholder$$></textarea>
  		  
  		  </div>

  		</div>



    <script>
    
      // Get the modal
      var modal = document.getElementById("myModal");

      // Get the button that opens the modal
      var btn = document.getElementById("myBtn");

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on the button, open the modal
      btn.onclick = function() {
        modal.style.display = "block";
      }

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

    </script>

    `

    :


    `
    	<div id="myModal" class="modal">

  		  <div class="modal-content">
  		    
  		    <textarea style="resize:none" placeholder=$$placeholder$$ id=txa></textarea>

          <button style="padding:10px;margin:10px;" $$cancelclick$$ class="close">Cancel</button>
          <button style="padding:10px;margin:10px;" $$okclick$$ class="close">OK</button>
         
  		  </div>

  		</div>

    `

    ;
    return s;
}