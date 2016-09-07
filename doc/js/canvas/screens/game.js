'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var limits = {
  '3': 5,
  '4': 7,
  '5': 9,
  '7': 13,
  '9': 19
};
var colors = {
  "0": "white",
  "1": "orange",
  "2": "yellow",
  "3": "blue",
  "4": "cyan",
  "5": "purple",
  "6": "hotpink",
  "7": "brown"

};

var Game = function (_Screen) {
  _inherits(Game, _Screen);

  function Game(canvas, context, ActionHandler, screenHandler) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, _Screen.call(this, canvas, context, ActionHandler, screenHandler));

    _this.level = 5;
    _this.board = [];
    _this.returnToMainScreen = false;
    return _this;
  }

  Game.prototype.draw = function draw() {
    var _this2 = this;

    _Screen.prototype.draw.call(this);

    var pairList = this.generatePairs();
    if (Game.isSolved(pairList)) {
      setTimeout(function () {
        _this2.screenHandler.loadScreen("victoryScreen", Date.now() - _this2.timer, _this2.board, _this2.level);
      }, 1);
      return;
    }
    if (this.returnToMainScreen) {
      setTimeout(function () {
        _this2.screenHandler.loadScreen("mainMenu", _this2.level);
      }, 1);
      return;
    }

    this.context.font = "96px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "left";
    this.context.fillText(((Date.now() - this.timer) / 1000).toString(), 50, 100);

    this.context.fillStyle = "blue";
    this.context.fillRect(550, 30, 200, 75);
    this.context.fillStyle = "white";
    this.context.font = "72px Arial";
    this.context.textAlign = "center";
    this.context.fillText("Menu", 650, 92);
    this.actionHandler.addAction(550, 30, 200, 75, function () {
      _this2.screenHandler.loadScreen("mainMenu");_this2.returnToMainScreen = true;
    });

    var baseLine = 120;
    var leftLine = (800 - (600 - 120)) / 2;
    var length = (600 - 120 - 5 * (this.level + 1)) / this.level;
    var numberOfPlaces = this.level * this.level;
    var markerWidth = Math.floor(length / 8);
    var markerLength = Math.floor(Math.floor(length / 2));

    // draw squares

    var _loop = function _loop(i) {
      _this2.context.fillStyle = colors[_this2.board[i]];
      _this2.context.fillRect(leftLine + length * (i % _this2.level) + 5 * (i % _this2.level + 1), baseLine + length * Math.floor(i / _this2.level) + 5 * (i / _this2.level), length, length);
      var temp = i;
      _this2.actionHandler.addAction(leftLine + length * (i % _this2.level) + 5 * (i % _this2.level + 1), baseLine + length * Math.floor(i / _this2.level) + 5 * (i / _this2.level), length, length, function () {
        _this2.board[temp] = (_this2.board[temp] + 1) % limits[_this2.level];
      });
    };

    for (var i = 0; i < numberOfPlaces; ++i) {
      _loop(i);
    }

    // Draw Marker Rods
    this.context.fillStyle = "Red";
    for (var _i = 0; _i < numberOfPlaces; ++_i) {
      // handle horizontal
      if (_i % this.level < this.level - 1 && Game.isPairDuplicate(this.board[_i], this.board[_i + 1], pairList)) {
        this.context.fillRect(leftLine + Math.floor(length / 2 + 5 + length / 4) + length * (_i % this.level) + 5 * (_i % this.level + 1), baseLine + Math.floor(length / 2) - Math.floor(markerWidth / 2) + length * Math.floor(_i / this.level) + 5 * (_i / this.level), markerLength, markerWidth);
      }

      // handle vertical
      if (_i / this.level < this.level - 1 && Game.isPairDuplicate(this.board[_i], this.board[_i + this.level], pairList)) {
        this.context.fillRect(leftLine + Math.floor(length / 2) - Math.floor(markerWidth / 2) + length * (_i % this.level) + 5 * (_i % this.level + 1), baseLine + Math.floor(length / 2 + 5 + length / 4) + length * Math.floor(_i / this.level) + 5 * (_i / this.level), markerWidth, markerLength);
      }
    }

    setTimeout(function () {
      _this2.draw();
    }, 50);
    return;
  };

  Game.prototype.load = function load(level) {
    var _this3 = this;

    this.level = level;
    this.board = [];
    var maxSize = level * level;
    this.timer = Date.now();
    for (var i = 0; i < maxSize; ++i) {
      this.board[i] = Math.floor(Math.random() * limits[this.level]);
    }if (Game.isSolved(this.generatePairs())) {
      this.load(level);
      return;
    }
    this.returnToMainScreen = false;
    setTimeout(function () {
      _this3.draw();
    }, 1);
  };

  Game.prototype.generatePairs = function generatePairs() {
    var pairList = {};
    var numberOfPlaces = this.level * this.level;
    for (var i = 0; i < numberOfPlaces; ++i) {
      if (i % this.level < this.level - 1) {
        if (pairList[Game.cantorNumber(this.board[i], this.board[i + 1])] === undefined) {
          pairList[Game.cantorNumber(this.board[i], this.board[i + 1])] = false;
        } else {
          pairList[Game.cantorNumber(this.board[i], this.board[i + 1])] = true;
        }
      }
      if (i / this.level < this.level - 1) {
        if (pairList[Game.cantorNumber(this.board[i], this.board[i + this.level])] === undefined) {
          pairList[Game.cantorNumber(this.board[i], this.board[i + this.level])] = false;
        } else {
          pairList[Game.cantorNumber(this.board[i], this.board[i + this.level])] = true;
        }
      }
    }
    return pairList;
  };

  Game.isSolved = function isSolved(pairList) {
    for (var key in pairList) {
      if (!pairList.hasOwnProperty(key)) continue;
      if (pairList[key] === true) return false;
    }
    return true;
  };

  Game.cantorNumber = function cantorNumber(z, y) {
    var a = Math.max(z, y);
    var b = Math.min(z, y);
    return (a + b) * (a + b + 1) / 2 + b;
  };

  Game.isPairDuplicate = function isPairDuplicate(a, b, pairList) {
    return pairList[Game.cantorNumber(a, b)] === true;
  };

  return Game;
}(Screen);
