const button = document.querySelector('#new-game');
const gameBoardContainer = document.querySelector('#game-board-container');

const playerOneHitpoints = document.querySelector('.player-one-hitpoints');
const playerOneWeapon = document.querySelector('.player-one-weapon');
const playerOneDamage = document.querySelector('.player-one-damage');

const playerOneAttackButton = document.querySelector('.player-one-attack-button');
const playerOneDefendbButton = document.querySelector('.player-one-defend-button');

const playerTwoHitpoints = document.querySelector('.player-two-hitpoints');
const playerTwoWeapon = document.querySelector('.player-two-weapon');
const playerTwoDamage = document.querySelector('.player-two-damage');

const playerTwoAttackButton = document.querySelector('.player-two-attack-button');
const playerTwoDefendbButton = document.querySelector('.player-two-defend-button');

/* Code for testing - remove on finished project */
let mainCounter = 0;
let classBugCounter = 0;
/* Code for testing - remove on finished project */

let playerOneTurn = true;
let playerTwoTurn = false;

button.addEventListener('click', function () {
    newGame();
});

class Player {
    constructor(name, health, baseDamage, turn) {
        this.name = name;
        this.health = health;
        this.baseDamage = baseDamage;
        this.turn = turn;
    }
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */
function generateBoard() {
    gameBoardContainer.innerHTML = ''; // Clear game tiles
    resetPlayerStats(); // Reset player stats to default

    for (let i = 1; i <= 10; i++) {

        for (let j = 1; j <= 10; j++) {

            let newDiv = document.createElement('div');
            newDiv.setAttribute('data-row', i);
            newDiv.setAttribute('data-column', j);
            gameBoardContainer.appendChild(newDiv);
        }
    }
}

/* -------------------------------------------------------------------------------------------------------------------------------------- */
function addPlayersToBoard() {

    let divs = document.querySelectorAll("#game-board-container div");
    let randomNumber;

    randomNumber = Math.floor(Math.random() * 100);
    divs[randomNumber].classList.add('player-one');
    /* Code for testing - remove on finished project */
    console.log('Player 1 - ', randomNumber);
    /* Code for testing - remove on finished project */
    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('player-two');
            console.log('Player 2 - ', randomNumber);
            break;
        }
        /* Code for testing - remove on finished project */
        console.log('Tile occupied - Skipping adding player two ');
        /* Code for testing - remove on finished project */
    }

}
/* -------------------------------------------------------------------------------------------------------------------------------------- */

