// export { }
var instrHeader = document.getElementById('instructions-header');
var wordToType = document.getElementById('word-to-type');
var gameOverInfo = document.getElementById('game-over');
var timeLeftInfo = document.getElementById('time-left');
var score = document.getElementById('score');
// document.getElementById('typed-word').value = "ABC1";
var typedWord = document.getElementById('typed-word');
// enum GuessingResult { 'pending', 'guessed', 'time-out' };
var words = [
    { word: 'home', time: 8 },
    { word: 'forest', time: 10 },
    { word: 'stone', time: 8 },
    { word: 'neighbour', time: 10 },
    { word: 'watch', time: 8 }
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
    drawNewWord();
    guessingAWord();
}
function drawNewWord() {
    var wordDrawnNo = Math.floor(Math.random() * words.length);
    wordToGuess = words[wordDrawnNo];
    timeLeft = wordToGuess.time;
    instrHeader.innerHTML = "Type the given word in " + wordToGuess.time + " seconds";
    wordToType.innerHTML = wordToGuess.word;
    timeLeftInfo.innerHTML = "Time left: " + wordToGuess.time + " s";
    score.innerHTML = "Score: " + playerScore;
    typedWord.value = '';
    return wordToGuess;
}
function guessingAWord() {
    timer = setInterval(checkTheGuessedWord, 100);
}
;
function playerScored() {
    playerScore++;
    score.innerHTML = "Score: " + playerScore;
}
function checkTheGuessedWord() {
    // console.log('checkGuessedWord', typedWord.value)
    if (typedWord.value === wordToGuess.word) {
        clearInterval(timer);
        playerScored();
        guessANewWord();
    }
    if (isTimeOver())
        gameOver();
}
function isTimeOver() {
    timeLeft -= 0.1;
    if (timeLeft <= 0)
        timeLeft = 0;
    timeLeftInfo.innerHTML = "Time left: " + timeLeft.toFixed(1) + " s";
    if (timeLeft === 0)
        return true;
}
function gameOver() {
    gameOverInfo.classList.remove("hidden");
    // playerLost = true;
    clearInterval(timer);
    timeLeft = 300; //3 min to exit from the game 
    guessingAWordToStartANewGame();
}
function guessingAWordToStartANewGame() {
    isWordGuessed();
}
;
// function guessingAWordToStartANewGame() {
//   timer = setInterval(
//     checkTheWordToStartANewGame
//     , 100);
// };
function checkTheWordToStartANewGame() {
    if (typedWord.value === wordToGuess.word) {
        clearInterval(timer);
        gameOverInfo.classList.add("hidden");
        playerScore = 0;
        playerScored();
        guessANewWord();
    }
    timeLeft -= 0.1;
    if (timeLeft <= 0)
        timeLeft = 0;
    if (timeLeft <= 0) { } //not implemented};
}
function isWordGuessed() {
    return new Promise(function (resolved, rejected) {
        setTimeout(function () {
            if (typedWord.value === wordToGuess.word)
                resolved();
            rejected();
        }, 100);
    });
}
isWordGuessed()
    .then(function () {
    playerScored();
    guessANewWord();
})["catch"](function () {
    if (isTimeOver())
        gameOver();
    else
        isWordGuessed();
});
