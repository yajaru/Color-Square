'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenHandler = function () {
  function ScreenHandler(canvas, actionHandler) {
    var _this = this;

    _classCallCheck(this, ScreenHandler);

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.actionHandler = actionHandler;
    this.screens = {};
    this.canvas.addEventListener('click', function (e) {
      _this.clickAction(e);
    }, false);
    this.canvas.addEventListener('contextmenu', function (e) {
      _this.clickAction(e);
    }, false);
  }

  ScreenHandler.prototype.clickAction = function clickAction(e) {
    e.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    this.actionHandler.handleClick((e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width, (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height);
  };

  ScreenHandler.prototype.addScreen = function addScreen(id, screen) {
    this.screens[id] = new screen(this.canvas, this.context, this.actionHandler, this);
  };

  ScreenHandler.prototype.removeScreen = function removeScreen(id) {
    this.screens[id] = null;
  };

  ScreenHandler.prototype.loadScreen = function loadScreen(id) {
    var _screens$id;

    console.log("Loading screen " + id);

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (this.screens[id] === null || this.screens[id] === undefined) console.err("Screen ID not known");else (_screens$id = this.screens[id]).load.apply(_screens$id, params);
  };

  return ScreenHandler;
}();
