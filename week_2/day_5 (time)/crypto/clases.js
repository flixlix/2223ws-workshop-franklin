class Country {

    constructor () {
        this.myName = "";
        this.myCode = "";
        this.arrayOfData = [];
        this.arrayOfpoints = [];
        this.overMe = false;
        this.selected = false;

        this.miColorNormal = color(255, 150, 100, 150);
        this.miColorOver = color(255, 255, 255);


        this.numYears = 64; // define la distribución de los puntos en Xs
        this.stepX = (width - 150) / this.numYears;
        this.xBorder = 25;
    }

    calculatePoints (lineaBase) {
        for (let agno = 0; agno < this.arrayOfData.length; agno++) {
            let secX = this.xBorder + (agno) * this.stepX;
            let secY = map (this.arrayOfData[agno].y, 10000000, 22000000000000,  lineaBase, 150);
            let currentPoint = createVector (secX,secY);
            this.arrayOfpoints.push(currentPoint);
        }

        if(this.myCode === "DEU") {
            this.selected=true;
        }
    };


    drawCountryGDP ( lineaBase ) {
        this.isOverMe();

        for (let agno = 0; agno < this.arrayOfData.length; agno++) {
            if (this.overMe || this.selected) {
                fill(this.miColorOver);
                stroke(this.miColorOver);
                strokeWeight (3);
            } else {
                fill(this.miColorNormal);
                stroke(this.miColorNormal);
                strokeWeight (1);
            }

            ellipse(this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y, 3,3);
            stroke(this.miColorNormal);
            if (agno > 0) line(this.arrayOfpoints[agno-1].x, this.arrayOfpoints[agno-1].y, this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y);

            if (this.selected) {
                fill(200);
                noStroke();
                textSize(18);
                text( this.myCode, this.arrayOfpoints[this.arrayOfData.length-1].x+5, this.arrayOfpoints[this.arrayOfData.length-1].y);
            }

        }

    };

    isOverMe () {
        let ifAny = false;
        for (let agno = 0; agno < this.arrayOfData.length; agno++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y);
            if (distance < 5) {
                fill(200);
                textSize(24);
                text( (this.arrayOfData[agno].y/ 1000000000000).toFixed(2) + " MoM",       this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y-70);
                text( this.myName, this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y-45);
                text( this.arrayOfData[agno].x, this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y-20);
                ifAny = true;
            }
        }
        this.overMe = ifAny;
    };

    clickOverMe () {
        for (let agno = 0; agno < this.arrayOfData.length; agno++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[agno].x, this.arrayOfpoints[agno].y);
            if (distance < 5) this.selected = !this.selected;
        }
    }

} // end of class

