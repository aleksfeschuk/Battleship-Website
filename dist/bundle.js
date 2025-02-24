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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Main */ \"./src/modules/Main.js\");\n\r\n\r\nconst main = new _modules_Main__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nconsole.log('Hello');\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Field.js":
/*!******************************!*\
  !*** ./src/modules/Field.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Field)\n/* harmony export */ });\n/* harmony import */ var _Ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ships */ \"./src/modules/Ships.js\");\n\r\n\r\nclass Field {\r\n    static FIELD_SIDE = 330;\r\n\r\n    static SHIP_SIDE = 33;\r\n\r\n    static SHIP_DATA = {\r\n        fourdeck: [1, 4],\r\n        tripledeck: [2, 3],\r\n        doubledeck: [3, 2],\r\n        singledeck: [4, 1]\r\n    };\r\n\r\n    constructor(field) {\r\n        this.field = field;\r\n        this.squadron = {};\r\n        this.matrix = Field.createMatrix();\r\n\r\n        let {left, right, top, bottom} = this.getCoordinates(this.field);\r\n        this.fieldLeft = left;\r\n        this.fieldRight = right;\r\n        this.fieldTop = top;\r\n        this.fieldBottom = bottom;\r\n    }\r\n\r\n    getCoordinates(el) {\r\n        const { left, right, top, bottom } = el.getBoundingClientRect();\r\n        return {\r\n            left: left + window.pageXOffset,\r\n            right: right + window.pageXOffset,\r\n            top: top + window.pageYOffset,\r\n            bottom: bottom + window.pageYOffset,\r\n        };\r\n    }\r\n\r\n    // clean field\r\n\r\n    cleanField() {\r\n        this.clearElement(this.field);\r\n        this.squadron = {};\r\n        this.matrix = Field.createMatrix();\r\n    }\r\n\r\n    // funtion to clear all child elements\r\n    clearElement(element) {\r\n        while (element.firstChild) {\r\n            element.removeChild(element.firstChild);\r\n        }\r\n    }\r\n\r\n    static createMatrix() {\r\n        return [...Array(10)].map(() => Array(10).fill(0));\r\n    }\r\n\r\n\r\n    // random \r\n    randomLocationShips() {\r\n        Object.entries(Field.SHIP_DATA).forEach(([type, [count, decks]]) => {\r\n            Array.from({ length: count}).forEach((_, i) => {\r\n                const options = {\r\n                    ...this.getCoordsDecks(decks),\r\n                    decks,\r\n                    shipname: `${type}${i + 1}`\r\n                };\r\n                new _Ships__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, options).createShip();\r\n            });\r\n        });\r\n    }\r\n\r\n\r\n    static getRandom = n => Math.floor(Math.random() * (n + 1));\r\n\r\n\r\n    // Generates random coordinates for ship placement\r\n    getCoordinatesDecks(decks) {\r\n        let obj;\r\n\r\n        do { \r\n            const kx = Field.getRandom(1);\r\n            const ky = 1 - kx;\r\n\r\n            const x = Field.getRandom(10 - decks * kx - 1);\r\n            const y = Field.getRandom(10 - decks * ky - 1);\r\n\r\n            obj = { x, y, kx, ky };\r\n        } while (!this.checkLocationShip(obj.decks));\r\n\r\n        return obj;\r\n    }\r\n\r\n\r\n    checkLocationShip(obj, decks) {\r\n        let { x, y, kx, ky} = obj;\r\n\r\n\r\n         // Define the upper and lower boundaries of the area\r\n\r\n         let fromX = Math.max(x - 1, 0);\r\n         let toX = Math.min(x + kx * decks, 9);\r\n\r\n\r\n        //  Define the left and right boundaries of the area\r\n\r\n        let fromY = Math.max(y - 1, 0);\r\n        let toY = Math.min(y + ky * decks, 9);\r\n\r\n        // Check if the zone contains already installed ships\r\n\r\n        for (let i = fromX; i <= toX; i++) {\r\n            for (let j = fromY; j <= toY; j++) {\r\n                if(this.matrix[i]?.[j] === 1) return false;\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n\r\n\r\n   \r\n}\n\n//# sourceURL=webpack://battleship/./src/modules/Field.js?");

