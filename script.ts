// export { }

const instrHeader = document.getElementById('instructions-header');
const wordToType = document.getElementById('word-to-type');
const gameOverInfo = document.getElementById('game-over');
const timeLeftInfo = document.getElementById('time-left');
const score = document.getElementById('score');
const typedWord = document.getElementById('typed-word') as HTMLInputElement;

const words = [
  { word: 'home', time: 4 },
  { word: 'forest', time: 5 },
  { word: 'stone', time: 4 },
  { word: 'neighbour', time: 7 },
  { word: 'watch', time: 4 }
];

gameOverInfo.classList.add("hidden");

let playerLost = false;
let playerScore = 0;

let wordToGuess: { word: string, time: number };
let guessingResult: string;
let isGuessed = false;
let timeLeft: number;
let timer;

guessANewWord()

function guessANewWord() {
  drawANewWord();
  guessingAWord();
}

function drawANewWord() {
  const wordDrawnNo = Math.floor(Math.random() * words.length);
  wordToGuess = words[wordDrawnNo];
  timeLeft = wordToGuess.time;

  instrHeader.innerHTML = `Type the given word in ${wordToGuess.time} seconds`;
  wordToType.innerHTML = wordToGuess.word;
  timeLeftInfo.innerHTML = `Time left: ${wordToGuess.time} s`;
  score.innerHTML = `Score: ${playerScore}`;

  typedWord.value = '';
}

function guessingAWord() {
  isWordGuessed()
    .then(() => {
      scorePlayer();
      guessANewWord();
    })
    .catch(() => {
      decreaseTimeLeft();
      if (isTimeOver()) gameOver();
      else guessingAWord();
    });
};

function scorePlayer() {
  playerScore++;
  score.innerHTML = `Score: ${playerScore}`;
}

function decreaseTimeLeft() {
  timeLeft -= 0.1;
  if (timeLeft <= 0) timeLeft = 0;
  timeLeftInfo.innerHTML = `Time left: ${timeLeft.toFixed(1)} s`;
}

function isTimeOver() {
  if (timeLeft === 0) return true;
}

function gameOver() {
  gameOverInfo.classList.remove("hidden");
  clearInterval(timer);
  timeLeft = 3600; //1 h to exit the game 
  guessingAWordToStartANewGame()
}

function guessingAWordToStartANewGame() {
  timer = setInterval(
    checkTheWordToStartANewGame
    , 100);
};

function checkTheWordToStartANewGame() {
  if (typedWord.value === wordToGuess.word) {

    clearInterval(timer);
    gameOverInfo.classList.add("hidden");
    playerScore = 0;

    scorePlayer();
    guessANewWord();
  }

  timeLeft -= 0.1;
  if (timeLeft <= 0) timeLeft = 0;
}

function isWordGuessed() {
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (typedWord.value === wordToGuess.word) resolved();
      else rejected();
    }, 100);
  });
}


