/*
created by franklin hernandez-castro, www.skizata.com
tec costa rica, hfg sch.gmünd
2019
 */

class CountryArc {
    constructor ( _rat, _firstA, _finalA){
        this.myCountry = "NaN";
        this.myCountryArea = 0;
        this.myCountryISO = "NaN";
        this.myWidth = 100;
        this.myColor = color(10, random(100), random(30,100));
        this.estaEncima = false;

        this.myRadius = _rat;
        this.myFirtsAngle = _firstA;
        this.myFinalAngle = _finalA;
    }


    display(myX, myY){
         this.estaEncima = this.isItOverMe(myX, myY);
        // drawing the arc
        noFill();
        stroke(this.myColor);
        strokeWeight(this.myWidth);
        arc(myX, myY, this.myRadius, this.myRadius, this.myFirtsAngle, this.myFinalAngle);

        if (this.estaEncima) {
            fill (200);
            noStroke();
            text(this.myCountryArea, myX, myY+30);
            text(this.myCountry, myX, myY +15);
        }
        noStroke();
    } // end of display




    isItOverMe (myX, myY){
        let distanceToCenter = dist (mouseX, mouseY, myX, myY);

        push();
        translate(myX, myY);
        let a = atan2(mouseY-myY, mouseX-myX);
        pop();

        if (a<0) a = map(a, -PI, 0, PI, TWO_PI);
         return (distanceToCenter > this.myRadius / 2 - this.myWidth / 2
             && distanceToCenter < this.myRadius / 2 + this.myWidth / 2
             && a > this.myFirtsAngle
             && a < this.myFinalAngle);
    } // end of isItOverMe


}  // end of class