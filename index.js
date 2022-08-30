import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import { getCards, shuffle } from './helper.js';

let currentIndex;
let difficultyIndex;
const ancientContainer = document.querySelector('.ancients-container');
const dificultyContainer = document.querySelector('.difficulty-container');
const deckContainer = document.querySelector('.deck-container');
// const stages = document.querySelector('.stages');



ancientsData.forEach((ancient, ancientIndex) => {
    let ancientCard = document.createElement('div');
    let ancientBgLink = `URL('/assets/Ancients/${ancient.cardFace}.png')`;

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
    currentIndex = index;
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
        // stages.classList.add('active');
        generateDeck();
        let cardPlace = document.querySelector('.card-transparent-bg');
        cardPlace.style.backgroundImage = 'none';
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
    };
    let deckBg = document.querySelector('.card-bg');
    let tracker = document.querySelector('.stages');
    let fisrstTrackerItems = document.querySelectorAll('.first-item');
    let secondTrackerItems = document.querySelectorAll('.second-item');
    let thirdTrackerItems = document.querySelectorAll('.third-item');
    
    //убираю eventlistener и карту при новом замешивании
    deckBg.removeEventListener('click', takeCard);


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
    for (let i = 0; i < 3; i++) {
        console.log(`${i+1} Этап:`)
        for (let card of resultArray[i]) {
            console.log(card);
        }
    }
    console.log(' ');
    console.log('Выдача карт каждого этапа');
    console.log(' ');

    tracker.classList.add('active');

    countStageColors(resultArray);
    function countStageColors (resultArray) {
        for (let i = 0; i < resultArray.length; i++) {
            let stageColorsCounter = [0, 0, 0]; //green, brown, blue

            for (let j = 0; j < resultArray[i].length; j++) {
                if (resultArray[i][j].color === 'green') {
                    stageColorsCounter[0]++;
                } else if (resultArray[i][j].color === 'brown') {
                    stageColorsCounter[1]++;
                } else {
                    stageColorsCounter[2]++;
                }
            }
            setStageCounter(i, stageColorsCounter);
        }
    }

    function setStageCounter(stage, counter) {
        if (stage === 0) {
            for (let i = 0; i < 3; i++) {
                fisrstTrackerItems[i].textContent = counter[i];
            }
        } else if (stage === 1) {
            for (let i = 0; i < 3; i++) {
                secondTrackerItems[i].textContent = counter[i];
            }
        } else {
            for (let i = 0; i < 3; i++) {
                thirdTrackerItems[i].textContent = counter[i];
            }
        }
    }

    let cardTransparentBg = document.querySelector('.card-transparent-bg');

    function takeCard() {
        if (resultArray[0].length > 0) {
            console.log(`карта первого этапа`);
            let currentCard = resultArray[0].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;

            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
            countStageColors (resultArray);
        } else if (resultArray[1].length > 0) {
            console.log(`карта второго этапа`);
            let currentCard = resultArray[1].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;

            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
            countStageColors (resultArray);
        } else if (resultArray[2].length > 0) {
            console.log(`карта третьего этапа`);
            let currentCard = resultArray[2].pop();
            let currentBgLink = `${currentCard['color']}/${currentCard['id']}`;

            cardTransparentBg.style.backgroundImage = `URL('/assets/MythicCards/${currentBgLink}.png')`;
            console.log(currentCard);
            countStageColors (resultArray);
        }
    }

    deckBg.addEventListener('click', takeCard);
}