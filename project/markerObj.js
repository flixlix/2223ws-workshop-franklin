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

    this._color = color(255, 215, 0, 200);
    this._colorIsOver = color(255, 255, 255);
  }

  // calculates the pixel position
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
    line(this._positionX, xLine, this._positionX, 100);
    pop();
  }

  is_overMe() {
    if (mouseX > this._positionX - this._selectionWidth && mouseX < this._positionX + this._selectionWidth) {
      this._overMe = true;
      stroke(this._colorIsOver);
    } else {
      this._overMe = false;
      stroke(this._color);
    }
  }
  /*  let ifAny = false;
 for (let year = 0; year < numYears; year++) {
   let distance = dist(
     mouseX,
     mouseY,
     this._arrayOfPoints[year].x,
     this._arrayOfPoints[year].y
   );
   if (distance < 5) {
     fill(200);
     textSize(24);
     let descriptionText;

     /* create dynamic description, based on value, singular or plural */
  /*         if ((this._arrayOfData[year].y * 1).toFixed(0) != 1) {
            descriptionText = "Space Flights";
          } else {
            descriptionText = "Space Flight";
          }
          text(
            (this._arrayOfData[year].y * 1).toFixed(0) + */
  /*           " " /* add whitespace between value and text */ /* 
  /*           descriptionText,
            this._arrayOfPoints[year].x,
            this._arrayOfPoints[year].y - 70
          );
          text(
            this._name,
            this._arrayOfPoints[year].x,
            this._arrayOfPoints[year].y - 45
          );
          text(
            this._arrayOfData[year].x,
            this._arrayOfPoints[year].x,
            this._arrayOfPoints[year].y - 20
          );
          ifAny = true;
        }
      }
      this._overMe = ifAny; */


  clickOverMe() {
    for (let year = 0; year < numYears; year++) {
      let distance = dist(
        mouseX,
        mouseY,
        this._arrayOfPoints[year].x,
        this._arrayOfPoints[year].y
      );
      if (distance < 5) this._isSelected = !this._isSelected;
    }
  }
} // end of class
