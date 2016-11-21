//Written with the processing javascript library p5.js
//Author: Daniel Krajnak

//GLOBAL VARIABLES (there's a lot. Sorry.)
/*
 W1 represents the vertical 
 distance of the topmost corner to the leftmost corner, and W2 represents the 
 vertical distance from the leftmost corner to the bottommost corner.  These 
 values can be used to calculate the locations of all four coners.  In addition, 
 height adjusment adjusts how vertically high or low the square is placed on 
 the page.
 */
var rectW1;
var rectW2;
var rectHeightAdjustment;
var rectAbsoluteWidth;

/*
EllipX is the x position of the circle.  Y is the y position.  R is the radius.
*/
var ellipX;
var ellipY;
var ellipR;

/*
Coordinates of the triangle with a variable for triangle movement.
*/
var triW1;
var triW2;
var triW3;
var triHeightAdjustment =0;

/*
Springpoint objects
*/
var quad1;
var quad2;
var quad3;
var quad4;

var ellip;

var tri1;
var tri2;
var tri3;

//Width and height of bounding box for elements on canvas
var bwidth;
var bheight

var canvas;
function setup() {

  canvas = createCanvas(windowWidth, 4*windowHeight/5);
  colorMode(RGB, 256, 256, 256, 100);
  angleMode(DEGREES);
  //attach listeners to canvas
  canvas.mouseOut(mouseO);
  canvas.mouseOver(mouseI);
  
  //Set aspect ratio
  bwidth = width;
  if(height/width < .77){
    bwidth = 1.29*height;
  }
  bheight = .77*bwidth;
  
// Calculate coordinates
/*
 Some trig to rotate the square 25 degrees clockwise while having the two of the
 corners line up at 15% of the width and 50% of the sceen width  
 */
 rectAbsoluteWidth = bwidth/2-bwidth*.15;
 rectW1=rectAbsoluteWidth*tan(25)/(1+tan(25));
 rectW2=rectAbsoluteWidth*tan(65)/(1+tan(65));
 rectHeightAdjustment = (bheight-rectAbsoluteWidth)/2;
 

/*
No trig needed for the circle.  Great.
*/

/*
Some trig to rotate the equilateral triangle 23.4 degrees counter-clockwise
while having two of the corners line up at 58% and 85% of the sceen width.
*/
 triW1 = (bwidth*.85-bwidth*.58)/sin(66.6)*sin(36.6);
 triW2 = (bwidth*.85-bwidth*.58)/tan(66.6);
 triW3 = (bwidth*.85-bwidth*.58)/sin(66.6)*cos(36.6);
 triHeightAdjustment = bheight*.375;

//Create Springpoint Objects
//(width-bwidth)/2 used to center shapes
 quad1 = new Springpoint(bwidth*.15+(width-bwidth)/2, rectW1+rectHeightAdjustment,
.97, 12.0, .1);
 quad2 = new Springpoint(rectW2+bwidth*.15+(width-bwidth)/2, rectHeightAdjustment,
.97, 12.0, .13);
 quad3 = new Springpoint(bwidth/2+(width-bwidth)/2, rectW2+rectHeightAdjustment,
.97, 12.0, .1);
 quad4 = new Springpoint(bwidth*.15+rectW1+(width-bwidth)/2, rectAbsoluteWidth+rectHeightAdjustment,
.97, 12.0, .1);

 ellip = new Springpoint(bwidth*.55+(width-bwidth)/2, bheight*.625,
.985, 20.0, .06);

 tri1 = new Springpoint(bwidth*.58+(width-bwidth)/2, triW1+triHeightAdjustment,
.95, 5.0, .13);
 tri2 = new Springpoint(bwidth*.58+triW3+(width-bwidth)/2, triHeightAdjustment,
.95, 5.0, .13);
 tri3 = new Springpoint(bwidth*.85+(width-bwidth)/2, triHeightAdjustment+triW1+triW2,
.95, 5.0, .2);
}




function draw() {


 quad1.update();
 quad2.update();
 quad3.update();
 quad4.update();
 
 ellip.update();
 
 tri1.update();
 tri2.update();
 tri3.update();
 background(256);
 noStroke();
 
 //Draw the square
 fill(256, 0, 0, 40); //pure red with 40% opacity

 
 quad(quad1.getXvalue(), quad1.getYvalue(), quad2.getXvalue(), 
 quad2.getYvalue(), quad3.getXvalue(), quad3.getYvalue(),
 quad4.getXvalue(), quad4.getYvalue());

 //Detect hover over square

 var squareHover;
 

 //Draw the circle
 fill(256, 256, 0, 40); // pure yellow with 40% opacity
 ellipse(ellip.getXvalue(), ellip.getYvalue(), bwidth*.3, bwidth*.3);
 
 
  //Draw the triangle
 fill(0,0, 256, 40); //pure blue with 40% opacity
 triangle(tri1.getXvalue(), tri1.getYvalue(), tri2.getXvalue(), tri2.getYvalue(),
 tri3.getXvalue(), tri3.getYvalue());

}
  
function windowResized(){
    background(50);
    resizeCanvas(windowWidth, 2*windowHeight/3);

//Recalculate bounding width and height
  bwidth = width;
  if(height/width < .77){
    bwidth = 1.29*height;
  }
  bheight = .77*bwidth;

// Re-calculate coordinates
 rectAbsoluteWidth = bwidth/2-bwidth*.15;
 rectW1=rectAbsoluteWidth*tan(25)/(1+tan(25));
 rectW2=rectAbsoluteWidth*tan(65)/(1+tan(65));
 rectHeightAdjustment = (bheight-rectAbsoluteWidth)/2;
 

/*
No trig needed for the circle.  Great.
*/

/*
Some trig to rotate the equilateral triangle 23.4 degrees counter-clockwise
while having two of the corners line up at 58% and 85% of the sceen width.
*/
 triW1 = (bwidth*.85-bwidth*.58)/sin(66.6)*sin(36.6);
 triW2 = (bwidth*.85-bwidth*.58)/tan(66.6);
 triW3 = (bwidth*.85-bwidth*.58)/sin(66.6)*cos(36.6);
 triHeightAdjustment = bheight*.375;

//Update Springpoints
quad1.updateValues(bwidth*.15+(width-bwidth)/2, rectW1+rectHeightAdjustment);
quad2.updateValues(rectW2+bwidth*.15+(width-bwidth)/2, rectHeightAdjustment);
quad3.updateValues(bwidth/2+(width-bwidth)/2, rectW2+rectHeightAdjustment);
quad4.updateValues(bwidth*.15+rectW1+(width-bwidth)/2, rectAbsoluteWidth+rectHeightAdjustment);

ellip.updateValues(bwidth*.55+(width-bwidth)/2, bheight*.625);

tri1.updateValues(bwidth*.58+(width-bwidth)/2, triW1+triHeightAdjustment);
tri2.updateValues(bwidth*.58+triW3+(width-bwidth)/2, triHeightAdjustment);
tri3.updateValues(bwidth*.85+(width-bwidth)/2, triHeightAdjustment+triW1+triW2);

}

function mouseO(){
  Springpoint.prototype.press();
}

function mouseI(){
  Springpoint.prototype.release();
}
