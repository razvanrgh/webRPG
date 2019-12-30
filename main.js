document.addEventListener('DOMContentLoaded', function(){

var mineButon = document.querySelector('#mineButton');
var researchButton = document.querySelector('#researchButton');
var scavengeButton = document.querySelector('#scavengingButton');
var scavengeContainer = document.querySelector('#scavengingContainer');
var rocksValue = document.querySelector('#rocksValue');
var ironValue = document.querySelector('#ironValue')
var elem = document.querySelectorAll(".myBar");
var pickaxeValue = document.querySelector("#inventoryContainer p");
var robotsValue = document.querySelectorAll("#inventoryContainer p")[1];
var bigContainer = document.querySelector('#bigContainer');
var researchContainer = document.querySelector('#researchContainer');
var researchMenuButton = document.querySelector('#researchMenuContainer button');
var pickaxeUpgradeButtons = document.querySelectorAll('#researchPickaxeContainer button');
var robotsUpgradeButtons = document.querySelectorAll("#researchRobotContainer button");
var idRobot;
rocksValue.innerHTML = 0;
ironValue.innerHTML = 0;
console.log(researchButton);


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
            console.log(elem[1]);
            console.log(elem);
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
            width = 0;
            elem[1].style.width = width;
            mineButon.removeAttribute("disabled");
            console.log("done");
            console.log(isIron);
        //what happens if the progress bar is not done
        } else {
        width++;
        console.log(width);
        elem[1].style.width = width + "%";
        }
    }
})

//listener to go to the research tab
researchButton.addEventListener('click', function(e){
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
    if(rocksValue.innerHTML > 9){
        console.log("pickaxe upgrade number " + (index + 1));
        pickaxeValue.innerHTML = "pickaxe: " + (index + 1);
        pickaxeUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)"
        pickaxeUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)"
        pickaxeUpgradeButtons[index].setAttribute('disabled', 'true');
        rocksValue.innerHTML = rocksValue.innerHTML - 10;
    } else {
        console.log('not enough minerals');
        console.log(rocksValue.innerHTML);
    }
}

function robotUpgradeListener(index) {
    console.log("lil' robots upgrade number " + (index + 1));
    robotsValue.innerHTML = "lil' robots: " + (index + 1);
    robotsUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)"
    robotsUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)"
    robotsUpgradeButtons[index].setAttribute('disabled', 'true');
            var width = 1;
            //because the interval is set at 10ms, the width will increase
            //1% every 10ms. => progress bar of 1 second
            if (index == 0) {
                idRobot = setInterval(frame, 100);
            } else if (index == 1) {
                idRobot = setInterval(frame, 75);
            } else {
                idRobot = setInterval(frame, 50);
            }
            function frame() {
                //what happens if the progress bar is done
                if (width >= 100) {
                    //clearInterval(id);
                    console.log(elem[(index + 2)])
                    console.log((index + 2));
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
                    width = 0;
                    elem[(index + 2)].style.width = width;
                    console.log("done");
                    console.log(isIron);
                //what happens if the progress bar is not done
                } else {
                width++;
                elem[(index + 2)].style.width = width + "%";
                }
        }
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

scavengeButton.addEventListener('click', function(e){
    console.log(scavengeContainer);
    scavengeContainer.style.display = 'flex';
    var width = 1;
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    var id = setInterval(frame, 100);
    function frame() {
        //what happens if the progress bar is done
        if (width >= 100) {
            clearInterval(id);
            console.log(elem[0]);
            width = 0;
            elem[0].style.width = width;
            scavengeContainer.style.display = 'none';
            console.log("done");
        //what happens if the progress bar is not done
        } else {
        width++;
        console.log(width);
        elem[0].style.width = width + "%";
        }
    }
});



function ironChance(){
    var value = Math.floor(Math.random() * 10) + 1;
    return value;
}



});
