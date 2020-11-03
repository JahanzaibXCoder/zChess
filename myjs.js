var charPos = [];
var pawnProp = [];

var globalDrop;
var possibleMoves = [];
var possibleDestroy = [];
var CheckMate = [];
var chartype = 0; // White character always go first;
var clocktime;
var initialBlitzVal = 60;
var varTimer;

function CreateTable()
{
var boxDivider = 0;
var switchClass = false;
for(var coloumn = 0; coloumn <8; coloumn++)
{
	var even = 0;
	for(var row = 0; row<8; row++)
	{
		if(row != 7)
		{
			if(switchClass)
			{
				document.write("<div class = 'boxOdd' id = '" + "c" + coloumn + "-r" + row + "'" + "></div>");
				switchClass = !switchClass;
			}
			else
			{
				document.write("<div class = 'boxEven' id = '" + "c" + coloumn + "-r" + row + "'" + "></div>");
				switchClass = !switchClass;
			}
			even = 0;
		}
		else if(row === 7)
			{
				if(switchClass)
				{
					document.write("<div class = 'boxOdd' id = '" + "c" + coloumn + "-r" + row + "'" + "> </div> <div class = 'spacer'></div>");
				}
				else
				{
					document.write("<div class = 'boxEven' id = '" + "c" + coloumn + "-r" + row + "'" + "> </div> <div class = 'spacer'></div>");
				}
			}
		even ++;
	}
}
		$(".ChessGameBox").draggable({
                revert: false
            }).draggable("disable");
		$(".spacer").css(
		{
			"background-color" : "transparent",
			"color" : "transparent",
			"width" : "100%",
			"float" : "left",
			"height" : "0px",
			"position" : "relative"


		});
		$(".boxEven").css(
		{
			"background-color" : "#AF601A",
			"color" : "#AF601A",
			"float" : "left",
			"border" : "10px solid",
			"position" : "relative",
			"paddingTop" : "20px",
			"width" : "50px",
			"height" : "5vh"


		});
		$(".boxOdd").css(
		{
			"background-color" : "#F0B27A",
			"color" : "#F0B27A",
			"float" : "left",
			"border" : "10px solid",
			"position" : "relative",
			"paddingTop" : "20px",
			"width" : "50px",
			"height" : "5vh"
		});
		LoadChars();
}

function _onDoorWayBishop(charId, reqType)
{
	var c = GetCharPosition(charId).charAt(2);
	var r = GetCharPosition(charId).charAt(5);
	var parsed_c = parseInt(c);
	var parsed_r = parseInt(r);
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
 		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c += 1;
			}
			//else { parsed_c -= 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c -= 1;
			}
			//else { parsed_c += 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(parsed_c > -1)
			{
				parsed_c -= 1;
			}
			//else { parsed_c += 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
					}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c += 1;
			}
			//else { parsed_c -= 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
	}
}


function _onDoorWayRook(charId, reqType)
{
	var c = GetCharPosition(charId).charAt(2);
	var r = GetCharPosition(charId).charAt(5);
	var parsed_c = parseInt(c);
	var parsed_r = parseInt(r);
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		for(var i = parsed_c; i > -1; i--)
		{
			parsed_c -= 1;
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_c; i < 8; i++)
		{
			parsed_c += 1;
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
	 	parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
	}
}

function _onDoorWayQueen(charId, reqType)
{
	var c = GetCharPosition(charId).charAt(2);
	var r = GetCharPosition(charId).charAt(5);
	var parsed_c = parseInt(c);
	var parsed_r = parseInt(r);
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		for(var i = parsed_c; i > -1; i--)
		{
			parsed_c -= 1;
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_c; i < 8; i++)
		{
			parsed_c += 1;
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;

			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
	 	parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;

			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
 		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c += 1;
			}
		//	else { parsed_c -= 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c -= 1;
			}
		//	else { parsed_c += 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i > -1; i--)
		{
			parsed_r -= 1;
			r = parsed_r;
			if(parsed_c > -1)
			{
				parsed_c -= 1;
			}
		//	else { parsed_c += 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = -1;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
					}
			}
			else
			{
				i = -1;
			}
		}
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		parsed_c = parseInt(c);
		parsed_r = parseInt(r);
		for(var i = parsed_r; i < 8; i++)
		{
			parsed_r += 1;
			r = parsed_r;
			if(parsed_c < 8)
			{
				parsed_c += 1;
			}
		//	else { parsed_c -= 1;}
			c = parsed_c;
			if(GetCollisionFriendly(c, r) === true)
			{
				if(GetCollisionEnemy(c, r) !== true)
				{
					AddToPossibleNextMoves(c, r, 1, reqType, charId);
					searchDrag();
					i = 8;
				}
				else if(GetCollisionEnemy(c, r) === true)
				{
					AddToPossibleNextMoves(c, r, 0, reqType);
					searchDrag();
				}
			}
			else
			{
				i = 8;
			}
		}
	}
}


