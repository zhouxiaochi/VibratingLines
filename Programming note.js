//-------------How to play with sound in p5.js
sound = loadSound("music_name");// load a sound
sound.setVolume(10)// set the volume of the sound

amplitude = new p5.Amplitude();// create a Amplitude instance

//-------------How to draw things in p5.js
storkeWeight(4)// set the stroke weight
line(0,0,0,5)// draw a vertical line that is 5px long



//-------------How to deal with HTML UI components
input = creatInput();
input.addClass("input");// input is a piece of stype code in HTML

button_save = document.getElementById('button_SAVE');// link button_save with a button in HTML which id is "button_SAVE"
button_save.addEventListener("click", storetheshape);// add onclick listener with function storetheshape;








