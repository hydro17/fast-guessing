// export { }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var playerScore = 0;
var wordToGuess;
var timeLeft;
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
    wait(100)
        .then(function () {
        if (isWordGuessed()) {
            scorePlayer();
            guessANewWord();
        }
        else {
            decreaseTimeLeft();
            if (isTimeOver())
                gameOver();
            else
                guessingAWord();
        }
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
    guessingAWordToStartANewGame();
}
function guessingAWordToStartANewGame() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wait(100)];
                case 1:
                    _a.sent();
                    if (isWordGuessed()) {
                        gameOverInfo.classList.add("hidden");
                        playerScore = 0;
                        scorePlayer();
                        guessANewWord();
                    }
                    else {
                        guessingAWordToStartANewGame();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
;
function wait(ms) {
    return new Promise(function (resolved) { return setTimeout(resolved, ms); });
}
function isWordGuessed() {
    return typedWord.value === wordToGuess.word;
}
