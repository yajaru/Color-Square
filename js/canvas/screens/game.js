var limits = {
  '3' : 5,
  '4' : 7,
  '5' : 9,
  '7' : 13,
  '9' : 19
};
var colors = {
  "0" : "white",
  "1" : "orange",
  "2" : "yellow",
  "3" : "blue",
  "4" : "cyan",
  "5" : "purple",
  "6" : "hotpink",
  "7" : "brown",

}
class Game extends Screen{
  constructor(canvas, context, ActionHandler, screenHandler) {
    super(canvas, context, ActionHandler, screenHandler);
    this.level = 5;
    this.board = [];
    this.returnToMainScreen = false;
  }

  draw() {
    super.draw();

    let pairList = this.generatePairs();
    if(Game.isSolved(pairList)) {
      setTimeout(()=> {
        this.screenHandler.loadScreen("victoryScreen", (Date.now() - this.timer), this.board, this.level);
      }, 1);
      return;
    }
    if(this.returnToMainScreen) {
      setTimeout(()=> {
        this.screenHandler.loadScreen("mainMenu", this.level);
      }, 1);
      return;
    }


    this.context.font = "96px Arial";
    this.context.fillStyle = "white";
    this.context.textAlign = "left";
    this.context.fillText(((Date.now() - this.timer)/1000).toString(), 50, 100);

    this.context.fillStyle = "blue";
    this.context.fillRect(550,30,200,75);
    this.context.fillStyle = "white";
    this.context.font = "72px Arial";
    this.context.textAlign = "center";
    this.context.fillText("Menu", 650, 92);
    this.actionHandler.addAction(550, 30, 200,75, () => {this.screenHandler.loadScreen("mainMenu");this.returnToMainScreen = true;});

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
      let temp = i;
      this.actionHandler.addAction(leftLine + length * (i % this.level) + 5 * (i % this.level + 1), baseLine + length * Math.floor(i / this.level) + 5 * (i / this.level) , length, length, () => {
        this.board[temp] = (this.board[temp] + 1) % limits[this.level];
      });
    }

    // Draw Marker Rods
    this.context.fillStyle = "Red";
    for(let i = 0; i < numberOfPlaces; ++i) {
      // handle horizontal
      if(i % this.level < this.level - 1 && Game.isPairDuplicate(this.board[i], this.board[i+1], pairList)) {
        this.context.fillRect(leftLine + Math.floor(length / 2 + 5 + length/4) + length * (i % this.level) + 5 * (i % this.level + 1), baseLine + Math.floor(length / 2) - Math.floor(markerWidth/2) + length * Math.floor(i / this.level) + 5 * (i / this.level) , markerLength, markerWidth);
      }

      // handle vertical
      if(i / this.level < this.level - 1 && Game.isPairDuplicate(this.board[i], this.board[i+this.level], pairList)) {
        this.context.fillRect(leftLine + Math.floor(length / 2) - Math.floor(markerWidth/2) + length * (i % this.level) + 5 * (i % this.level + 1), baseLine + Math.floor(length / 2 + 5 +length/4) + length * Math.floor(i / this.level) + 5 * (i / this.level) , markerWidth, markerLength);
      }
    }


    setTimeout(() => {this.draw();}, 50);
    return
  }

  load(level) {
    this.level = level;
    this.board = [];
    let maxSize = level * level;
    this.timer = Date.now();
    for(let i = 0; i < maxSize; ++i)
      this.board[i] = Math.floor(Math.random() * (limits[this.level]));
    if(Game.isSolved(this.generatePairs())) {
      this.load(level);
      return;
    }
    this.returnToMainScreen = false;
    setTimeout(() => {this.draw();}, 1);
  }

  generatePairs() {
    let pairList = {};
    let numberOfPlaces = this.level * this.level;
    for(let i = 0; i < numberOfPlaces; ++i) {
      if(i % this.level < this.level - 1) {
        if(pairList[Game.cantorNumber(this.board[i], this.board[i+1])] === undefined) {
          pairList[Game.cantorNumber(this.board[i], this.board[i+1])] = false;
        } else {
          pairList[Game.cantorNumber(this.board[i], this.board[i+1])] = true;
        }
      }
      if(i / this.level < this.level - 1) {
        if(pairList[Game.cantorNumber(this.board[i], this.board[i+this.level])] === undefined) {
          pairList[Game.cantorNumber(this.board[i], this.board[i+this.level])] = false;
        } else {
          pairList[Game.cantorNumber(this.board[i], this.board[i+this.level])] = true;
        }
      }
    }
    return pairList;
  }

  static isSolved(pairList) {
    for(var key in pairList) {
      if(!pairList.hasOwnProperty(key))
        continue;
      if(pairList[key] === true)
        return false;
    }
    return true;
  }

  static cantorNumber(z, y) {
    let a = Math.max(z, y);
    let b = Math.min(z, y);
    return (a + b) * (a + b + 1)/2 + b;
  }
  static isPairDuplicate(a, b, pairList) {
    return pairList[Game.cantorNumber(a,b)] === true;
  }
}
