//-------------How to play with sound in p5.js
sound = loadSound("music_name");// load a sound
sound.setVolume(10)// set the volume of the sound
sound.loop();// set the sound to loop automatically
sound.play();// play the sound
sound.stop();// stop the sound

amplitude = new p5.Amplitude();// create a Amplitude instance
amplitude.setInput(sound);// set the source of the amplitude to be sound
level = amplitude.getLevel();


//-------------How to draw things in p5.js
cnv = createCanvas(displayWidth,displayHeight)// create a Canvas with display size
storkeWeight(4)// set the stroke weight
line(0,0,0,5)// draw a vertical line that is 5px long
clear();// clear the screen
background(0,0,0);// set the background to be black

beginShape();
curveVertex(x,y);
endShape();

cursor('eraser.png');// set the cursor to the according picture(16x16 or 32x32);
//-------------How to deal with HTML UI components
input = creatInput();
input.addClass("input");// input is a piece of stype code in HTML

button_save = document.getElementById('button_SAVE');// link button_save with a button in HTML which id is "button_SAVE"
button_save.addEventListener("click", storetheshape);// add onclick listener with function storetheshape;
button_save.removeEventListener("click", storetheshape);// revome the function registrated under the button
button_save.innerHTML = "TEXT"

$('#select')
  .find('option')
  .revome()
  .end();// remove all the options from the select

var select = document.getElementById("select");
var option = document.createElement('option');
option.text = "option_text";
select.add(option,insertIndex);// create option and insert it into select at index insertIndex;




//-------------How to save and load data in local cookie
array = JSON.parse(localStorage.getItem("filename"));// load array from local cookie
localStorage.setItem("filename", JSON.stringify(array));// save array to local cookie




//-------------How to deal with arrays
append(array,value);
array.splice(startIndex,endIndex);







