class ScreenHandler{
  constructor(canvas, actionHandler) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.actionHandler = actionHandler;
    this.screens = {};
    this.canvas.addEventListener('click', (e) => {this.clickAction(e);}, false);
    this.canvas.addEventListener('contextmenu', (e) => {this.clickAction(e);}, false);
  }
  clickAction(e) {
    e.preventDefault();
    var rect = this.canvas.getBoundingClientRect();
    this.actionHandler.handleClick((e.clientX-rect.left)/(rect.right-rect.left)*this.canvas.width, (e.clientY-rect.top)/(rect.bottom-rect.top)*this.canvas.height);
  }
  addScreen(id, screen) {
    this.screens[id] = new screen(this.canvas, this.context, this.actionHandler, this);
  }
  removeScreen(id) {
    this.screens[id] = null;
  }
  loadScreen(id, ...params) {
    console.log("Loading screen " + id);
    if( this.screens[id] === null || this.screens[id] === undefined)
      console.err("Screen ID not known");
    else
      this.screens[id].load(...params);
  }
}
