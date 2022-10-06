class Button {
  constructor(_x, _y, _sZ, _tl) {
    this.myX = _x;
    this.myY = _y;
    this.mySize = _sZ;
    this.myTitle = _tl;
    this.myColor = color(128);
    this.myOverMeColor = color(200);
    this.myStrokeColor = color(255);
    this.mouseOverMe = false;
    this.selected = false;
    this.myTextSize = 24;
  }

  display() {
    push();
    fill(255, 0, 0);
    //ellipse (this.myX, this.myY, 5,5);

    this.mouseOverMe =
      mouseX > this.myX &&
      mouseX < this.myX + this.mySize &&
      mouseY > this.myY &&
      mouseY < this.myY + this.mySize;

    fill(this.myColor);
    if (this.mouseOverMe) fill(this.myOverMeColor);

    strokeWeight(1);
    stroke(this.myStrokeColor);
    rect(this.myX, this.myY, this.mySize, this.mySize);

    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(this.myTextSize);
    text(this.myTitle, this.myX + 3, this.myY + 40);

    if (this.selected) {
      strokeWeight(4);
      noFill();
      stroke(this.myStrokeColor);
      rect(this.myX, this.myY, this.mySize, this.mySize);
    }
    pop();
  }

  releasedOverMe() {
    if (this.mouseOverMe) this.selected = !this.selected;
  }
} // end of class

