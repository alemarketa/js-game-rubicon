/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// initialize the game
var scores, roundScore, activePlayer, gamePlaying
document.getElementById('modal-rules').style.display = 'none';
document.querySelector('.btn-rules').addEventListener('click', toggleModal);
startGame()
document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame() {
  scores = [0, 0]
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
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
  
}

function rollDice()
{
  if(gamePlaying)
  {
    // choose random number
    var diceRandom = Math.floor(Math.random() * 6) + 1
    
    // display the result
    var dice = document.querySelector('.dice')
    dice.style.display = 'block';
    dice.src = 'dice-' + diceRandom + '.png';
  
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
    
    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // check if the player won the game 
    if (scores[activePlayer] >= 100) 
    {
      document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false
    }
    else {
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
