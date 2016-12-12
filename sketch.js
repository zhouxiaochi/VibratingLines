/*
 * @name Simple Draw
 * @description Touch to draw on the screen using touchX, touchY, ptouchX, and ptouchY values. 
 */
 
 
 var volume = 20;
 var amp = 5;
 
 
 var music_1 = '1.mp3'
 var music_2 = '2.mp3'
 var music_3 = '3.mp3'
 var music_4 = '4.mp3';
  
 
 var sound1;
 var sound2;
 var sound3;
 var sound4;
 var sound5;
 
 var indicator;
 
 var MUSIC_LIST = new Array();
  
 var flag = false;
 var isdrawing = true;
  
  var input;
  var button_save;
  var button_load;
  var button_test;
  
  var button_music_1;
    var button_music_2;
	  var button_music_3;
	    var button_music_4;
 		  var button_music_5;
		  
  
 var array_x = new Array(); 
 var array_y = new Array();
  var x_string = new Array();
  var y_string = new Array();
  var names = new Array();
  var temp_names = new Array();
 var noiseScale = 8;
var sound, amplitude, cnv;
  
 var stored_x_array;
 var stored_y_array;
 var inputvalue;
 
 var startpoint;
 var breakpoints = new Array();
 var changemusic = false;
 
 var stop = -1;
 //-------------------------------------
 var music_5 = 'siren.wav';
 
 function preload(){
 

frameRate(24);// set the framerate
 
sound1 = loadSound(music_1);
sound2 = loadSound(music_2);
sound3 = loadSound(music_3);
sound4 = loadSound(music_4);
sound5 = loadSound(music_5);
 
 sound1.setVolume(volume);
 sound2.setVolume(volume);
 sound3.setVolume(volume);
 sound4.setVolume(volume);

 
 
append(MUSIC_LIST,sound1);
append(MUSIC_LIST,sound2);
append(MUSIC_LIST,sound3);
append(MUSIC_LIST,sound4);
 
}
 
 function setup() {
 
    indicator  = 1;// indicator indicates the which music should be played, it will change when difference number button is pressed
  

    amplitude = new p5.Amplitude();// 
    cnv = createCanvas(displayWidth, displayHeight);
    cnv.position(displayWidth / 6, 0);
   
	 
	strokeWeight(2)
    background(0, 0, 0);// set up the background to be black
	 
	 
	 
    stroke(255,255,255);
    strokeWeight(3);
    line(0, 0, 0, displayHeight);// draw a vertical white line seperating the screen
  
  
	input = createInput();
	input.addClass("input");// create a input which belongs to the Style class "input" on the screen 
 
  
 
 
  button_save = document.getElementById('button_SAVE');
  button_save.addEventListener("click", storetheshape);// the button that saves the shapes
  
   
  button_load = document.getElementById('button_LOAD');// the button that load the shapes after a shape is selected in select
  button_load.addEventListener("click", loadtheshape);
  
  button_clear = document.getElementById('button_CLEAR');
  button_clear.addEventListener("click", clearscreen);// the button that clears the screen
 
  button_eraser = document.getElementById('button_ERASER');// the button that can toggle between painter and eraser
  button_eraser.innerHTML = "ERASE";
  button_eraser.addEventListener("click", erase);
 
  button_stop = document.getElementById('button_STOP');// the button that can toggle between play and stop
  button_stop.innerHTML = "STOP";
  button_stop.addEventListener("click", function()
			       { stop = stop * -1;// integer that serve as the flag for playing/stopping the sound
				if(stop === 1){MUSIC_LIST[indicator-1].stop();
					       button_stop.innerHTML = "PLAY"}
				else{MUSIC_LIST[indicator-1].loop();
				     MUSIC_LIST[indicator-1].play();
				     button_stop.innerHTML = "STOP"} 
			       });

 
 
  button_music_1 = document.getElementById('button_FIRST_MUSIC');
  button_music_1.addEventListener("click", function(){stop = -1; 
						      button_stop.innerHTML ="STOP";
						      indicator = 1; flag = true;
						      amplitude.setInput(sound1); 
													  
							  for(var i = 0; i < MUSIC_LIST.lenght; i++)
							  {
							  	MUSIC_LIST[i].stop();
							  }
								MUSIC_LIST[indicator].loop();
								MUSIC_LIST[indicator].play();
					  
  button_music_2 = document.getElementById('button_SECOND_MUSIC');
  button_music_2.addEventListener("click", function(){stop = -1; 
						      button_stop.innerHTML ="STOP";
						      indicator = 2;flag = true;
						      amplitude.setInput(sound2);
						
							  for(var i = 0; i < MUSIC_LIST.lenght; i++)
							  {
							  	MUSIC_LIST[i].stop();
							  }
								MUSIC_LIST[indicator].loop();
								MUSIC_LIST[indicator].play();													  


  button_music_3 = document.getElementById('button_THIRD_MUSIC');
  button_music_3.addEventListener("click", function(){stop = -1;
						      button_stop.innerHTML ="STOP";
						      indicator = 3;flag = true;
						      amplitude.setInput(sound3); 

							  for(var i = 0; i < MUSIC_LIST.lenght; i++)
							  {
							  	MUSIC_LIST[i].stop();
							  }
								MUSIC_LIST[indicator].loop();
								MUSIC_LIST[indicator].play();
													  
   button_music_4 = document.getElementById('button_FOURTH_MUSIC');
  button_music_4.addEventListener("click", function(){stop = -1; 
						      button_stop.innerHTML ="STOP";
						      indicator = 4;
						      flag = true;
						      amplitude.setInput(sound4);
							  
							  for(var i = 0; i < MUSIC_LIST.lenght; i++)
							  {
							  	MUSIC_LIST[i].stop();
							  }
								MUSIC_LIST[indicator].loop();
								MUSIC_LIST[indicator].play();
	 
	 
 //    button_music_5 = document.getElementById('button_FIFTH_MUSIC');
 //    button_music_5.addEventListener("click", function(){indicator = 5;flag = true;amplitude.setInput(sound5);sound5.loop(); sound5.play(); sound2.stop(); sound1.stop(); sound3.stop(); sound4.stop(); });
  
 // Text wraps within text box
  
    temp_names = JSON.parse(localStorage.getItem("filenames")); //temp_names--get the stored filenames * 1;
  
	if(typeof temp_names ==='object' && temp_names instanceof Array ){addList();}//
  	else
  	{
  	temp_names = new Array();
  	append(temp_names,"Sample");
  	}
  
}

function mousePressed()
{
 
    if(isdrawing)
  {
   breakline();// add break points (-1,-1) to indicate that a new stroke is started
   
   breakpoints= new Array();// initialize the breakpoints array
   append(breakpoints,0);
 

 for(var i = 0; i < array_x.length;i++)// iterate through the array_x which stores the x coordinates, recreate breakpoints array
{
  if(array_x[i] < 0)
  {
  append(breakpoints,i)
  }
}
 	  
	}

   
}

function touchMoved() {

//----------------------------------------------------------------	
  if(isdrawing)
  {
  clear();
  background(0, 0, 0);// initialize the canvas 
	  
//----------------------------------------------------------------
	  
	  
	  
  drawshape();
	  
	  
//----------------------------------------------------------------	  
//recalculate the breakpoints array basing on new array_x and array_y
  append(array_x,touchX);
  append(array_y,touchY);
  
  breakpoints = new Array();
  append(breakpoints,0);
	  
    for(var i = 0; i < array_x.length;i++)
{
  if(array_x[i] < 0)
  {
  append(breakpoints,i)
  }
}
  append(breakpoints,array_x.length);
  
//----------------------------------------------------------------	  
	  
	
	  
  for(var i = 0; i < breakpoints.length;i++)
{
  beginShape();
  for(var j = breakpoints[i]; j <= breakpoints[i+1];j++)
  {
    
    var noiseVal = random (size);
    var x = array_x[j] 
    noiseVal = random (size);
    var y = array_y[j] + noiseVal 
   if(x > 0 )
   {
     curveVertex(x,  y);
 
   }
  }
  endShape();
}
  
	  
	  
	  
	  
	  
	  
	  
	  
	  
}
 
else
{
  var minx = touchX - 8;
  var maxx = touchX + 8;
  var miny = touchY - 8;
  var maxy = touchY + 8;
  
   
for(var i = 0; i < breakpoints.length;i++)
{  
 
  for(var j = breakpoints[i]; j <= breakpoints[i+1];j++)
   {
    var x = array_x[j] ;
    var y = array_y[j] ;
//    if (( x > minx )&& (x < minx)  && (maxy > y) && (y > miny))
    if ((x > minx) && (x < maxx))
 
    {
    	if((y > miny) && (y < maxy)){
  
    	array_x.splice(breakpoints[i] + 1, breakpoints[i+1]);
     	array_y.splice(breakpoints[i] + 1, breakpoints[i+1]);
    	
 breakpoints= new Array();

 append(breakpoints,0);

  for(var n = 0; n < array_x.length;n++)
{
  if(array_x[n] < 0)
  {
  append(breakpoints,n)
  }
}
    	
      j =  breakpoints[i+1] + 1;
      i = breakpoints.length + 1;
      
  
    	}
    }
  }
 
  
}
  clear();
  background(0, 0, 0);
  drawshape();
 
  
}

  return false;
   
} 

function draw(){
  
 
  
 if(flag)
 {
 
	 
	 
 
fill(255);
 
 
 

  //
 background(0,0,0);

 
 drawshape();
 
 

 

}
}
 
 
 
function storetheshape()
{
 x_string = new Array();
 y_string = new Array();

  for(var i = 0; i < array_x.length; i++)
{
  append(x_string,String(array_x[i]));
  append(y_string,String(array_y[i]));
}

localStorage.setItem(input.value() + "x", JSON.stringify(x_string));
localStorage.setItem(input.value() + "y", JSON.stringify(y_string));
localStorage.setItem(input.value() + "indicator", indicator.toString());
inputvalue = input.value();
 
	
    append(temp_names,input.value());
    localStorage.setItem("filenames", JSON.stringify(temp_names));
    addList();
}

function loadtheshape()
{
	clearscreen();
  stop = 1;
  for(var c = 0 ; c < MUSIC_LIST.length; c++)
  {
  MUSIC_LIST[c].stop();
  }
   button_stop.innerHTML = "PLAY";
 
  

 var e = document.getElementById("year");
  
inputvalue =   e.options[e.selectedIndex].text;
stored_x_array = JSON.parse(localStorage.getItem(inputvalue + "x"));
stored_y_array =  JSON.parse(localStorage.getItem(inputvalue + "y"));

 indicator =  localStorage.getItem(inputvalue + "indicator") ;
  

 
  for(var i = 0; i <  stored_x_array.length  ; i++)
  {
    var x  = parseInt(stored_x_array[i]);
    var y  = parseInt(stored_y_array[i]);
    array_x[i] = x;
    array_y[i] = y;
    
  }
  flag = true;
 draw();
 
}

function startmoving()
{

   flag = true;
  draw();
}

 
function drawshape()
{ 
	
   
  var level = amplitude.getLevel();
  
  var size = map(level, 0, 1, 0, 200);
  size = size * amp;
  noFill();
 

line(0, 0, 0, displayHeight);
 
   
   append(breakpoints,array_x.length);
   
for(var i = 0; i < breakpoints.length;i++)
{


  beginShape();
  for(var j = breakpoints[i]; j <= breakpoints[i+1];j++)
  {
    
    var noiseVal = random (size);
    var x = array_x[j] 
    noiseVal = random (size);
    var y = array_y[j] + noiseVal 
   if(x > 0 )
   {
     curveVertex(x,  y);
 
   }
  }
  endShape();
  
}

}




function breakline()
{
  append(array_x,-1);
  append(array_y,-1);
  
  
}

function doprint()
{
  print(breakpoints);
  
}

function paint()
{
  button_eraser.removeEventListener("click", paint);
  button_eraser.addEventListener('click',erase);
  button_eraser.innerHTML = "ERASE";
    print("painting")

  cursor(CROSS);
  isdrawing = true;
}

function erase()
{
  button_eraser.removeEventListener("click", erase);
  button_eraser.addEventListener('click',paint);
  button_eraser.innerHTML = "DRAW";
  print("erasing")
  
  isdrawing = false;
  cursor('eraser.png');
  
}

function clearscreen()
{
  clear();
  background(0, 0, 0);
  array_x = new Array();
  array_y = new Array();
  
}

function loadmusic()
{
  changemusic = true;
  
  
  preload();

}

function saveText(text, filename){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}

    function addList(){
    
    

$('#year')
    .find('option')
    .remove()
    .end();
 
     var select = document.getElementById("year");
      
     for(var m = 0; m < select.length; m ++)
     {
     	var option = select.options[m];
     	option.remove();
     	print(select.options[m])
     }
     
     for(var i = 1; i < temp_names.length; i++) {
    
    var option = document.createElement('option');
    
    option.text = temp_names[i];
    select.add(option, 0);
       }
     }
 
