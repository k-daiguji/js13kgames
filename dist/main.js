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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Character\": () => (/* binding */ Character)\n/* harmony export */ });\nvar Character = /** @class */ (function () {\r\n    function Character(name, radius, speed, map) {\r\n        this.name = name;\r\n        this.radius = radius;\r\n        this.speed = speed;\r\n        this.map = map;\r\n        var leftTop = this.map.getTileLeftTop(Math.floor(Math.random() * 15), Math.floor(Math.random() * 15));\r\n        this.position = {\r\n            x: Math.floor(leftTop.left + this.map.getTileWidth() / 2),\r\n            y: Math.floor(leftTop.top + this.map.getTileHeight() / 2),\r\n        };\r\n        this.direction = { x: 0, y: 0 };\r\n        this.nextDirection = { x: 0, y: 0 };\r\n        this.distance = 0;\r\n        this.alive = true;\r\n    }\r\n    Character.prototype.getCx = function () {\r\n        return this.position.x - 12;\r\n    };\r\n    Character.prototype.getCy = function () {\r\n        return this.position.y - 12;\r\n    };\r\n    Character.prototype.getDistance = function (other) {\r\n        return Math.sqrt(Math.pow(this.getCx() - other.getCx(), 2) +\r\n            Math.pow(this.getCy() - other.getCy(), 2));\r\n    };\r\n    Character.prototype.getSpeed = function () {\r\n        return this.speed;\r\n    };\r\n    Character.prototype.isAlive = function () {\r\n        return this.alive;\r\n    };\r\n    Character.prototype.canMove = function () {\r\n        if (this.nextDirection.x < 0) {\r\n            return !this.map.canMoveLeft(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.x > 0) {\r\n            return !this.map.canMoveRight(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.y < 0) {\r\n            return !this.map.canMoveUp(this.position.x, this.position.y);\r\n        }\r\n        else if (this.nextDirection.y > 0) {\r\n            return !this.map.canMoveDown(this.position.x, this.position.y);\r\n        }\r\n        else {\r\n            return true;\r\n        }\r\n    };\r\n    Character.prototype.die = function () {\r\n        this.alive = false;\r\n    };\r\n    Character.prototype.move = function (duration) {\r\n        var distance = (duration * this.getSpeed()) / 1000;\r\n        if (Boolean(this.direction.x)) {\r\n            this.distance += distance;\r\n            if (this.distance >= this.map.getTileWidth()) {\r\n                this.distance = 0;\r\n            }\r\n            else {\r\n                this.position.x += this.direction.x * distance;\r\n                return;\r\n            }\r\n        }\r\n        else if (Boolean(this.direction.y)) {\r\n            this.distance += distance;\r\n            if (this.distance >= this.map.getTileHeight()) {\r\n                this.distance = 0;\r\n            }\r\n            else {\r\n                this.position.y += this.direction.y * distance;\r\n                return;\r\n            }\r\n        }\r\n        this.position = this.map.getTileCenter(this.position.x, this.position.y);\r\n        if (this.canMove()) {\r\n            this.direction.x = this.nextDirection.x;\r\n            this.direction.y = this.nextDirection.y;\r\n        }\r\n        else {\r\n            this.nextDirection.x = this.direction.x;\r\n            this.nextDirection.y = this.direction.y;\r\n            this.direction = { x: 0, y: 0 };\r\n        }\r\n    };\r\n    return Character;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/Character.ts?");

