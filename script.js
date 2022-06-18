'use strict';

// select different id selectors for two candidates
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// select different selectors for diverse functionalities of the panel
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// create the global variables for this program
let scores, playing, currentScore, activePlayer;

// an arrow function for initizing all the conditions of this program
const init = () => {
  scores = [0, 0]; // an array to store the scores of the two candidates
  playing = true; // a condition to indicate whether the game is continuing or not
  currentScore = 0; // a variable to record the score the current player
  activePlayer = 0; // a variable to switch different candidates

  // set two candiates' initializing conditions with starting value (0)
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //pre-set the conidtions& classes of two candidates
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
};

// an arrow function for switching a player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// start the initializations of all the conditions
init();

// roll the dice functionality
btnRoll.addEventListener('click', () => {
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNum}.png`;

  if (diceNum !== 1) {
    currentScore += diceNum;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// click the hold button functionality
btnHold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player-winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player-active');
  } else {
    switchPlayer();
  }
});

// reload the game to re-initialize all the conditions
btnNew.addEventListener('click', init());
