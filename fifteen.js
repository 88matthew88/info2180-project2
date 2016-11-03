//Name: Matthew Mcfarlane
//ID#: 620075847
//additional feature: Able to slide multiple squares at a time. 

(function() 
{
	
	"use strict";
	
	// module-global variables
	var num = 4; // 4x4 squares
	var matrix = 100; // 100px x 100px for each square
	var X = 3;
	var Y = 3; 
	//var count=30;
	//var counter=setTimeout (timeout,15000);
	var SHUFFLE = 1000; // number of movements in shuffle
	

	window.onload = function() 
	{
		
		
		make(); 
		organize();  
		document.getElementById("shufflebutton").onclick = shuffle;
		
		
	}; 

	// function used to time the game, a countdown
	// function timer()
	// {
	// 	count=count-1;
	// 	if (count<=0)
	// 	{
	// 		clearInterval(counter);
	// 		alert ("YOUR TIME IS UP, reload and try again");
	// 		return;
	// 	}
	// 	document.getElementById('controls').appendChild(elem);
 //  		elem.innerHTML ="<div >" + "Timer : " + count + "seconds" + "</div>";	
		

	// }
	
	//creates puzzle pieces
	function make() 
	{
			
		var puzzlearea = document.getElementById("puzzlearea");
					
		for (var cnt = 1; cnt < num*num; cnt++) 
		{
				var tile = document.createElement("div");
				tile.className = "tile";
				tile.innerHTML = cnt + "";
							
				puzzlearea.appendChild(tile);
				tile.onclick = move;
				tile.onmouseover = hover;
				tile.onmouseout = out;
				
		} 
			
	} 
	
	// puts puzzle pieces in place	
	function organize() {
			
		var area = document.getElementById("puzzlearea");
			
		area.style.backgroundSize = num*matrix + "px " + num*matrix + "px";
		area.style.height = num*matrix + "px";
		area.style.width = num*matrix + "px";
			
		var tiles = document.querySelectorAll("#puzzlearea .tile");
				
		for (var k = 0; k< tiles.length; k++) 
		{
				
				tiles[k].style.height = (matrix-2) + "px"; 
				tiles[k].style.width = (matrix-2) + "px";
				
				tiles[k].style.position = "absolute";
				tiles[k].style.left = leftX(k+1)*matrix + "px"; 
				tiles[k].style.top = topY(k+1)*matrix + "px"; 
				
				tiles[k].id = "tile_" + topY(k+1) + "_" + leftX(k+1); 
				
				tiles[k].style.backgroundPosition = -(leftX(k+1)*matrix ) + "px " +
				 -(topY(k+1)*matrix ) + "px"; 
			
		} 
			
	} 
				
	function topY(i)
	{
		return ~~((i-1)/num); 
	}

	function leftX(i)
	{
		return ((i-1) % num); 
	}
			
	function movable(tileId){ 
		var id = tileId.split("_");
		var row = id[1];
		var col = id[2];
		if ( (row == X) || (col == Y) ) 
		{
			return true;
		} else 
		{
			return false;
		}
	}

	// changes tiles border color when it is hovered over by mouse
	function hover()
	{
		if ( movable(this.id) ) 
		{
			this.style.borderColor = "red";	
			this.style.cursor = "pointer";
		}
	}
		
	function out()
	{
		if ( movable(this.id) ) 
		{
			this.style.borderColor = "black";	
			this.style.cursor = "default";
		}
	}	

	//mixup all the pieces
	function shuffle()
	{
		for (var i = 0; i < SHUFFLE; i++) 
		{
			var random = Math.floor( Math.random()*4 );
			moveElement(random);	
		}
	}
		
	// moves a piece to the empty space if its a neighbour	
	function moveElement(number)
	{
		var row = X;
		var col = Y;
			
			
		if ( (number == 1) && (X > 0) ) {
			row--;
		} else if (number == 2 && (Y > 0) ) { 
			col--;
		} else if (number == 3 && (X < 3) ) { 
			row++;
		} else if (Y < 3) { 
			col++;
		}
			
			
		var id = "tile_" + row + "_" + col;
		var tile = document.getElementById(id);
			
		if (tile) 
		{
				tile.id = "tile_" + X + "_" + Y;
				tile.style.left = Y*matrix + "px";
				tile.style.top = X*matrix + "px";
				
				X = row;
				Y = col;
		}
	}
	
	// piece moving function		
	function move()
	{
		var id = this.id.split("_");
		var row = id[1];
		var col = id[2];
			
		if (row == X) 
		{ 
			while (col < Y) 
			{ 
				moveElement(2);
			} 
			while (col > Y) 
			{ 
				moveElement(4);
			}
		} else if (col == Y) 
			{ 
				while (row < X) 
				{ 
					moveElement(1);
				} 
				while (row > X) 
				{ 
					moveElement(3);
				}
			} 
	} 

})();
