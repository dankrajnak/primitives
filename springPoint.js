//Author: Daniel Krajnak
function Springpoint(x, y, d, m, k_in) {
 
  // Screen values 
  var xpos;
  var ypos;
  var tempxpos;
  var tempypos; 
  
  //Mouse forcefield variables
  var forcef;
  var forcefy;
  var forcefx;
  var counter = 1;
  Springpoint.prototype.timer = 400;
  Springpoint.pressed = false;
  Springpoint.prototype.mouseSpeeds = new Array();

  // Spring simulation constants 
  var mass;       // Mass 
  var k;    // Spring constant 
  var damp;       // Damping 

  // Spring simulation variables 
  var velx = 0.0;   // X Velocity 
  var vely = 0.0;   // Y Velocity 
  var accel = 0;    // Acceleration 
  var force = 0;    // Force 

  //Initialization
  xpos = tempxpos = x; 
  ypos = tempypos = y;
  damp = d; 
  mass = m; 
  k = k_in;
  
  var distance = function(){
    var dis = sqrt(sq(tempxpos-mouseX)+sq(tempypos-mouseY));
    if(dis != 0){
    return dis
    }
    else{
      return 0.00001;
    }
  }
  
  this.display = function() {
    ellipse(tempxpos, tempypos, 50, 50);
  }
  

  Springpoint.prototype.mouseSpeed = function(){
    Springpoint.prototype.mouseSpeeds[frameCount%4]= sqrt(sq(mouseX-pmouseX)+
    sq(mouseY-pmouseY)); 
    //Calculate sum of array
    var mouseSum= Springpoint.prototype.mouseSpeeds.reduce(function(sum, a) {
      return sum + a },0);
    return mouseSum;
  }
  
  
  this.update = function(){
  var mouseSum = Springpoint.prototype.mouseSpeed();
  
  if((Springpoint.prototype.pressed || mouseSum==0 || Springpoint.prototype.timer<400) && millis()>1000){
    if(Springpoint.prototype.timer>400){
      Springpoint.prototype.timer=0;
    }
    counter=1;
    force = -k * (tempypos - ypos);  // f=-ky 
    accel = (force)/mass;            // Set the acceleration, f=ma == a=f/m 
    vely = damp * (vely + accel);    // Set the velocity 
    tempypos = tempypos + vely;      // Updated position 
    
    
    force = -k * (tempxpos - xpos);  // f=-ky 
    accel = (force) / mass;          // Set the acceleration, f=ma == a=f/m 
    velx = damp * (velx + accel);    // Set the velocity 
    tempxpos = tempxpos + velx;      // Update position

    Springpoint.prototype.timer++;
  }
  else{
    counter *= 1.4;
    //Mouse exerts force outward which inversely varies by distance.
    //counter added to eliminate the shapes snapping back into place too quickly
    forcef=Math.min(counter,800)/distance();
    
    //points are held in place by "springs" so f=-ky
    forcefy = (mouseY-tempypos)*forcef/distance(); //force in y direction
    tempypos = -forcefy/k +ypos; //Update position f=-k(y1-y2) == y1=-f/k+y2 
    
    forcefx = (mouseX-tempxpos)*forcef/distance(); //force in x direction
    tempxpos = -forcefx/k+xpos  //Update position f=-k(x1-x2) == x1=-f/k+x2
  }
  }
 
  Springpoint.prototype.press = function(){
    Springpoint.pressed = true;
    //counter = 0;
  } 
  
  Springpoint.prototype.release = function(){
    Springpoint.pressed = false;
  }
  
  this.getXvalue = function(){
    return tempxpos;
  }
  
  this.getYvalue = function(){
    return tempypos;
  }
  
  this.updateValues = function(x, y){
    xpos = x;
    ypos = y;
  }
}

function mousePressed(){

  Springpoint.prototype.press();
  return false;

}

function mouseReleased(){
  Springpoint.prototype.release();
  return false;
}

function mouseOut(){
  Springpoint.prototype.press();
  return false;
}

function mouseOver(){
  Springpoint.prototype.release();
  return false;
}