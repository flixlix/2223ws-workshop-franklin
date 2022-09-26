/*
franklin hernandez-castro
www.skizata.com
TEC costa rica, hfg schw. gmuend
2019
 */

class Button {
    constructor ( _x,_y, _sZ, _tl ){
        this.myX = _x;
        this.myY = _y;
        this.mySize = _sZ;
        this.myTitle = _tl;
        this.myColor = color(128);
        this.myOverMeColor = color(200);
        this.myStrokeColor = color(255);
        this.mouseOverMe = false;
        this.selected = false;
        this.myTextSize = 18;
    }

    display () {

        fill(255,0,0);
        //ellipse (this.myX, this.myY, 5,5);

        this.mouseOverMe = mouseX > this.myX  && mouseX < this.myX + this.mySize &&
            mouseY > this.myY  && mouseY < this.myY + this.mySize ;

        fill(this.myColor);
        if (this.mouseOverMe) fill(this.myOverMeColor);

        strokeWeight(1);
        stroke(this.myStrokeColor);
        rect(this.myX, this.myY, this.mySize, this.mySize);

        fill(255);
        noStroke();
        textAlign(LEFT);
        textSize(this.myTextSize);
        text(this.myTitle, this.myX + this.mySize + this.myTextSize, this.myY + this.myTextSize);

        if(this.selected){
            strokeWeight(4);
            noFill();
            stroke(this.myStrokeColor);
            rect(this.myX, this.myY, this.mySize, this.mySize);
        }
    }

    releasedOverMe () {
        if (this.mouseOverMe) this.selected = !this.selected;
    }

} // end of class