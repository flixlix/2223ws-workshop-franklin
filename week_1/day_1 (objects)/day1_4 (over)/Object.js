/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
*/

class MyObject {
    constructor (_x, _y){
        this.myX = _x;
        this.myY = _y;
        this.mySize = random(5,15);
        this.myColor = color(20, random(100), random(50,90));
        this.hover = false;
    }


    display () {
        this.hover = mouseX > this.myX - this.mySize / 2 && mouseX < this.myX + this.mySize / 2 &&
            mouseY > this.myY - this.mySize / 2 && mouseY < this.myY + this.mySize / 2;

        stroke(0,0,100);
        if (this.hover) strokeWeight (2);
        else noStroke();

        fill(this.myColor);
        ellipse (this.myX, this.myY, this.mySize, this.mySize);
        noStroke();
    }

}  // end of class