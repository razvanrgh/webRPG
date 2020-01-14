document.addEventListener('DOMContentLoaded', function(){

var mineButon = document.querySelector('#mineButton');
var researchButton = document.querySelector('#researchButton');
var scavengeButton = document.querySelector('#scavengingButton');
var scavengeContainer = document.querySelector('#scavengingContainer');
var scavengeProgress = document.querySelector('#scavengingProgress');
var encounterContainer = document.querySelector('#encounterContainer');
var textEncounter = document.querySelector('#encounterContainer p');
var fightContainer = document.querySelector('#fightContainer');
var fleeButton = document.querySelectorAll('#encounterContainer button')[1];
var fightButton = document.querySelectorAll('#encounterContainer button')[0];
var divStatsList = document.querySelectorAll('#fighterStats div');
var fightConsole = document.querySelector('#fightConsole');
var rocksValue = document.querySelector('#rocksValue');
var ironValue = document.querySelector('#ironValue');
var adamantValue = document.querySelector('#adamantValue');
var elem = document.querySelectorAll(".myBar");
var pickaxeValue = document.querySelector("#inventoryContainer p");
var robotsValue = document.querySelectorAll("#inventoryContainer p")[1];
var weaponValue = document.querySelectorAll("#inventoryContainer p")[2];
var bigContainer = document.querySelector('#bigContainer');
var researchContainer = document.querySelector('#researchContainer');
var researchMenuButton = document.querySelector('#researchMenuContainer button');
var pickaxeUpgradeButtons = document.querySelectorAll('#researchPickaxeContainer button');
var robotsUpgradeButtons = document.querySelectorAll("#researchRobotContainer button");
var rocketPartsButtons = document.querySelectorAll('#researchRocketContainer button');
var introAnimationContainer = document.querySelector('#introAnimationContainer');
var introParagraph = document.querySelector('#introParagraph');
var creditsContainer = document.querySelector('#creditsContainer');
var currentHP;

var randEncounter;
var randRocket;
var enemy;
var rewardWeapon = '';
var rewardParts = '';
var adamantValueFound = 0;
var isFirstBattle = true;
var isVenomousBlade = false;
var isXWeapon = false;
var IsRaygun = false;
var isEngineBP = false;
var isChassisBP = false;
var isTerminalBP = false;
var isEngine = false;
var isChassis = false;
var isTerminal = false;
var isFirstBattle = true;
var width = 1;
var random;
var opacity

var player = {
    name: 'player',
    hp: 100,
    attack: 10,
    dodge: 2
}
var littleMonster = {
    name: 'little monster',
    hp: 20,
    attack: 1
};
var largeMonster = {
    name: 'large monster',
    hp: 35,
    attack: 2
};
var epicMonster = {
    name: 'epic monster',
    hp: 60,
    attack: 4
};


rocksValue.innerHTML = 0;
ironValue.innerHTML = 0;
adamantValue.innerHTML = 0;
console.log(introParagraph.style);

var textIntro1 = 'ugh, my head hurts';
var textIntro2 = 'what happened? I was on the spaceship orbiting a planet just a moment ago';
var textIntro3 = "something must've tripped the console and the terminal has gone haywire";
var textIntro4 = "Looks like I'm stuck on this crimson, rocky planet until I repair my ship";
var textIntro5 = "great, and I only have this pickaxe and no weapon. I guess this rusty pipe will do";
var textIntro6 = "thing is, I'm just a pilot. I don't know how to repair a ship";
var textIntro7 = "But I know for sure there were some blueprints of the ship and weapons on the board";
var textIntro8 = "They must've flew away, just my luck";
var textIntro9 = "Well, time to get back to work";

var introAnimation = function(textIntro, isLastParagraph){
    introParagraph.innerHTML = textIntro;
    introParagraph.style.opacity = 0.01;
    opacity = parseInt(introParagraph.style.opacity);
    id = setInterval(function(){
        console.log('opacity = ' + introParagraph.style.opacity);
        if(opacity < 1) {
            opacity = opacity + 0.01;
            introParagraph.style.opacity = opacity;
        } else {
            clearInterval(id);
            setTimeout(function(){
                id = setInterval(function(){
                    if(opacity > 0){
                        console.log('opacity = ' + introParagraph.style.opacity);
                        opacity = opacity - 0.01
                        introParagraph.style.opacity = opacity;
                    } else {
                        clearInterval(id);
                        console.log('opacity = ' + introParagraph.style.opacity);
                        opacity = 0;
                        if(isLastParagraph){
                            introAnimationContainer.style.display = 'none';
                        }
                    }
                }, 20)
            },2500)
        }
    }, 20);
}
introAnimation(textIntro1, false);
setTimeout(function(){
    introAnimation(textIntro2, false)
},8000);
setTimeout(function(){
    introAnimation(textIntro3, false)
},16000);
setTimeout(function(){
    introAnimation(textIntro4, false)
},24000);
setTimeout(function(){
    introAnimation(textIntro5, false)
},32000);
setTimeout(function(){
    introAnimation(textIntro6, false)
},40000);
setTimeout(function(){
    introAnimation(textIntro7, false)
},48000);
setTimeout(function(){
    introAnimation(textIntro8, false)
},56000);
setTimeout(function(){
    introAnimation(textIntro9, true)
},64000);

var findTypeOfMonster = function(){
    //saving what type of monster we encountered in a variable
    if(randEncounter > 0 && randEncounter <34) {
        enemy = littleMonster;
    } else if(randEncounter > 33 && randEncounter < 68) {
        enemy = largeMonster;
    } else {
        enemy = epicMonster;
    }
}

var credits = function(){
    if(isEngine && isChassis && isTerminal) {
        creditsContainer.style.display = 'flex';
    }
}

function frame(id) {
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
        random = (Math.floor(Math.random() * 100) + 1);
        console.log(random);
        if(random > 96) {
            clearInterval(id);
            randEncounter = Math.floor(Math.random() * 100 + 1)
            adamantValueFound = Math.floor(0.2 * randEncounter);
            //check if you found the blueprint for something (10% chance)
            if (randEncounter > 89 && randEncounter < 101) {
                IsRaygun = true;
                rewardWeapon = 'Ray gun';
            }
            if (randEncounter > 39 && randEncounter < 51) {
                isXWeapon = true;
                rewardWeapon = 'X weapon';
            }
            if (randEncounter > 9 && randEncounter < 21) {
                isVenomousBlade = true;
                rewardWeapon = 'venomous blade';
            }
            //randRocket (nr. from 1 to 100). Chance to drop BP for parts of rocket
            //it's independent from randEncounter
            randRocket = (Math.floor(Math.random() * 100) + 1);
            //chance to find the engine BP (15%)
            if(randRocket > 0 && randRocket < 16) {
                isEngineBP = true;
                rewardParts = 'engine';
            }
            //chance to find the chassis BP (35%)
            if(randRocket > 15 && randRocket < 51) {
                isChassisBP = true;
                rewardParts = 'chassis';
            }
            //chance to find the terminal BP (20%)
            if(randRocket > 50 && randRocket < 71) {
                isTerminalBP = true;
                rewardParts = 'terminal'
            }
            console.log("randEncounter = " + randEncounter);
            findTypeOfMonster();
            textEncounter.innerHTML = 'A ' + enemy.name 
            + ' has appeard. It has '
            + enemy.hp + 'hp and '
            + enemy.attack + ' attack. It seems to protect ' + adamantValueFound 
            + ' the weapon: ' + rewardWeapon + ' and the blueprint: ' + rewardParts
            + '. What will you do?';
            scavengeProgress.style.display = 'none';
            encounterContainer.style.display = 'block';
        }
    }
}

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
                if(isIron > 85) {
                    ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
                }
                //chance to mine iron at pickaxe lvl 2 is 20%
            } else if(pickaxeValue.innerHTML === "pickaxe: 2"){
                console.log('pickaxe lvl is 2');
                if(isIron > 70){
                    ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
                }
                //chance to mine iron at pickaxe lvl 3 is 30%
            } else if (pickaxeValue.innerHTML === "pickaxe: 3"){
                console.log('pickaxe lvl is 3');
                if(isIron > 50) {
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

function rocketPartsListener(index){
    //what happens when you press the first button and you have enough resources (10 adamant)
    if(index == 0 && adamantValue.innerHTML > 9){
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        adamantValue.innerHTML = adamantValue.innerHTML - 10;
        isEngine = true;
        credits();
        //what happens when you press the second button and you have enough resources (20 adamant)
    } else if(index == 1 && adamantValue.innerHTML > 19) {
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        adamantValue.innerHTML = adamantValue.innerHTML - 20;
        isChassis = true;
        credits();
        //what happens when you press the third button and you have enough resources (30 iron)
    } else if(index == 2 && ironValue.innerHTML > 2) {
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = ironValue.innerHTML - 30;
        isTerminal = true;
        credits();
        //what happens if you don't have enough resources
    } else {
        console.log('not enough minerals');
    }
} 


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

for(i=0; i<rocketPartsButtons.length; i++) {
    rocketPartsButtons[i].addEventListener('click',
    rocketPartsListener.bind(null, i));
}

scavengeButton.addEventListener('click', function(e){
    console.log(scavengeContainer);
    scavengeContainer.style.display = 'flex';
    isFirstBattle = true;
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    var id = setInterval(function(){
        frame(id);
    }, 100);
});

fleeButton.addEventListener('click', function(e){
    encounterContainer.style.display = 'none';
    scavengeProgress.style.display = 'flex';
    //everything from here until the rest of the listener should be put
    //in a variable as a function. the fight button also uses it.
    width = parseInt(elem[0].style.width);
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    var id = setInterval(function(){
        frame(id);
    }, 100);
    
})

fightButton.addEventListener('click', function(e) {
    //show the fight screen
    encounterContainer.style.display = 'none';
    fightContainer.style.display = 'flex';
    findTypeOfMonster();
    //function for creating stats. first parameter is the obj and the second
    //is the index of the divStatsList list
    var createStats = function(fighter, div){
        var p = document.createElement("h4");
        p.innerText = fighter.name;
        divStatsList[div].appendChild(p);
        p = document.createElement("p");
        console.log(isFirstBattle);
        if(isFirstBattle || fighter == enemy){
            p.innerText = fighter.hp + ' hp';
            isFirstBattle = false;
        } else {
            p.innerText = currentHP + ' hp';
        }
        divStatsList[div].appendChild(p);
        p = document.createElement("p");
        p.innerText = fighter.attack + ' attack'
        divStatsList[div].appendChild(p);
        p = document.createElement("p");
    };
    //creates the paragraphs and Hs for the stats for the player
    createStats(player, 0);
    //creates the paragraphs and Hs for the stats for the monster
    createStats(enemy, 1);
    var i = 0;
    console.log('i = ' + i);
    // allocating the values of the stats in variables so I can use them instead
    // of using the reference from the object
    var hpPlayer = parseInt(document.querySelectorAll('#playerStatsContainer p')[0].innerHTML);
    var hpEnemy = parseInt(document.querySelectorAll('#enemyStatsContainer p')[0].innerHTML);
    var attackPlayer = parseInt(document.querySelectorAll('#playerStatsContainer p')[1].innerHTML);
    var attackEnemy = parseInt(document.querySelectorAll('#enemyStatsContainer p')[1].innerHTML);
    function autoCombat(){
        var interval = setInterval(function(){
            // var i is the index for whether is the player's turn
            // or the oponent's turn
            i++
            // if the index is odd, this if's condition is met
            if(i%2){
                hpPlayer = hpPlayer - attackEnemy;
                var pHpPlayer = divStatsList[0].querySelector('p');
                pHpPlayer.innerHTML = hpPlayer + ' hp';
                p = document.createElement('p');
                p.innerText = 'The monster attacked you. you lost ' 
                + attackEnemy + ' health';
                fightConsole.prepend(p);
                console.log('the player hp is equal to ' + hpPlayer);
            }
            // if the player is dead, this if's condition is met
            if (hpPlayer < 1){
                clearInterval(interval);
            }
            // if the index is even, this if's condition is met
            if(!(i%2)){
                hpEnemy = hpEnemy - attackPlayer;
                var pHpEnemy = divStatsList[1].querySelector('p');
                pHpEnemy.innerHTML = hpEnemy + ' hp';
                p = document.createElement('p');
                p.innerText = "You've attacked the monster . he lost " 
                + attackPlayer + ' health';
                fightConsole.prepend(p);
                console.log('enemy hp: ' + hpEnemy);
            }
            // if the enemy is dead, this if's condition is met
            if (hpEnemy < 1){
                clearInterval(interval);
                //set the new hp value for the variable that will be used in the 
                //createStats function
                currentHP = hpPlayer;
                //adding the adamantium adamantValueFound to the DOM
                adamantValue.innerHTML = parseInt(adamantValue.innerHTML) + adamantValueFound;
                if(isVenomousBlade) {
                    player.attack = 2;
                    weaponValue.innerHTML = 'weapon: Venomous blade'
                }
                if(isXWeapon) {
                    player.attack = 5;
                    weaponValue.innerHTML = 'weapon: X'
                }
                if(IsRaygun) {
                    player.attack = 9;
                    weaponValue.innerHTML = 'weapon: Ray gun'
                }
                if(isEngineBP) {
                    rocketPartsButtons[0].style.display = 'block';
                }
                if(isChassisBP) {
                    rocketPartsButtons[1].style.display = 'block';
                }
                if(isTerminalBP) {
                    rocketPartsButtons[2].style.display = 'block';
                }
                //clears the stats that were created when pressed the fight button
                while(divStatsList[0].firstChild && divStatsList[1].firstChild){
                    divStatsList[0].removeChild(divStatsList[0].firstChild);
                    divStatsList[1].removeChild(divStatsList[1].firstChild);                    
                }
                while(fightConsole.firstChild){
                    fightConsole.removeChild(fightConsole.firstChild);
                }
                scavengeProgress.style.display = 'flex';
                fightContainer.style.display = 'none';
                //everything from here until the rest of the listener should be put
                //in a variable as a function. the flee button also uses it.
                width = parseInt(elem[0].style.width);
                //because the interval is set at 10ms, the width will increase
                //1% every 10ms. => progress bar of 1 second
                var id = setInterval(function() {
                    frame(id);
                }, 100);
            }
        }, 1000);
    }
    autoCombat();
});



function ironChance(){
    var value = Math.floor(Math.random() * 100) + 1;
    return value;
}



});
