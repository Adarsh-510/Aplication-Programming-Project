const cards = document.querySelectorAll('.card');

const images = [
    './icons/green vivillon.png',
    './icons/grey vivillon.png',
    './icons/red vivillon.webp',
    './icons/blue vivillon.webp',
    './icons/pokeball vivillon.webp',
    './icons/yellow vivillon.png',
    './icons/nightsky vivillon.png',
    './icons/pink viv.png'
];

let cardValues = [...images, ...images];
cardValues.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
let no_moves = 0;

cards.forEach((card, i) => {
    card.dataset.value = cardValues[i];

    card.addEventListener('click', () => {
        if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

        card.classList.add('flipped');
        setTimeout(() => {
            card.style.backgroundImage = `url('${card.dataset.value}')`;
        },500)
        
        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        lockBoard = true;
        checkForMatch();
    });
});

function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
        matchesFound++;
    } else {
        unflipCards();
    }

    no_moves++;

    if (matchesFound === 8) {
        let score = Math.floor(80 / no_moves) * 30;
        if (no_moves > 20) {
            score -= (no_moves - 20) * 10;
        }
        var scr = document.getElementById("score");
        scr.innerHTML = "SCORE : " + score;
        console.log("Score:", score);
    }
}

function disableCards() {
    setTimeout(() => {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.style.opacity = "0";
        secondCard.style.opacity = "0";
        resetBoard();
    }, 800);
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.style.backgroundImage = 'url("./icons/back.png")';
        secondCard.style.backgroundImage = 'url("./icons/back.png")';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

document.getElementById('reset').addEventListener('click', () => {
    location.reload();
});