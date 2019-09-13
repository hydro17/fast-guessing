"use strict";
// export { }
const instrHeader = document.getElementById('instructions-header');
const wordToType = document.getElementById('word-to-type');
const gameOverInfo = document.getElementById('game-over');
const timeLeftInfo = document.getElementById('time-left');
const score = document.getElementById('score');
const typedWord = document.getElementById('typed-word');
const words = [
    { word: 'home', time: 4 },
    { word: 'forest', time: 5 },
    { word: 'stone', time: 4 },
    { word: 'neighbour', time: 7 },
    { word: 'watch', time: 4 },
    { word: 'cinema', time: 4 },
    { word: 'mountain', time: 5.5 }
];
gameOverInfo.classList.add("hidden");
let playerScore = 0;
let wordToGuess;
let timeLeft;
guessANewWord();
function guessANewWord() {
    drawANewWord();
    guessAWord();
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
function guessAWord() {
    wait(100)
        .then(() => {
        if (isWordGuessed()) {
            scorePlayer();
            guessANewWord();
        }
        else {
            decreaseTimeLeft();
            if (isTimeOver())
                gameOver();
            else
                guessAWord();
        }
    });
}
;
function scorePlayer() {
    playerScore++;
    score.innerHTML = `Score: ${playerScore}`;
}
function decreaseTimeLeft() {
    timeLeft -= 0.1;
    if (timeLeft <= 0)
        timeLeft = 0;
    timeLeftInfo.innerHTML = `Time left: ${timeLeft.toFixed(1)} s`;
}
function isTimeOver() {
    if (timeLeft === 0)
        return true;
}
function gameOver() {
    gameOverInfo.classList.remove("hidden");
    guessingAWordToStartANewGame();
}
async function guessingAWordToStartANewGame() {
    await wait(100);
    if (isWordGuessed()) {
        gameOverInfo.classList.add("hidden");
        playerScore = 0;
        scorePlayer();
        guessANewWord();
    }
    else {
        guessingAWordToStartANewGame();
    }
}
;
function wait(ms) {
    return new Promise((resolved) => setTimeout(resolved, ms));
}
function isWordGuessed() {
    return typedWord.value.toLocaleLowerCase() === wordToGuess.word;
}
