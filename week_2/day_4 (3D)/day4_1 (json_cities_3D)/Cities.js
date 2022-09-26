/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

class Cities {
    constructor ( ){
        this.myLongitude= 0;
        this.myLatitude = 0;
        this.myX = 0;
        this.myY = 0;
        this.mySize = 0;
        this.myCountry = "NaN";
        this.myCountryISO = "NaN";
        this.myPopulation = 0;
        this.myName = "NaN";
        this.myColor = color(255,50,50, 100);
        this.estaEncima = false;
    }

    display () {
        strokeWeight(0.5)
        stroke(color(50,10,10,255));
        fill(this.myColor);
        push();
        translate(this.myX, this.myY, this.mySize/2);
        box (5,5,this.mySize);
        pop();
    } // end of display
}  // end of class