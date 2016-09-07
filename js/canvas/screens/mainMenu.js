class MainMenu extends Screen{
  constructor(canvas, context, ActionHandler, screenHandler) {
    super(canvas, context, ActionHandler, screenHandler);
    this.level = 3;
  }

  load(level) {
    this.level = level;
    this.draw();
  }

  draw (){
    super.draw();
    // Draw the logo
    this.context.font = "96px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "center";
    this.context.fillText("Color Sqaure", this.canvas.width/2, 130);

    this.context.font = "28px Arial";
    this.context.fillText("Two colors can be next to each other only once.",this.canvas.width/2, 490);
    this.context.fillText("Red bars appear between colors that are",this.canvas.width/2, 520);
    this.context.fillText("next to each other more than once.",this.canvas.width/2, 550);

    // Draw the hardness selectors
    this.context.fillStyle = "green";
    this.context.fillRect(50, 200, 100, 100);
    this.actionHandler.addAction(50, 200, 100,100, () => {this.selectLevel(3);});
    this.context.fillStyle = "#e6e600";
    this.context.fillRect(250, 200, 100, 100);
    this.actionHandler.addAction(250, 200, 100,100, () => {this.selectLevel(4);});
    this.context.fillStyle = "orange";
    this.context.fillRect(450, 200, 100, 100);
    this.actionHandler.addAction(450, 200, 100,100, () => {this.selectLevel(5);});
    this.context.fillStyle = "red";
    this.context.fillRect(650, 200, 100, 100);
    this.actionHandler.addAction(650, 200, 100,100, () => {this.selectLevel(7);});
    this.context.fillStyle = "white";
    this.context.font = "60px Arial";
    this.context.textAlign = "center";
    this.context.fillText('3', 100, 270);
    this.context.fillText('4', 300, 270);
    this.context.fillText('5', 500, 270);
    this.context.fillText('7', 700, 270);
    this.context.strokeStyle = "white";
    this.context.lineWidth = 10;
    switch(this.level) {
      case 3:
        this.context.strokeRect(50, 200, 100, 100);
        break;
      case 4:
        this.context.strokeRect(250, 200, 100, 100);
        break;
      case 5:
        this.context.strokeRect(450, 200, 100, 100);
        break;
      case 7:
        this.context.strokeRect(650, 200, 100, 100);
        break;
      default:
        break;
    }

    // Draw Start Button
    this.context.fillStyle = "blue";
    this.context.fillRect(300, 350, 200, 100);
    this.context.fillStyle = "white";
    this.context.fillText("Start", 400, 420);
    this.actionHandler.addAction(300,350, 200, 100, () => {
      this.screenHandler.loadScreen("game", this.level);
    });


  }

  selectLevel(selectedLevel) {
    this.level = selectedLevel;
    this.draw();
  }
}
