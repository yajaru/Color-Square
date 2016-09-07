"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClickActionHandler = function () {
  function ClickActionHandler() {
    _classCallCheck(this, ClickActionHandler);

    this.actions = [];
  }

  ClickActionHandler.prototype.clearList = function clearList() {
    this.actions = [];
  };

  ClickActionHandler.prototype.addAction = function addAction(x, y, width, height, action) {
    if (typeof action !== "function") {
      return;
    } else if (x < 0 || y < 0 || width < 0 || height < 0) {
      return;
    }
    this.actions.push({
      "x": x,
      "y": y,
      "xUpper": x + width,
      "yUpper": y + height,
      "action": action
    });
  };

  ClickActionHandler.prototype.handleClick = function handleClick(x, y) {
    if (x < 0 || y < 0) return;

    this.actions.map(function (val) {
      if (y >= val.y && y <= val.yUpper && x >= val.x && x <= val.xUpper) {
        val.action();
      }
    });
  };

  return ClickActionHandler;
}();
