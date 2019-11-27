document.addEventListener('DOMContentLoaded', function(){

var mineButon = document.querySelector('#mineButton');
var researchButon = document.querySelector('#researchButton');
var paragraf = document.querySelector('#valoare');
var elem = document.getElementById("myBar");
var bigContainer = document.querySelector('#bigContainer');
var researchContainer = document.querySelector('#researchContainer');
paragraf.innerHTML = 0;


/* function made for the progress bar of a button
see this link: https://www.w3schools.com/howto/howto_js_progressbar.asp */
mineButon.addEventListener('click', function(e){
    // add an attribute "disabled" to the buton so the player
    // can't push it again while it's loading
    mineButon.setAttribute("disabled", "true");
    console.log("click");
            var width = 1;
            //because the interval is set at 10ms, the width will increase
            //1% every 10ms. => progress bar of 1 second
            var id = setInterval(frame, 10);
            function frame() {
                //what happens if the progress bar is done
                if (width >= 100) {
                    clearInterval(id);
                    paragraf.innerHTML = parseInt(paragraf.innerHTML) + 1;
                    elem.style.width = "0";
                    mineButon.removeAttribute("disabled");
                    console.log("done");
                //what happens if the progress bar is not done
                } else {
                width++;
                elem.style.width = width + "%";
                }
        }
})

researchButon.addEventListener('click', function(e){
    console.log(bigContainer);
    bigContainer.style.display = 'none';
    researchContainer.style.display = 'block';
})


});
