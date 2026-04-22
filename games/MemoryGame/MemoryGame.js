var boxs = [...document.querySelectorAll(".box")];
var cont = document.getElementById("container");

var comps = [];
var yrChoice = [];

function flash(index , color) {
    boxs[index].style.backgroundColor = color;
    setTimeout(() => {
        boxs[index].style.backgroundColor = "#96B1C5";
    }, 500);
}

function makePattern(sequence) {
    sequence.forEach((boxIndex, order) => {
        setTimeout(() => {
            flash(boxIndex ,"white");
        }, order * 800);
    });
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
        flash(index ,"#77DD77");
        yrChoice.push(index);

        checkit();
    });
});

function checkit() {
    let current = yrChoice.length - 1;

    if (yrChoice[current] !== comps[current]) {
        boxs.forEach((_, index) => flash(index, "#ff6961"));
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

startGame();

