import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import cardsGreen from './data/mythicCards/green/index.js';
import cardsBrown from './data/mythicCards/brown/index.js';
import cardsBlue from './data/mythicCards/blue/index.js';

const cardsObjects = [cardsGreen, cardsBrown, cardsBlue];

export function getCards(coloredCardsNum, difficulty, cardsColors, eachStageCards) {
    const commonDeck = {};
    const allStagesDeck = [];
    const result = [];
    console.log(difficulty);

    switch (difficulty) {
        case "very_easy":
            cardsColors.forEach((color, index) => {
                let currentCardsArray = cardsObjects[index].slice(0);
                let easyCards = currentCardsArray.filter(card => card.difficulty === 'easy');

                shuffle(easyCards);
                commonDeck[color] = easyCards.slice(0, coloredCardsNum[index]);

                if (easyCards.length < coloredCardsNum[index]) {
                    let normalCards = currentCardsArray.filter(card => card.difficulty === 'normal');

                    shuffle(normalCards);
                    commonDeck[color] = commonDeck[color].concat(normalCards);
                    commonDeck[color] = commonDeck[color].slice(0, coloredCardsNum[index]);
                }
                shuffle(commonDeck[color]);
                allStagesDeck.push(commonDeck[color]);
            });
            break;
        case "easy":
            cardsColors.forEach((color, index) => {
                let currentCardsArray = cardsObjects[index].slice(0);

                currentCardsArray = currentCardsArray.filter(card => card.difficulty !== 'hard');
                shuffle(currentCardsArray);
                commonDeck[color] = currentCardsArray.slice(0, coloredCardsNum[index]);
                allStagesDeck.push(commonDeck[color]);
            });
            break;
        case "normal":
            cardsColors.forEach((color, index) => {
                let currentCardsArray = cardsObjects[index].slice(0);

                shuffle(currentCardsArray);
                commonDeck[color] = currentCardsArray.slice(0, coloredCardsNum[index]);
                allStagesDeck.push(commonDeck[color]);
            });
            break;
        case "hard":
            cardsColors.forEach((color, index) => {
                let currentCardsArray = cardsObjects[index].slice(0);

                currentCardsArray = currentCardsArray.filter(card => card.difficulty !== 'easy');
                shuffle(currentCardsArray);
                commonDeck[color] = currentCardsArray.slice(0, coloredCardsNum[index]);
                allStagesDeck.push(commonDeck[color]);
            });
            break;
        case "very_hard":
            cardsColors.forEach((color, index) => {
                let currentCardsArray = cardsObjects[index].slice(0);
                let hardCards = currentCardsArray.filter(card => card.difficulty === 'hard');

                shuffle(hardCards);
                commonDeck[color] = hardCards.slice(0, coloredCardsNum[index]);

                if (hardCards.length < coloredCardsNum[index]) {
                    let normalCards = currentCardsArray.filter(card => card.difficulty === 'normal');

                    shuffle(normalCards);
                    commonDeck[color] = commonDeck[color].concat(normalCards);
                    commonDeck[color] = commonDeck[color].slice(0, coloredCardsNum[index]);
                }
                shuffle(commonDeck[color]);
                allStagesDeck.push(commonDeck[color]);
            });
            break;
        default:
            console.log('Что-то пошло не так');
    }

    //СОЗДАЮ РЕЗУЛЬТИРУЮЩИЙ МАССИВ ДЛЯ КАЖДОГО ЭТАПА И СКЛАДЫВАЮ ИХ В МАССИВ
    for (let stage in eachStageCards) {
        let i = 0;
        let intermidiateArray = [];

        for (let num of eachStageCards[stage]) {
            if (num !== 0) intermidiateArray.push(...allStagesDeck[i].splice(0, num));
            i++;
        }
        result.push(shuffle(intermidiateArray));
    }

    return result;
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

