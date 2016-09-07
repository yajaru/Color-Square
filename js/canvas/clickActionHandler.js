class ClickActionHandler {
  constructor() {
    this.actions = [];
  }
  clearList() {
    this.actions = [];
  }
  addAction(x,y,width,height,action) {
    if(typeof action !== "function") {
      return;
    } else if( x < 0 || y < 0 || width < 0 || height < 0 ) {
      return;
    }
    this.actions.push({
      "x" : x,
      "y" : y,
      "xUpper" : x + width,
      "yUpper" : y + height,
      "action" : action
    });
  }

  handleClick(x,y) {
    if(x<0 || y < 0 )
      return;

    this.actions.map(function(val) {
      if(y >= val.y && y <= val.yUpper && x >= val.x && x <= val.xUpper) {
        val.action();
      }
    });
  }
}
