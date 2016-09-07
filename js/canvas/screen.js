class Screen {
  constructor(canvas, context, ActionHandler, screenHandler){
    console.log(ActionHandler);
    this.context = context;
    this.canvas = canvas;
    this.actionHandler = ActionHandler;
    this.screenHandler = screenHandler;
  }
  load() {

  }
  clear (canvas, context) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }
  draw() {
    this.actionHandler.clearList();
    this.clear(this.canvas, this.context);
    this.context.fillStyle = "black";
    this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
  }
  reset() {
    this.clear();
    this.draw();
  }
}
