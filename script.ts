// export { }

const instrHeader = document.getElementById('instructions-header');
const wordToType = document.getElementById('word-to-type');
const gameOverInfo = document.getElementById('game-over');
const timeLeft = document.getElementById('time-left');
const score = document.getElementById('score');
const typedWord = document.getElementById('typed-word');

// enum GuessingResult { 'pending', 'guessed', 'time-out' };

const words = [
  { word: 'home', time: 3 },
  { word: 'forest', time: 5 },
  { word: 'stone', time: 3 },
  { word: 'neighbour', time: 5 },
  { word: 'watch', time: 3 }
];

gameOverInfo.classList.add("hidden");

let playerLost = false;
let playerScore = 0;

let wordToGuess: { word: string, time: number };
let guessingResult: string;
let isGuessed = false;

guessAWord()

function guessAWord() {
  wordToGuess = drawNewWord();
  guessingAWord(wordToGuess);
}

function drawNewWord() {
  const wordDrawnNo = Math.floor(Math.random() * words.length);
  const wordToGuess = words[wordDrawnNo];

  instrHeader.innerHTML = `Type the given word in ${wordToGuess.time} seconds`;
  wordToType.innerHTML = wordToGuess.word;
  timeLeft.innerHTML = `Time left: ${wordToGuess.time} s`;
  score.innerHTML = `Score: ${playerScore}`;

  return wordToGuess;
}

function guessingAWord(wordToGuess) {

  setTimeout(() => {
    isGuessed = Math.random() > .1;
    if (isGuessed) {
      playerScored();
      guessAWord();
    } else gameOver();
  }, 1000);
};

function playerScored() {
  playerScore++;
  score.innerHTML = `Score: ${playerScore}`;
}

function gameOver() {
  gameOverInfo.classList.remove("hidden");
  // playerLost = true;
}

