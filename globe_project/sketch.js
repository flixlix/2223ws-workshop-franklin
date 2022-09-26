/*
created by franklin hernandez-castro, www.skizata.com
tec costa rica, hfg sch.gmünd
2019
 */
function preload(){
    mapa = loadImage ('data/mapaMundi1800x600.png');
}


function setup() {
    createCanvas(800, 800, WEBGL);
    setAttributes('antialias', true);

    let easycam = new Dw.EasyCam(this._renderer, {distance : 400});
}

function draw() {
    background(255);

    // projection
    perspective(60 * PI/180, width/height, 1, 5000);

    // objects
    noStroke();
    

   

        translate(0, 0, 0);
        sphere(100);
        texture(mapa);
    }
