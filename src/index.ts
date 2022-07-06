import { setSourceMapRange } from "typescript";

const board = document.querySelector('#board') as HTMLDivElement;
const keyboardDiv = document.querySelector('#keyboard') as HTMLDivElement;
const answer = document.querySelector('#answer') as HTMLDivElement;

const heightOfGuessBoxes = 6;
const widthOfWord = 5;

var column = 0;
var row = 0;


var gameOver = false;
let words: string = "EMPIRE";
let alphabetArrayOfWord:string[] = words.toLowerCase().split('');
let len = alphabetArrayOfWord.length; 
let traverser = 0
let alphabetMap = {};

while(traverser>len){
    const id = row.toString() + '-' + traverser.toString();
    const tile = document.getElementById(id)! ;
    const letter = tile.innerText;
}

let keyboard = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⌫", "Z", "X", "C", "V", "B", "N", "M", "Enter"]
]

window.addEventListener('load', (e) => {
    initializer();
    createdKeypad();
    findClickedBtn();
    if (gameOver) return;
    if (!gameOver && row == 6 ) {
        console.log("game over");
        
        gameOver = true;
        answer.innerHTML = words;

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

    
}

document.addEventListener('keyup', (e) => {
    console.log(row,column,"updated");
    if (gameOver) return;
    if (!gameOver && row == 5 && column==4) {
        console.log("game over");
        
        gameOver = true;
        answer.innerHTML = words;

    }
})

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
        keyInput.className = 'enter';
    }
    else if (key === "⌫") {
        keyInput.className = 'backspace';
    }
    else {
        keyInput.className = 'key_input';
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
        console.log("enter",row,column);
        
        update();
        row += 1;
        column = 0;

    })
}

const callEventListener = (key: Element) => {
    key.addEventListener('click', (e) => {
        e.preventDefault();
        addInputInTiles(key.textContent!);
        console.log(key.textContent);
    })
}

const addInputInTiles = (key: string) => {
    if (column < widthOfWord) {
        console.log(row, column);
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
    let correct = 0;
    let count = 0 ;
    let letterCount = {};
    // for(let letter of words){
    //     if(letterCount[]){

    //     }
    // }

   
    while (count < widthOfWord) {
        const id = row.toString() + '-' + (count).toString();
        const tile = document.getElementById(id) as HTMLInputElement;
        console.log(tile);
        
        let letter = tile.value;
        if(words[count] == letter){
            tile.classList.add('correct');
            correct += 1;
        }
        else if(words.includes(letter)){
            tile.classList.add('present');
        }
        else{
            tile.classList.add('absent');
        }
        if(correct == widthOfWord){
            gameOver = true;
        }
        count += 1;

    }

}