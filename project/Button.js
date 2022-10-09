class Button {
  constructor(title) {
    this._title = title;
    this._element = "";
    this._mouseOverMe = false;
    this._selected = false;
    this._element = document.getElementById(this._title);
  }

  show() {
    this._element.style.display = "inline";
  }

  hide() {
    this._element.style.display = "none";
  }

  changeActivity(active) {
    if(active) {
      this._element.classList.add('active');
    } else {
      this._element.classList.remove("active");
    }
  }

  releasedOverMe() {
    if (this.mouseOverMe) this._selected = !this._selected;
  }

} // end of class

function buttonClicked() {
  this._selected = !this._selected;
  this._selected = !this._selected;
}

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
