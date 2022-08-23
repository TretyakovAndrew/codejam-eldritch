const ancientCards = document.querySelectorAll('.ancient-card');

ancientCards.forEach(ancient => {
    ancient.addEventListener('click', () => {
        console.log('click');
        setAncient(ancient);
    })
});

function setAncient(ancient) {
    for (el of ancientCards) {
        el.classList.remove('active');
    }
    ancient.classList.add('active');
}