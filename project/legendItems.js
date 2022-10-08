class LegendItem {
    constructor(name, id) {
        this._name = name;
        this._element = document.getElementById(id);
        this._element.addEventListener('click', this.setSelect);
        this._selected = false;
    }

    setSelect(select) {
        if(this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
        }
        for(let i = 0; i < arrayOfCountries.length; i++) {
            if (arrayOfCountries[i]._name === this.lastElementChild.innerText) {
                arrayOfCountries[i]._isSelected = !arrayOfCountries[i]._isSelected;
            }
        }
    }


    itemClicked() {
        this._selected = !this._selected;
    }
} // end of class

