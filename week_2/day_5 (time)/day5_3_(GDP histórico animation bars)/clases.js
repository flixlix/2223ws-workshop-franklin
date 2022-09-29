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
    }

    displayBar(year, positionX, positionY) {
        this.myWidth = map (this.arrayOfData[year].y, 3, 55,  0, 1000);
        rect(positionX, positionY, this.myWidth, 35);
        textSize(20);
        text (this.myCode, positionX+this.myWidth+5, positionY+20);
        let currentGPD = (this.arrayOfData[year].y / 1).toFixed(2) + " per 100k";
        text (currentGPD, positionX+this.myWidth+50, positionY+20);
    }

} // end of class

