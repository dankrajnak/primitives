//Author: Daniel Krajnak
function Springshape(springPoints, type){
	
	function Line(x1, y1, x2, y2){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		
		if((x2-x1)==0){
			this.m = null;
		}
		else{
			this.m = -((float) (y2-y1))/(x2-x1);
		}
	}
	//instantiate line objects
	var lines = [];
	for(i=0; i<springPoints.length; i++){
		if(i==springPoints.length-1){
			if(springPoints[i].tempxpos<springPoints[0].tempxpos){
				var line = new Line(springPoints[i].tempxpos, springPoints[i].tempypos, 
					spingPoints[0].tempxpos, springPoints[0].tempypos);
				lines.push(line);
			}
			else{
				var line = new Line(springPoints[0].tempxpos, springPoints[0].tempypos, 
					spingPoints[i].tempxpos, springPoints[i].tempypos);
				lines.push(line);
			}
		}
		else{
			if(springPoints[i].tempxpos<springPoints[i+1].tempxpos){
				var line = new Line(springPoints[i].tempxpos, springPoints[i].tempypos, 
					spingPoints[i+1].tempxpos, springPoints[i+1].tempypos);
				lines.push(line);
			}
			else{
				var line = new Line(springPoints[i+1].tempxpos, springPoints[i+1].tempypos, 
					spingPoints[i].tempxpos, springPoints[i].tempypos);
				lines.push(line);
			}
		}
	}


	this.mouseOver = function(){
		var over = true;
		for(i=0; i<lines.length; i++){
			
		}

		return over;
	}




}