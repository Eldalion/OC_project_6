/* ------- TO DO -------


1. Very rarely, player can spawn in the corner surounded by rocks. Its very very rare tho. Didnt happen once in last 100 tests.
2. Pocitadlo na kroky playerov, zatial funguju len tak ze spravia 1 velky/maly krok a dost. Spravit aby mali az 3 male kroky, 
   nejak to doratavat nez moze ist druhy hrac
3. Picknutie zbrane


*/

const newGameButton = document.querySelector('#new-game');
const gameBoardContainer = document.querySelector('#game-board-container');
const combatContainer = document.querySelector('.combat-container');
const combatContainerPlayerOne = document.querySelector('.combat-container-player-one');
const combatContainerPlayerTwo = document.querySelector('.combat-container-player-two');
const messageContainer = document.querySelector('.message-container h2');

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

const playerOneName = document.querySelector('.player-one-name');
const playerTwoName = document.querySelector('.player-two-name');

class Player {
    constructor( name, health, attackPower, equipedWeapon, turn, action) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.equipedWeapon = equipedWeapon;
        this.turn = turn;
        this.action = action;
        
    }
}



let playerOne = new Player('Frank', 100, 10, 'fists', true,'');
let playerTwo = new Player('Sahib', 100, 10, 'fists', false,'');