/***/ }),

/***/ "./src/modules/Main.js":
/*!*****************************!*\
  !*** ./src/modules/Main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Main)\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./src/modules/Field.js\");\n\r\n\r\nclass Main {\r\n\r\n    constructor() {\r\n        // Initialize game state variables\r\n        this.startGame = false;\r\n        this.isHandlerPlacement = false;\r\n        this.isHandlerController = false;\r\n        this.compShot = false;\r\n        console.log(\"Main class initialized\");\r\n\r\n        // Get the human and computer fields\r\n        this.humanfield = this.getElement('field_human');\r\n        this.computerfield = this.getElement('field_computer');\r\n        \r\n        // Get various elements related to the game interface\r\n        this.instruction = this.getElement('instruction');\r\n        this.shipsCollection = this.getElement('ships_collection');\r\n        this.initialShips = document.querySelector('.wrap + .initial-ships');\r\n        this.toptext = this.getElement('text_top');\r\n        this.buttonPlay = this.getElement('play');\r\n        this.buttonNewGame = this.getElement('newgame');\r\n\r\n        // Initialize Field instance for the human player\r\n        this.human = new _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.humanfield);\r\n\r\n        window.human = this.human;\r\n        window.buttonPlay = this.buttonPlay;\r\n\r\n        \r\n    }\r\n        \r\n    // function to get an element by ID\r\n    getElement (id) {\r\n        return document.getElementById(id);\r\n    }\r\n\r\n    // Function to get the coordinates of an element\r\n    getCoordinates(el) {\r\n        const { left, right, top, bottom } = el.getBoundingClientRect();\r\n        return {\r\n            left: left + window.pageXOffset,\r\n            right: right + window.pageXOffset,\r\n            top: top + window.pageYOffset,\r\n            bottom: bottom + window.pageYOffset,\r\n        };\r\n    }\r\n\r\n   \r\n}\n\n//# sourceURL=webpack://battleship/./src/modules/Main.js?");

/***/ }),

/***/ "./src/modules/Ships.js":
/*!******************************!*\
  !*** ./src/modules/Ships.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ships)\n/* harmony export */ });\nclass Ships {\r\n    constructor(self, {x, y, kx, ky, decks, shipname}) {\r\n        this.player = self;\r\n        this.field = self.field;\r\n        this.shipname = shipname;\r\n        this.decks = decks;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.kx = kx;\r\n        this.ky = ky;\r\n        this.arrDecks = [];\r\n        this.hits = 0;\r\n    }\r\n\r\n    static showShip(self, shipname, x, y, kx) {\r\n        const div = document.createElement('div');\r\n        div.id = shipname;\r\n        div.className = `ship ${shipname.slice(0, -1)}${kx == 0 ? 'vertical' : ''}`;\r\n        div.style.cssText = `left:${y * Field.SHIP_SIDE}px; top:${x * Field.SHIP_SIDE}px;`;\r\n        self.field.appendChild(div);\r\n    }\r\n\r\n\r\n    createShip() {\r\n        let k = 0;\r\n\r\n        while(k < this.decks) {\r\n            let i = this.x + k * this.kx;\r\n            let j = this.y + k * this.ky;\r\n            this.player.matrix[i][j] = 1;\r\n            this.arrDecks.push([i, j]);\r\n            k++;\r\n        }\r\n\r\n        // Add ship to player's squadron\r\n        this.player.squadron[this.shipname] = {\r\n            arrDecks: this.arrDecks,\r\n            hits: this.hits,\r\n            x: this.x,\r\n            y: this.y,\r\n            kx: this.kx,\r\n            ky: this.ky\r\n        };\r\n\r\n        // If human player, update UI\r\n        if(this.player === window.human) {\r\n            Ships.showShip(window.human, this.shipname, this.x, this.y, this.kx);\r\n            if (Object.keys(this.player.squadron).length === 10) {\r\n                window.buttonPlay.hidden = false;\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/modules/Ships.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;