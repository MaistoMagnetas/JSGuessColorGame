const easyBtn = document.getElementById('easy-btn');
const hardBtn = document.getElementById('hard-btn');
const newGameBtn = document.getElementById('retry-btn');

const colorField = document.getElementById('color-field');

class RandomColor {
    constructor() {
      this.randRed = this.getRandomInRange();
      this.randGreen = this.getRandomInRange();
      this.randBlue = this.getRandomInRange();
      this.color = 'rgb(' + this.randRed + ', ' + this.randGreen + ', ' + this.randBlue + ')';
    } 

    getRandomInRange(){
        return Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    }
}

let randomColor = initializeColorGame(3);

function initializeColorGame(colorCount){
    let randomColor = getRandomColor();
    printRandomColor(randomColor);
    initializeColorsList(colorCount);
    setColorGuesses(randomColor.color, colorCount);
    document.querySelectorAll('.square').forEach((squareBtn) => {
        squareBtn.innerText = '';
        squareBtn.addEventListener('click', () => {
            if (squareBtn.style.backgroundColor === randomColor.color){
                alert('You win');
                const mode = easyBtn.classList.contains('active') ? 3 : 6;
                randomColor = initializeColorGame(mode);
            }
            else{
                squareBtn.innerText = squareBtn.style.backgroundColor;
                squareBtn.classList.add('disabled');
            }
        });
    });
    return randomColor;
}

function printRandomColor(randomColor){
    colorField.innerText = 'rgb(' + randomColor.randRed + ', ' + 
    randomColor.randGreen + ', ' + randomColor.randBlue + ')';
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function setColorGuesses(correctColor, guesCount){
    let colors = [];
    for(i = 0; i < guesCount - 1; i++){
        colors.push(getRandomColor().color);
    }
    colors.push(correctColor);
    shuffleArray(colors);

    let index = 0;
    document.querySelectorAll('.square').forEach((squareBtn) => {
        squareBtn.style.backgroundColor = colors[index];
        index++;
    });
}

function getRandomColor(){
    return new RandomColor();
}

function initializeColorsList(colorGuessCount){
    const colorsList = document.getElementById('colors-list');
    colorsList.innerHTML = '';
    for (i = 0; i < colorGuessCount; i++)
    {
        const colorGuess = document.createElement('li');
        const button = document.createElement('button');
        button.classList.add('square');
        colorGuess.appendChild(button)
        colorsList.appendChild(colorGuess);
    }
}

newGameBtn.addEventListener('click', () => {
    const mode = easyBtn.classList.contains('active') ? 3 : 6;
    randomColor = initializeColorGame(mode);
});

easyBtn.addEventListener('click', () => {
    if (!easyBtn.classList.contains('active'))
    {
        easyBtn.classList.add('active');
        hardBtn.classList.remove('active');
        randomColor = initializeColorGame(3);
    }
});

hardBtn.addEventListener('click', () => {
    if (!hardBtn.classList.contains('active'))
    {
        hardBtn.classList.add('active');
        easyBtn.classList.remove('active');
        randomColor = initializeColorGame(6);
    }
});