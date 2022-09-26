/*
created by franklin hernandez-castro, www.skizata.com
tec costa rica, hfg sch.gmünd
2019
 */


function setup() {
    createCanvas(400, 400, WEBGL);
    setAttributes('antialias', true);

    let easycam = new Dw.EasyCam(this._renderer, {distance : 400});
}

function draw() {
    background(64);

    // projection
    perspective(60 * PI/180, width/height, 1, 5000);

    // objects
    noStroke();
    randomSeed(2);

    for(var i = 0; i < 150; i++){
        push();
        var m = 100; //how far apart
        // random position
        var tx = random(-m, m);
        var ty = random(-m, m);
        var tz = random(-m, m);

        // color by position
        var r = ((tx / m) * 0.5 + 0.5) * 255;
        var g = ((ty / m) * 0.5 + 0.5) * r;
        var b = ((tz / m) * 0.5 + 0.5) * 255;

        translate(tx, ty, tz);
        fill(r,g,255-r);
        box(random(10,40));
        pop();
    }
}