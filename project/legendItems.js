class LegendItem {
    constructor(element) {
        this._name = "";
        this._element = document.getElementById(element);
        console.log("this 1: ", this)
        this._element.addEventListener('click', this.setSelect);
        this._selected = false;
    }

    setSelect(select) {
        if(this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
        }
        console.log(this.classList.contains("active"))
    }


    itemClicked() {
        this._selected = !this._selected;
    }
} // end of class

