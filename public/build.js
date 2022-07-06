/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst board = document.querySelector('#board');\r\nconst keyboardDiv = document.querySelector('#keyboard');\r\nconst answer = document.querySelector('#answer');\r\nconst heightOfGuessBoxes = 6;\r\nconst widthOfWord = 5;\r\nvar column = 0;\r\nvar row = 0;\r\nvar gameOver = false;\r\nlet words = \"EMPIRE\";\r\nlet alphabetArrayOfWord = words.toLowerCase().split('');\r\nlet len = alphabetArrayOfWord.length;\r\nlet traverser = 0;\r\nlet alphabetMap = {};\r\nwhile (traverser > len) {\r\n    const id = row.toString() + '-' + traverser.toString();\r\n    const tile = document.getElementById(id);\r\n    const letter = tile.innerText;\r\n}\r\nlet keyboard = [\r\n    [\"Q\", \"W\", \"E\", \"R\", \"T\", \"Y\", \"U\", \"I\", \"O\", \"P\"],\r\n    [\"A\", \"S\", \"D\", \"F\", \"G\", \"H\", \"J\", \"K\", \"L\"],\r\n    [\"⌫\", \"Z\", \"X\", \"C\", \"V\", \"B\", \"N\", \"M\", \"Enter\"]\r\n];\r\nwindow.addEventListener('load', (e) => {\r\n    initializer();\r\n    createdKeypad();\r\n    findClickedBtn();\r\n    if (gameOver)\r\n        return;\r\n    if (!gameOver && row == 6) {\r\n        console.log(\"game over\");\r\n        gameOver = true;\r\n        answer.innerHTML = words;\r\n    }\r\n});\r\nconst initializer = () => {\r\n    let row = 0;\r\n    while (row < heightOfGuessBoxes) {\r\n        let col = 0;\r\n        let rowOfGuss = document.createElement('div');\r\n        while (col < widthOfWord) {\r\n            let tile = document.createElement(\"input\");\r\n            tile.id = row.toString() + '-' + col.toString();\r\n            tile.className = `tile`;\r\n            // tile.value='p';\r\n            rowOfGuss.appendChild(tile);\r\n            col++;\r\n        }\r\n        board.appendChild(rowOfGuss);\r\n        row++;\r\n    }\r\n};\r\ndocument.addEventListener('keyup', (e) => {\r\n    console.log(row, column, \"updated\");\r\n    if (gameOver)\r\n        return;\r\n    if (!gameOver && row == 5 && column == 4) {\r\n        console.log(\"game over\");\r\n        gameOver = true;\r\n        answer.innerHTML = words;\r\n    }\r\n});\r\nconst createdKeypad = () => {\r\n    for (let row of keyboard) {\r\n        let rowOfKeys = document.createElement('div');\r\n        for (let key of row) {\r\n            let keyInput = document.createElement(\"span\");\r\n            keyInput.textContent = key;\r\n            rowOfKeys.appendChild(keyInput);\r\n            giveClass(key, keyInput);\r\n        }\r\n        keyboardDiv.appendChild(rowOfKeys);\r\n    }\r\n};\r\nconst giveClass = (key, keyInput) => {\r\n    if (key === \"Enter\") {\r\n        keyInput.className = 'enter';\r\n    }\r\n    else if (key === \"⌫\") {\r\n        keyInput.className = 'backspace';\r\n    }\r\n    else {\r\n        keyInput.className = 'key_input';\r\n    }\r\n};\r\nconst findClickedBtn = () => {\r\n    const keys = document.querySelectorAll('.key_input');\r\n    const backspace = document.querySelector('.backspace');\r\n    const enter = document.querySelector('.enter');\r\n    keys.forEach(key => {\r\n        callEventListener(key);\r\n    });\r\n    backspace.addEventListener('click', (e) => {\r\n        backspaceFunctionality();\r\n    });\r\n    enter.addEventListener('click', (e) => {\r\n        console.log(\"enter\", row, column);\r\n        update();\r\n        row += 1;\r\n        column = 0;\r\n    });\r\n};\r\nconst callEventListener = (key) => {\r\n    key.addEventListener('click', (e) => {\r\n        e.preventDefault();\r\n        addInputInTiles(key.textContent);\r\n        console.log(key.textContent);\r\n    });\r\n};\r\nconst addInputInTiles = (key) => {\r\n    if (column < widthOfWord) {\r\n        console.log(row, column);\r\n        const id = row.toString() + '-' + column.toString();\r\n        const tile = document.getElementById(id);\r\n        tile.value = key;\r\n        column += 1;\r\n    }\r\n};\r\nconst backspaceFunctionality = () => {\r\n    if (0 < column && column <= widthOfWord) {\r\n        const id = row.toString() + '-' + (column - 1).toString();\r\n        const tile = document.getElementById(id);\r\n        tile.value = \"\";\r\n        column -= 1;\r\n    }\r\n};\r\nconst update = () => {\r\n    let correct = 0;\r\n    let count = 0;\r\n    let letterCount = {};\r\n    // for(let letter of words){\r\n    //     if(letterCount[]){\r\n    //     }\r\n    // }\r\n    while (count < widthOfWord) {\r\n        const id = row.toString() + '-' + (count).toString();\r\n        const tile = document.getElementById(id);\r\n        console.log(tile);\r\n        let letter = tile.value;\r\n        if (words[count] == letter) {\r\n            tile.classList.add('correct');\r\n            correct += 1;\r\n        }\r\n        else if (words.includes(letter)) {\r\n            tile.classList.add('present');\r\n        }\r\n        else {\r\n            tile.classList.add('absent');\r\n        }\r\n        if (correct == widthOfWord) {\r\n            gameOver = true;\r\n        }\r\n        count += 1;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;