/*
620081226
additional feature: End of game notification

*/
"use strict";
var pieces;
var whiteSpaceY;
var whiteSpaceX;

window.onload = function ()
{
	var puzzle = document.getElementById('puzzlearea');
	
	pieces = puzzle.getElementsByTagName('div');

	for (var i=0; i<pieces.length; i++)
	{
		
		pieces[i].style.backgroundImage="url('background.jpg')";
		pieces[i].className = 'puzzlepiece';
		pieces[i].style.left = (i%4*100)+'px';
		pieces[i].style.top = (parseInt(i/4)*100) + 'px';
		pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-' + pieces[i].style.top;
		pieces[i].addEventListener("mouseover",function()
		{
			if (isMovable(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		});
		pieces[i].addEventListener("mouseout", function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		});

		pieces[i].addEventListener("click", function()
		{
			if (isMovable(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (isFinished())
				{
					isWinner();
				}
				return;
			}
		});
	}

	whiteSpaceX = '300px';
	whiteSpaceY = '300px';
//This function shuffles the puzzle 
	var shuffle = document.getElementById('shufflebutton').addEventListener("click",shuffle);
	function shuffle()
	{

		for (var i=0; i<250; i++)
		{
			var random = parseInt(Math.random()* 100) %4;
			if (random == 0)
			{
				var temp = checkUp(whiteSpaceX, whiteSpaceY);
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (random == 1)
			{
				var temp = checkDown(whiteSpaceX, whiteSpaceY);
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (random == 2)
			{
				var temp = checkLeft(whiteSpaceX, whiteSpaceY);
				if ( temp != -1)
				{
					swap(temp);
				}
			}

			if (random == 3)
			{
				var temp = checkRight(whiteSpaceX, whiteSpaceY);
				if (temp != -1)
				{
					swap(temp);
				}
			}
		

		}
	
	};
};

// This function checks if a puzzle piece is able to move
function isMovable(pos)
{
	if (checkLeft(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (checkDown(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (checkUp(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}

	if (checkRight(whiteSpaceX, whiteSpaceY) == (pos-1))
	{
		return true;
	}
}

//This function check if the puzzle is completed
function isFinished()
{
	var fin = true;
	for (var j = 0; j < pieces.length; j++) {
		var y = parseInt(pieces[j].style.top);
		var x = parseInt(pieces[j].style.left);

		if (x != (j%4*100) || y != parseInt(j/4)*100)
		{
			fin = false;
			break;
		}
	}
	return fin;
}

//This function makes changes once the game has been won
function isWinner()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "#d2c118";
	alert('You win!!');
	alert('Refresh to play again..');
}



function checkLeft(a, b)
{
	var X = parseInt(a);
	var Y = parseInt(b);

	if (X > 0)
	{
		for (var c = 0; c < pieces.length; c++) 
		{
			if (parseInt(pieces[c].style.left) + 100 == X && parseInt(pieces[c].style.top) == Y)
			{
				return c;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function checkRight (a, b) {
	var X = parseInt(a);
	var Y = parseInt(b);
	if (X < 300)
	{
		for (var c=0; c<pieces.length; c++){
			if (parseInt(pieces[c].style.left) - 100 == X && parseInt(pieces[c].style.top) == Y) 
			{
				return c;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function checkUp(a, b) {
	var X = parseInt(a);
	var Y = parseInt(b);
	if (Y > 0)
	{
		for (var c=0; c<pieces.length; c++)
		{
			if (parseInt(pieces[c].style.top) + 100 == Y && parseInt(pieces[c].style.left) == X) 
			{
				return c;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function checkDown(a, b)
{
	var X = parseInt(a);
	var Y = parseInt(b);
	if (Y < 300)
	{
		for (var c=0; c<pieces.length; c++)
		{
			if (parseInt(pieces[c].style.top) - 100 == Y && parseInt(pieces[c].style.left) == X) 
			{
				return c;
			}
		}
	}
	else
	{
		return -1;
	} 
}
//This function swithes the swaps the position of two puzzle pieces
function swap(pos) {
	var temp = pieces[pos].style.top;
	pieces[pos].style.top = whiteSpaceY;
	whiteSpaceY = temp;

	temp = pieces[pos].style.left;
	pieces[pos].style.left = whiteSpaceX;
	whiteSpaceX = temp;
}
