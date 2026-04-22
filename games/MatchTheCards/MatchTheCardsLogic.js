import { updateScore, getScores, getCookie } from '../../globalFiles/externalLogic.js';

const userID = getCookie('userID');
const username = getCookie('username') || 'Player';
const gameName = 'matchcards';

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

let cardValues;
let firstCard;
let secondCard;
let lockBoard;
let matchesFound;
let movesCount;
let localScore;
let scoreThisGame;

async function setBoard() {
  if (userID) {
    let scores = await getScores(userID);
    document.getElementById('score').innerHTML = "SCORE: " + scores[gameName];
  } else document.getElementById('score').innerHTML = "SCORE: " + localScore;

  cardValues = [...images, ...images];
  cardValues.sort(() => Math.random() - 0.5);

  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchesFound = 0;
  movesCount = 0;
  localScore = 0;
  scoreThisGame = 0;

  cards.forEach((card, i) => {
    card.dataset.value = cardValues[i];
    card.classList.remove('flipped', 'matched'); 
    card.style.opacity = "1";
    card.style.backgroundImage = 'url("./icons/back.png")';
  });

} setBoard();

cards.forEach((card, i) => {
  card.addEventListener('click', () => {
    if (lockBoard || card === firstCard || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    setTimeout(() => {
      card.style.backgroundImage = `url('${card.dataset.value}')`;
    }, 500)

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

  movesCount++;

  if (matchesFound === 8) {
    scoreThisGame = Math.floor(80 / movesCount) * 30;
    if (movesCount > 20) {
      scoreThisGame -= (movesCount - 20) * 10;
    }

    localScore += scoreThisGame;
    updateScore(userID, gameName, scoreThisGame);

    setTimeout(setBoard, 2000);
  }
}

function disableCards() {
  setTimeout(() => {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    firstCard.style.opacity = "0";
    secondCard.style.opacity = "0";
    resetCards();
  }, 800);
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.style.backgroundImage = 'url("./icons/back.png")';
    secondCard.style.backgroundImage = 'url("./icons/back.png")';
    resetCards();
  }, 1000);
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}