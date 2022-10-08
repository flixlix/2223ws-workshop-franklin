class Country {

    constructor() {
        this._name = "";
        this._index = "";
        this._arrayOfData = [];
        this._arrayOfPoints = [];
        this._overMe = false;
        this._isSelected = false;

        this._color = color(186, 30, 104);
        this._colorIsOver = color(252, 251, 254);

        this._stepX = (width - 150) / (yearsDisplayed - 1);
        this._xBorder = 75;
    }



    // calculates the pixel position of each year in the country
    calculatePoints(xLine) {
        this._stepX = (width - 150) / (yearsDisplayed - 1);
        this._arrayOfPoints = [];
        for (let year = 0; year < yearsDisplayed; year++) {
            let valueX;
            /* old way of calculating x coordinate */
            /* valueX = this._xBorder + (year) * this._stepX; */
            if (yearsDisplayed === 1) {
                valueX = 75;
            } else {
                valueX = map(this._arrayOfData[year].x - 1957, 0, yearsDisplayed - 1, 75, width - 75);
            }

            let valueY = map(this._arrayOfData[year].y, 0, 108, xLine, topY);
            let currentPoint = createVector(valueX, valueY);
            this._arrayOfPoints.push(currentPoint);
        }
    }


    drawNumRocketLaunch(xLine) {
        /*         let legendTopY = 10;
                let legendLeftX = width / 2 - 15;
                push();
                textAlign(LEFT, TOP);
                textLeading(0);
                text(this._name, legendLeftX + 15, ((this._index - 1) * 20) + legendTopY);
                pop();
                push();
                fill(this._color)
                rect(legendLeftX, (((this._index - 1) * 20) + 2) + legendTopY, 10, 10);
                pop(); */
        /* this.is_overMe(); */
        push();
        for (let year = 0; year < yearsDisplayed; year++) {
            if (this.isAnySelected() && !this._isSelected) {
                /* more transparent colors */
                this.setColorAlpha(40);
            } else {
                this.setColorAlpha("ff");
            }
            stroke(this._color);
            if (year > 0) line(this._arrayOfPoints[year - 1].x, this._arrayOfPoints[year - 1].y, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y);
            if (this._isSelected) {
                fill(200);
                textSize(18);
                noStroke();
                /* text( this._name, this._arrayOfPoints[this._arrayOfData.length-1].x+5, this._arrayOfPoints[this._arrayOfData.length-1].y); */
            }
            if (this._overMe || this._isSelected) {
                fill(this._colorIsOver);
                stroke(this._colorIsOver);
                strokeWeight(3);
            } else {
                fill(this._color);
                stroke(this._color);
                strokeWeight(0.5);
            }

            ellipse(this._arrayOfPoints[year].x, this._arrayOfPoints[year].y, 3, 3);

        }
        pop();
    }




    is_overMe() {
        push();
        let ifAny = false;
        for (let year = 0; year < yearsDisplayed; year++) {
            let distance = dist(mouseX, mouseY, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y);
            if (distance < 20) {
                fill(200);
                textSize(24);
                let descriptionText;

                /* create dynamic description, based on value, singular or plural */
                if ((this._arrayOfData[year].y * 1).toFixed(0) != 1) {
                    descriptionText = "Space Flights";
                } else {
                    descriptionText = "Space Flight"
                }
                text((this._arrayOfData[year].y * 1).toFixed(0) + " " /* add whitespace between value and text */ + descriptionText, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y - 70);
                text(this._name, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y - 45);
                text(this._arrayOfData[year].x, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y - 20);
                ifAny = true;
            }
        }
        this._overMe = ifAny;
        pop();
    };

    clickOverMe() {

        for (let year = 0; year < yearsDisplayed; year++) {
            let distance = dist(mouseX, mouseY, this._arrayOfPoints[year].x, this._arrayOfPoints[year].y);
            if (distance < 20) {
                this._isSelected = !this._isSelected;
            }
        }

    }

    setOthersSelectedFalse() {
        /* run through all countries and set _isSelected as false but not on this object */
        for (let i = 0; i < arrayOfCountries.length; i++) {
            if (arrayOfCountries[i]._name != this._name) {
                arrayOfCountries[i]._isSelected = false;
            }
        }
    }


    isAnySelected() {
        let isAny = false;
        for (let i = 0; i < arrayOfCountries.length; i++) {
            if (arrayOfCountries[i]._isSelected) {
                isAny = true;
            }
        }
        return isAny;
    }

    setColorAlpha(alphaValue) {
        this._color = this._color.slice(0, -2);
        this._color = this._color + alphaValue;
    }

    toggleSelectCountry(selectorName) {
        if(selectorName === "UdSSR") {
            
        }
        if (this._name === selectorName) {
            this._isSelected = !this._isSelected;
        }
    }
} // end of class

