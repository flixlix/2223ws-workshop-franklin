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
    this._isOver = false;
    this._isSelected = false;

    this._color = color(255, 255, 255, 128);
    this._colorIsOver = color(255, 255, 255, 220);
    this._colorIsSelected = color(255, 215, 0);
    this._colorIsOverAndSelected = color(196, 167, 0);
  }


  // calculates the x position of the marker
  calculatePositionX(xLine) {
    lineMaxX = (width - 75); /* get coordinates of last element in array */
    lineMinX = 75; /* get coordinates of first element in array */
    for (let year = 0; year < yearsDisplayed; year++) {
      this._positionX = map(this._decimalYear, 1957, 1957 + yearsDisplayed -1, lineMinX, lineMaxX);

    }

  }

  drawMarker(xLine) {

    push();
    this.is_overMe();
    strokeWeight(0.5)
    if (this._isOver && this._isSelected) {
      stroke(this._colorIsOverAndSelected)
    } else if (this._isOver) {
      stroke(this._colorIsOver);
    } else if (this._isSelected) {
      stroke(this._colorIsSelected);
    }
    line(this._positionX, xLine, this._positionX, topY);
    pop();
    if (this._isSelected) {
      push();
      noStroke();
      textLeading(20);
      textAlign(RIGHT);
      textSize(24);
      fill(255);
      text(this._description, width - 75, 36); /* crew text */
      textSize(15);
      fill(190);
      text(this._name + "\n" + this._date + "\n" + this._crew, width - 75, 58);
      pop()
    }
  }

  is_overMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._isOver = true;

    } else {
      this._isOver = false;
      stroke(this._color);
      return;
    }

  }
  is_selected() {

  }
  clickOverMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._isSelected = !this._isSelected;
      this.setOthersSelectedFalse();
    }
  }
  setOthersSelectedFalse() {
    /* run through all countries and set _isSelected as false but not on this object */
    for (let i = 0; i < arrayOfEvents.length; i++) {
      if (arrayOfEvents[i]._index != this._index) {
        arrayOfEvents[i]._isSelected = false;
      }
    }
  }
} // end of class
