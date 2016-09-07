"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(canvas, context, ActionHandler, screenHandler) {
    _classCallCheck(this, Screen);

    console.log(ActionHandler);
    this.context = context;
    this.canvas = canvas;
    this.actionHandler = ActionHandler;
    this.screenHandler = screenHandler;
  }

  Screen.prototype.load = function load() {};

  Screen.prototype.clear = function clear(canvas, context) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
  };

  Screen.prototype.draw = function draw() {
    this.actionHandler.clearList();
    this.clear(this.canvas, this.context);
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  Screen.prototype.reset = function reset() {
    this.clear();
    this.draw();
  };

  return Screen;
}();
