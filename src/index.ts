import { wordList, guessList } from "./list";

const board = document.querySelector('#board') as HTMLDivElement;
const keyboardDiv = document.querySelector('#keyboard') as HTMLDivElement;
const answer = document.querySelector('#answer') as HTMLDivElement;

const heightOfGuessBoxes = 6;
const widthOfWord = 5;

let column = 0;
let row = 0;

let gameOver = false;
let words: string = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(words);


let newGuessList = guessList.concat(wordList);

let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⌫", "Z", "X", "C", "V", "B", "N", "M", "Enter"]
]

window.addEventListener('load', (e) => {
    if (answer.innerText == "correct guess") {
        window.location.href = './'
    }
    else {
        initializer();
        createdKeypad();
        findClickedBtn();
    }
})

const initializer = () => {
    let row = 0;
    while (row < heightOfGuessBoxes) {
        let col = 0;
        let rowOfGuss: HTMLDivElement = document.createElement('div');
        while (col < widthOfWord) {
            let tile: HTMLInputElement = document.createElement("input");
            tile.id = row.toString() + '-' + col.toString();
            tile.className = `tile`;
            // tile.value='p';
            rowOfGuss.appendChild(tile);
            col++;
        }
        board.appendChild(rowOfGuss);
        row++;
    }
    document.addEventListener('keyup',(e)=>{
        // alert(e.code);

    })


}

const createdKeypad = () => {
    for (let row of keyboard) {
        let rowOfKeys: HTMLDivElement = document.createElement('div');
        for (let key of row) {
            let keyInput: HTMLSpanElement = document.createElement("span");
            keyInput.textContent = key;
            rowOfKeys.appendChild(keyInput);
            giveClass(key, keyInput);
        }
        keyboardDiv.appendChild(rowOfKeys);
    }
}

const giveClass = (key: string, keyInput: HTMLSpanElement) => {
    if (key === "Enter") {
        keyInput.classList.add('enter');
        // keyInput.className = 'enter';
        keyInput.id = 'enter'
    }
    else if (key === "⌫") {
        // keyInput.className = 'backspace';
        keyInput.classList.add('backspace');
        keyInput.id = 'backspace';
    }
    else {
        keyInput.className = 'key_input';
        keyInput.id = "key" + key;
        console.log(keyInput.id);
        
    }
}

const findClickedBtn = () => {
    const keys = document.querySelectorAll('.key_input');
    const backspace = document.querySelector('.backspace') as HTMLSpanElement;
    const enter = document.querySelector('.enter') as HTMLSpanElement;
    keys.forEach(key => {
        callEventListener(key)
    });
    backspace.addEventListener('click', (e) => {
        backspaceFunctionality();

    });
    enter.addEventListener('click', (e) => {
        // console.log("enter", row, column);
        let guess: string = guessedWord();
        console.log(guess.length, "length");

        if (guess.length < 5) {
            setAnswerDivData("too short");
            return;
        }
        update();
        row += 1;
        column = 0;

    })
}

const callEventListener = (key: Element) => {
    key.addEventListener('click', (e) => {
        e.preventDefault();
        addInputInTiles(key.textContent!);
        // console.log(key.textContent);
    })
}

const addInputInTiles = (key: string) => {
    if (column < widthOfWord) {
        // console.log(row, column);
        const id = row.toString() + '-' + column.toString();
        const tile = document.getElementById(id) as HTMLInputElement;
        tile.value = key;
        column += 1;
    }
}
const backspaceFunctionality = () => {
    if (0 < column && column <= widthOfWord) {
        const id = row.toString() + '-' + (column - 1).toString();
        const tile = document.getElementById(id) as HTMLInputElement;
        tile.value = "";
        column -= 1;
    }
}

const update = () => {

    let guess: string = guessedWord();

    if (!newGuessList.includes(guess)) {
        answer.innerText = "Not in word list";
        // return;
    }
    let correct = 0;
    let letterCount = wordMap();
    checkAllCorrectLetters(correct, letterCount);
    // row += 1;
    // column = 0;
}

const guessedWord = () => {
    let guess: string = "";
    answer.innerText = "";
    let count = 0;
    while (count < widthOfWord) {
        const id = row.toString() + '-' + (count).toString();
        console.log(id, "guess");
        const tile = document.getElementById(id) as HTMLInputElement;
        let letter = tile.value;
        guess += letter;
        count += 1;
    }
    guess = guess.toLowerCase();
    console.log(guess);
    return guess;

}
const wordMap = () => {
    let letterCount: any = {};
    for (let letter of words) {
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }
    return (letterCount);
}

const checkAllCorrectLetters = (correct: number, letterCount: any) => {
    let count = 0;
    while (count < widthOfWord) {
        const id = row.toString() + '-' + (count).toString();
        const tile = document.getElementById(id) as HTMLInputElement;
        let letter = tile.value;
        if (words[count] == letter) {
            tile.classList.add('correct');
            let keyboardKey = document.getElementById("key" + letter) as HTMLSpanElement;
            keyboardKey?.classList.remove('present');
            keyboardKey?.classList.add('correct');
            correct += 1;
            letterCount[letter] -= 1;
        }
        if (correct == widthOfWord) {
            count = widthOfWord;
            setAnswerDivData("correct guess");
            gameOver = true;
        }
        count += 1;
    }

    lettersPresentInWrongPosition(correct, letterCount);

}

const lettersPresentInWrongPosition = (correct: number, letterCount: any) => {
    let count = 0;
    while (count < widthOfWord) {
        const id = row.toString() + '-' + (count).toString();
        const tile = document.getElementById(id) as HTMLInputElement;
        let letter = tile.value;
        if (!tile.classList.contains('correct')) {
            if (words.includes(letter) && letterCount[letter]) {
                tile.classList.add('present');
                let keyboardKey = document.getElementById("key" + letter) as HTMLSpanElement;
                if (!keyboardKey?.classList.contains('correct')) {
                    keyboardKey?.classList.add('present');
                    // keyboardKey.style.backgroundColor = "green";
                }
                letterCount[letter] -= 1;
            }
            else {
                tile.classList.add('absent');
                let keyboardKey = document.getElementById("key" + letter);
                keyboardKey?.classList.add('absent');
            }
        }
        count += 1;

    }
    if (row >= widthOfWord) {
        setAnswerDivData("game over");
    }

}

const setAnswerDivData = (value: string) => {
    answer.innerText = value;
    answer.classList.add('correct_guess');
    const playAgain = document.createElement('button') as HTMLButtonElement;
    playAgain.classList.add('play_again');
    playAgain.innerText = "Play Again";
    answer.appendChild(document.createElement('br'));
    answer.appendChild(playAgain);

    playAgain.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = './';
    })

    gameOver = true;

}