/***/ }),

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Enemy\": () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ \"./src/Character.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Enemy = /** @class */ (function (_super) {\r\n    __extends(Enemy, _super);\r\n    function Enemy(name, radius, speed, imagePath, map) {\r\n        var _this = _super.call(this, name, radius, speed, map) || this;\r\n        _this.imagePath = imagePath;\r\n        _this.targets = [];\r\n        return _this;\r\n    }\r\n    Enemy.prototype.decideDirection = function () {\r\n        var _this = this;\r\n        if (!this.targets)\r\n            return;\r\n        this.targets.forEach(function (t) {\r\n            if (!t.isAlive())\r\n                return;\r\n            if (Math.random() < 0.5) {\r\n                t.getCx() - _this.getCx() < 0\r\n                    ? (_this.nextDirection.x = -1)\r\n                    : (_this.nextDirection.x = 1);\r\n                _this.nextDirection.y = 0;\r\n            }\r\n            else {\r\n                _this.nextDirection.x = 0;\r\n                t.getCy() - _this.getCy() < 0\r\n                    ? (_this.nextDirection.y = -1)\r\n                    : (_this.nextDirection.y = 1);\r\n            }\r\n        });\r\n    };\r\n    Enemy.prototype.move1 = function (duration) {\r\n        this.decideDirection();\r\n        this.move(duration);\r\n    };\r\n    Enemy.prototype.draw = function (ctx) {\r\n        var img = new Image();\r\n        img.src = this.imagePath;\r\n        ctx.drawImage(img, this.getCx(), this.getCy());\r\n    };\r\n    Enemy.prototype.setTarget = function (target) {\r\n        this.targets.push(target);\r\n    };\r\n    Enemy.prototype.killTarget = function () {\r\n        var _this = this;\r\n        if (!this.targets)\r\n            return;\r\n        this.targets.forEach(function (t) {\r\n            var _a;\r\n            if (!t.isAlive())\r\n                return;\r\n            if (_this.getDistance(t) <= Math.max(_this.radius, t.radius)) {\r\n                t.die();\r\n                (_a = document.getElementById(\"sound\")) === null || _a === void 0 ? void 0 : _a.play();\r\n            }\r\n        });\r\n    };\r\n    return Enemy;\r\n}(_Character__WEBPACK_IMPORTED_MODULE_0__.Character));\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/Enemy.ts?");

/***/ }),

