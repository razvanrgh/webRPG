document.addEventListener('DOMContentLoaded', function(){

var mineButon = document.querySelector('#mineButton');
var researchButton = document.querySelector('#researchButton');
var scavengeButton = document.querySelector('#scavengingButton');
var scavengeingButtonContainer = document.querySelector('#scavengingButtonContainer');
var scavengeContainer = document.querySelector('#scavengingContainer');
var scavengeProgress = document.querySelector('#scavengingProgress');
var encounterContainer = document.querySelector('#encounterContainer');
var textEncounter = document.querySelector('#encounterContainer p');
var fightContainer = document.querySelector('#fightContainer');
var fleeButton = document.querySelectorAll('#encounterContainer button')[1];
var fightButton = document.querySelectorAll('#encounterContainer button')[0];
var divStatsList = document.querySelectorAll('#fighterStats div');
var fightConsole = document.querySelector('#fightConsole');
var silicateValue = document.querySelector('#silicateValue');
var ironValue = document.querySelector('#ironValue');
var adamantValue = document.querySelector('#adamantValue');
var plasmaValue = document.querySelector('#plasmaValue');
var elem = document.querySelectorAll(".myBar");
var radarValue = document.querySelector("#inventoryContainer p");
var robotsValue = document.querySelectorAll("#inventoryContainer p")[1];
var weaponValue = document.querySelectorAll("#inventoryContainer p")[2];
var hpValue = document.querySelectorAll('#statsContainer p')[0];
var attackValue = document.querySelectorAll('#statsContainer p')[1];
var dodgeValue = document.querySelectorAll('#statsContainer p')[2];
var statsContainer = document.querySelector('#statsContainer');
var bigContainer = document.querySelector('#bigContainer');
var researchContainer = document.querySelector('#researchContainer');
var researchMenuButton = document.querySelector('#researchMenuContainer button');
var radarUpgradeButtons = document.querySelectorAll('#researchRadarContainer button');
var robotsUpgradeButtons = document.querySelectorAll("#researchRobotContainer button");
var weaponButttons = document.querySelectorAll('#researchWeaponContainer button');
var rocketPartsButtons = document.querySelectorAll('#researchRocketContainer button');
var introAnimationContainer = document.querySelector('#introAnimationContainer');
var introParagraph = document.querySelector('#introParagraph');
var creditsContainer = document.querySelector('#creditsContainer');
var currentHP = 100;

var randEncounter;
var randRocket;
var enemy;
var rewardWeapon = '';
var rewardParts = '';
var adamantValueFound = 0;
var isFirstBattle = true;
var isSwordBP = false;
var isHalberdBP = false;
var isRaygun = false;
var isEngineBP = false;
var isShellBP = false;
var isCockpitBP = false;
var isEngine = false;
var isChassis = false;
var isTerminal = false;
var isPlasma = false;
var isPlasmaP = '';
var isFirstBattle = true;
var width = 1;
var random;
var opacity;

var player = {
    name: 'player',
    hp: 100,
    attack: 50,
    dodge: 50
}
var littleMonster = {
    name: 'little monster',
    hp: 85,
    attack: 6,
    dodge: 0
};
var largeMonster = {
    name: 'large monster',
    hp: 125,
    attack: 9,
    dodge: 0
};
var epicMonster = {
    name: 'epic monster',
    hp: 230,
    attack: 11,
    dodge: 0
};


silicateValue.innerHTML = 0;
ironValue.innerHTML = 0;
adamantValue.innerHTML = 0;
console.log(introParagraph.style);

//this is the text that appears in the intro stored in variables
var textIntro1 = 'ugh, my head hurts';
var textIntro2 = 'what happened? I was on the spaceship orbiting a planet just a moment ago';
var textIntro3 = "something must've tripped the console and the terminal has gone haywire";
var textIntro4 = "Looks like I'm stuck on this crimson, rocky planet until I repair my ship";
var textIntro5 = "great, and I only have this pickaxe and no weapon";
var textIntro6 = "thing is, I'm just a pilot. I don't know how to repair a ship";
var textIntro7 = "But I know for sure there were some blueprints of the ship and weapons on the board";
var textIntro8 = "They must've flew away, just my luck";
var textIntro9 = "Well, time to get back to work";

var introAnimation = function(textIntro, isLastParagraph){
    //replace whatever text we have in the p of the intro with the first parameter 'textIntro'.
    introParagraph.innerHTML = textIntro;
    introParagraph.style.opacity = 0.01;
    opacity = parseInt(introParagraph.style.opacity);
    //this first setInterval is used to increase the opacity of the text until it is
    //100% visible
    id = setInterval(function(){
        console.log('opacity = ' + introParagraph.style.opacity);
        //what happens if the opacity is not at 100%
        if(opacity < 1) {
            //every frame, the opacity of the text increases with 1%. a new frame appears once every 20 ms.
            //the time it takes to reach 100% from 0 is 2 seconds
            opacity = opacity + 0.01;
            introParagraph.style.opacity = opacity;
        //what happens if the opacity reaches 100%
        } else {
            //this stops the first interval
            clearInterval(id);
            //setTimeout is used to stop the text at 100% opacity in order for the player
            //to have the time to read the text
            setTimeout(function(){
                //another setInterval is created to reduce the opacity to 0%
                id = setInterval(function(){
                    //what happens if the opacity is bigger than 0%
                    if(opacity > 0){
                        console.log('opacity = ' + introParagraph.style.opacity);
                        opacity = opacity - 0.01
                        introParagraph.style.opacity = opacity;
                    //what happens if the opacity reaches 0%
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

/*setTimeout is necessary to wait for the previous introAnimation to end. Which takes 6.5 seconds.
The second parameter of setTimeout = (previous setTimeout second parameter) + n.
Where n must be bigger than 6.5 seconds*/
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
    introAnimation(textIntro8, true)
},56000);

var findTypeOfMonster = function(){
    //saving what type of monster we encountered in a variable.
    //randEncounter is a random number from 1 to 100
    //each monster has a 33% to spawn
    if(randEncounter > 0 && randEncounter <34) {
        enemy = littleMonster;
    } else if(randEncounter > 33 && randEncounter < 68) {
        enemy = largeMonster;
    } else {
        enemy = epicMonster;
    }
}

//function that checks  if every peace of the rocket is built.
//if they are, then show the credits 
var credits = function(){
    if(isEngine && isChassis && isTerminal) {
        creditsContainer.style.display = 'flex';
    }
}

var scavengeFrame = function(id) {
    //what happens if the progress bar is done
    if (width >= 100) {
        clearInterval(id);
        console.log(elem[0]);
        //reset the scavenge bar back to 0
        width = 0;
        elem[0].style.width = width;
        scavengeContainer.style.display = 'none';
        console.log("done");
        //make the scavenge button grey-ish and disable it
        scavengeButton.style.border = "2px solid rgba(255, 255, 255, 0.2)";
        scavengeButton.style.color = "rgba(255, 255, 255, 0.3)";
        scavengeButton.setAttribute('disabled', 'true');
        //as long as the HP is lower than 100, increase it by 1 every second.
        //if HP reaches 100, stop interval and revert the style of the scavenge button back to normal
        var restoreHPid = setInterval(function(){
            console.log('currentHP = ' + currentHP);
            width = currentHP;
            if(currentHP >= 100) {
                clearInterval(restoreHPid);
                width = 0;
                scavengeButton.style.border = "2px solid rgba(255, 255, 255, 0.5)";
                scavengeButton.style.color = "rgba(255, 255, 255, 0.7)";
                scavengeButton.removeAttribute('disabled');
            } else {
                currentHP++
                width = currentHP;
                elem[5].style.width = width + '%';
                hpValue.innerText = 'HP - ' + currentHP;
            }
        }, 750)
    //what happens if the progress bar is not done
    } else {
        //increase the width variable by 1
        width++;
        console.log(width);
        //set the width of the bar in the DOM equal to the value of the variable 'width'
        elem[0].style.width = width + "%";
        //every frame create a random number. if the number is bigger than 96 then the player
        //encounters a monster.(3% chance every frame --> average of 3 encounters per scavenge)
        random = (Math.floor(Math.random() * 100) + 1);
        console.log(random);
        if(random > 96) {
            //clearInterval stops the scavenging to progress
            clearInterval(id);
            //randEncounter is used to determine the type of monster and the rewards that you get
            //by defeating the monster. The bigger the number, the stronger the enemy and the bigger the rewards
            randEncounter = Math.floor(Math.random() * 100 + 1)
            findTypeOfMonster();
            //amount of adamant that you get after defeating the monster. the bigger randEncounter is, the more
            //adamant you get
            adamantValueFound = Math.floor(0.3 * randEncounter);
            //the player doesn't know the exact amount of adamant he'll get before fight the enemy
            //he only knows if it's just a few stones or a 'stash' of them
            if(adamantValueFound <= 15) {
                adamantValueFoundP = 'a few adamant stones';
            }
            if(adamantValueFound >= 15) {
                adamantValueFoundP = 'a stash of adamant';
            }
            /*check if the player has found something.
            if he did, add a piece of text to the encounter paragraph and make the apropriate boolean variable true.
            if the player defeats the monster with one of the boolean variables true (for example isHalberdBP),
            then that button will be visible and accesible for the player*/
            if (randEncounter >= 90 && randEncounter <= 100 && weaponValue.innerHTML != 'weapon: Ray gun') {
                //the ray gun spawns on average at 1 in 3 epic monsters
                //the ray gun doesn't need a blueprint. After you beat the enemy, you equip the ray gun
                isRaygun = true;
                rewardWeapon = ', the weapon: Ray gun';
                console.log('*from the ray gun if* randEncounter = ' + randEncounter);
            }
            if (randEncounter >= 40 && randEncounter <= 50 && weaponButttons[2].style.display != 'block') {
                //the halberd blueprint has a chance of 1 in 3 large monsters to spawn
                isHalberdBP = true;
                rewardWeapon = ', the blueprint for the adamant halberd';
                console.log('*from the halberd if* randEncounter = ' + randEncounter);
            }
            if (randEncounter >= 10 && randEncounter <= 20 && weaponButttons[1].style.display != 'block') {
                //the sword blueprint has a chance of 1 in 3 small monsters to spawn
                isSwordBP = true;
                rewardWeapon = ', the blueprint for the iron-adamant sword';
                console.log('*from the sword if* randEncounter = ' + randEncounter);
            }
            if (randEncounter >= 95 && randEncounter <= 100 && plasmaValue.innerHTML != '☑') {
                //the plasma has a chance of 1 in 6 epic monsters to spawn
                isPlasma = true;
                isPlasmaP = ', a container of energy'
                console.log('*from the plasma if* randEncounter = ' + randEncounter);
            }
            /*randRocket, like randEncounter, stores a random number from 1 to 100.
            it is used to check if the player has found the blueprint for a rocket part
            without being dependent of the type of monster fought.
            Any rocket part blueprint can be found on any type of monster.
            When found, it adds a piece of text to the encounter paragraph and makes the
            relevant boolean variable true*/
            randRocket = (Math.floor(Math.random() * 100) + 1);
            //chance to find the engine BP (15%)
            if(randRocket >= 1 && randRocket <= 15 && rocketPartsButtons[0].style.display != 'block') {
                isEngineBP = true;
                rewardParts = ' and the blueprint for the engine';
            }
            //chance to find the shell BP (35%)
            if(randRocket >= 15 && randRocket <= 50 && rocketPartsButtons[1].style.display != 'block') {
                isShellBP = true;
                rewardParts = ' and the blueprint for the shell';
            }
            //chance to find the cockpit BP (20%)
            if(randRocket >= 50 && randRocket <= 70 && rocketPartsButtons[2].style.display != 'block') {
                isCockpitBP = true;
                rewardParts = ' and the blueprint for the cockpit'
            }
            console.log("randEncounter = " + randEncounter);
            //after all the if's have been checked, the encounter text is created with the string variables.
            //isPlasmaP, rewardWeapon and rewardParts are by default empty strings (ex: rewardParts = '').
            //So if none of the conditions of the rocket parts' ifs have been met, nothing will appear in place of rewardParts.
            textEncounter.innerHTML = 'A ' + enemy.name 
            + ' has appeared. It has '
            + enemy.hp + 'hp and '
            + enemy.attack + ' attack. It seems to protect ' + adamantValueFoundP 
            + isPlasmaP + rewardWeapon + rewardParts
            + '. What will you do?';
            //after everything is created, hide the scavange progress screen
            //and display the encounter screen with the text and 'fight' and 'flee' buttons
            scavengeProgress.style.display = 'none';
            encounterContainer.style.display = 'block';
        }
    }
}

/*resetRewards has the purpose of reseting the boolean variables to
their default state: false. otherwise, for example, if the player encounters an epic monster that protects a ray gun,
isRaygun var is set to true and flee, the next encounter can be with a small monster that would've protected no blueprint
but because isRaygun is still set to true and after defeating the small monster, he will receive the raygun.*/
var resetRewards = function(){
    isSwordBP = false;
    isHalberdBP = false;
    isRaygun = false;
    isEngineBP = false;
    isShellBP = false;
    isCockpitBP = false;
    isPlasma = false;
    rewardParts = '';
    rewardWeapon = '';
    isPlasmaP = '';
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
            ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
            isSilicate = silicateChance();
            console.log(radarValue.innerHTML);
            //chance to mine silicate without radar is 15%
            if(radarValue.innerHTML === "radar:"){
                console.log('pickaxe lvl is 1');
                if(isSilicate >= 85) {
                    silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
                }
                //chance to mine silicate with iron radar is 30%
            } else if(radarValue.innerHTML === "radar: iron"){
                console.log('pickaxe lvl is 2');
                if(isSilicate >= 70){
                    silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
                }
                //chance to mine silicate with adamant radar is 50%
            } else if (radarValue.innerHTML === "radar: adamant"){
                console.log('pickaxe lvl is 3');
                if(isSilicate >= 50) {
                    silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
                }
            } else{
                console.log("nope");
            }
            //reset the mine bar back to 0 width
            width = 0;
            elem[1].style.width = width;
            //make the button active again
            mineButon.removeAttribute("disabled");
            console.log("done");
            console.log(isSilicate);
        //what happens if the progress bar is not done
        } else {
            width++;
            elem[1].style.width = width + "%";
        }
    }
})

//listener on the 'research' button from the menu to go to the research tab
researchButton.addEventListener('click', function(e){
    console.log(bigContainer);
    bigContainer.style.display = 'none';
    researchContainer.style.display = 'flex';
    researchContainer.style.justifyContent = 'space-between';
})

//listener on the 'menu' button from the research tab to go back to the menu
researchMenuButton.addEventListener('click', function(e){
    researchContainer.style.display = 'none';
    bigContainer.style.display = 'flex';
})


function radarUpgradeListener(index) {
    if(index == 0 && ironValue.innerHTML >= 15 && silicateValue.innerHTML >= 5){
        console.log("radar upgrade number " + (index + 1));
        radarValue.innerHTML = "radar: iron";
        //reduce the opacity of the button and disable it
        radarUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        radarUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        radarUpgradeButtons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = ironValue.innerHTML - 15;
        silicateValue.innerHTML = silicateValue.innerHTML - 5;
        //make radar visible in the inventoryContainer
        radarValue.style.display = 'block';
        //make the next radar button visible
        radarUpgradeButtons[index + 1].style.display = 'block'
    }else if(index == 1 && adamantValue.innerHTML >= 25 && silicateValue.innerHTML >= 10){
        console.log("radar upgrade number " + (index + 1));
        radarValue.innerHTML = "radar: adamant";
        radarUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        radarUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        radarUpgradeButtons[index].setAttribute('disabled', 'true');
        adamantValue.innerHTML = adamantValue.innerHTML - 25;
        silicateValue.innerHTML = silicateValue.innerHTML - 10;
    } else {
        console.log('not enough minerals');
        console.log(silicateValue.innerHTML);
    }
}

function robotUpgradeListener(index) {
    var width = 1;
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    if (index == 0 && ironValue.innerHTML >= 20 && silicateValue.innerHTML >= 15) {
        console.log("lil' robots upgrade number " + (index + 1));
        robotsValue.innerHTML = "lil' robots: " + (index + 1);
        robotsUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        robotsUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        robotsUpgradeButtons[index].setAttribute('disabled', 'true');
        robotsValue.style.display = 'block';
        //make the next robot button visible
        robotsUpgradeButtons[index + 1].style.display = 'block';
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 20;
        silicateValue.innerHTML = parseInt(silicateValue.innerHTML) - 15;
        idRobot = setInterval(frame, 100);
    } else if (index == 1 && ironValue.innerHTML >= 50 && silicateValue.innerHTML >= 20) {
        console.log("lil' robots upgrade number " + (index + 1));
        robotsValue.innerHTML = "lil' robots: " + (index + 1);
        robotsUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        robotsUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        robotsUpgradeButtons[index].setAttribute('disabled', 'true');
        //make the next robot button visible
        robotsUpgradeButtons[index + 1].style.display = 'block';
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 50;
        silicateValue.innerHTML = parseInt(silicateValue.innerHTML) - 20;
        idRobot = setInterval(frame, 75);
    } else if (index == 2 && ironValue.innerHTML >= 80 && silicateValue.innerHTML >= 35){
        console.log("lil' robots upgrade number " + (index + 1));
        robotsValue.innerHTML = "lil' robots: " + (index + 1);
        robotsUpgradeButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        robotsUpgradeButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        robotsUpgradeButtons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 80;
        silicateValue.innerHTML = parseInt(silicateValue.innerHTML) - 35;
        idRobot = setInterval(frame, 50);
    } else {
        console.log('not enough minerals');
    }
    function frame() {
        //what happens if the progress bar is done
        if (width >= 100) {
        //clearInterval(id);
        console.log(elem[(index + 2)])
        console.log((index + 2));
        ironValue.innerHTML = parseInt(ironValue.innerHTML) + 1;
        isSilicate = silicateChance();
        console.log(radarValue.innerHTML);
        //chance to mine silicate with no radar is 15%
        if(radarValue.innerHTML === "radar:"){
            if(isSilicate >= 85) {
                silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
            }
            //chance to mine silicate with an iron radar is 30%
        } else if(radarValue.innerHTML === "radar: iron"){
            if(isSilicate >= 70){
                silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
            }
            //chance to mine silicate with an adamant radar is 50%
        } else if (radarValue.innerHTML === "radar: adamant"){
            if(isSilicate >= 50) {
                silicateValue.innerHTML = parseInt(silicateValue.innerHTML) + 1;
            }
        } else{
            console.log("nope");
        }
        width = 0;
        elem[(index + 2)].style.width = width;
        console.log("done");
        console.log(isSilicate);
        //what happens if the progress bar is not done
        } else {
        width++;
        elem[(index + 2)].style.width = width + "%";
        }
    }
};

function weaponListener(index){
    // iron mace
    if(index == 0 && parseInt(ironValue.innerHTML) >= 40) {
        //make the button grey and disable it
        weaponButttons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        weaponButttons[index].style.color = "rgba(255, 255, 255, 0.3)";
        weaponButttons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 40;
        player.attack = 15;
        player.dodge = 15;
        weaponValue.innerHTML = 'weapon: Iron mace';
        attackValue.innerHTML = 'attack - 15';
        dodgeValue.innerHTML = 'dodge - 15';
        //display the stats of the player
        statsContainer.style.display = 'block';
        //display the scavenging button
        scavengeingButtonContainer.style.display = 'block';
        //display the weapon in the inventoryContainer
        weaponValue.style.display = 'block';
    // iron-adamant sword
    } else if(index == 1 && parseInt(ironValue.innerHTML) >= 25 
    && parseInt(adamantValue.innerHTML) >= 15) {
        weaponButttons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        weaponButttons[index].style.color = "rgba(255, 255, 255, 0.3)";
        weaponButttons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 25;
        adamantValue.innerHTML = parseInt(adamantValue.innerHTML) - 15;
        player.attack = 25;
        player.dodge = 25;
        weaponValue.innerHTML = 'weapon: Sword';
        attackValue.innerHTML = 'attack - 25';
        dodgeValue.innerHTML = 'dodge - 25';
    // adamant halberd
    } else if(index == 2 && parseInt(adamantValue.innerHTML) >= 45) {
        weaponButttons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        weaponButttons[index].style.color = "rgba(255, 255, 255, 0.3)";
        weaponButttons[index].setAttribute('disabled', 'true');
        adamantValue.innerHTML = parseInt(adamantValue.innerHTML) - 45;
        player.attack = 40;
        player.dodge = 15;
        weaponValue.innerHTML = 'weapon: Halberd';
        attackValue.innerHTML = 'attack - 40';
        dodgeValue.innerHTML = 'dodge - 15';
    } else {
        console.log('not enough minerals');
        console.log ('ironValue = ' + ironValue.innerHTML);
        console.log('adamant value = ' + adamantValue.innerHTML);
    }
}

function rocketPartsListener(index){
    //what happens when you press the first button (engine)
    if(index == 0 && adamantValue.innerHTML >= 90 && plasmaValue.innerText == '☑'){
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        adamantValue.innerHTML = parseInt(adamantValue.innerHTML) - 90;
        isEngine = true;
        credits();
        //what happens when you press the second button (shell)
    } else if(index == 1 && ironValue.innerHTML >= 200 && adamantValue.innerHTML >= 60) {
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 200
        adamantValue.innerHTML = parseInt(adamantValue.innerHTML) - 60;
        isChassis = true;
        credits();
        //what happens when you press the third button (cockpit)
    } else if(index == 2 && ironValue.innerHTML >= 150 && silicateValue.innerHTML >= 100) {
        rocketPartsButtons[index].style.border = "2px solid rgba(255, 255, 255, 0.2)";
        rocketPartsButtons[index].style.color = "rgba(255, 255, 255, 0.3)";
        rocketPartsButtons[index].setAttribute('disabled', 'true');
        ironValue.innerHTML = parseInt(ironValue.innerHTML) - 150;
        silicateValue.innerHTML = parseInt(silicateValue.innerHTML) - 100;
        isTerminal = true;
        credits();
        //what happens if you don't have enough resources
    } else {
        console.log('not enough minerals');
        console.log(plasmaValue.innerText);
    }
} 


for(i=0; i < radarUpgradeButtons.length; i++){
    //Research bind method and closure inside loops!
    //One way to do it is to store the item in a 'let' variable
    //and use that to put the listener on. (errr, still doesn't work. Use bind)
    //here's a link: https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    radarUpgradeButtons[i].addEventListener('click',
    radarUpgradeListener.bind(null,i));
}

for(i=0; i<robotsUpgradeButtons.length; i++) {
    robotsUpgradeButtons[i].addEventListener('click',
    robotUpgradeListener.bind(null, i));
}

for(i=0; i<weaponButttons.length; i++) {
    weaponButttons[i].addEventListener('click',
    weaponListener.bind(null, i));
}

for(i=0; i<rocketPartsButtons.length; i++) {
    rocketPartsButtons[i].addEventListener('click',
    rocketPartsListener.bind(null, i));
}

scavengeButton.addEventListener('click', function(e){
    console.log(scavengeContainer);
    encounterContainer.style.display = 'none';
    scavengeContainer.style.display = 'flex';
    //set isFirstBattle to true so that the hp is restored
    //must see if this is still uselful.
    isFirstBattle = true;
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    var id = setInterval(function(){
        scavengeFrame(id);
    }, 100);
});

fleeButton.addEventListener('click', function(e){
    encounterContainer.style.display = 'none';
    scavengeProgress.style.display = 'flex';
    resetRewards();
    width = parseInt(elem[0].style.width);
    //because the interval is set at 10ms, the width will increase
    //1% every 10ms. => progress bar of 1 second
    var id = setInterval(function(){
        scavengeFrame(id);
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
        //if it's not the first battle and the the fighter is not the enemy
        //then do not reset the hp and use the current one (weakened from the
        //previous fights)
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
        p.innerText = fighter.dodge + ' dodge'
        divStatsList[div].appendChild(p);
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
    var dodgePlayer = parseInt(document.querySelectorAll('#playerStatsContainer p')[2].innerHTML);
    var randDodge
    function autoCombat(){
        var interval = setInterval(function(){
            // var i is the index for whether is the player's turn
            // or the oponent's turn
            i++
            //create a random number to compare it to dodge
            randDodge = Math.floor(Math.random() * 100 + 1);
            console.log(randDodge);
            // if the index is odd, this if's condition is met
            if(i%2){
                //if the dodge stat of the player is bigger than the random number randDodge,
                //then the player does not take damage and an appropiate text is displayed
                if(dodgePlayer > randDodge) {
                    p = document.createElement('p');
                    p.innerText = 'You dodged!';
                    //prepend method is used so that the new fight info always comees first
                    fightConsole.prepend(p);
                //what happens if the player doesn't dodge
                } else {
                    hpPlayer = hpPlayer - attackEnemy;
                    //select and change the hp from stats according to the damage received
                    var pHpPlayer = divStatsList[0].querySelector('p');
                    pHpPlayer.innerHTML = hpPlayer + ' hp';
                    p = document.createElement('p');
                    p.innerText = 'The monster attacked you. you lost ' 
                    + attackEnemy + ' health';
                    //prepend method is used so that the new fight info always comees first
                    fightConsole.prepend(p);
                    console.log('the player hp is equal to ' + hpPlayer);
                }
            }
            // if the player is dead, this if's condition is met
            if (hpPlayer < 1){
                clearInterval(interval);
                currentHP = 1;
                elem[5].style.width = currentHP + '%';
                hpValue.innerHTML = 'HP - ' + currentHP;
                //clears the stats that were created when pressed the fight button
                /*while the list has children, remove the first one
                the second children becomes the first and the cycle continues
                until there is no first child*/
                while(divStatsList[0].firstChild && divStatsList[1].firstChild){
                    divStatsList[0].removeChild(divStatsList[0].firstChild);
                    divStatsList[1].removeChild(divStatsList[1].firstChild);                    
                }
                while(fightConsole.firstChild){
                    fightConsole.removeChild(fightConsole.firstChild);
                }
                scavengeContainer.style.display = 'none';
                fightContainer.style.display = 'none';
                encounterContainer.style.display = 'none';
                resetRewards();
                scavengeButton.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                scavengeButton.style.color = "rgba(255, 255, 255, 0.3)";
                scavengeButton.setAttribute('disabled', 'true');
                var restoreHPid = setInterval(function(){
                    console.log('currentHP = ' + currentHP);
                    width = currentHP;
                    //what happens when the HP is at 100
                    if(currentHP >= 100) {
                        clearInterval(restoreHPid);
                        width = 0;
                        scavengeButton.style.border = "2px solid rgba(255, 255, 255, 0.5)";
                        scavengeButton.style.color = "rgba(255, 255, 255, 0.7)";
                        scavengeButton.removeAttribute('disabled');
                    //what happens when the HP is below 100
                    } else {
                        currentHP++
                        width = currentHP;
                        elem[5].style.width = width + '%';
                        hpValue.innerText = 'HP - ' + currentHP;
                    }
                }, 750)//the duration of one tick of one HP regen in ms
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
                elem[5].style.width = currentHP + '%';
                hpValue.innerText = 'HP - ' + currentHP;
                //adding the adamantium adamantValueFound to the DOM
                adamantValue.innerHTML = parseInt(adamantValue.innerHTML) + adamantValueFound;
                //check if the monster was protecting something
                //if he did, unlock the button for the respective blueprint
                //or get the weapon/resource
                if(isSwordBP) {
                    weaponButttons[1].style.display = 'block';
                }
                if(isHalberdBP) {
                    weaponButttons[2].style.display = 'block';
                }
                if(isRaygun) {
                    player.attack = 45;
                    player.dodge = 35;
                    attackValue.innerHTML = 'attack - 45';
                    dodgeValue.innerHTML = 'dodge - 35'
                    weaponValue.innerHTML = 'weapon: Ray gun';
                }
                if(isPlasma) {
                    plasmaValue.innerHTML = '☑'
                }
                if(isEngineBP) {
                    rocketPartsButtons[0].style.display = 'block';
                }
                if(isShellBP) {
                    rocketPartsButtons[1].style.display = 'block';
                }
                if(isCockpitBP) {
                    rocketPartsButtons[2].style.display = 'block';
                }
                //clears the stats that were created when pressed the fight button
                /*while the list has children, remove the first one
                the second children becomes the first and the cycle continues
                until there is no first child*/
                while(divStatsList[0].firstChild && divStatsList[1].firstChild){
                    divStatsList[0].removeChild(divStatsList[0].firstChild);
                    divStatsList[1].removeChild(divStatsList[1].firstChild);                    
                }
                while(fightConsole.firstChild){
                    fightConsole.removeChild(fightConsole.firstChild);
                }
                scavengeProgress.style.display = 'flex';
                fightContainer.style.display = 'none';
                resetRewards();
                width = parseInt(elem[0].style.width);
                //because the interval is set at 10ms, the width will increase
                //1% every 10ms. => progress bar of 1 second
                var id = setInterval(function() {
                    scavengeFrame(id);
                }, 100);
            }
        }, 1500);
    }
    //call the function declared above
    autoCombat();
});



function silicateChance(){
    var value = Math.floor(Math.random() * 100) + 1;
    return value;
}



});
