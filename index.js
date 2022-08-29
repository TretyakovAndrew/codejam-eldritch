import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
// import {brownCards, blueCards, greenCards} from './data/mythicCards/index.js';
import { getCards, shuffle } from './helper.js';


let currentIndex;
let difficultyIndex;
const ancientContainer = document.querySelector('.ancients-container');
const dificultyContainer = document.querySelector('.difficulty-container');
const deckContainer = document.querySelector('.deck-container');
const stages = document.querySelector('.stages');



ancientsData.forEach((ancient, ancientIndex) => {
    let ancientCard = document.createElement('div');
    let ancientBgLink = `URL('./assets/Ancients/${ancient.cardFace}.png')`;

    ancientCard.classList.add('ancient-card');
    ancientCard.style.backgroundImage = ancientBgLink;
    ancientContainer.append(ancientCard);
    ancientCard.addEventListener('click', () => {
        onAncintClick(ancientIndex);
    })
});

function onAncintClick(index) {
    const ancientsList = document.querySelectorAll('.ancient-card');

    for (let encient of ancientsList) {
        encient.classList.remove('active');
    }
    ancientsList[index].classList.add('active');
    currentIndex = index; /////////////////////////////////////////переделать
    if (!dificultyContainer.firstChild) {
        addDifficulty();
    }
}

function addDifficulty() {
    difficulties.forEach((difficulty, diffIndex) => {
        let diffItem = document.createElement('div');
        diffItem.textContent = difficulty.name;
        diffItem.className = 'difficulty';
        dificultyContainer.append(diffItem);
        diffItem.addEventListener('click', () => {
            setDifficulty(diffItem, diffIndex);
        })
    });
}

function setDifficulty(diffItem, diffIndex) {
    let difficultyList = document.querySelectorAll('.difficulty');
    difficultyIndex = diffIndex;
    difficultyList.forEach(dif => {
        dif.classList.remove('active');
    });
    diffItem.classList.add('active');
    if (!deckContainer.firstChild) {
        addShuffle();
    }
}

function addShuffle() {
    const shuffleButton = document.createElement('div');
    let deckHolder = document.createElement('div');

    shuffleButton.classList.add('shuffle-btn');
    shuffleButton.textContent = 'Замешать колоду';
    deckContainer.append(shuffleButton);
    shuffleButton.addEventListener('click', () => {
        if (!deckHolder.firstChild) {
            addDeck(deckHolder);
        }
        stages.classList.add('active');
        generateDeck();
    })
}

function addDeck(deckHolder) {
    let deckCardBackground = document.createElement('div');
    let cardPlace = document.createElement('div');

    deckHolder.classList.add('deck-holder');
    deckCardBackground.classList.add('card-bg');
    cardPlace.classList.add('card-transparent-bg');
    deckHolder.append(deckCardBackground);
    deckHolder.append(cardPlace);
    deckContainer.append(deckHolder);
}


function generateDeck() {
    let resultArray = [];
    const levels = ['firstStage', 'secondStage', 'thirdStage'];
    const cardsColors = ['greenCards', 'brownCards', 'blueCards'];
    const coloredCardsNum = [0, 0, 0]; //green, brown, blue
    const eachStageCards = {
        firstStage: [],
        secondStage: [],
        thirdStage: [],
    }
    console.log(resultArray);
    //ЗАПОЛНЯЮ НЕОБХОДИМОЕ КОЛИЧЕСТВО ДЛЯ КАЖДОГО ЦВЕТА
    for (let i = 0; i < cardsColors.length; i++) {
        for (let j = 0; j < levels.length; j++) {
            coloredCardsNum[i] += ancientsData[currentIndex][levels[j]][cardsColors[i]];
        }
    }

    //ЗАПОЛНЯЮ КОЛИЧЕСТВОМ КАРТ ДЛЯ КАЖДОГО STAGE
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            eachStageCards[levels[i]].push(ancientsData[currentIndex][levels[i]][cardsColors[j]]);
        }
    }
    

    //Вызываю функцию, формирующую колоды карт для каждого stage
    resultArray = getCards(coloredCardsNum, difficulties[difficultyIndex].id, cardsColors, eachStageCards);
    console.log(resultArray);
    let deckBg = document.querySelector('.card-bg');
    let cardTransparentBg = document.querySelector('.card-transparent-bg');
    deckBg.addEventListener('click', () => {
        if (resultArray[0].length > 0) {
            let currentCard = resultArray[0].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;
            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
        } else if (resultArray[1].length > 0) {
            let currentCard = resultArray[1].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;
            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
        } else if (resultArray[2].length > 0) {
            let currentCard = resultArray[2].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;
            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
        }
    })
}