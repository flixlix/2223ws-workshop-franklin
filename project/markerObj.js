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
  calculatePositionX() {
    for (let year = 0; year < yearsDisplayed; year++) {
      this._positionX = map(this._decimalYear, 1957, 1957 + yearsDisplayed - 1, lineMinX, lineMaxX);
    }
  }

  drawMarker() {
    push();
    /* check if mouse is over marker */
    this.is_overMe();

    if (this._isOver && this._isSelected) {
      stroke(this._colorIsOverAndSelected)
      strokeWeight(3);
    } else if (this._isOver) {
      stroke(this._colorIsOver);
      strokeWeight(1);
    } else if (this._isSelected) {
      stroke(this._colorIsSelected);
      strokeWeight(3);
    } else {
      stroke(this._color);
      strokeWeight(0.5);
    }
    line(this._positionX, xLine, this._positionX, topY);
    pop();
    if (this._isSelected) {
      this.showInfo();
    }
    if (animationState) {
      this.selectMarkersWithinTimeRange();
    }
  }

  selectMarkersWithinTimeRange() {
    if (Math.floor(yearsDisplayed + 1957) - 1 === Math.floor(this._decimalYear)) {
      this._isSelected = true;
    } else {
      this._isSelected = false;
    }
  }

  showInfo() {
    push();
    noStroke();
    textLeading(20);
    textAlign(RIGHT);
    textSize(24);
    fill(255);
    text(this._description, width - 75, 100);
    textSize(15);
    fill(190);
    text(this._name + "\n" + this._date + "\n" + this._crew, width - 75, 122);
    pop();
  }

  is_overMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._isOver = true;
    } else {
      this._isOver = false;
    }
  }

  clickOverMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth && mouseY > topY && mouseY < xLine) {
      this._isSelected = !this._isSelected;
      this.setOthersSelectedFalse();
    }
  }

  setOthersSelectedFalse() {
    /* run through all markers and set _isSelected as false but not on this object */
    for (let i = 0; i < arrayOfEvents.length; i++) {
      if (arrayOfEvents[i]._index != this._index) {
        arrayOfEvents[i]._isSelected = false;
      }
    }
  }
} // end of class
