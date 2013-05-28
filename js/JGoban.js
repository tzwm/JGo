$.getScript('js/config.js', function(){
    alert("config loaded");   
});

function createGoban(){

    var canvas=document.getElementById('goban');
    canvas.height = CANVASHEIGHT;
    canvas.width = CANVASWIDTH;
    var ctx=canvas.getContext('2d');

    //draw board
    ctx.fillStyle=BACKGROUNDCOLOR;
    ctx.fillRect(0,0,CANVASHEIGHT,CANVASWIDTH);
    ctx.strokeRect(0,0,CANVASHEIGHT,CANVASWIDTH);
        
    //draw lines number
    ctx.font = backgroundFont;
    for(var i=0;i<19;i++){
        ctx.strokeText(i+1, 7, (i+1)*SIZE + 4);
        ctx.strokeText(String.fromCharCode(i+65), (i+1)*SIZE -4, 15);
        ctx.strokeText(i+1, CANVASWIDTH-18, (i+1)*SIZE+4);
        ctx.strokeText(String.fromCharCode(i+65), (i+1)*SIZE -4, CANVASHEIGHT-8);
    }

    //draw lines
    ctx.fillStyle='#000000';
    for(var i=0;i<19;i++){
        ctx.moveTo(SIZE, SIZE+i*SIZE);
        ctx.lineTo(SIZE+GOBANWIDTH, SIZE+i*SIZE);

        ctx.moveTo(SIZE+i*SIZE, SIZE);
        ctx.lineTo(SIZE+i*SIZE, SIZE+GOBANHEIGHT);
    }
    ctx.stroke();

    //draw star

}

createGoban();
