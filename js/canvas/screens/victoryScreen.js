class VictoryScreen extends Screen{
    constructor(canvas, context, ActionHandler, screenHandler) {
      super(canvas, context, ActionHandler, screenHandler);
      this.level = 5;
      this.board = [];
      this.timeTaken = 0;
    }

    load(timeTaken, finalBoard, level) {
      this.level = level;
      this.board = finalBoard;
      this.timeTaken = timeTaken;
      this.draw();
    }

    draw() {
      super.draw();

      this.context.font = "96px Arial";
      this.context.fillStyle = "white";
      this.context.textAlign = "left";
      this.context.fillText((this.timeTaken/1000).toString(), 50, 100);



      this.context.fillStyle = "blue";
      this.context.fillRect(550,30,200,75);
      this.context.fillStyle = "white";
      this.context.font = "72px Arial";
      this.context.textAlign = "center";
      this.context.fillText("Menu", 650, 92);
      this.actionHandler.addAction(550, 30, 200,75, () => {this.screenHandler.loadScreen("mainMenu", this.level);});


      let baseLine = 120;
      let leftLine = (800 - (600 - 120)) / 2;
      let length = (600 - 120 - 5 * (this.level + 1))/this.level;
      let numberOfPlaces = this.level*this.level;
      let markerWidth = Math.floor(length/8);
      let markerLength = Math.floor(Math.floor(length/2));

      // draw squares
      for(let i = 0; i < numberOfPlaces; ++i) {
        this.context.fillStyle = colors[this.board[i]];
        this.context.fillRect( leftLine + length * (i % this.level) + 5 * (i % this.level + 1), baseLine + length * Math.floor(i / this.level) + 5 * (i / this.level) , length, length);
      }

      // Done because canvas doesn't word wrap. WTF
      let victoryMessageLeftX = 80;
      let victoryMessageRightX = 720;
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
    }
  }
