const ancientCards = document.querySelectorAll('.ancient-card');
const dificulty = document.querySelector('.difficulty-container');
const dificultyList = ['Очень легкий', 'Легкий', 'Средний', 'Высокий', 'Очень высокий'];

ancientCards.forEach((ancient, index) => {
    ancient.addEventListener('click', () => {
        setAncient(ancient);
    })
});

function setAncient(ancient) {
    //убираем active со всех и присваем
    for (el of ancientCards) {
        el.classList.remove('active');
    }
    ancient.classList.add('active');

    dificulty.innerHTML = ""; //очищаем список dificulty
    //запоолняем заново
    for (let i = 0; i < dificultyList.length; i++) {
        let diff = document.createElement('div');
        diff.textContent = dificultyList[i];
        diff.className = 'difficulty';
        dificulty.append(diff);
    }
    chooseDificulty();
}

function chooseDificulty() {
    const dificulties = document.querySelectorAll('.difficulty');
    dificulties.forEach((dif, index) => {
        dif.addEventListener('click', () => {
            setDificulty(dificulties, index);
        });
    });
}

function setDificulty(dificulties, index) {
    for (elem of dificulties) {
        elem.classList.remove('active');
    }
    dificulties[index].classList.add('active');
    console.log(index);
}