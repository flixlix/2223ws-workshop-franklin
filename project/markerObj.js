class Marker {
  constructor() {
    this._name = "";
    this._index = 0;
    this._decimalYear = "";
    this._date = "";
    this._description = "";
    this._crew = "";
    this._vehicle = "";
    this._pathToImg = "";

    this._positionX = 10;
    this._selectionWidth = 10;
    this._isOver = false;
    this._isSelected = false;

    this._color = color(255, 255, 255, 255);
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



    /* check if marker is ouside of the scope, and if true, deselect marker */
    this.unselectMarkersOutsideTimeRange();
  }

  unselectMarkersOutsideTimeRange() {
    if (Math.floor(yearsDisplayed + 1956) <= Math.floor(this._decimalYear)) {
      this.setUnselected();
      if (!this.isAnySelected().bool) {
        this.hideInfo();
      }
    }
  }

  setUnselected() {
    this._isSelected = false;
  }

  showInfo() {
    imageEventElement.src = this._pathToImg;
    push();
    noStroke();
    textLeading(20);
    textAlign(RIGHT);
    textSize(24);
    fill(255);
    eventsContainer.childNodes[1].innerHTML = this._description;
    eventsContainer.childNodes[3].innerHTML = this._crew;
    eventsContainer.childNodes[5].innerHTML = this._vehicle;
    eventsContainer.childNodes[7].innerHTML = this._date;
    eventsContainer.childNodes[9].innerHTML = this._name;
    pop();
    imageEventElement.style.display = "block";
  }

  hideInfo() {
    eventsContainer.childNodes[1].innerHTML = "";
    eventsContainer.childNodes[3].innerHTML = "";
    eventsContainer.childNodes[5].innerHTML = "";
    eventsContainer.childNodes[7].innerHTML = "";
    eventsContainer.childNodes[9].innerHTML = "";
    imageEventElement.style.display = "none";
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
      updateDisplayedInfo();
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

  isAnySelected() {
    let isAny = { bool: false, index: 0 };
    for (let i = 0; i < arrayOfEvents.length; i++) {
      if (arrayOfEvents[i]._isSelected) {
        isAny = { bool: true, index: i }
      }
    }
    return isAny;
  }
} // end of class