function _onDoorWayHorse(charId, reqType)
{
	var c = GetCharPosition(charId).charAt(2);
	var r = GetCharPosition(charId).charAt(5);
	var parsed_c = parseInt(c);
	var parsed_r = parseInt(r);
	parsed_c += 2;
	parsed_r += 1;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c += 2;
	parsed_r -= 1;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c -= 2;
	parsed_r += 1;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c -= 2;
	parsed_r -= 1;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c -= 1;
	parsed_r -= 2;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c += 1;
	parsed_r -= 2;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c -= 1;
	parsed_r += 2;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
	c = GetCharPosition(charId).charAt(2);
	r = GetCharPosition(charId).charAt(5);
	parsed_c = parseInt(c);
	parsed_r = parseInt(r);
	parsed_c += 1;
	parsed_r += 2;
	c = parsed_c;
	r = parsed_r;
	if(parsed_c < 8 && parsed_c > -1 && parsed_r < 8 && parsed_r > -1)
	{
		if(GetCollisionFriendly(c, r) === true)
		{
			if(GetCollisionEnemy(c, r) !== true)
			{
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
			}
			else if(GetCollisionEnemy(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
			}
		}
	}
}

function _onDoorWayPawn(charId, reqType)
{
	var c = GetCharPosition(charId).charAt(2);
	var r = GetCharPosition(charId).charAt(5);

	var pawnBlockage = true;
	if(charId.search("wPawn-") != -1)
	{
		var t = parseInt(c);
		t -= 1;
		c = t;
	}
	else
	{
		var t = parseInt(c);
		t += 1;
		c = t;
	}
	if(c < 8 && c > -1 && r < 8 && r > -1)
	{
		if(GetCollisionEnemy(c, r) === true)
		{
			if(GetCollisionFriendly(c, r) === true)
			{
				AddToPossibleNextMoves(c, r, 0, reqType);
				searchDrag();
				pawnBlockage = false;
			}
			else
			{
				pawnBlockage = true;
			}
		}
	}
	var t1 = parseInt(r);
	t1 -= 1;
	r = t1;
	if(c < 8 && c > -1 && r < 8 && r > -1)
	{
		if(GetCollisionEnemy(c, r) !== true)
		{
			if(GetCollisionFriendly(c, r) === true)
			{
				//	console.log("CollisionBPoint = " + GetCollisionEnemyPoint(c,r,chartype));
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
				//console.log("XEUIS " + c + " " + r);
				//console.log(possibleDestroy);
			}
		}
	}
	var t2 = parseInt(r);
	t2 += 2;
	r = t2;
	if(c < 8 && c > -1 && r < 8 && r > -1)
	{
		//console.log("6 exponent cross " + c + " " + r);
		if(GetCollisionEnemy(c, r) !== true)
		{
			if(GetCollisionFriendly(c, r) === true)
			{
				//console.log("CollisionBPoint = " + GetCollisionEnemyPoint(c,r,chartype));
				AddToPossibleNextMoves(c, r, 1, reqType, charId);
				searchDrag();
				//console.log("RIGHT" + c + " " + r);
				//console.log(possibleDestroy);
			}
		}
	}
	if(pawnProp[GetCharIndex(charId)] === true)
	{
		c = GetCharPosition(charId).charAt(2);
		r = GetCharPosition(charId).charAt(5);
		if(charId.search("wPawn-") != -1)
		{
			var t = parseInt(c);
			t -= 2;
			c = t;
		}
		else
		{
			var t = parseInt(c);
			t += 2;
			c = t;
		}
		if(c < 8 && c > -1 && r < 8 && r > -1)
		{
			if(pawnBlockage === false)
			{
				if(GetCollisionFriendly(c, r) === true)
				{
					if(GetCollisionEnemy(c, r) === true)
					{
						AddToPossibleNextMoves(c, r, 0, reqType);
						searchDrag();
					}
				}
			}
		}
	}
}



function GetCollisionFriendly(c, r)
{
	if(chartype === 0)
	{
		var x = document.getElementsByClassName("teamWhite");
		var i;
		for (i = 0; i < x.length; i++)
		{
		  var cx = GetCharPosition(x[i].id).charAt(2);
		  var rx = GetCharPosition(x[i].id).charAt(5);
		  if(cx.localeCompare(c)===0 && rx.localeCompare(r) === 0)
		  {
		  	return false;
		  }
		}
		return true;
	}
	else
	{
		var x = document.getElementsByClassName("teamBlack");
		var i;
		for (i = 0; i < x.length; i++)
		{
		  var cx = GetCharPosition(x[i].id).charAt(2);
		  var rx = GetCharPosition(x[i].id).charAt(5);
		  if(cx.localeCompare(c) === 0 && rx.localeCompare(r) === 0)
		  {
		  	return false;
		  }
		}
		return true;
	}
}

function GetCollisionEnemy(c, r)
{

	if(chartype === 0)
	{
		var x = document.getElementsByClassName("teamBlack");
		var cx;
		var rx;
		for(var i = 0; i < x.length; i++)
		 {
			cx  = GetCharPosition(x[i].id).charAt(2);
		    rx = GetCharPosition(x[i].id).charAt(5);
		    if(cx.localeCompare(c)===0 && rx.localeCompare(r)===0)
		    {
		 		return false;
		   	}
		}
		return true;
	}
	else
	{
		var x = document.getElementsByClassName("teamWhite");
		var cx;
		var rx;
		for(var i = 0; i < x.length; i++)
		{
			cx  = GetCharPosition(x[i].id).charAt(2);
		    rx = GetCharPosition(x[i].id).charAt(5);
		    if(cx.localeCompare(c)===0 && rx.localeCompare(r)===0)
		    {
		   		return false;
		   	}
		}
		return true;
	}
}


function GetCollisionPoint(c, r)
{
	var x = document.getElementsByClassName("characters");
	var cx;
	var rx;
	for(var i = 0; i < x.length; i++)
	 {
		cx  = GetCharPosition(x[i].id).charAt(2);
	    rx = GetCharPosition(x[i].id).charAt(5);
	    if(cx.localeCompare(c)===0 && rx.localeCompare(r) === 0)
	    {
	   		return x[i].id;
	   	}
	}
}


function _filterArray(myArray)
{
	let unique = [...new Set(myArray)];
	return unique;
}


function SwitchMove()
{
	if(chartype === 0) { stopClock(); chartype = 1; startClock(); }
	else {
		stopClock(); chartype = 0; startClock();
	}
}

function IsValidTurn(charId)
{
	if($("#" + charId).hasClass("teamWhite") && chartype === 0) { return true; }
	else if ($("#" + charId).hasClass("teamBlack") && chartype === 1) { return true; }
}

function SetTurn(teamName)
{
	if(teamName.search("black") !== -1)
	{
		chartype = 1;
	}
	if(teamName.search("white") !== -1)
	{
		chartype = 0;
	}

}

function GetCharId(index)
{
	var tempCharId = "null";
	switch(index)
	{
		case 0:
			tempCharId = "bPawn-0";
			break;
		case 1:
			tempCharId = "bPawn-1";
			break;
		case 2:
			tempCharId = "bPawn-2";
			break;
		case 3:
			tempCharId = "bPawn-3";
			break;
		case 4:
			tempCharId = "bPawn-4";
			break;
		case 5:
			tempCharId = "bPawn-5";
			break;
		case 6:
			tempCharId = "bPawn-6";
			break;
		case 7:
			tempCharId = "bPawn-7";
			break;
		case 16:
			tempCharId = "bRook-0";
			break;
		case 17:
			tempCharId = "bRook-1";
			break;
		case 18:
			tempCharId = "bHorse-0";
			break;
		case 19:
			tempCharId = "bHorse-1";
			break;
		case 20:
			tempCharId = "bBishop-0";
			break;
		case 21:
			tempCharId = "bBishop-1";
			break;
		case 22:
			tempCharId = "bKing";
			break;
		case 23:
			tempCharId = "bQueen";
			break;
		case 8:
			tempCharId = "wPawn-0";
			break;
		case 9:
			tempCharId = "wPawn-1";
			break;
		case 10:
			tempCharId = "wPawn-2";
			break;
		case 11:
			tempCharId = "wPawn-3";
			break;
		case 12:
			tempCharId = "wPawn-4";
			break;
		case 13:
			tempCharId = "wPawn-5";
			break;
		case 14:
			tempCharId = "wPawn-6";
			break;
		case 15:
			tempCharId = "wPawn-7";
			break;
		case 24:
			tempCharId = "wRook-0";
			break;
		case 25:
			tempCharId = "wRook-1";
			break;
		case 26:
			tempCharId = "wHorse-0";
			break;
		case 27:
			tempCharId = "wHorse-1";
			break;
		case 28:
			tempCharId = "wBishop-0";
			break;
		case 29:
			tempCharId = "wBishop-1";
			break;
		case 30:
			tempCharId = "wKing";
			break;
		case 31:
			tempCharId = "wQueen";
			break;
	}
	return tempCharId;
}

function GetCharIndex(charId)
{
	var indexSort = -1;
	switch(charId)
	{
		case "bPawn-0":
			indexSort = 0;
			break;
		case "bPawn-1":
			indexSort = 1;
			break;
		case "bPawn-2":
			indexSort = 2;
			break;
		case "bPawn-3":
			indexSort = 3;
			break;
		case "bPawn-4":
			indexSort = 4;
			break;
		case "bPawn-5":
			indexSort = 5;
			break;
		case "bPawn-6":
			indexSort = 6;
			break;
		case "bPawn-7":
			indexSort = 7;
			break;
		case "bRook-0":
			indexSort = 16;
			break;
		case "bRook-1":
			indexSort = 17;
			break;
		case "bHorse-0":
			indexSort = 18;
			break;
		case "bHorse-1":
			indexSort = 19;
			break;
		case "bBishop-0":
			indexSort = 20;
			break;
		case "bBishop-1":
			indexSort = 21;
			break;
		case "bKing":
			indexSort = 22;
			break;
		case "bQueen":
			indexSort = 23;
			break;
		case "wPawn-0":
			indexSort = 8;
			break;
		case "wPawn-1":
			indexSort = 9;
			break;
		case "wPawn-2":
			indexSort = 10;
			break;
		case "wPawn-3":
			indexSort = 11;
			break;
		case "wPawn-4":
			indexSort = 12;
			break;
		case "wPawn-5":
			indexSort = 13;
			break;
		case "wPawn-6":
			indexSort = 14;
			break;
		case "wPawn-7":
			indexSort = 15;
			break;
		case "wRook-0":
			indexSort = 24;
			break;
		case "wRook-1":
			indexSort = 25;
			break;
		case "wHorse-0":
			indexSort = 26;
			break;
		case "wHorse-1":
			indexSort = 27;
			break;
		case "wBishop-0":
			indexSort = 28;
			break;
		case "wBishop-1":
			indexSort = 29;
			break;
		case "wKing":
			indexSort = 30;
			break;
		case "wQueen":
			indexSort = 31;
			break;
	}
	return indexSort;
}

function SetCharPosition(c, r, charId)
{
	charPos[GetCharIndex(charId)] = "#c"+c+"-r"+r;
	$("#"+charId).addClass("characters");
}

function SetCharPositionOnDrop(c, r, charId)
{
	SetCharPosition(c, r, charId);
	if(charId.search("Pawn-") != -1)
	{
		pawnProp[GetCharIndex(charId)] = false;
	}
}

function GetCharPosition(charId)
{
	return charPos[GetCharIndex(charId)];
}

function GetOpenDoorWay(charId)
{
	if(IsValidTurn(charId))
	{
	/*	if(CheckMate.length === 0)
		{*/
			if(charId.search("Pawn") !== -1) { _onDoorWayPawn(charId, 0); }
			if(charId.search("Horse") !== -1) { _onDoorWayHorse(charId, 0); }
			if(charId.search("Queen") !== -1) { _onDoorWayQueen(charId, 0); }
			if(charId.search("Rook") !== -1) { _onDoorWayRook(charId, 0); }
			if(charId.search("Bishop") !== -1) { _onDoorWayBishop(charId, 0); }
	/*	}
		if(CheckMate.length !== 0)
		{
			if(charId.search("Pawn") !== -1) { _onDoorWayPawn(charId, 2); }
			if(charId.search("Horse") !== -1) { _onDoorWayHorse(charId, 2); }
			if(charId.search("Queen") !== -1) { _onDoorWayQueen(charId, 2); }
			if(charId.search("Rook") !== -1) { _onDoorWayRook(charId, 2); }
			if(charId.search("Bishop") !== -1) { _onDoorWayBishop(charId, 2); }
		}*/
	}
}

function CheckForMate(charType, reqType)
{
	CheckMate.pop();
	for(var i = 0; i < 32; i++)
	{
		if(charType === 0)
		{

				var charId = GetCharId(i);
				if(charId.search("wPawn") !== -1)
				{
					_onDoorWayPawn(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("wHorse") !== -1)
				{
				    _onDoorWayHorse(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("wQueen") !== -1)
				{
				    _onDoorWayQueen(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("wRook") !== -1)
				{
					_onDoorWayRook(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("wBishop") !== -1)
				{
					_onDoorWayBishop(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}

		}
		if(charType === 1)
		{

				var charId = GetCharId(i);
				if(charId.search("bPawn") !== -1)
				{
					_onDoorWayPawn(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("bHorse") !== -1)
				 {
				    _onDoorWayHorse(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("bQueen") !== -1)
				 {
				    _onDoorWayQueen(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("bRook") !== -1)
				{
					_onDoorWayRook(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
				if(charId.search("bBishop") !== -1)
				{
					_onDoorWayBishop(charId, reqType);
				//	console.log("================> " + charId + " <================");
				}
		}
	}
}



function createArray(length)
{
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function FlushNextMoves()
{

	var x = possibleMoves.length-1;
	var i = x;
	$(possibleMoves[i]).ready(function()
	{
		while(i > -1)
		{
			$(possibleMoves[i]).removeClass("dropables").removeClass("ui-widget-header").droppable("disable");
			possibleMoves.pop();
			i--;
		}
		});
}

function FlushNextPossibleDestructMove()
{
	var tmpLen = possibleDestroy.length;
	if(tmpLen > 0)
	{
		for(z = 0; z < tmpLen; z++)
		{
			possibleDestroy.pop();
		}
	}
}

function UndoMove()
{


}

function AddToPossibleNextMoves(c, r, typeMove, reqType, charId)
{
	if(typeMove === 1) //destroyable move
	{
			if(reqType === 0 && GetCharPosition("bKing").search("#c" + c + "-r" + r) === -1 && GetCharPosition("wKing").search("#c" + c + "-r" + r) === -1)
			{
				$("#c" + c + "-r" + r).ready(function() { $("#c" + c + "-r" + r).addClass("red").addClass("dropables").addClass("ui-widget-header").droppable("enable");});
				possibleMoves.push("#c" + c + "-r" + r);
				possibleMoves = _filterArray(possibleMoves);
				var x = GetCharIndex(GetCollisionPoint(c, r));
				possibleDestroy.push(x);
				possibleDestroy = _filterArray(possibleDestroy);
			}
			else if(reqType === 1)
			{
				if(chartype === 0)
				{
					console.log("HELLO BLACK");
					if(GetCharPosition("bKing").search("#c" + c + "-r" + r) !== -1)
					{
						CheckMate.push(charId);
						CheckMate = _filterArray(CheckMate);
						console.log(GetCharPosition("bKing").search("#c" + c + "-r" + r) + "===>" + CheckMate);
					}
				}
				else if(chartype === 1)
				{
					console.log("HELLO WHITE");
					if(GetCharPosition("wKing").search("#c" + c + "-r" + r) !== -1)
					{
						CheckMate.push(charId);
						CheckMate = _filterArray(CheckMate);
						console.log(GetCharPosition("wKing").search("#c" + c + "-r" + r) + "===>" + CheckMate);
					}
				}
			}
			else if(reqType === 2)
			{
				if(chartype === 0)
				{


				}
				else if(chartype === 1)
				{

				}

			}
			//console.log(possibleDestroy + " - AddedPossibleDestroyAble");
		}
		else if(typeMove === 0 && reqType === 0)
		{

			$("#c" + c + "-r" + r).ready(function() { $("#c" + c + "-r" + r).addClass("dropables").addClass("ui-widget-header").droppable("enable");});
			possibleMoves.push("#c" + c + "-r" + r);
			possibleMoves = _filterArray(possibleMoves);
			//	console.log(possibleMoves + " - AddedPossibleMoves");
			//	console.log("ARHH : #c" + c + "-r" + r);
	}
	if(reqType === 2)
	{

	}
}

function LoadChars()
{
	$("#c0-r0").append("<img id = 'bRook-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/bRook.png'/>");
	$("#bRook-0").ready(function() { $("#bRook-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 0, "bRook-0"); });

	$("#c0-r1").append("<img id = 'bHorse-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bHorse.png'/>");
	$("#bHorse-0").ready(function() { $("#bHorse-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 1, "bHorse-0");});

	$("#c0-r2").append("<img id = 'bBishop-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bBishop.png'/>");
	$("#bBishop-0").ready(function() { $("#bBishop-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 2, "bBishop-0");});

	$("#c0-r5").append("<img id = 'bBishop-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bBishop.png'/>");
	$("#bBishop-1").ready(function() { $("#bBishop-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 5, "bBishop-1");});

	$("#c0-r6").append("<img id = 'bHorse-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bHorse.png'/>");
	$("#bHorse-1").ready(function() { $("#bHorse-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 6, "bHorse-1");});

	$("#c0-r7").append("<img id = 'bRook-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bRook.png'/>");
	$("#bRook-1").ready(function() { $("#bRook-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 7, "bRook-1");});

	$("#c1-r0").append("<img id = 'bPawn-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");									//	pawnProp[GetCharIndex(charId)]
	$("#bPawn-0").ready(function() { $("#bPawn-0").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 0, "bPawn-0"); pawnProp[GetCharIndex("bPawn-0")] =true;});

	$("#c1-r1").append("<img id = 'bPawn-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-1").ready(function() { $("#bPawn-1").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 1, "bPawn-1"); pawnProp[GetCharIndex("bPawn-1")] =true;});

	$("#c1-r2").append("<img id = 'bPawn-2'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-2").ready(function() { $("#bPawn-2").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 2, "bPawn-2"); pawnProp[GetCharIndex("bPawn-2")] =true;});

	$("#c1-r3").append("<img id = 'bPawn-3'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-3").ready(function() { $("#bPawn-3").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 3, "bPawn-3"); pawnProp[GetCharIndex("bPawn-3")] =true;});

	$("#c1-r4").append("<img id = 'bPawn-4'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-4").ready(function() { $("#bPawn-4").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 4, "bPawn-4"); pawnProp[GetCharIndex("bPawn-4")] =true;});

	$("#c1-r5").append("<img id = 'bPawn-5'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-5").ready(function() { $("#bPawn-5").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 5, "bPawn-5"); pawnProp[GetCharIndex("bPawn-5")] =true;});

	$("#c1-r6").append("<img id = 'bPawn-6'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-6").ready(function() { $("#bPawn-6").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 6, "bPawn-6"); pawnProp[GetCharIndex("bPawn-6")] =true;});

	$("#c1-r7").append("<img id = 'bPawn-7'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bPawn.png'/>");
	$("#bPawn-7").ready(function() { $("#bPawn-7").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamBlack"); SetCharPosition(1, 7, "bPawn-7"); pawnProp[GetCharIndex("bPawn-7")] =true;});

	$("#c0-r3").append("<img id = 'bKing' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bKing.png'/>");
	$("#bKing").ready(function() { $("#bKing").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 3, "bKing");});

	$("#c0-r4").append("<img id = 'bQueen' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/bQueen.png'/>");
	$("#bQueen").ready(function() { $("#bQueen").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamBlack"); SetCharPosition(0, 4, "bQueen");});


	$("#c7-r0").append("<img id = 'wRook-0' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wRook.png'/>");
	$("#wRook-0").ready(function() { $("#wRook-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 0, "wRook-0");});

	$("#c7-r1").append("<img id = 'wHorse-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wHorse.png'/>");
	$("#wHorse-0").ready(function() { $("#wHorse-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 1, "wHorse-0");});

	$("#c7-r2").append("<img id = 'wBishop-0'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wBishop.png'/>");
	$("#wBishop-0").ready(function() { $("#wBishop-0").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 2, "wBishop-0");});

	$("#c7-r5").append("<img id = 'wBishop-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wBishop.png'/>");
	$("#wBishop-1").ready(function() { $("#wBishop-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 5, "wBishop-1");});

	$("#c7-r6").append("<img id = 'wHorse-1' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/wHorse.png'/>");
	$("#wHorse-1").ready(function() { $("#wHorse-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 6, "wHorse-1");});

	$("#c7-r7").append("<img id = 'wRook-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wRook.png'/>");
	$("#wRook-1").ready(function() { $("#wRook-1").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 7, "wRook-1");});

	$("#c6-r0").append("<img id = 'wPawn-0' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-0").ready(function() { $("#wPawn-0").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 0, "wPawn-0"); pawnProp[GetCharIndex("wPawn-0")] =true;});

	$("#c6-r1").append("<img id = 'wPawn-1'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-1").ready(function() { $("#wPawn-1").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 1, "wPawn-1"); pawnProp[GetCharIndex("wPawn-1")] =true;});

	$("#c6-r2").append("<img id = 'wPawn-2' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/wPawn.png'/>");
	$("#wPawn-2").ready(function() { $("#wPawn-2").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 2, "wPawn-2"); pawnProp[GetCharIndex("wPawn-2")] =true;});

	$("#c6-r3").append("<img id = 'wPawn-3'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-3").ready(function() { $("#wPawn-3").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 3, "wPawn-3"); pawnProp[GetCharIndex("wPawn-3")] =true;});

	$("#c6-r4").append("<img id = 'wPawn-4'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-4").ready(function() { $("#wPawn-4").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 4, "wPawn-4"); pawnProp[GetCharIndex("wPawn-4")] =true;});

	$("#c6-r5").append("<img id = 'wPawn-5' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/wPawn.png'/>");
	$("#wPawn-5").ready(function() { $("#wPawn-5").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 5, "wPawn-5"); pawnProp[GetCharIndex("wPawn-5")] =true;});

	$("#c6-r6").append("<img id = 'wPawn-6'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-6").ready(function() { $("#wPawn-6").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 6, "wPawn-6"); pawnProp[GetCharIndex("wPawn-6")] =true;});

	$("#c6-r7").append("<img id = 'wPawn-7'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wPawn.png'/>");
	$("#wPawn-7").ready(function(){ $("#wPawn-7").draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("teamWhite"); SetCharPosition(6, 7, "wPawn-7"); pawnProp[GetCharIndex("wPawn-7")] =true;});

	$("#c7-r3").append("<img id = 'wKing'  onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);'src = 'pck1/wKing.png'/>");
	$("#wKing").ready(function() { $("#wKing").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 3, "wKing");});

	$("#c7-r4").append("<img id = 'wQueen' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/wQueen.png'/>");
	$("#wQueen").ready(function() { $("#wQueen").draggable({ revert: "invalid"}).addClass("charConfig").addClass("teamWhite"); SetCharPosition(7, 4, "wQueen");});
}

function onChar(id)
{

	FlushNextPossibleDestructMove();
	globalDrop = id;
	GetOpenDoorWay(globalDrop);
}


function OnCharLeave(id)
{
	FlushNextMoves();
}

function _onCharDrop(instance)
{
	var fstring = instance.id;
	SetCharPositionOnDrop(fstring.charAt(1), fstring.charAt(4), globalDrop);
	$("#"+globalDrop).ready(function()
	{
		for(i = 0; i < possibleDestroy.length; i++)
		{
			if(charPos[possibleDestroy[i]] === ("#"+instance.id))
			{
				//console.log(globalDrop + " --> x-" + possibleDestroy[i] + "-x");
				$("#"+GetCharId(possibleDestroy[i])).remove();
				//FlushNextMoves();
			}
		}
		if($("#"+globalDrop).hasClass("teamWhite"))
		{
			$("#"+globalDrop).remove();
			$("#"+instance.id).append("<img id = '"+globalDrop+"' class = 'teamWhite' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/" + globalDrop + ".png'/>");
			//console.log(globalDrop + "[WHITE]" + " --> " + instance.id);
		}
		else if($("#"+globalDrop).hasClass("teamBlack"))
		{
			$("#"+globalDrop).remove();
			$("#"+instance.id).append("<img id = '"+globalDrop+"' class = 'teamBlack' onmouseup = 'OnCharLeave(id);' onmousedown = 'onChar(id);' src = 'pck1/" + globalDrop + ".png'/>");
			//console.log(globalDrop + "[BLACK]" + " --> " + instance.id);
		}
	if(globalDrop.search("Pawn-") !== -1)
	{
		$("#" + globalDrop).ready(function() { $("#" + globalDrop).draggable({ revert: "invalid"}).addClass("charConfigPawn").addClass("characters");});
	}
	else
	{
		$("#" + globalDrop).ready(function() { $("#" + globalDrop).draggable({ revert: "invalid"}).addClass("charConfig").addClass("characters");});
	}
	CheckForMate(chartype, 1);
	SwitchMove();
});
}


 function searchDrag()
 {
	var x = possibleMoves.length-1;
	for(i = x; i > -1; i--)
	{
		$(possibleMoves[i]).droppable({
	    classes:
	    {
	      "ui-droppable-active": "ui-state-active",
	      "ui-droppable-hover": "ui-state-hover"
	    },
	    drop: function( event, ui )
	    {
	  	$(_onCharDrop(this))
	  	}
	 })};
 }

function _onToggleMenu(handler)
{
  	handler.classList.toggle("change")
  	var x = document.getElementsByClassName("listitems");
	for(var i = 0; i < x.length; i++)
	{
			$(x[i]).toggle();
	}
}

function _onToggleMenuPosition(handler)
{
	$(".ChessGameBox").draggable("enable");
	$(handler).text("Drag me!");
}

function _onStopToggleMenuPosition(handler)
{
	$(".ChessGameBox").draggable("disable");
	$(handler).text("Drag board");
}


function _onToggleMenuBoard(handler)
{
	$(".boxOdd").toggle();
	$(".boxEven").toggle();

}

function _onToggleMenuColors(handler)
{
}

function _onTeamEndTime()
{
	if(chartype === 1) { alert("White won!!!"); }
	if(chartype === 0) { alert ("Black won !!!"); }
	var x = document.getElementsByClassName("boxOdd");
	for(var i = 0; i < x.length; i++)
	{
			$(x[i]).empty();
	}
	var x = document.getElementsByClassName("boxEven");
	for(var i = 0; i < x.length; i++)
	{
			$(x[i]).empty();
	}
	stopClock();
	FlushNextPossibleDestructMove();
	FlushNextMoves();
	LoadChars();
	SetTurn("white");
	initialBlitzVal = 60;
	startClock();
}




function startClock()
{
	if(initialBlitzVal !== 999)
	{
		if(chartype === 0)
		{
			$("#wCircle").addClass("face face3").css("animation", "animate 6s linear infinite");
			$("#wTime").show();
			$("#wTime").html("01:00");
			clocktimer = initialBlitzVal;
			varTimer = setInterval(onTimerUpdate, 1000);
		}
		if(chartype === 1)
		{
			$("#bCircle").addClass("face face3").css("animation", "animate 6s linear infinite");
			$("#bTime").show();
			$("#bTime").html("01:00");
			clocktimer = initialBlitzVal;
			varTimer = setInterval(onTimerUpdate, 1000);
		}
	}
}

function stopClock()
{
	if(initialBlitzVal !== 999)
	{
		if(chartype === 0)
		{
			$("#wCircle").removeClass("face face3").css("animation", "animate 1s linear 0");
			$("#wTime").hide();
			clocktimer = initialBlitzVal;
			clearInterval(varTimer);
		}
		if(chartype === 1)
		{
			$("#bCircle").removeClass("face face3").css("animation", "animate 1s linear 0");
			$("#bTime").hide();
			clocktimer = initialBlitzVal;
			clearInterval(varTimer);
		}
	}
}

function onTimerUpdate()
{
	clocktimer -= 1;
	if(chartype === 0)
	{
		if(clocktimer >= 10)
		{
			$("#wTime").html("00:" + clocktimer);
		}
		else $("#wTime").html("00:0" + clocktimer);
	}
	if(chartype === 1)
	{
		if(clocktimer >= 10)
		{
			$("#bTime").html("00:" + clocktimer);
		}
		else $("#bTime").html("00:0" + clocktimer);
	}
	if(clocktimer === 0)
	{
		_onTeamEndTime();
	}
}
