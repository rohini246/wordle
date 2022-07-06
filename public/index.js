"use strict";
// import { internalIP } from "webpack-dev-server";
// import { guessList, wordList } from "./list";
const board = document.querySelector('#board');
const heightOfGuessBoxes = 6;
const widthOfWord = 5;
let row = 0;
let col = 0;
let gameOver = false;
let words = "SQUID";
// guessList = guessList.concat(wordList);
// var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
// console.log(word);
let height = heightOfGuessBoxes;
let width = widthOfWord;
while (height >= heightOfGuessBoxes) {
    let rowOfGuss = document.createElement('span');
    while (width >= widthOfWord) {
        console.log("inner width");
        let tile = document.createElement("input");
        tile.innerHTML = "he";
        rowOfGuss.appendChild(tile);
        width--;
    }
    board.appendChild(rowOfGuss);
    height--;
}
// Listen for Key Press
