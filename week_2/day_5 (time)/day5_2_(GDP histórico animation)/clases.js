class Country {

    
    constructor () {
        this.myName = "";
        this.myCode = "";
        this.arrayOfData = [];
        this.arrayOfpoints = [];
        this.overMe = false;
        this.selected = false;

        this.myColor = color(255, 150, 100, 150);
        this.myOverColor = color(255, 255, 255);

        this.numYears = 64; // define la distribución de los puntos en Xs
        this.stepX = (width - 150) / this.numYears;
        this.xBorder = 25;
    }

    // calculates the pixel position of each year in the country
    calculatePoints (baseLine) {
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let secX = this.xBorder + (year) * this.stepX;     
            let secY = map (this.arrayOfData[year].y, 10000000, 22000000000000,  baseLine, 150);
            let currentPoint = createVector (secX,secY);
            this.arrayOfpoints.push(currentPoint);
        }
    };


    drawCountryGDP ( baseLine ) {
        this.isOverMe();

        for (let year = 0; year < this.arrayOfData.length; year++) {
            if (this.overMe || this.selected) {
                fill(this.myOverColor);
                stroke(this.myOverColor);
                strokeWeight (3);
            } else {
                fill(this.myColor);
                stroke(this.myColor);
                strokeWeight (1);
            }
            ellipse(this.arrayOfpoints[year].x, this.arrayOfpoints[year].y, 3,3);

            // for lines between points
            stroke(this.myColor);
            if (year > 0) line(this.arrayOfpoints[year-1].x, this.arrayOfpoints[year-1].y, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);

            if (this.selected) {
                fill(200);
                textSize(18);
                noStroke();
                text( this.myCode, this.arrayOfpoints[this.arrayOfData.length-1].x+5, this.arrayOfpoints[this.arrayOfData.length-1].y);
            }
        }
    };

    displayBall(year) {
        fill(250, 150, 150, 50);
        noStroke();
        if (this.arrayOfpoints[year].y < 1127){ // 1140
            // drawing dates
            let mySize = round(map (this.arrayOfpoints[year].y, 1200, 150,  1, 500));
            ellipse(this.arrayOfpoints[year].x, this.arrayOfpoints[year].y, mySize, mySize);

            // text
            fill(200);
            noStroke();
            textAlign(CENTER);
            textSize(10);
            text( this.myCode, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y-5);
            text( year+1960, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y+15);
        }
    }

    isOverMe () {
        let ifAny = false;
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);
            if (distance < 5) {
                fill(200);
                textSize(24);
                text( (this.arrayOfData[year].y/ 1000000000000).toFixed(2) + " MoM",       this.arrayOfpoints[year].x, this.arrayOfpoints[year].y-70);
                text( this.myName, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y-45);
                text( this.arrayOfData[year].x, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y-20);
                ifAny = true;
            }
        }
        this.overMe = ifAny;
    };

    clickOverMe () {
        for (let year = 0; year < this.arrayOfData.length; year++) {
            let distance = dist(mouseX, mouseY, this.arrayOfpoints[year].x, this.arrayOfpoints[year].y);
            if (distance < 5) this.selected = !this.selected;
        }
    }

} // end of class

