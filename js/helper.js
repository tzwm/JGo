function toPoint(x, y){
    x = x-XOFFSET;
    y = y-YOFFSET;

    var xx = Math.floor(x / SIZE);
    var yy = Math.floor(y / SIZE);
    if(x/SIZE - xx >= 0.5)
        xx = xx+1;
    if(x/SIZE - yy >= 0.5)
        yy = yy+1;
    if(xx<1)
       xx = 1;
    if(xx>LINENUM)
       xx = LINENUM;
    if(yy<1)
       yy = 1;
    if(yy>LINENUM)
       yy = LINENUM; 

    return [xx, yy];
}

function toCoor(x, y){
    return [x*SIZE, y*SIZE];
}