/* -------------------------------------------------------------------------------------------------------------------------------------- */
function generateBoard() {
    gameBoardContainer.classList.remove('disabled');
    combatContainer.classList.add('disabled');

    gameBoardContainer.innerHTML = ''; // Clear game tiles
    
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

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('player-two');
            break;
        }
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
            break;
        }
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-two');

            break;
        }
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-three');

            break;
        }
    }

    while (true) {

        randomNumber = Math.floor(Math.random() * 100)

        if (divs[randomNumber].classList.length == 0) {
            divs[randomNumber].classList.add('weapon-four');

            break;
        }
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

    playerOne.health = 100;
    playerOne.attackPower = 10;
    playerOne.turn = true;

    playerTwo.health = 100;
    playerTwo.attackPower = 10;
    playerTwo.turn = false;

    playerOneName.innerHTML = playerOne.name;
    playerOneHitpoints.innerHTML = playerOne.health;
    playerOneWeapon.innerHTML = "No weapon";
    playerOneDamage.innerHTML = playerOne.attackPower;

    playerTwoName.innerHTML = playerTwo.name;
    playerTwoHitpoints.innerHTML = playerTwo.health;
    playerTwoWeapon.innerHTML = "No weapon";
    playerTwoDamage.innerHTML = playerTwo.attackPower;

    messageContainer.innerHTML = 'Players are not in combat';
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */
function newGame() {
    generateBoard();
    addPlayersToBoard();
    resetPlayerStats(); 
    addWeaponsToBoard();
    addObstaclesToBoard();
    playerMovement();
}
/* -------------------------------------------------------------------------------------------------------------------------------------- */

function playerMovement() {

    const boardTiles = document.querySelectorAll("#game-board-container div"); // Select all game tiles
    playerShowPossibleMoves(3,'border-blue'); // No tile was clciked yet so we need to show very first highlighting 

    boardTiles.forEach((item) => {
        item.addEventListener('click', (event) => {

            
            if (playerOne.turn == true && event.target.classList.contains('border-blue')) { // Can only move to blue tiles

                playerOnePosition = document.querySelector('.player-one'); // Position from previous round
                playerOnePosition.classList.remove('player-one');

                boardTiles.forEach((item) => { item.classList.remove('border-blue') });
                event.target.classList.add('player-one');

                /* Checking if there is weapon on the tile, if yes pick it up and possibly drop equiped weapon */

                if ( event.target.classList.contains('weapon-one') ) {
                    // if player has already a weaspon, drop it
                    if ( playerOne.equipedWeapon != 'fists') { // If you have soem weapon equiped, drop your current weapon
                        event.target.classList.add(playerOne.equipedWeapon);
                    }

                    playerOne.equipedWeapon = 'weapon-one';
                    playerOne.attackPower = 20;
                    event.target.classList.remove('weapon-one');
                    playerOneWeapon.innerHTML = 'Pistol';
                    playerOneDamage.innerHTML = String(playerOne.attackPower); 
                } 

                else if ( event.target.classList.contains('weapon-two') ) {
                    
                    if ( playerOne.equipedWeapon != 'fists') {
                        event.target.classList.add(playerOne.equipedWeapon);
                    }
                    
                    playerOne.equipedWeapon = 'weapon-two';
                    playerOne.attackPower = 30;
                    event.target.classList.remove('weapon-two');
                    playerOneWeapon.innerHTML = 'Mace';
                    playerOneDamage.innerHTML = String(playerOne.attackPower); 
                }

                else if ( event.target.classList.contains('weapon-three') ) {
                    
                    if ( playerOne.equipedWeapon != 'fists') {
                        event.target.classList.add(playerOne.equipedWeapon);
                    }
                    
                    playerOne.equipedWeapon = 'weapon-three';
                    playerOne.attackPower = 40;
                    event.target.classList.remove('weapon-three');
                    playerOneWeapon.innerHTML = 'Bazooka';
                    playerOneDamage.innerHTML = String(playerOne.attackPower); 
                }

                else if ( event.target.classList.contains('weapon-four') ) {
                    
                    if ( playerOne.equipedWeapon != 'fists') {
                        event.target.classList.add(playerOne.equipedWeapon);
                    }
                    
                    playerOne.equipedWeapon = 'weapon-four';
                    playerOne.attackPower = 50;
                    event.target.classList.remove('weapon-four');
                    playerOneWeapon.innerHTML = 'Nightstick';
                    playerOneDamage.innerHTML = String(playerOne.attackPower); 
                }

                playerOnePosition = document.querySelector('.player-one'); // New position ( newly clicked )
                let row = Number(playerOnePosition.dataset.row);
                let column = Number(playerOnePosition.dataset.column);
               
                /* Checking if there is a player around, if yes switch to combat phase */

                let combat = false; // helper variable

                let right = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + 1) + "']");
                let left = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - 1) + "']");
                let bottom = document.querySelector("[data-row='" + String(row + 1) + "'][data-column='" + String(column) + "']");
                let top = document.querySelector("[data-row='" + String(row - 1) + "'][data-column='" + String(column) + "']");
                
                if (right != null) { // Checking if tile exists ( if its not outside of the board )
                    if (right.classList.contains('player-two')) {
                        console.log('right prebehlo');
                        switchToCombat();
                        combat = true; 
                    } 
                } 

                if (left != null) {
                    if (left.classList.contains('player-two')) {
                        switchToCombat();
                        combat = true;
                    } 
                }

                if (bottom != null) {
                    if (bottom.classList.contains('player-two')) {
                        switchToCombat();
                        combat = true;
                    } 
                }

                if (top != null) {
                    if (top.classList.contains('player-two')) {
                        switchToCombat();
                        combat = true;
                    } 
                } 

                if (combat == false) {
                    playerOne.turn = false;
                    playerTwo.turn = true;
                    playerShowPossibleMoves(3,'border-red');
                }

                
            }

            else if (playerTwo.turn == true && event.target.classList.contains('border-red')) {

                playerTwoPosition = document.querySelector('.player-two'); // Pozicia z predosleho kola
                playerTwoPosition.classList.remove('player-two');

                boardTiles.forEach((item) => { item.classList.remove('border-red') });
                event.target.classList.add('player-two');

                /* Checking if there is weapon on the tile, if yes pick it up and possibly drop equiped weapon */

                if ( event.target.classList.contains('weapon-one') ) {
                    // if player has already a weaspon, drop it
                    if ( playerTwo.equipedWeapon != 'fists') { // If you have soem weapon equiped, drop your current weapon
                        event.target.classList.add(playerTwo.equipedWeapon);
                    }

                    playerTwo.equipedWeapon = 'weapon-one';
                    playerTwo.attackPower = 20;
                    event.target.classList.remove('weapon-one');
                    playerTwoWeapon.innerHTML = 'Pistol';
                    playerTwoDamage.innerHTML = String(playerTwo.attackPower); 
                } 

                else if ( event.target.classList.contains('weapon-two') ) {
                    
                    if ( playerTwo.equipedWeapon != 'fists') {
                        event.target.classList.add(playerTwo.equipedWeapon);
                    }
                    
                    playerTwo.equipedWeapon = 'weapon-two';
                    playerTwo.attackPower = 30;
                    event.target.classList.remove('weapon-two');
                    playerTwoWeapon.innerHTML = 'Mace';
                    playerTwoDamage.innerHTML = String(playerTwo.attackPower); 
                }

                else if ( event.target.classList.contains('weapon-three') ) {
                    
                    if ( playerTwo.equipedWeapon != 'fists') {
                        event.target.classList.add(playerTwo.equipedWeapon);
                    }
                    
                    playerTwo.equipedWeapon = 'weapon-three';
                    playerTwo.attackPower = 40;
                    event.target.classList.remove('weapon-three');
                    playerTwoWeapon.innerHTML = 'Bazooka';
                    playerTwoDamage.innerHTML = String(playerTwo.attackPower); 
                }

                else if ( event.target.classList.contains('weapon-four') ) {
                    
                    if ( playerTwo.equipedWeapon != 'fists') {
                        event.target.classList.add(playerTwo.equipedWeapon);
                    }
                    
                    playerTwo.equipedWeapon = 'weapon-four';
                    playerTwo.attackPower = 50;
                    event.target.classList.remove('weapon-four');
                    playerTwoWeapon.innerHTML = 'Nightstick';
                    playerTwoDamage.innerHTML = String(playerTwo.attackPower); 
                }

                playerTwoPosition = document.querySelector('.player-two'); // New position ( newly clicked )
                let row = Number(playerTwoPosition.dataset.row);
                let column = Number(playerTwoPosition.dataset.column);

                /* Checking if there is a player around, if yes switch to combat phase */

                let combat = false; // helper variable
                
                let right = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + 1) + "']");
                let left = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - 1) + "']");
                let bottom = document.querySelector("[data-row='" + String(row + 1) + "'][data-column='" + String(column) + "']");
                let top = document.querySelector("[data-row='" + String(row - 1) + "'][data-column='" + String(column) + "']");
                
                if (right != null) { // Checking if tile exists ( if its not outside of the board )
                    if (right.classList.contains('player-one')) {
                        switchToCombat();
                        combat = true;
                    } 
                } 

                if (left != null) {
                    if (left.classList.contains('player-one')) {
                        switchToCombat();
                        combat = true;
                    } 
                }

                if (bottom != null) {
                    if (bottom.classList.contains('player-one')) {
                        switchToCombat();
                        combat = true;
                    } 
                }

                if (top != null) {
                    if (top.classList.contains('player-one')) {
                        switchToCombat();
                        combat = true;
                    } 
                } 

                if (combat == false) { // Aby neostali vyznacene policka  ked zacne combat
                    playerOne.turn = true;
                    playerTwo.turn = false;
                    playerShowPossibleMoves(3,'border-blue');
                }
            }
        })
    });
}

