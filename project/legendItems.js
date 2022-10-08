class LegendItem {
    constructor(name, id) {
        if (name === "UdSSR") name = "Russia";
        this._name = name;
        this._element = document.getElementById(id);
        this._element.addEventListener('click', this.setSelect);
        this._selected = false;
    }

    setSelect(select) {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
        }
        for (let i = 0; i < arrayOfCountries.length; i++) {
            let selectorName = this.lastElementChild.innerText;
            arrayOfCountries[i].toggleSelectCountry(selectorName);
        }
        calculateAllPoints();
    }
} // end of class

