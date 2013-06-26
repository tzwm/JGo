var SIZE = 25;
var LINENUM = 19;
var GOBANHEIGHT = SIZE*(LINENUM-1);
var GOBANWIDTH = SIZE*(LINENUM-1);
var CANVASHEIGHT = GOBANHEIGHT + 2*SIZE;
var CANVASWIDTH = GOBANWIDTH + 2*SIZE;
var BACKGROUNDCOLOR = 'rgb(242, 193, 48)';
var BACKGROUNDFONT = '10px Sans-serif';
var COLORBLACK = '#000000';
var COLORWHITE = '#FFFFFF';
var STONECOLOR = [COLORBLACK, COLORWHITE]; 
var STONEIMG = ["img/stoneBlack.png", "img/stoneWhite.png"];

var DIRECTION = new Array([-1, 1, 0, 0], [0, 0, -1, 1]); 

var THIS;

var NAMEPLAYER = ["player1", "player2"];
