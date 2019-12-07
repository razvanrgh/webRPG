document.addEventListener('DOMContentLoaded', function(){

var mineButon = document.querySelector('#mineButton');
var researchButon = document.querySelector('#researchButton');
var rocksValue = document.querySelector('#rocksValue');
var ironValue = document.querySelector('#ironValue')
var elem = document.getElementById("myBar");
var pickaxeValue = document.querySelector("#inventoryContainer p");
var robotsValue = document.querySelectorAll("#inventoryContainer p")[1];
var bigContainer = document.querySelector('#bigContainer');
var researchContainer = document.querySelector('#researchContainer');
var researchMenuButton = document.querySelector('#researchMenuContainer button');
var pickaxeUpgradeButtons = document.querySelectorAll('#researchPickaxeContainer button');
var robotsUpgradeButtons = document.querySelectorAll("#researchRobotContainer button");
rocksValue.innerHTML = 0;
ironValue.innerHTML = 0;


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
                    rocksValue.innerHTML = parseInt(rocksValue.innerHTML) + 1;
                    isIron = ironChance();
                    console.log(pickaxeValue.innerHTML);
                    //chance to mine iron at pickaxe lvl 1 is 10%
                    if(pickaxeValue.innerHTML === "pickaxe: 1"){
                        console.log('pickaxe lvl is 1');
                        if(isIron === 10) {
                            ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
                        }
                    //chance to mine iron at pickaxe lvl 2 is 20%
                    } else if(pickaxeValue.innerHTML === "pickaxe: 2"){
                        console.log('pickaxe lvl is 2');
                        if(isIron > 8){
                            ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
                        }
                    //chance to mine iron at pickaxe lvl 3 is 30%
                    } else if (pickaxeValue.innerHTML === "pickaxe: 3"){
                        console.log('pickaxe lvl is 3');
                        if(isIron > 7) {
                            ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
                        }
                    } else{
                        console.log("nope");
                    }
                    elem.style.width = "0";
                    mineButon.removeAttribute("disabled");
                    console.log("done");
                    console.log(isIron);
                //what happens if the progress bar is not done
                } else {
                width++;
                elem.style.width = width + "%";
                }
        }
})

//listener to go to the research tab
researchButon.addEventListener('click', function(e){
    console.log(bigContainer);
    bigContainer.style.display = 'none';
    researchContainer.style.display = 'flex';
    researchContainer.style.justifyContent = 'space-between';
})

//listener to go back to the menu
researchMenuButton.addEventListener('click', function(e){
    researchContainer.style.display = 'none';
    bigContainer.style.display = 'flex';
})


function pickaxeUpgradeListener(index) {
    console.log("pickaxe upgrade number " + (index + 1));
    pickaxeValue.innerHTML = "pickaxe: " + (index + 1);
    pickaxeUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)"
    pickaxeUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)"
    pickaxeUpgradeButtons[index].setAttribute('disabled', 'true');
}

function robotUpgradeListener(index) {
    console.log("lil' robots upgrade number " + (index + 1));
    robotsValue.innerHTML = "lil' robots: " + (index + 1);
    robotsUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)"
    robotsUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)"
    robotsUpgradeButtons[index].setAttribute('disabled', 'true');
};

for(i=0; i < pickaxeUpgradeButtons.length; i++){
    //Research bind method and closure inside loops!
    //One way to do it is to store the item in a 'let' variable
    //and use that to put the listener on. (errr, still doesn't work. Use bind)
    //here's a link: https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    pickaxeUpgradeButtons[i].addEventListener('click',
     pickaxeUpgradeListener.bind(null,i));
}

for(i=0; i<robotsUpgradeButtons.length; i++) {
    robotsUpgradeButtons[i].addEventListener('click',
    robotUpgradeListener.bind(null, i));
}



function ironChance(){
    var value = Math.floor(Math.random() * 10) + 1;
    return value;
}



});
