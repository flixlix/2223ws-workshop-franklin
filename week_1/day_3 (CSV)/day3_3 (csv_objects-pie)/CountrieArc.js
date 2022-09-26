/*
created by franklin hernandez-castro, www.skizata.com
tec costa rica, hfg sch.gmünd
2019
 */

class CountryArc {
  constructor(_rat, _firstA, _finalA) {
    this.myCountry = "NaN";
    this.myCountryArea = 0;
    this.myCountryISO = "NaN";
    this.myWidth = 100;
    this.estaEncima = false;

    this.myRadius = _rat;
    this.myFirtsAngle = _firstA;
    this.myFinalAngle = _finalA;
    let myHue = map(this.myFirtsAngle,0,TWO_PI, 0, 360);
    this.myColor = color(myHue, 80, 100)
  }

  display(myX, myY) {
    
    colorMode(HSB)
    
    this.estaEncima = this.isItOverMe(myX, myY);
    // drawing the arc
    noFill();
    stroke(this.myColor);
    strokeWeight(this.myWidth);
    arc(
      myX,
      myY,
      this.myRadius,
      this.myRadius,
      this.myFirtsAngle,
      this.myFinalAngle
    );

    if (this.estaEncima) {
    colorMode(RGB)
      stroke(255,255,255, 128);
      arc(
        myX,
        myY,
        this.myRadius,
        this.myRadius,
        this.myFirtsAngle,
        this.myFinalAngle
      );
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      const text_size = 25;
      textSize(text_size);
      const distance = text_size * 1.5;
      text("Area: " + this.myCountryArea + " km²", myX, myY + distance / 2);
      text("Country: " + this.myCountry, myX, myY - distance / 2);
    }
    noStroke();
  } // end of display

  isItOverMe(myX, myY) {
    let distanceToCenter = dist(mouseX, mouseY, myX, myY);

    push();
    translate(myX, myY);
    let a = atan2(mouseY - myY, mouseX - myX);
    pop();

    if (a < 0) a = map(a, -PI, 0, PI, TWO_PI);
    return (
      distanceToCenter > this.myRadius / 2 - this.myWidth / 2 &&
      distanceToCenter < this.myRadius / 2 + this.myWidth / 2 &&
      a > this.myFirtsAngle &&
      a < this.myFinalAngle
    );
  } // end of isItOverMe
} // end of class
