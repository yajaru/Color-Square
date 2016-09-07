"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VictoryScreen = function (_Screen) {
  _inherits(VictoryScreen, _Screen);

  function VictoryScreen(canvas, context, ActionHandler, screenHandler) {
    _classCallCheck(this, VictoryScreen);

    var _this = _possibleConstructorReturn(this, _Screen.call(this, canvas, context, ActionHandler, screenHandler));

    _this.level = 5;
    _this.board = [];
    _this.timeTaken = 0;
    return _this;
  }

  VictoryScreen.prototype.load = function load(timeTaken, finalBoard, level) {
    this.level = level;
    this.board = finalBoard;
    this.timeTaken = timeTaken;
    this.draw();
  };

  VictoryScreen.prototype.draw = function draw() {
    var _this2 = this;

    _Screen.prototype.draw.call(this);

    this.context.font = "96px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "left";
    this.context.fillText((this.timeTaken / 1000).toString(), 50, 100);

    this.context.fillStyle = "blue";
    this.context.fillRect(550, 30, 200, 75);
    this.context.fillStyle = "white";
    this.context.font = "72px Arial";
    this.context.textAlign = "center";
    this.context.fillText("Menu", 650, 92);
    this.actionHandler.addAction(550, 30, 200, 75, function () {
      _this2.screenHandler.loadScreen("mainMenu", _this2.level);
    });

    var baseLine = 120;
    var leftLine = (800 - (600 - 120)) / 2;
    var length = (600 - 120 - 5 * (this.level + 1)) / this.level;
    var numberOfPlaces = this.level * this.level;
    var markerWidth = Math.floor(length / 8);
    var markerLength = Math.floor(Math.floor(length / 2));

    // draw squares
    for (var i = 0; i < numberOfPlaces; ++i) {
      this.context.fillStyle = colors[this.board[i]];
      this.context.fillRect(leftLine + length * (i % this.level) + 5 * (i % this.level + 1), baseLine + length * Math.floor(i / this.level) + 5 * (i / this.level), length, length);
    }

    // Done because canvas doesn't word wrap. WTF
    var victoryMessageLeftX = 80;
    var victoryMessageRightX = 720;
    this.context.fillStyle = "white";
    this.context.font = "72px Arial";
    this.context.textAlign = "center";
    this.context.fillText("V", victoryMessageLeftX, 170);
    this.context.fillText("I", victoryMessageLeftX, 240);
    this.context.fillText("C", victoryMessageLeftX, 310);
    this.context.fillText("T", victoryMessageLeftX, 380);
    this.context.fillText("O", victoryMessageLeftX, 450);
    this.context.fillText("R", victoryMessageLeftX, 520);
    this.context.fillText("Y", victoryMessageLeftX, 590);

    this.context.fillText("V", victoryMessageRightX, 170);
    this.context.fillText("I", victoryMessageRightX, 240);
    this.context.fillText("C", victoryMessageRightX, 310);
    this.context.fillText("T", victoryMessageRightX, 380);
    this.context.fillText("O", victoryMessageRightX, 450);
    this.context.fillText("R", victoryMessageRightX, 520);
    this.context.fillText("Y", victoryMessageRightX, 590);
    return;
  };

  return VictoryScreen;
}(Screen);
