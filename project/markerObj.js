class Marker {
  constructor() {
    this._name = "";
    this._index = 0;
    this._decimalYear = "";
    this._date = "";
    this._description = "";
    this._crew = "";
    this._positionX = 10;
    this._selectionWidth = 10;
    this._overMe = false;
    this._isSelected = false;

    this._color =  color(255, 255, 255, 255);
    this._colorIsOver = color(255, 215, 0, 255);
  }

  // calculates the x position of the marker
  calculatePositionX(xLine) {
    for (let year = 0; year < numYears; year++) {
      let lineMaxX = arrayOfCountries.at(-1)._arrayOfPoints.at(-1).x; /* get coordinates of last element in array */
      let lineMinX = arrayOfCountries[0]._arrayOfPoints[0].x; /* get coordinates of first element in array */
      let lineX = map(this._decimalYear, 1957, 2022, lineMinX, lineMaxX);
      this._positionX = lineX;
    }
  }

  drawMarker(xLine) {
    push();
    this.is_overMe();
    
    
    if (this._isSelected || this._overMe) {
      stroke(this._colorIsOver);
    }
    line(this._positionX, xLine, this._positionX, topY);
    pop();
  }

  is_overMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._overMe = true;

    } else {
      this._overMe = false;
      stroke(this._color);
      return;
    }
    push()
    noStroke()
    textLeading(20)
    textAlign(RIGHT);
    textSize(24);
    fill(255);
    text(this._date, width - 75, 36); /* crew text */
    textSize(15);
    fill(190);
    text(this._name + "\n" + this._description + "\n" + this._crew, width - 75, 58);
    pop()
  }
  clickOverMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._isSelected = !this._isSelected;
    }
  }
} // end of class