playerShowPossibleMoves = (moveLimit, highlighting) => {
    let playerOnePosition = document.querySelector('.player-one');
    let playerTwoPosition = document.querySelector('.player-two'); 

    let row;
    let column;

    if (highlighting == 'border-blue') {
        playerOnePosition.classList.add(highlighting); // Give player one blue border for visibility
        row = Number(playerOnePosition.dataset.row);
        column = Number(playerOnePosition.dataset.column);
    } else {
        playerTwoPosition.classList.add(highlighting); // Give player one blue border for visibility
        row = Number(playerTwoPosition.dataset.row);
        column = Number(playerTwoPosition.dataset.column);
    }

    for (let i = 1; i < moveLimit + 1; i++) {

        let tile = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + i) + "']");

        if ( tile == null || tile.classList.contains('player-one') || tile.classList.contains('player-two') || tile.classList.contains('obstacle') ) {
            break;
        } else {
            tile.classList.add(highlighting);
        } 
    }

    for (let i = 1; i < moveLimit + 1; i++) {

        let tile = document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - i) + "']");

        if ( tile == null || tile.classList.contains('player-one') || tile.classList.contains('player-two') || tile.classList.contains('obstacle') ) {
            break;
        } else {
            tile.classList.add(highlighting);
        } 
    }

    for (let i = 1; i < moveLimit + 1; i++) {

        let tile = document.querySelector("[data-row='" + String(row + i) + "'][data-column='" + String(column) + "']");

        if ( tile == null || tile.classList.contains('player-one') || tile.classList.contains('player-two') || tile.classList.contains('obstacle') ) {
            break;
        } else {
            tile.classList.add(highlighting);
        } 
    }

    for (let i = 1; i < moveLimit + 1; i++) {

        let tile = document.querySelector("[data-row='" + String(row - i) + "'][data-column='" + String(column) + "']");

        if ( tile == null || tile.classList.contains('player-one') || tile.classList.contains('player-two') || tile.classList.contains('obstacle') ) {
            break;
        } else {
            tile.classList.add(highlighting);
        } 
    }
        // pravo lavo dole hore
        // len 1 funkcia pre oboch hracov, odlisuje ich len druhy parameter ,,highlighting,,
}

