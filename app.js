/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Additional: 
- A player looses his entire score when he rolls two 6 in a row. Then it is next player turn.
*/


// initialize the game
var scores, roundScore, activePlayer, gamePlaying, previousThrow, winningScore
document.getElementById('modal-rules').style.display = 'none';
document.querySelector('.btn-rules').addEventListener('click', toggleModal);
document.querySelector('.btn-new').addEventListener('click', startGame);
startGame()

function startGame() {
  scores = [0, 0]
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousThrow = 0;
  winningScore = undefined

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.winning-score').disabled = false; 
  document.querySelector('.winning-score').value = ""; 
  document.querySelector('.winning-score').placeholder = "SET FINAL SCORE"; 
  document.querySelector('.btn-roll').addEventListener('click', rollDice);
  document.querySelector('.btn-hold').addEventListener('click', hold);

  document.querySelector('#name-0').textContent = "Julius Caesar";
  document.querySelector('#name-1').textContent = "Pompey Magnus";
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('round-0').textContent = 0;
  document.getElementById('round-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  console.log(winningScore)
  
  /* set default winning score
  if (winningScore = ' ') {
    winningScore = 100
  } */
}

function rollDice()
{
  if(gamePlaying)
  {

    // set the winning score
    if (!winningScore) {
      winningScore = document.querySelector('.winning-score').value
      if (winningScore === "") {
        winningScore = 100
        document.querySelector('.winning-score').value = 100;
      }
      document.querySelector('.winning-score').disabled = true;
    }


    // choose random number
    var diceRandom = Math.floor(Math.random() * 6) + 1
    
    
    // display the result
    var dice = document.querySelector('.dice')
    dice.style.display = 'block';
    dice.src = 'dice-' + diceRandom + '.png';
  
    
    // check if previous and current throw are 6
    if(previousThrow === 6 && diceRandom === 6) 
    {
      console.log(scores[activePlayer])
      scores[activePlayer] = 0
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      previousThrow = 0
      
      setTimeout(() => {
        switchPlayer()
      }, 200);
    }
    else
    {
      // update round score if > 1
      if (diceRandom !== 1) 
      { 
        roundScore += diceRandom
        document.querySelector('#round-' + activePlayer).textContent = roundScore
      } 
      else 
      {
          setTimeout(() => {
            switchPlayer()
          }, 200);  
      }
    }
    previousThrow = diceRandom
  }
}


function switchPlayer()
{
  // update round score 
  roundScore = 0;
  document.querySelector('#round-' + activePlayer).textContent = 0
  document.querySelector('.dice').style.display = 'none';
 
  // if aP is 0 THEN ap changes to 1. ELSE aP = 0
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //toggle active player red dot
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
}

function hold() 
{
  if(gamePlaying)
  {

    // add round score to global score
    scores[activePlayer] += roundScore;
    previousThrow = 0 // cleans the var [BUG: PL1 throws 6 and hold, PL2 throws 6 at first throw, he loses his score unfairly ]
    
    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // check if the player won the game 
    if (scores[activePlayer] >= winningScore) 
    {
      document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false
    }
    else 
    {
      switchPlayer();
    }
  }
}


function toggleModal() {
  var modal = document.getElementById('modal-rules')

  if(modal.style.display === 'none') 
  {
    modal.style.display = 'block'
  }
  else 
  {
    modal.style.display = 'none'
  }
}
