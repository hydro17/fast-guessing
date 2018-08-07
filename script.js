// export { }
var instrHeader = document.getElementById('instructions-header');
var wordToType = document.getElementById('word-to-type');
var gameOverInfo = document.getElementById('game-over');
var timeLeft = document.getElementById('time-left');
var score = document.getElementById('score');
var typedWord = document.getElementById('typed-word');
// enum GuessingResult { 'pending', 'guessed', 'time-out' };
var words = [
    { word: 'home', time: 3 },
    { word: 'forest', time: 5 },
    { word: 'stone', time: 3 },
    { word: 'neighbour', time: 5 },
    { word: 'watch', time: 3 }
];
gameOverInfo.classList.add("hidden");
var playerLost = false;
var playerScore = 0;
var wordToGuess;
var guessingResult;
var isGuessed = false;
guessAWord();
function guessAWord() {
    wordToGuess = drawNewWord();
    guessingAWord(wordToGuess);
}
function drawNewWord() {
    var wordDrawnNo = Math.floor(Math.random() * words.length);
    var wordToGuess = words[wordDrawnNo];
    instrHeader.innerHTML = "Type the given word in " + wordToGuess.time + " seconds";
    wordToType.innerHTML = wordToGuess.word;
    timeLeft.innerHTML = "Time left: " + wordToGuess.time + " s";
    score.innerHTML = "Score: " + playerScore;
    return wordToGuess;
}
function guessingAWord(wordToGuess) {
    setTimeout(function () {
        isGuessed = Math.random() > .1;
        if (isGuessed) {
            playerScored();
            guessAWord();
        }
        else
            gameOver();
    }, 1000);
}
;
function playerScored() {
    playerScore++;
    score.innerHTML = "Score: " + playerScore;
}
function gameOver() {
    gameOverInfo.classList.remove("hidden");
    // playerLost = true;
}