/* 
Hochschule für Gestaltung - Schwäbisch Gmünd
Grundlagen im medialen Raum - Projektarbeit
Anton Pelezki 
Carina Senger 
Luca Mário Ziegler Félix  
Tim Niedermeier 
                   ⢰⣶⣶⣦⣤⣀                                    
                   ⢸⣿⣿⣿⣿⣿⣿⣶⣤⣀         ⠤⣄⣀⡀        ⣀⣀⣤⣤⣤⣶⣦    
                   ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄        ⠘⢯⣗⣲⣤⣠⣤⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿    
                   ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠉     ⢀⡤⠖⠚⠉⠉⠉⠉⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇    
       ⣠⣤⣶⣶⣶⡆      ⢻⣿⣿⣿⣿⣿⣿⠛   ⢀⡀  ⠐⠚⠁⣀   ⣴⠚⠉   ⠉⠻⣿⣿⣿⣿⣿⣿⣿⠃    
     ⣤⣾⣿⣿⣿⣿⣿⡟      ⢸⣿⣿⣿⡿⠛⠁  ⢀⡴⠋   ⢀⣠⠚⠁⢀⣴⠖⠁ ⢰ ⢰⡀  ⠈⠻⣿⣿⣿⣿⡇     
   ⢠⣾⣿⣿⣿⣿⣿⣿⡟⠁      ⢸⣿⣿⡟⠑   ⣠⠟    ⣠⠞⠁ ⣠⠞⠁  ⢠⡟ ⢸⣧  ⢀ ⠈⢿⣿⣿      
  ⣠⣿⣿⣿⣿⣿⣿⣿⠋        ⣸⣿⠏    ⣰⠋   ⢠⡾⠃ ⢀⣴⠋   ⣴⢿⠃ ⡎⠹⣧ ⠈⣷⡀⠈⣿⡇      
 ⢰⣿⣿⣿⣿⣿⣿⡟⠁        ⣰⣶⠇  ⢀⡇⣰⠇⡔  ⣰⡟⠁ ⣠⣾⠃  ⢀⡞⢁⡟ ⣼⠁ ⢻⡦⠄⠸⣷ ⢹⣸      
 ⣾⣿⣿⣿⣿⣿⠏         ⢠⣿⡏   ⣼⢁⣏⡞ ⢀⣼⠏ ⣴⡿⢣⠏ ⢀⣾⠋ ⡼⠁⣼⠃  ⢸⣷⢤⣤⣿ ⠈⣿      
⢰⣿⣿⣿⣿⣿⡏         ⣠⣿⣿ ⠐ ⢰⠇⡾⠺⣄⣰⠋⡏⣠⣾⡟⠁⡞ ⣰⣿⠃ ⣰⢃⡼⠁   ⢸⢳⡶⠒⣿  ⣿      
⢸⣿⣿⣿⣿⣿         ⠶⠋⣾⡈⢠⣄⣀⣸⣰⡇⢀⡼⠙⢾⣴⣫⠏ ⢠⠇⡴⠁⠃ ⣰⣧⠞⠁    ⢸ ⡇ ⡇ ⢀⢸⡀     
⢸⣿⣿⣿⣿⣿           ⡇⡇⢸⣿⣿⠛⣿⣿⠿⢷⣶⣿⣶⣿⣭⣶⣾⣿⣁⣀⡀⣼⣽⡧⠶⠒⠉⠉⠉ ⡎⢰⡇⢸⠁ ⡞⢸      
⠸⣿⣿⣿⣿⣿⡆          ⣿⡇⢸⣿⣿⡀⢹⡟⢀ ⣿⡏⢸⣿⣿⠏⠉⣿⣿⣿⡿⢿⣿⡿⠿⣶⣶⣶⣶⣾⣥⣼⣇⣞⣆⣸⠁⣿      
 ⣿⣿⣿⣿⣿⣷⡀        ⣴⢏⣇⣾⣿⣿⡇⠸⢀⣿ ⡏⢀⣿⣿⠏⣰⡇⢸⣿⣿⠁⢸⣿⠁⣷⣶⣤⣾⡟⠉⣿⣿⡟⢹⣿⡏⣼⣿      
 ⢸⣿⣿⣿⣿⣿⣷⡄      ⡼⡃⢸⣿⣿⣿⣿⣇⣀⣼⣿⡇ ⣼⣿⠋⢀⣉⣉ ⢿⣿ ⣸⡟ ⣉⣉⣹⣿⡇⢰⣿⣿⠃⢸⣿⡿⠋⣿⡆     
  ⠻⣿⣿⣿⣿⣿⣿⣦⡀  ⢠⠞⣹⢡⣿⢻⡏⢹⢿⣿⣟⠛⠻⠿⠿⠿⠷⣶⣿⣿⣿⣦⣸⣯⣀⣿⡇⢀⣿⣿⣿⣿⡇⠸⣿⡿ ⣾⣿⠁⢰⣿⣷⡀    
   ⠙⢿⣿⣿⣿⣿⣿⣿⣶⣴⠏⢀⣧⡿⣿⠸⣿⠸⣎⢻⣿⡻⣄        ⠉⠉⠉⠉⠛⠛⠻⠿⠿⠿⢿⣿⣶⣤⣤⣾⣿⣿⢀⣿⠉⢧⡻⠄   
    ⠈⠙⢿⣿⣿⣿⣿⣿⣿ ⣾⡟ ⣿ ⢻⡇⢹⣆⠹⣧⠈⠳⠦⣄               ⢀⡤⢺⣿⡟⠉⣹⣿⣾⢿⡄⠈⢳⡀   
       ⠉⠻⢿⣿⣿⡏⡀⣿⠁ ⠸⣧⠈⢷⢸⢻⣷⣬⣷⣀    ⢰⣶⣾⣯⣽⣳⣦⣤      ⣠⡿⢋⣠⣾⡷⢛⢻⣿⣇⡇⢸⣿   
          ⠈⠙⢇⠙⠾⣆  ⠘⢷⣿⡟⢀⡙⢧⣿⣿⣛⠲⠄ ⠸⣿⡏  ⢙⣿⡇  ⠦⠤⢤⣶⣯⣾⢟⣫⡿⠁⣎⡾⠈⣿⢧⡞⢸⠇  
          ⢀⠴⠚⢧⡀⠈⠓⠄⢀⡴⠋⠙⠷⣶⡶⠾⣿⣿⣿⣃⡀ ⠉⢅⣀⣀⣘⡿⠁  ⣀⣴⣿⡿⠟⣻⡿⠋⢀⣾⣟⡁⢠⣿⠟⣠⡟   
         ⢀⡏   ⠉⠓⠶⠦⣤⣀⡠⢤⣀⣈⣽⡳⠯⣿⣿⣿⣿⣾⣄⡀  ⢀⣀⣤⣶⣿⡿⢟⡥⠴⠾⢥⣤⠞⣻⠋ ⠙⣿⡵⢟⡁⠻⢤⡀ 
         ⣼⢹  ⢠    ⣀⣀⡉⠛⡿⠋ ⣿⣄⢸⡿⣇⠹⣿⣿⣿⣿⣿⣿⣿⣿⠟⠉⠉⣙⣇   ⠙⡾⠁  ⣠⠋⠉⢳⡙⠲⣄⠁ 
         ⣿⠈⡆ ⠘⡇  ⢸⡁ ⠙⣾⠁ ⢸⠉⠻⣆⡇⢹⣀⠈⠙⢿⣿⣿⣿⢿⡏ ⣠⠞⣡⢜⣳⡄ ⢰⠁ ⣠⠞⠁ ⣠⠞⠉⡇⠈⢳⡀
         ⢹ ⠸⡄ ⢹⡀⣤⠒⢧⡀ ⠈⣇ ⢸⡀ ⢹⠇⣼⠉⢙⠦⢄⣈⡉ ⠼⡄⣼⠃⣴⡟⠋⢹⠇ ⣼ ⢠⠇ ⣠⠾⠁  ⠛  ⣷
         ⠼⡆ ⠱⡄ ⡧⢿⡀ ⠳⡄ ⠸⡦ ⢳⣴⣫⠾⠛⣷⣸⡀ ⢂   ⣻⣿⣰⠋  ⣿  ⠹⠤⢾⣀⡾⠁⢀⡠     ⡿
               ⡅ ⠙⣄ ⠙⢦⡀⣿  ⢹⡀⣀⣀⣼⡍⠻⠿⠙⢶⠞⠛⠉⣻⣿   ⠘⢦⡀   ⠈⠛⠒⠻⠄      
               ⠛⠳⠆⠈⠳⠤⠨⠗⠛   ⠏⠻⠇⠼⠁⠂   ⠃ ⠸⠋⠿⠷⠄ ⠰⠃⠙⠲⠤            ⣀
 */
