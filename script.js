// export { }
var instrHeader = document.getElementById('instructions-header');
var wordToType = document.getElementById('word-to-type');
var gameOverInfo = document.getElementById('game-over');
var timeLeftInfo = document.getElementById('time-left');
var score = document.getElementById('score');
var typedWord = document.getElementById('typed-word');
var words = [
    { word: 'home', time: 4 },
    { word: 'forest', time: 5 },
    { word: 'stone', time: 4 },
    { word: 'neighbour', time: 7 },
    { word: 'watch', time: 4 }
];
gameOverInfo.classList.add("hidden");
var playerLost = false;
var playerScore = 0;
var wordToGuess;
var guessingResult;
var isGuessed = false;
var timeLeft;
var timer;
guessANewWord();
function guessANewWord() {
    drawANewWord();
    guessingAWord();
}
function drawANewWord() {
    var wordDrawnNo = Math.floor(Math.random() * words.length);
    wordToGuess = words[wordDrawnNo];
    timeLeft = wordToGuess.time;
    instrHeader.innerHTML = "Type the given word in " + wordToGuess.time + " seconds";
    wordToType.innerHTML = wordToGuess.word;
    timeLeftInfo.innerHTML = "Time left: " + wordToGuess.time + " s";
    score.innerHTML = "Score: " + playerScore;
    typedWord.value = '';
}
function guessingAWord() {
    isWordGuessed()
        .then(function () {
        scorePlayer();
        guessANewWord();
    })["catch"](function () {
        decreaseTimeLeft();
        if (isTimeOver())
            gameOver();
        else
            guessingAWord();
    });
}
;
function scorePlayer() {
    playerScore++;
    score.innerHTML = "Score: " + playerScore;
}
function decreaseTimeLeft() {
    timeLeft -= 0.1;
    if (timeLeft <= 0)
        timeLeft = 0;
    timeLeftInfo.innerHTML = "Time left: " + timeLeft.toFixed(1) + " s";
}
function isTimeOver() {
    if (timeLeft === 0)
        return true;
}
function gameOver() {
    gameOverInfo.classList.remove("hidden");
    clearInterval(timer);
    timeLeft = 3600; //1 h to exit the game 
    guessingAWordToStartANewGame();
}
function guessingAWordToStartANewGame() {
    timer = setInterval(checkTheWordToStartANewGame, 100);
}
;
function checkTheWordToStartANewGame() {
    if (typedWord.value === wordToGuess.word) {
        clearInterval(timer);
        gameOverInfo.classList.add("hidden");
        playerScore = 0;
        scorePlayer();
        guessANewWord();
    }
    timeLeft -= 0.1;
    if (timeLeft <= 0)
        timeLeft = 0;
}
function isWordGuessed() {
    return new Promise(function (resolved, rejected) {
        setTimeout(function () {
            if (typedWord.value === wordToGuess.word)
                resolved();
            else
                rejected();
        }, 100);
    });
}