/***/ "./src/GameMap.ts":
/*!************************!*\
  !*** ./src/GameMap.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar GameMap = /** @class */ (function () {\r\n    function GameMap(x, y, width, height, wallFillStyle) {\r\n        this.map = [\r\n            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n            [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],\r\n            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],\r\n            [0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],\r\n            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0],\r\n            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],\r\n            [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],\r\n            [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],\r\n            [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],\r\n            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],\r\n        ];\r\n        this.x = x;\r\n        this.y = y;\r\n        this.tileSize = { width: width, height: height };\r\n        this.wallFillStyle = wallFillStyle;\r\n    }\r\n    GameMap.prototype.getTileWidth = function () {\r\n        return this.tileSize.width;\r\n    };\r\n    GameMap.prototype.getTileHeight = function () {\r\n        return this.tileSize.height;\r\n    };\r\n    GameMap.prototype.getTile = function (width, height) {\r\n        var x = Math.floor((width - this.x) / this.getTileWidth());\r\n        var y = Math.floor((height - this.y) / this.getTileHeight());\r\n        return { x: x, y: y, kind: this.map[y][x] };\r\n    };\r\n    GameMap.prototype.getTileLeftTop = function (y, x) {\r\n        return {\r\n            left: this.x + x * this.getTileWidth(),\r\n            top: this.y + y * this.getTileHeight(),\r\n        };\r\n    };\r\n    GameMap.prototype.getTileCenter = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        var leftTop = this.getTileLeftTop(tile.y, tile.x);\r\n        return {\r\n            x: Math.floor(leftTop.left + this.getTileWidth() / 2),\r\n            y: Math.floor(leftTop.top + this.getTileHeight() / 2),\r\n        };\r\n    };\r\n    GameMap.prototype.canMoveLeft = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.x === 0 || this.map[tile.y][tile.x - 1] === 0;\r\n    };\r\n    GameMap.prototype.canMoveUp = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.y === 0 || this.map[tile.y - 1][tile.x] === 0;\r\n    };\r\n    GameMap.prototype.canMoveRight = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return (tile.x + 1 === this.map[0].length || this.map[tile.y][tile.x + 1] === 0);\r\n    };\r\n    GameMap.prototype.canMoveDown = function (x, y) {\r\n        var tile = this.getTile(x, y);\r\n        return tile.y + 1 === this.map.length || this.map[tile.y + 1][tile.x] === 0;\r\n    };\r\n    GameMap.prototype.drawWall = function (ctx, y, x) {\r\n        ctx.fillStyle = this.wallFillStyle;\r\n        ctx.rect(this.x + x * this.getTileWidth(), this.y + y * this.getTileHeight(), this.getTileWidth(), this.getTileHeight());\r\n        ctx.fill();\r\n    };\r\n    GameMap.prototype.draw = function (ctx) {\r\n        var _this = this;\r\n        ctx.beginPath();\r\n        this.map.forEach(function (y, i) {\r\n            y.forEach(function (x, j) {\r\n                if (!x) {\r\n                    _this.drawWall(ctx, i, j);\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return GameMap;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameMap);\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/GameMap.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ \"./src/Character.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar Player = /** @class */ (function (_super) {\r\n    __extends(Player, _super);\r\n    function Player(name, radius, speed, imagePath, map) {\r\n        var _this = _super.call(this, name, radius, speed, map) || this;\r\n        _this.imagePath = imagePath;\r\n        return _this;\r\n    }\r\n    Player.prototype.draw = function (ctx) {\r\n        var img = new Image();\r\n        img.src = this.imagePath;\r\n        ctx.drawImage(img, this.getCx(), this.getCy());\r\n    };\r\n    Player.prototype.goMove = function (direction) {\r\n        switch (direction) {\r\n            case 1:\r\n                this.nextDirection = { x: 0, y: -1 };\r\n                break;\r\n            case 2:\r\n                this.nextDirection = { x: 0, y: 1 };\r\n                break;\r\n            case 3:\r\n                this.nextDirection = { x: -1, y: 0 };\r\n                break;\r\n            case 4:\r\n                this.nextDirection = { x: 1, y: 0 };\r\n                break;\r\n        }\r\n    };\r\n    Player.prototype.setTarget = function (targets) {\r\n        this.targets = targets;\r\n    };\r\n    Player.prototype.killTarget = function () {\r\n        var _this = this;\r\n        if (!this.targets)\r\n            return;\r\n        this.targets.forEach(function (t) {\r\n            if (_this.getDistance(t) <= Math.max(_this.radius, t.radius)) {\r\n                t.die();\r\n            }\r\n        });\r\n    };\r\n    return Player;\r\n}(_Character__WEBPACK_IMPORTED_MODULE_0__.Character));\r\n\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/Player.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameMap */ \"./src/GameMap.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy */ \"./src/Enemy.ts\");\n/* harmony import */ var _dist_CharacterParams_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dist/CharacterParams.json */ \"./dist/CharacterParams.json\");\n\r\n\r\n\r\n\r\nvar createEnemy = function (map, player) {\r\n    var enemies = [];\r\n    Object.values(_dist_CharacterParams_json__WEBPACK_IMPORTED_MODULE_3__).forEach(function (c) {\r\n        var enemy = new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(c.name, c.radius, c.speed, c.imgPath, map);\r\n        enemies.push(enemy);\r\n        enemies.forEach(function (e) {\r\n            if (c.target.includes(e.name)) {\r\n                enemy.setTarget(e);\r\n            }\r\n            else if (c.target.includes(player.name)) {\r\n                enemy.setTarget(player);\r\n            }\r\n        });\r\n    });\r\n    return enemies;\r\n};\r\nvar Main = function () {\r\n    var canvas = document.getElementById(\"game_map\");\r\n    var ctx = canvas.getContext(\"2d\");\r\n    var map = new _GameMap__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0, 30, 30, \"#84C98B\");\r\n    var p = _dist_CharacterParams_json__WEBPACK_IMPORTED_MODULE_3__.grass;\r\n    var player = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(p.name, p.radius, p.speed, p.imgPath, map);\r\n    var enemies = createEnemy(map, player);\r\n    canvas.tabIndex = 1;\r\n    canvas.onkeydown = function (event) {\r\n        event.preventDefault();\r\n        switch (event.key) {\r\n            case \"Up\":\r\n            case \"ArrowUp\":\r\n                player.goMove(1);\r\n                break;\r\n            case \"Down\":\r\n            case \"ArrowDown\":\r\n                player.goMove(2);\r\n                break;\r\n            case \"Left\":\r\n            case \"ArrowLeft\":\r\n                player.goMove(3);\r\n                break;\r\n            case \"Right\":\r\n            case \"ArrowRight\":\r\n                player.goMove(4);\r\n                break;\r\n        }\r\n    };\r\n    var playLoop = function (duration) {\r\n        ctx.beginPath();\r\n        ctx.fillStyle = \"#FFFFFF\";\r\n        ctx.strokeStyle = \"#FFFFFF\";\r\n        ctx.rect(0, 0, canvas.width, canvas.height);\r\n        ctx.fill();\r\n        ctx.stroke();\r\n        map.draw(ctx);\r\n        player.move(duration);\r\n        player.draw(ctx);\r\n        enemies.forEach(function (enemy) {\r\n            enemy.move1(duration);\r\n            enemy.killTarget();\r\n            enemy.draw(ctx);\r\n        });\r\n    };\r\n    var prevDrawTime = 0;\r\n    var mainLoop = function (timestamp) {\r\n        var aliveEnemies = [];\r\n        enemies.forEach(function (enemy) {\r\n            if (enemy.isAlive()) {\r\n                aliveEnemies.push(enemy);\r\n            }\r\n        });\r\n        enemies = aliveEnemies;\r\n        if (player.isAlive()) {\r\n            player.killTarget();\r\n            var duration = timestamp - prevDrawTime;\r\n            playLoop(duration);\r\n            if (aliveEnemies.length === 1) {\r\n                enemies.push(aliveEnemies[0]);\r\n                alert(\"Clear!\");\r\n                window.location.reload();\r\n            }\r\n            prevDrawTime = timestamp;\r\n            window.requestAnimationFrame(mainLoop);\r\n        }\r\n        else {\r\n            alert(\"Game Over!\");\r\n            window.location.reload();\r\n        }\r\n    };\r\n    window.requestAnimationFrame(mainLoop);\r\n};\r\nMain();\r\n\n\n//# sourceURL=webpack://hello-world-typescript/./src/main.ts?");

/***/ }),

/***/ "./dist/CharacterParams.json":
/*!***********************************!*\
  !*** ./dist/CharacterParams.json ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"grass\":{\"name\":\"grass\",\"radius\":10,\"speed\":70,\"imgPath\":\"./dist/images/grass.png\",\"target\":[\"\"]},\"zebra\":{\"name\":\"zebra\",\"radius\":10,\"speed\":70,\"imgPath\":\"./dist/images/zebra.png\",\"target\":[\"plant\"]},\"lion\":{\"name\":\"lion\",\"radius\":10,\"speed\":50,\"imgPath\":\"./dist/images/lion.png\",\"target\":[\"zebra\"]},\"person_male\":{\"name\":\"person_male\",\"radius\":10,\"speed\":30,\"imgPath\":\"./dist/images/person_male.png\",\"target\":[\"lion\"]},\"person_female\":{\"name\":\"person_female\",\"radius\":10,\"speed\":30,\"imgPath\":\"./dist/images/person_female.png\",\"target\":[\"lion\"]},\"reaper\":{\"name\":\"reaper\",\"radius\":10,\"speed\":20,\"imgPath\":\"./dist/images/reaper.png\",\"target\":[\"plant\",\"lion\",\"person_male\",\"person_female\"]}}');\n\n//# sourceURL=webpack://hello-world-typescript/./dist/CharacterParams.json?");

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