/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2022
 */

class Country {

    constructor () {
        this.myCode = "";
        this.myName = "";
        this.arrayOfData = [];
        this.myWidth = 0;
        this.myHue = 0;
        this.myColor = color(0, 80, 100)
    }

    displayBar(year, positionX, positionY) {
        push();
        colorMode(HSB)
        this.myHue = map(this.myWidth,0,1000, 60, 0);
        this.myColor = color(this.myHue, 80, 100)
        fill(this.myColor)
        this.myWidth = map (this.arrayOfData[year].y, 3, 55,  0, 1000);
        rect(positionX, positionY, this.myWidth, 35);
        pop();
        colorMode(RGB)
        textSize(20);
        text (this.myCode, positionX+this.myWidth+5, positionY+20);
        let currentGPD = (this.arrayOfData[year].y / 1).toFixed(2);
        text (currentGPD, positionX+this.myWidth+50, positionY+20);
    }

} // end of class

