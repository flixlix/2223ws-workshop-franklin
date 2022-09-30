/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

class Cities {
  constructor() {
    this.myLongitude = 0;
    this.myLatitude = 0;
    this.myX = 0;
    this.myY = 0;
    this.mySizeCold = 0;
    this.mySizeHot = 0;
    this.myCountry = "NaN";
    this.myCountryISO = "NaN";
    this.myPopulation = 0;
    this.myName = "NaN";
    this.myColorCold = color(10, 10, 255, 200);
    this.myColorHot = color(255, 10, 10, 200);
    this.estaEncima = false;
  }

  display() {
    strokeWeight(0.5);
    stroke(color(50, 10, 10, 255));

    /* Display hottest temperature */
    push();
    fill(this.myColorHot);
    translate(this.myX, this.myY, this.mySizeHot / 2);
    box(5, 5, this.mySizeHot);
    pop();

    /* Display coldest temperature */
    push();
    fill(this.myColorCold);
    translate(this.myX, this.myY, this.mySizeCold / 2);
    box(5, 5, this.mySizeCold);
    pop();
    // end of display
  } // end of class
}
