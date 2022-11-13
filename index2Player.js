window.addEventListener("load", game);

//constants
const items = document.querySelectorAll(".item");
const displayMessage = document.querySelector("#displaymessage");
const startOver = document.querySelector("#startOver");

//constant winning combinations 
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const player1= document.querySelector("#playerOne");
player1.addEventListener("click", updateName1);

const player2= document.querySelector("#playerTwo");
player2.addEventListener("click", updateName2);

const player = function(name) {
    name = name;
    return {name};
        }

//variables
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;
let playerX = player("");
let playerY = player("");

//show state

   //start game and create players  
   //listener
   //wait for input

function game() {
           
     let addPlayerForm = document.getElementById("playerForm");
    addPlayerForm.addEventListener("submit", addPlayers); 
             
    }
    
    function addPlayers(event) {
    event.preventDefault();
    const gameContainer = document.querySelector(".gameContainer");
      
    //show game container
    
    gameContainer.classList.remove("hideGamecontainer"); 
          playerX.name = this.player1.value;
          playerY.name = this.player2.value;
    
    //display players' names

    player1.textContent = this.player1.value;
    player2.textContent= this.player2.value;
    
    updateName1();
    updateName2();
   buildInitialState();
    
    }

 function updateName1() {
        
    player1.textContent = this.player1.value;
      }
      
      function updateName2() {
          
        player2.textContent= this.player2.value;
         
        }
    
        //render state
//listeners
 //loop over each item and add event listener for click
 //wait for input
function buildInitialState(){
items.forEach (function(item) {item.addEventListener ("click", onBoardClick)});
    startOver.addEventListener("click", playAgain);
    displayMessage.textContent = currentPlayer + "'s" + " turn." ;
    gameRunning = true;
}

//get index of each item when item is clicked on
function onBoardClick(){
    const itemIndex = this.getAttribute("itemIndex");
    if(gameState[itemIndex] != "" || !gameRunning){
        return;
    }
    updateItem(this, itemIndex);
    checkWinningPlay();
}


// update state
// update item to equal current player
function updateItem(item, index){
    gameState[index] = currentPlayer;
    item.textContent = currentPlayer;
}

//change player
function changePlayer(){
currentPlayer = (currentPlayer == "X") ? "O" : "X";
displayMessage.textContent = currentPlayer + "'s" + " turn." ;
}


//check for winner and check for draw
function checkWinningPlay(){
    let initialGame = false;

    //loop through winning combinations and check each of the three indices in the current game state
    
    for(let i = 0; i < winningCombinations.length; i++){
        const itemA = gameState[winningCombinations[i][0]];
        const itemB = gameState[winningCombinations[i][1]];
        const itemC = gameState[winningCombinations[i][2]];
        //check for empty items
        if(itemA == "" || itemB == "" || itemC == ""){
            continue;
        }
        // check if current game state matches any of the winning combinations
        if(itemA == itemB && itemB == itemC){
            initialGame = true;
            break;
        }
    }

    if(initialGame){
        displayMessage.textContent = currentPlayer + " wins!" ;
        gameRunning = false;
    }

    else if(!gameState.includes("")){
        displayMessage.textContent = "Game is a draw!"
        gameRunning = false;
    }
    else{
        changePlayer();
    }
}

//Clear items, and clear name displays  
//Player  must still click Start Game to restart Game after clearning board
function playAgain(){
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    displayMessage.textContent = currentPlayer + "'s" + " turn." ;
    player1.textContent = "";
    player2.textContent= "";
  items.forEach(function(item) { item.textContent = ""})
    
}


