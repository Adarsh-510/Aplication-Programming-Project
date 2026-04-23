var boxs = [...document.querySelectorAll(".box")];
var cont = document.getElementById("container");

var comps = [];
var yrChoice = [];

var lockBoard = true;

function flash(index , color) {
    boxs[index].style.backgroundColor = color;
    setTimeout(() => {
        boxs[index].style.backgroundColor = "#96B1C5";
    }, 300);
}

function makePattern(sequence) {
    lockBoard = true;
    sequence.forEach((boxIndex, order) => {
        setTimeout(() => {
            flash(boxIndex ,"white");
        }, order * 800);
    });
        setTimeout(() => {
        lockBoard = false;
    }, sequence.length * 800);
}

function addRandomStep() {
    comps.push(Math.floor(Math.random() * boxs.length));
    makePattern(comps);
}

function startGame() {
    comps = [];
    nextRound();
}

function nextRound() {
    yrChoice = [];
    addRandomStep();
}

boxs.forEach((box, index) => {
    box.addEventListener("click", () => {
        if(lockBoard) return;
        flash(index ,"#77DD77");
        yrChoice.push(index);

        checkit(index);
    });
});

function checkit(index) {
    let current = yrChoice.length - 1;

    if (yrChoice[current] !== comps[current]) {
        flash(index ,"#ff6961");
        setTimeout(() =>{
            boxs.forEach((_, index) => flash(index, "#ff6961"));
        },500);
        var turns = comps.length - 1;
        var score = turns*10 + (Math.floor(turns/5))*15;
        var scr = document.getElementById("score");
        scr.innerHTML = "SCORE : " + score;
        lockBoard = true;
        return false;
    }
    if (yrChoice.length < comps.length) {
        return true;
    }
    boxs.forEach((_, index) => flash(index, "#77dd77"));
    setTimeout(() => {
        nextRound();
    }, 1000);

    return true;
}

setTimeout(startGame, 2000);