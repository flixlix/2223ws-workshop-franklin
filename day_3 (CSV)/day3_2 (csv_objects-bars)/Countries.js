/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class Country {
  constructor() {
    this.myCountry = "NaN";
    this.myCountryArea = 0;
    this.myCountryISO = "NaN";
    this.mySize = 0;
    this.myWidth = 8.3;
    this.myColor = color(255, 186, 8);
    this.estaEncima = false;
  }

  display(myX, myY) {
    this.estaEncima =
      mouseX > myX &&
      mouseX < myX + this.myWidth;

    noStroke();
    fill(this.myColor);
    rect(myX, myY, this.myWidth, -this.mySize);
    textAlign(LEFT, BASELINE);
    if (this.estaEncima) {
      fill(255, 255, 255, 128);
      if (this.myCountryISO === "DEU" || this.myCountryISO === "PRT") {
        textSize (30);
        fill(255);
        textAlign(CENTER, CENTER);
        text("Area: " + this.myCountryArea + " km²", width / 2 , height / 2 + 45);
        text("Country: " + this.myCountry, width / 2, height / 2);
      } else {
        fill(200);
        text("Area: " + this.myCountryArea + " km²", myX, myY + 30);
        text("Country: " + this.myCountry, myX, myY + 15);
      }
      rect(myX, myY, this.myWidth, -this.mySize - 1);

    }
  } // end of display
} // end of class