function addWeaponsToBoard() {
    let divs = document.querySelectorAll("#game-board-container div");
    let randomNumber = Math.floor(Math.random() * 100);



    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-one');
            console.log('Pistol - ', randomNumber);
            break;
        }
        /* Code for testing - remove on finished project */
        console.log('Tile occupied - Skipping adding weapon one ');
        /* Code for testing - remove on finished project */
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-two');
            /* Code for testing - remove on finished project */
            console.log('Mace - ', randomNumber);
            /* Code for testing - remove on finished project */
            break;
        }
        /* Code for testing - remove on finished project */
        console.log('Tile occupied - Skipping adding weapon two');
        /* Code for testing - remove on finished project */
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-three');
            /* Code for testing - remove on finished project */
            console.log('Rocket launcher - ', randomNumber);
            /* Code for testing - remove on finished project */
            break;
        }
        /* Code for testing - remove on finished project */
        console.log('Tile occupied - Skipping adding weapon three');
        /* Code for testing - remove on finished project */
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-four');
            /* Code for testing - remove on finished project */
            console.log('Police baton - ', randomNumber);
            /* Code for testing - remove on finished project */
            break;
        }
        /* Code for testing - remove on finished project */
        console.log('Tile occupied - Skipping adding weapon four');
        /* Code for testing - remove on finished project */
    }
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */
function addObstaclesToBoard() {

    let divs = document.querySelectorAll("#game-board-container div");
    let obstacleCounter = 0;
    let skipCounter = 3; // Skip first 3 tiles when adding obstacles to map

    for (var i = 0; i < divs.length; i++) {

        if (skipCounter == 0) { // Checks if the right number of map tiles were skipped 
            if (obstacleCounter < 15) { // Counts number of obstacles on the board
                if (Math.floor(Math.random() * 2) == 0) {

                    if (divs[i].classList.length == 0)

                    {
                        divs[i].classList.add('obstacle'); // Adds obstacle to map tile
                        obstacleCounter = obstacleCounter + 1;
                        skipCounter = skipCounter + 4; // If obstacle was added to the board, skip the next 3 map tiles
                    }
                }
            }
        } else {
            skipCounter = skipCounter - 1;
        }
    }
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */
function resetPlayerStats() {
    playerOne = new Player('Frank', 100, 10, true);
    playerTwo = new Player('Sahib', 100, 10, false);

    const playerOneName = document.querySelector('.player-one-name');
    const playerTwoName = document.querySelector('.player-two-name');

    playerOneName.innerHTML = playerOne.name;
    playerOneHitpoints.innerHTML = playerOne.health;
    playerOneWeapon.innerHTML = "No weapon";
    playerOneDamage.innerHTML = playerOne.baseDamage;

    playerTwoName.innerHTML = playerTwo.name;
    playerTwoHitpoints.innerHTML = playerTwo.health;
    playerTwoWeapon.innerHTML = "No weapon";
    playerTwoDamage.innerHTML = playerTwo.baseDamage;
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */
function newGame() {
    console.clear();
    generateBoard();
    addPlayersToBoard();
    addWeaponsToBoard();
    addObstaclesToBoard();
    playerMovement();
    /* ------------------------------------- Testing One --------------------------------------------- */
    mainCounter = mainCounter + 1;

    let divs = document.querySelectorAll("#game-board-container div");
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].classList.length > 1) {
            classBugCounter = classBugCounter + 1;
        }
    }
    /* Code for testing - remove on finished project */
    console.log('----------------------------------------------------------');
    console.log('Test number', mainCounter);
    console.log('Class bug counter', classBugCounter);
    /* Code for testing - remove on finished project */

}
/* -------------------------------------------------------------------------------------------------------------------------------------- */


function playerMovement() {
    playerOneMove();
}

function playerOneMove() {

    let divs = document.querySelectorAll("#game-board-container div"); // Select all game tiles
    let playerOnePosition = document.querySelector('.player-one'); // Select tile with player one
    playerOnePosition.classList.add('border-blue'); // Give player one blue border for visibility

    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function P1M (event) { // Add events to all game tiles

            if ((event.target.classList.length == 0) && (playerOneTurn == true)) { // If clicked tile is empty ( no class ) and its Player's one turn
                playerOnePosition.classList.remove('border-blue');
                playerOnePosition.classList.remove('player-one');
                event.target.classList.add('player-one');
                playerOnePosition = document.querySelector('.player-one');
                playerOneTurn = false;
                playerTwoTurn = true;

                let row = Number(playerOnePosition.dataset.row);
                let column = Number(playerOnePosition.dataset.column);


                if (
                    document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + 1) + "']").classList.contains('player-two') ||
                    document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - 1) + "']").classList.contains('player-two') ||
                    document.querySelector("[data-row='" + String(row + 1) + "'][data-column='" + String(column) + "']").classList.contains('player-two') ||
                    document.querySelector("[data-row='" + String(row - 1) + "'][data-column='" + String(column) + "']").classList.contains('player-two')
                )

                {
                    startCombat();
                } else {
                    playerTwoMove();
                }
            }
        });
    }
}

function playerTwoMove() {
    let divs = document.querySelectorAll("#game-board-container div");
    let playerTwoPosition = document.querySelector('.player-two');
    playerTwoPosition.classList.add('border-red');

    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function P2M (event) {

            if ((event.target.classList.length == 0) && (playerTwoTurn == true)) { // If clicked tile is empty, move player there
                playerTwoPosition.classList.remove('border-red');
                playerTwoPosition.classList.remove('player-two');
                event.target.classList.add('player-two');
                playerTwoPosition = document.querySelector('.player-two');
                playerOneTurn = true;
                playerTwoTurn = false;

                let row = Number(playerTwoPosition.dataset.row);
                let column = Number(playerTwoPosition.dataset.column);

                if (
                    document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + 1) + "']").classList.contains('player-one') ||
                    document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - 1) + "']").classList.contains('player-one') ||
                    document.querySelector("[data-row='" + String(row + 1) + "'][data-column='" + String(column) + "']").classList.contains('player-one') ||
                    document.querySelector("[data-row='" + String(row - 1) + "'][data-column='" + String(column) + "']").classList.contains('player-one')
                )

                {
                    startCombat();
                } else {
                    playerOneMove();
                }
            }
        });
    }
}

