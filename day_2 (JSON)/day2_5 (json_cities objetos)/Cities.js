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
        this.myColor = color(100,100,255, 100);
        this.estaEncima = false;
    }


    display () {
        this.estaEncima = mouseX > this.myX - this.mySize / 2 && mouseX < this.myX + this.mySize / 2 &&
            mouseY > this.myY - this.mySize / 2 && mouseY < this.myY + this.mySize / 2;

        noStroke();
        fill(this.myColor);
        ellipse (this.myX, this.myY, this.mySize, this.mySize);


        if (this.estaEncima) {
            fill (200);
            text(this.myName, this.myX, this.myY);
            text(this.myCountry, this.myX, this.myY +15);
            text("code of country: " + this.myCountryISO, this.myX, this.myY + 30);
            text("population: " + this.myPopulation, this.myX, this.myY + 45);
        }

    } // end of display

}  // end of class