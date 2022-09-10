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

/***/ "./src/Character.ts":
/*!**************************!*\
  !*** ./src/Character.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Character\": () => (/* binding */ Character)\n/* harmony export */ });\nvar Character = /** @class */ (function () {\r\n    function Character(name, radius, speed, map, x, y) {\r\n        this.name = name;\r\n        this.radius = radius;\r\n        this.speed = speed;\r\n        this.map = map;\r\n        var leftTop = this.map.getTileLeftTop(x, y);\r\n        this.position = {\r\n            x: Math.floor(leftTop.left + this.map.getTileWidth() / 2),\r\n            y: Math.floor(leftTop.top + this.map.getTileHeight() / 2),\r\n        };\r\n        this.direction = { x: 0, y: 0 };\r\n        this.nextDirection = { x: 0, y: 0 };\r\n        this.distance = 0;\r\n        this.alive = true;\r\n    }\r\n    Character.prototype.getCx = function () {\r\n        return this.position.x - 12;\r\n    };\r\n    Character.prototype.getCy = function () {\r\n        return this.position.y - 12;\r\n    };\r\n    Character.prototype.getDistance = function (other) {\r\n        return Math.sqrt(Math.pow(this.getCx() - other.getCx(), 2) +\r\n            Math.pow(this.getCy() - other.getCy(), 2));\r\n    };\r\n    Character.prototype.getSpeed = function () {\r\n        return this.speed;\r\n    };\r\n    Character.prototype.isAlive = function () {\r\n        return this.alive;\r\n    };\r\n    Character.prototype.canMove = function () {\r\n        if (this.nextDirection.x < 0) {\r\n            return !this.map.canMoveLeft(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.x > 0) {\r\n            return !this.map.canMoveRight(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.y < 0) {\r\n            return !this.map.canMoveUp(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.y > 0) {\r\n            return !this.map.canMoveDown(this.position.x, this.position.y);\r\n        }\r\n        else {\r\n            return true;\r\n        }\r\n    };\r\n    Character.prototype.die = function () {\r\n        this.alive = false;\r\n    };\r\n    Character.prototype.move = function (duration) {\r\n        var distance = (duration * this.getSpeed()) / 1000;\r\n        if (Boolean(this.direction.x)) {\r\n            this.distance += distance;\r\n            if (this.distance >= this.map.getTileWidth()) {\r\n                this.distance = 0;\r\n            }\r\n            else {\r\n                this.position.x += this.direction.x * distance;\r\n                return;\r\n            }\r\n        }\r\n        else if (Boolean(this.direction.y)) {\r\n            this.distance += distance;\r\n            if (this.distance >= this.map.getTileHeight()) {\r\n                this.distance = 0;\r\n            }\r\n            else {\r\n                this.position.y += this.direction.y * distance;\r\n                return;\r\n            }\r\n        }\r\n        this.position = this.map.getTileCenter(this.position.x, this.position.y);\r\n        if (this.canMove()) {\r\n            this.direction.x = this.nextDirection.x;\r\n            this.direction.y = this.nextDirection.y;\r\n        }\r\n        else {\r\n            this.nextDirection.x = this.direction.x;\r\n            this.nextDirection.y = this.direction.y;\r\n            this.direction = { x: 0, y: 0 };\r\n        }\r\n    };\r\n    return Character;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/Character.ts?");

/***/ }),

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Enemy\": () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ \"./src/Character.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Enemy = /** @class */ (function (_super) {\r\n    __extends(Enemy, _super);\r\n    function Enemy(name, radius, speed, imagePath, targets, map, x, y) {\r\n        var _this = _super.call(this, name, radius, speed, map, x, y) || this;\r\n        _this.imagePath = imagePath;\r\n        _this.targets = targets;\r\n        return _this;\r\n    }\r\n    Enemy.prototype.decideDirection = function () {\r\n        var _this = this;\r\n        this.targets.forEach(function (t) {\r\n            if (!t.isAlive())\r\n                return;\r\n            if (Math.random() < 0.5) {\r\n                t.getCx() - _this.getCx() < 0\r\n                    ? (_this.nextDirection.x = -1)\r\n                    : (_this.nextDirection.x = 1);\r\n                _this.nextDirection.y = 0;\r\n            }\r\n            else {\r\n                _this.nextDirection.x = 0;\r\n                t.getCy() - _this.getCy() < 0\r\n                    ? (_this.nextDirection.y = -1)\r\n                    : (_this.nextDirection.y = 1);\r\n            }\r\n        });\r\n    };\r\n    Enemy.prototype.move1 = function (duration) {\r\n        this.decideDirection();\r\n        this.move(duration);\r\n    };\r\n    Enemy.prototype.draw = function (ctx) {\r\n        var img = new Image();\r\n        img.src = this.imagePath;\r\n        ctx.drawImage(img, this.getCx(), this.getCy());\r\n    };\r\n    Enemy.prototype.killTarget = function () {\r\n        var _this = this;\r\n        this.targets.forEach(function (t) {\r\n            var _a;\r\n            if (!t.isAlive())\r\n                return;\r\n            if (_this.getDistance(t) <= Math.max(_this.radius, t.radius)) {\r\n                t.die();\r\n                try {\r\n                    (_a = document.getElementById(\"sound\")) === null || _a === void 0 ? void 0 : _a.play();\r\n                }\r\n                catch (e) {\r\n                    console.log(\"Player don't press any key.\");\r\n                }\r\n            }\r\n        });\r\n    };\r\n    return Enemy;\r\n}(_Character__WEBPACK_IMPORTED_MODULE_0__.Character));\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/Enemy.ts?");

/***/ }),

