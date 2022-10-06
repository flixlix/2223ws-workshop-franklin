let launchDataByCountry;
let colorsOfEachCountry;
let rocketLaunches;
let eventsData;
const minLaunches = 30; /* Minimum number of launches per country to it to be displayed */
const arrayOfCountries = [];
const arrayOfEvents = [];
let currentYear;
let xLine;
let numYears; /* to be reassigned in the beginning of setup */
let yearsDisplayed;
let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const topY = 150;
let lineMaxX;
let lineMinX;
let playButton;
let skipButton;
let backButton;
let totalskipButton;
let totalbackButton;

function preload() {
  launchDataByCountry = loadTable(
    "data/launches_by_year.csv",
    "csv",
    "header"
  );
  colorsOfEachCountry = loadTable(
    "data/colors_of_each_country.csv",
    "csv",
    "header"
  );
  rocketLaunches = loadTable("data/rocket_launches.csv", "csv", "header");
  eventsData = loadTable("data/special_events.csv", "csv", "header");
}

function setup() {
  createCanvas(1400, 900); /* size of canvas in x and y direction */
  frameRate(60);
  let currentCountry;
  let currentEvent;
  playButton = new Button(width/2-10, height-50, 20, "󰐊");
  skipButton = new Button(width/2+40, height-50, 20, ">");
  backButton = new Button(width/2-60, height-50, 20, "<");
  totalskipButton = new Button(width/2+90, height-50, 20, ">>");
  totalbackButton = new Button(width/2-110, height-50, 20, "<<");
  currentYear = 0;
  xLine = height - 100;
  numYears = launchDataByCountry.rows.length; /* 61 */
  yearsDisplayed = 1; /* assign number of points to number of rows in original csv */
  if (yearsDisplayed > launchDataByCountry.rows.length || yearsDisplayed < 1) {
    console.warn("You entered too many years, resetting value...")
    yearsDisplayed = launchDataByCountry.rows.length; /* 61 */
  }

  /* Run through all columns except first column of header row & Create Country objects */
  for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
    currentCountry = new Country();
    currentCountry._name = launchDataByCountry.columns[currentColumn]; /* add name of country to object */
    currentCountry._index = currentColumn;
    arrayOfCountries.push(currentCountry);
  }

  /* Run through all columns of color csv file and assign that color to country objects */
  for (let currentColumn = 0; currentColumn < colorsOfEachCountry.getColumnCount(); currentColumn++) {
    arrayOfCountries[currentColumn]._color = "#" + colorsOfEachCountry.rows[0].arr[currentColumn]; /* assign color from csv to country object */
  }

  /* add new value to array of data to each country */
  for (let currentRow = 0; currentRow < launchDataByCountry.getRowCount(); currentRow++) {
    let _date = launchDataByCountry.rows[currentRow].arr[0]; /* get date of current row */

    /* run through all columns in current row */
    for (let currentColumn = 1; currentColumn < launchDataByCountry.getColumnCount(); currentColumn++) {
      let _rocket_launches = launchDataByCountry.rows[currentRow].arr[currentColumn]; /* get number of rocket launches on current cell */
      let _vector = createVector(_date, _rocket_launches); /* create a vector with current date and current number of rocket launches */

      /* index gets subtracted by 1, because of the date column */
      arrayOfCountries[currentColumn - 1]._arrayOfData.push(_vector); /* assign vector to countries array of data */
    }
  }

  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    //calculates the pixel position of each year in the country
    arrayOfCountries[country].calculatePoints(xLine);
  }

  for (let i = 0; i < eventsData.rows.length; i++) {
    currentEvent = new Marker();
    currentEvent._name = eventsData.rows[i].obj.Country;
    currentEvent._index = i;
    currentEvent._date = eventsData.rows[i].obj.Date;
    currentEvent._decimalYear = eventsData.rows[i].obj.Position;
    currentEvent._description = eventsData.rows[i].obj.Event;
    currentEvent._crew = eventsData.rows[i].obj.Crew
    currentEvent.calculatePositionX(xLine);
    arrayOfEvents.push(currentEvent)
  }
}

function draw() {



  if (frameCount % 1 === 0 && playButton.selected)  {
    if (yearsDisplayed <= launchDataByCountry.rows.length - 1) {
      yearsDisplayed = (yearsDisplayed * 1.005) + 0.05;
    } else {
      yearsDisplayed = launchDataByCountry.rows.length;
    }
    for (let country = 0; country < arrayOfCountries.length; country++) { // countries
      //calculates the pixel position of each year in the country
      arrayOfCountries[country].calculatePoints(xLine);
    }
    for (let i = 0; i < arrayOfEvents.length; i++) {
      arrayOfEvents[i].calculatePositionX(xLine);
    }
  }

  background("#0f0326"); /* color of background of canvas */
  fill(255);
  textSize(30);
  text("Rocket launches throughout history", 50, 50)
  textSize(15);
  text("First Launch date: " + rocketLaunches.rows[0].obj.date, 50, 75);
  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    arrayOfCountries[country].drawNumRocketLaunch(xLine);
  }
  for (let event = 0; event < arrayOfEvents.length; event++) { // events
    arrayOfEvents[event].drawMarker(xLine);
  }
  playButton.display();
  skipButton.display();
  backButton.display();
  totalskipButton.display();
  totalbackButton.display();
}


function mouseReleased() {
  playButton.releasedOverMe();
  for (let country = 0; country < arrayOfCountries.length; country++) { // countries
    arrayOfCountries[country].clickOverMe();
  }
  for (let event = 0; event < arrayOfEvents.length; event++) { // countries
    arrayOfEvents[event].clickOverMe();
  }

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
