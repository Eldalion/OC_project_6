/* 

------- TO DO -------

1. Mame 2 indikatory na playerturn. playerOneTurn a playerOne.turn = true; Vyjebat premennu a vsade dat len objekt
2. Prerobit debilne pole co generuje eventlistenery pre oboch hracov zvlast. Spravit 1 eventlistener robustny pre oboch hracov
3. Combat feature urobit. 
    - Player 1 okno active, Player2 okno disabled, Combat log cisty
    -
    - Player1 vyberie akciu, player1 okno disabled, player2 okno enabled
    - Player2 vyberie akciu, player2 okno disabled, player1 okno enabled
    - Combat log message - ak niekoho HP je na 0, vypis vytaza, inac vypis kdo komu kolko zajebal a aku akciu si zvolil
4. Very rarely, player can spawn in the corner surounded by rocks. Its very very rare tho. Didnt happen once in last 100 tests.
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

let playerOneTurn = true;
let playerTwoTurn = false;

class Player {
    constructor(name, health, attackPower, turn, action) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
        this.action = action;
        this.turn = turn;
    }
}

let playerOne = new Player('Frank', 100, 10, '', true);
let playerTwo = new Player('Sahib', 100, 10, '', false);



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
    playerShowPossibleMoves(3,'border-blue');

    boardTiles.forEach((item) => {
        item.addEventListener('click', () => {

            if (playerOne.turn == true) {

                // nejake pocitadlo ci uz si player minul 3 policka na chodzu
                let moveLimit = 3;



                // na konci pusti playerTwoShowPossibleMoves();
                
            }

            else if (playerOne.turn == true) {

                // na konci pusti playerOneShowPossibleMoves();
            }

            else { alert('Player turn error'); }
        })
    });
}

playerShowPossibleMoves = (moveLimit, highlighting) => {
    const playerOnePosition = document.querySelector('.player-one'); // Select tile with player one
    playerOnePosition.classList.add(highlighting); // Give player one blue border for visibility

    let row = Number(playerOnePosition.dataset.row);
    let column = Number(playerOnePosition.dataset.column);

    for (let i = 1; i < moveLimit + 1; i++) {
        document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column + i) + "']").classList.add(highlighting) 
        document.querySelector("[data-row='" + String(row) + "'][data-column='" + String(column - i) + "']").classList.add(highlighting) 
        document.querySelector("[data-row='" + String(row + i) + "'][data-column='" + String(column) + "']").classList.add(highlighting) 
        document.querySelector("[data-row='" + String(row - i) + "'][data-column='" + String(column) + "']").classList.add(highlighting)

        // rozdelit na 4 samostatne for cykly
        // pravo lavo dole hore
        // Ako prve osefovat chybu co odjebe cely cyklus ked skusi oznacit stvorcek za mapou
        // len 1 funkcia pre oboch hracov, odlisuje ich len druhy parameter ,,highlighting,,
    }


}

/* ---------------------------------- */
function playerOneMove() {

    let divs = document.querySelectorAll("#game-board-container div"); // Select all game tiles
    let playerOnePosition = document.querySelector('.player-one'); // Select tile with player one
    playerOnePosition.classList.add('border-blue'); // Give player one blue border for visibility

    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener('click', function P1M(event) { // Add events to all game tiles

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
                    switchToCombat();
                } else {
                    playerTwoMove();
                }
            }
        });
    }
}


/* -------------------------------------------------------------------------------------------------------------------------------------- */

function switchToCombat() {
    alert('Combat initiated !');
    gameBoardContainer.classList.toggle('disabled');

    combatContainer.classList.toggle('disabled');
    combatContainerPlayerTwo.classList.toggle('disabled');
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

        } else {
            messageContainer.innerHTML = 'Frank attacked, Sahib defended - New round';
        }
    }

    if (playerOne.action == 'Defend' && playerTwo.action == 'Attack') {
        playerOne.health = playerOne.health - (playerTwo.attackPower / 2);
        playerOneHitpoints.innerHTML = playerOne.health;

        if (playerOne.health <= 0 || playerTwo.health <= 0) {
            messageContainer.innerHTML = 'Someone died - new game ?';

        } else {
            messageContainer.innerHTML = 'Frank defended, Sahib attacked - New round';
        }
    }
}

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