/***/ "./src/GameMap.ts":
/*!************************!*\
  !*** ./src/GameMap.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar GameMap = /** @class */ (function () {\r\n    function GameMap(x, y, width, height, wallFillStyle) {\r\n        this.map = [\r\n            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n            [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],\r\n            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],\r\n            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],\r\n            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],\r\n            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],\r\n            [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],\r\n            [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],\r\n            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n        ];\r\n        this.x = x;\r\n        this.y = y;\r\n        this.tileSize = { width: width, height: height };\r\n        this.wallFillStyle = wallFillStyle;\r\n    }\r\n    GameMap.prototype.getTileWidth = function () {\r\n        return this.tileSize.width;\r\n    };\r\n    GameMap.prototype.getTileHeight = function () {\r\n        return this.tileSize.height;\r\n    };\r\n    GameMap.prototype.getTile = function (width, height) {\r\n        var x = Math.floor((width - this.x) / this.getTileWidth());\r\n        var y = Math.floor((height - this.y) / this.getTileHeight());\r\n        return { x: x, y: y, kind: this.map[y][x] };\r\n    };\r\n    GameMap.prototype.getTileLeftTop = function (y, x) {\r\n        return {\r\n            left: this.x + x * this.getTileWidth(),\r\n            top: this.y + y * this.getTileHeight(),\r\n        };\r\n    };\r\n    GameMap.prototype.getTileCenter = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        var leftTop = this.getTileLeftTop(tile.y, tile.x);\r\n        return {\r\n            x: Math.floor(leftTop.left + this.getTileWidth() / 2),\r\n            y: Math.floor(leftTop.top + this.getTileHeight() / 2),\r\n        };\r\n    };\r\n    GameMap.prototype.canMoveLeft = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.x === 0 || this.map[tile.y][tile.x - 1] === 0;\r\n    };\r\n    GameMap.prototype.canMoveUp = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.y === 0 || this.map[tile.y - 1][tile.x] === 0;\r\n    };\r\n    GameMap.prototype.canMoveRight = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return (tile.x + 1 === this.map[0].length || this.map[tile.y][tile.x + 1] === 0);\r\n    };\r\n    GameMap.prototype.canMoveDown = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.y + 1 === this.map.length || this.map[tile.y + 1][tile.x] === 0;\r\n    };\r\n    GameMap.prototype.drawWall = function (ctx, y, x) {\r\n        ctx.fillStyle = this.wallFillStyle;\r\n        ctx.rect(this.x + x * this.getTileWidth(), this.y + y * this.getTileHeight(), this.getTileWidth(), this.getTileHeight());\r\n        ctx.fill();\r\n    };\r\n    GameMap.prototype.draw = function (ctx) {\r\n        var _this = this;\r\n        ctx.beginPath();\r\n        this.map.forEach(function (y, i) {\r\n            y.forEach(function (x, j) {\r\n                if (!x) {\r\n                    _this.drawWall(ctx, i, j);\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return GameMap;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameMap);\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/GameMap.ts?");

/***/ }),

/***/ "./src/MainCharacter.ts":
/*!******************************!*\
  !*** ./src/MainCharacter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MainCharacter\": () => (/* binding */ MainCharacter)\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ \"./src/Character.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar MainCharacter = /** @class */ (function (_super) {\r\n    __extends(MainCharacter, _super);\r\n    function MainCharacter(name, radius, speed, imagePath, map, x, y) {\r\n        var _this = _super.call(this, name, radius, speed, map, x, y) || this;\r\n        _this.imagePath = imagePath;\r\n        return _this;\r\n    }\r\n    MainCharacter.prototype.draw = function (ctx) {\r\n        var img = new Image();\r\n        img.src = this.imagePath;\r\n        ctx.drawImage(img, this.getCx(), this.getCy());\r\n    };\r\n    MainCharacter.prototype.goMove = function (direction) {\r\n        switch (direction) {\r\n            case 1:\r\n                this.nextDirection = { x: 0, y: -1 };\r\n                break;\r\n            case 2:\r\n                this.nextDirection = { x: 0, y: 1 };\r\n                break;\r\n            case 3:\r\n                this.nextDirection = { x: -1, y: 0 };\r\n                break;\r\n            case 4:\r\n                this.nextDirection = { x: 1, y: 0 };\r\n                break;\r\n        }\r\n    };\r\n    MainCharacter.prototype.setTarget = function (targets) {\r\n        this.targets = targets;\r\n    };\r\n    MainCharacter.prototype.killTarget = function () {\r\n        var _this = this;\r\n        if (!this.targets)\r\n            return;\r\n        this.targets.forEach(function (t) {\r\n            if (_this.getDistance(t) <= Math.max(_this.radius, t.radius)) {\r\n                t.die();\r\n            }\r\n        });\r\n    };\r\n    return MainCharacter;\r\n}(_Character__WEBPACK_IMPORTED_MODULE_0__.Character));\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/MainCharacter.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameMap */ \"./src/GameMap.ts\");\n/* harmony import */ var _MainCharacter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainCharacter */ \"./src/MainCharacter.ts\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy */ \"./src/Enemy.ts\");\n\r\n\r\n\r\nvar canvas;\r\nvar ctx;\r\nvar Main = function () {\r\n    canvas = document.getElementById(\"game_map\");\r\n    ctx = canvas.getContext(\"2d\");\r\n    var map = new _GameMap__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 30, 30, \"#84C98B\");\r\n    var mainCharacter = new _MainCharacter__WEBPACK_IMPORTED_MODULE_1__.MainCharacter(\"main\", 10, 80, \"./dist/images/plant.png\", map, 1, 1);\r\n    var zebra = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"zebra\", 10, 60, \"./dist/images/zebra.png\", [mainCharacter], map, 1, 9);\r\n    var zebra2 = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"zebra2\", 10, 60, \"./dist/images/zebra.png\", [mainCharacter], map, 5, 7);\r\n    var lion = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"tiger\", 10, 90, \"./dist/images/lion.png\", [zebra, zebra2], map, 3, 11);\r\n    var lion2 = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"tiger2\", 10, 90, \"./dist/images/lion.png\", [zebra, zebra2], map, 10, 11);\r\n    var person = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"person\", 10, 50, \"./dist/images/person_male.png\", [lion, lion2], map, 4, 1);\r\n    var person2 = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"person2\", 10, 50, \"./dist/images/person_female.png\", [lion, lion2], map, 4, 12);\r\n    var joker = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(\"joker\", 10, 120, \"./dist/images/joker.png\", [zebra, zebra2, lion, lion2, person, person2], map, 8, 13);\r\n    var enemies = [zebra, zebra2, lion, lion2, person, person2, joker];\r\n    canvas.tabIndex = 1;\r\n    canvas.onkeydown = function (event) {\r\n        event.preventDefault();\r\n        switch (event.key) {\r\n            case \"Up\":\r\n            case \"ArrowUp\":\r\n                mainCharacter.goMove(1);\r\n                break;\r\n            case \"Down\":\r\n            case \"ArrowDown\":\r\n                mainCharacter.goMove(2);\r\n                break;\r\n            case \"Left\":\r\n            case \"ArrowLeft\":\r\n                mainCharacter.goMove(3);\r\n                break;\r\n            case \"Right\":\r\n            case \"ArrowRight\":\r\n                mainCharacter.goMove(4);\r\n                break;\r\n        }\r\n    };\r\n    var playLoop = function (duration) {\r\n        ctx.beginPath();\r\n        ctx.fillStyle = \"#FFFFFF\";\r\n        ctx.strokeStyle = \"#FFFFFF\";\r\n        ctx.rect(0, 0, canvas.width, canvas.height);\r\n        ctx.fill();\r\n        ctx.stroke();\r\n        map.draw(ctx);\r\n        mainCharacter.move(duration);\r\n        mainCharacter.draw(ctx);\r\n        enemies.forEach(function (enemy) {\r\n            enemy.move1(duration);\r\n            enemy.killTarget();\r\n            enemy.draw(ctx);\r\n        });\r\n    };\r\n    var prevDrawTime = 0;\r\n    var mainLoop = function (timestamp) {\r\n        var aliveEnemies = [];\r\n        enemies.forEach(function (enemy) {\r\n            if (enemy.isAlive()) {\r\n                aliveEnemies.push(enemy);\r\n            }\r\n        });\r\n        enemies = aliveEnemies;\r\n        if (mainCharacter.isAlive()) {\r\n            mainCharacter.killTarget();\r\n            var duration = timestamp - prevDrawTime;\r\n            playLoop(duration);\r\n            if (aliveEnemies.length === 1) {\r\n                enemies.push(joker);\r\n                console.log(\"hoge\", enemies);\r\n                alert(\"Clear!\");\r\n                window.location.reload();\r\n            }\r\n            prevDrawTime = timestamp;\r\n            window.requestAnimationFrame(mainLoop);\r\n        }\r\n        else {\r\n            alert(\"Game Over!\");\r\n            window.location.reload();\r\n        }\r\n    };\r\n    window.requestAnimationFrame(mainLoop);\r\n};\r\nMain();\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/main.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;