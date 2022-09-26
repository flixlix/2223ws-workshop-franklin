/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/


class Cities {
    constructor ( ){
        this.myLongitude= 0;
        this.myLatitude = 0;
        this.myX = 0;
        this.myY = 0;
        this.mySize = random(5,15);
        this.myCountry = "NaN";
        this.myCountryISO = "NaN";
        this.myPopulation = 0;
        this.myName = "NaN";
        this.myColor = color('hsb(0,100%,100%)');
        this.myHue = 0;
        this.estaEncima = false;
    }


    display () {
        this.estaEncima = mouseX > this.myX - this.mySize / 2 && mouseX < this.myX + this.mySize / 2 &&
            mouseY > this.myY - this.mySize / 2 && mouseY < this.myY + this.mySize / 2;

        strokeWeight(1);
        stroke(255);
        colorMode(HSB);
        this.myColor = color(this.myHue,100,100,0.4);
        fill(this.myColor);
        ellipse (this.myX, this.myY, this.mySize, this.mySize);


        if (this.estaEncima) {
            this.myColor = color(this.myHue,100,100,0.9);
            fill(this.myColor);
            strokeWeight(3);
            stroke(255);
            ellipse (this.myX, this.myY, this.mySize, this.mySize);
            fill (200);
            noStroke();
            text(this.myName, this.myX + 30, this.myY);
            text(this.myCountry, this.myX + 30, this.myY +15);
            text("code of country: " + this.myCountryISO, this.myX + 30, this.myY + 30);
            text("population: " + this.myPopulation, this.myX + 30, this.myY + 45);
        }

    } // end of display

}  // end of class