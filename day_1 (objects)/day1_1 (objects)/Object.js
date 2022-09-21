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
        this.mySize = random(10,25);
        this.myColor = color(20, random(100), random(50,90));
    }


    display () {
        fill(this.myColor);
        noStroke();
        ellipse (this.myX, this.myY, this.mySize, this.mySize);
    }

}