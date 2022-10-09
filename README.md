Hochschule für Gestaltung - Schwäbisch Gmünd
Grundlagen im medialen Raum - Projektarbeit
Anton Pelezki 
Carina Senger 
Luca Mário Ziegler Félix  
Tim Niedermeier



# [Project Folder](project/)
## The task

Our task was to create a paradigm using the [P5JS Library](https://p5js.org/).
The data must come in form of either a .json or a .csv file.
From that data a user of the paradigm ust be able to extract some information or learn something about the data displayed.

The following parameters were given as a requirement:
 - cohernt design
 - low cognitive burden
 - interaction
 - information from the data (aha effect)

## Our solution

We chose the theme: Rocket launches throughout history.

[Source of the data](https://thespacedevs.com/llapi)

For that, we downloaded a .csv file containing the number of flights per country per day since 1957 until 2023 (we only used the data until OCT'22, because the rest are mere predictions). 

From the same source, we also downloaded a .csv file containing all space flights, ordered by day of departure. From this file, we extracted 5 notable flights to also display this information.

## Features

### Countries legends

In the top left corner, we implemented a legend that also serves as a country selector. Clicking on a country will highlight its points. It is possible to select multiple countries at once.

### xaxis extremas label

On the x- as well as on the y-axis, we implemented a label indicating the minimum and maximum value of the range.

### Notable launches markers

After deciding on five notable launches throughout history, we put markers on the exact time they took place. 
These markers are displayed on the exact portion of the year, meaning for eg: a launch that took place on the 27th of December of 1957 will be much closer to the point displaying 1958 than the point displaying 1957.
By clicking on these markers, the user can find out more details about the launch (exact date, country of operation, description and crew).

### Action Buttons Row

#### Auto Scale Button

<img src="project/images/auto-scale.svg" width= "100px"/>

The first button allows the user to select wether or not the y axis is dynamic.
This means, for eg: 
  - The user selects the country "Brazil"
  - If the Auto Scale feature is enabled:
    - The maximum value of the selected country will be displayed on the top of the graph
  - If the Auto Scale feature is disabled:
    - The maximum value of the selected country will be displayed on the same height as before selction
    
#### Skip to Previous / Next Year

<img src="project/images/skip-previous.svg" width= "100px"/> <img src="project/images/skip-next.svg" width= "100px"/>

Using the skip previous / next buttons, the user can manually adjust the time scope that is displayed.

#### Skip to First / Last Year

<img src="project/images/skip-backward.svg" width= "100px"/> <img src="project/images/skip-forward.svg" width= "100px"/>

Using the skip to First / to Last buttons, the user can manually adjust the time scope that is displayed.

#### Play / Pause

<img src="project/images/play.svg" width= "100px"/> <img src="project/images/pause.svg" width= "100px"/>

Using the play / pause buttons, the user can toggle the animation, in which the years are exponentially incremented.

The play / pause buttons behaviour is the same as can be viewed on any youtube video:
  - The play button is displayed if the animation is off.
  - The pause button is displayed if the animation is on.




![Project Screenshot](project/images/screenshot.png)

## Keyboard shortcuts

SPACEBAR: start/stop animation
LEFTARROW: skip to previous year
RIGHTARROW: skip to next year
PgUp: skip to first year
PgDn: skip to last year
m: select next marker
n: select previous marker