function startCombat() {
    alert('Combat !!!');

    /* ---- this block is just for reference, wont be in final code
    playerOneName.innerHTML = playerOne.name;
    playerOneHitpoints.innerHTML = playerOne.health;
    playerOneWeapon.innerHTML = "No weapon";
    playerOneDamage.innerHTML = playerOne.baseDamage;

    playerTwoName.innerHTML = playerTwo.name;
    playerTwoHitpoints.innerHTML = playerTwo.health;
    playerTwoWeapon.innerHTML = "No weapon";
    playerTwoDamage.innerHTML = playerTwo.baseDamage; 

    const playerOneHitpoints = document.querySelector('.player-one-hitpoints');
    const playerOneWeapon = document.querySelector('.player-one-weapon');
    const playerOneDamage = document.querySelector('.player-one-damage');

    const playerOneAttackButton = document.querySelector('.player-one-attack-button');
    const playerOneDefendbButton = document.querySelector('.player-one-defend-button');

    const playerTwoHitpoints = document.querySelector('.player-two-hitpoints');
    const playerTwoWeapon = document.querySelector('.player-two-weapon');
    const playerTwoDamage = document.querySelector('.player-two-damage');

    const playerTwoAttackButton = document.querySelector('.player-two-attack-button');
    const playerTwoDefendbButton = document.querySelector('.player-two-defend-button');
    */

   
   

    /* 
    
    const combatContainerPlayerOne = document.querySelector('.combat-container-player-one');

    player2box.classlist().toggle('disabled');

    let player1action = "";
    let player2action = "";

    

        player1boxAttackButton.eventListener('click', function(){
            

            player1action = "Attack";

            player1box.classlist().toggle('disabled');
            player2box.classlist().toggle('disabled');
        });

        player1boxDefenseButton.eventListener('click', function(){
            player1action = "Defense";

            player1box.classlist().toggle('disabled');
            player2box.classlist().toggle('disabled');
        });

        player2boxAttackButton.eventListener('click', function(){
            player1action = "Attack";

            player1box.classlist().toggle('disabled');
            player2box.classlist().toggle('disabled');

            calculateCombat(); // calculates combat based on HP and weapon damage + shows combat log message
                
        });

        player2boxDefenseButton.eventListener('click', function(){
            player1action = "Defense";

            player1box.classlist().toggle('disabled');
            player2box.classlist().toggle('disabled');

            calculateCombat();
        });

        function calculateCombat(){
            - calculating combat + updating player HP

            if (player1 is alive OR player2 is alive) {
                - show combat log message with player action and remaining HP

            } else {
                if ( player 1 is alive ) {
                    show message Player 1 won
                    player1box.classlist().add('disabled');
                    player2box.classlist().add('disabled');
                } else {
                    show message Player 2 won
                }
            }    
        }

                
    
    */

     

}



















/* ------------------------- Some notes -------------------------------- */

/* 

2. Very rarely, player can spawn in the corner surounded by rocks. Its very very rare tho. Didnt happen once in last 100 tests. 

*/


/* let row = Number(event.target.dataset.row);
let column = Number(event.target.dataset.column);
console.log('Riadok: ', row,", Stlpec: ", column);
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column+1) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column+2) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column+3) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column-1) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column-2) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row)  +"'][data-column='"+ String(column-3) +"']").classList.add('border-blue');

document.querySelector("[data-row='"+ String(row+1)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row+2)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row+3)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row-1)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row-2)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue');
document.querySelector("[data-row='"+ String(row-3)  +"'][data-column='"+ String(column) +"']").classList.add('border-blue'); */