/* -------------------------------------------------------------------------------------------------------------------------------------- */

function switchToCombat() {
    alert('Combat initiated !');

    gameBoardContainer.classList.toggle('disabled');
    combatContainer.classList.toggle('disabled');

    combatContainerPlayerOne.classList.remove('disabled');
    combatContainerPlayerTwo.classList.add('disabled');
}

function switchPlayer() {
    combatContainerPlayerOne.classList.toggle('disabled');
    combatContainerPlayerTwo.classList.toggle('disabled');
}

function resolveCombat() {

    if (playerOne.action == 'Attack' && playerTwo.action == 'Attack') {
        playerOne.health = playerOne.health - playerTwo.attackPower;
        playerTwo.health = playerTwo.health - playerOne.attackPower;
        playerOneHitpoints.innerHTML = playerOne.health;
        playerTwoHitpoints.innerHTML = playerTwo.health;

        if (playerOne.health <= 0 || playerTwo.health <= 0) {
            messageContainer.innerHTML = 'Someone died - new game ?';
            declareWinner();

        } else {
            messageContainer.innerHTML = 'Both player attacked - New round';
        }
    }

    if (playerOne.action == 'Defend' && playerTwo.action == 'Defend') {
        messageContainer.innerHTML = 'Both player defended, no change in HP - New round';
    }

    if (playerOne.action == 'Attack' && playerTwo.action == 'Defend') {
        playerTwo.health = playerTwo.health - (playerOne.attackPower / 2);
        playerTwoHitpoints.innerHTML = playerTwo.health;

        if (playerOne.health <= 0 || playerTwo.health <= 0) {
            messageContainer.innerHTML = 'Someone died - new game ?';
            declareWinner();

        } else {
            messageContainer.innerHTML = 'Frank attacked, Sahib defended - New round';
        }
    }

    if (playerOne.action == 'Defend' && playerTwo.action == 'Attack') {
        playerOne.health = playerOne.health - (playerTwo.attackPower / 2);
        playerOneHitpoints.innerHTML = playerOne.health;

        if (playerOne.health <= 0 || playerTwo.health <= 0) {
            messageContainer.innerHTML = 'Someone died - new game ?';
            declareWinner();

        } else {
            messageContainer.innerHTML = 'Frank defended, Sahib attacked - New round';
        }
    }
}

declareWinner = () => {

    if (playerOne.health <= 0 && playerTwo.health <= 0) {
        alert('Sahib and Frank killed each other. Its a draw.');
    }

    else if (playerOne.health <= 0) {
        alert('Sahib won the game !');
    }

    else if (playerTwo.health <= 0) {
        alert('Frank won the game !');
    }
};

/* -------------------------------------------------------------------------------------------------------------------------------------- */

newGameButton.addEventListener('click', () => newGame());

playerOneAttackButton.addEventListener('click', () => {

    playerOne.action = 'Attack';
    switchPlayer();
});

playerOneDefendbButton.addEventListener('click', () => {
    playerOne.action = 'Defend';
    switchPlayer();

});

playerTwoAttackButton.addEventListener('click', () => {

    playerTwo.action = 'Attack';

    resolveCombat();
    switchPlayer();

});

playerTwoDefendbButton.addEventListener('click', () => {

    playerTwo.action = 'Defend';

    resolveCombat();
    switchPlayer();
});