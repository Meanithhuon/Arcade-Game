window.addEventListener("load", game);

//constants

const player = function(name) {
  name = name;
    return {name};
    }

    const player1= document.querySelector("#playerOne");
player1.addEventListener("click", updateName1);


 //variables   
  
let playerX = player("");

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

        //show game container

      const gameContainer = document.querySelector(".gameContainer");
            gameContainer.classList.remove("hideGamecontainer"); 


              //display players' names
    playerX.name = this.player1.value;
         player1.textContent = this.player1.value;
  


        updateName1();
        buildInitialState1P();
  
  }

  function updateName1() {
    
    player1.textContent = this.player1.value;
   
 
   
  }
  



function buildInitialState1P() {

    const displayMessage = document.querySelector("#displaymessage");
    const startOver = document.querySelector("#startOver");
    const items = document.querySelectorAll(".item");
    const gameArray = Array.from(items);

    let gamePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentPlayer = "playerX";

       
//listeners
 //loop over each item and add event listener for click
//render state
   
    items.forEach(function(item) {
      item.addEventListener("click", function (e) {
        { const index = gameArray.indexOf(e.target);
    
        if (items[index].classList.contains("playerX") ||
          items[index].classList.contains("computer")) {
          return;
        }

// update state
// update item to equal current player
  
        items[index].classList.add("playerX");
        items[index].textContent = "X";

        //splice move from the possible remaining game position itmems

        const gamePositionRemoved = gamePositions.indexOf(index + 1);
        gamePositions.splice(gamePositionRemoved, 1);
     
        //check if player X is a winner using the winningPlayFunction function 
        if (winningPlayFunction("playerX", items)) {
            displayMessage.innerHTML = playerX.name + " wins!";
           return;
        }
        
        //if no possible game positions are available, game is a draw
        if (gamePositions.length === 0) {
            displayMessage.innerHTML = "Game is a draw!";
           return;
        }
 
        //generate random number for index for computer move
        const random = Math.floor(Math.random() * gamePositions.length);
        const computerIndex = gamePositions[random];
        items[computerIndex - 1].classList.add("computer");
        items[computerIndex - 1].textContent = "O";
  
        //splice computer move from the possible remaining game position itmems
        gamePositions.splice(random, 1);
  
        // check if the computer is a winner using the winningPlayFunction function 
        if (winningPlayFunction("computer", items)) {
            displayMessage.innerHTML = "The Computer wins!";
 
          return;
        }
     } })

      });
  
     startOver.addEventListener("click", playAgain);


  }

//Clear items, and clear name display 
//Player must still click Start Game to restart game after clearing board
 

  function playAgain(){

    const items = document.querySelectorAll(".item");

    for(let i=0;i<items.length;i++)
    {
        
    items[i].innerHTML='';

       

    }
    
  items.forEach(function(item) { item.textContent = ""})
  player1.textContent = "";
     
  currentPlayer = "X";

  buildInitialState1P;

 location.reload();



  }


//check for winner 

 
  function winningPlayFunction(player, items) {
 

    // check if the current player is in any three possible game positions
    function winningPlay(itemA, itemB, itemC) {
    
      if (
        items[itemA].classList.contains(player) &
        items[itemB].classList.contains(player) &
        items[itemC].classList.contains(player)
      ) {
        return true;
      } else {
        return false;
      }
    }
  //if the current player is in any 3 possible game positions, check to see if the 3 game possitions matches any of the possible winning combinations
    if (winningPlay(0, 3, 6)) return true;
    else if (winningPlay(1, 4, 7)) return true;
    else if (winningPlay(2, 5, 8)) return true;
    else if (winningPlay(0, 1, 2)) return true;
    else if (winningPlay(3, 4, 5)) return true;
    else if (winningPlay(6, 7, 8)) return true;
    else if (winningPlay(0, 4, 8)) return true;
    else if (winningPlay(2, 4, 6)) return true;
  }
  
 
  