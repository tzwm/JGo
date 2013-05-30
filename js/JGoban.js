function Goban(_lineNum){
    var canvas = document.getElementById('goban');
    var ctx = canvas.getContext('2d');
    var lineNum = _lineNum; 
    var drawLineI, drawLineNumI;

    this.drawBoard = function(){
        canvas.height = CANVASHEIGHT;
        canvas.width = CANVASWIDTH;
        ctx.fillStyle=BACKGROUNDCOLOR;
        ctx.fillRect(0,0,CANVASHEIGHT,CANVASWIDTH);
        ctx.strokeRect(0,0,CANVASHEIGHT,CANVASWIDTH);
    };
    
    this.drawLineNumber = function(){
        if(drawLineNumI >= lineNum)
            return;
        ctx.font = BACKGROUNDFONT;
        ctx.strokeText(drawLineNumI+1, 7, (drawLineNumI+1)*SIZE + 4);
        ctx.strokeText(String.fromCharCode(lineNum-drawLineNumI-1+65), (lineNum-drawLineNumI)*SIZE -4, 15);
        ctx.strokeText(lineNum-drawLineNumI, CANVASWIDTH-18, (lineNum-drawLineNumI)*SIZE+4);
        ctx.strokeText(String.fromCharCode(drawLineNumI+65), (drawLineNumI+1)*SIZE -4, CANVASHEIGHT-8);
        drawLineNumI++;
    };
    
    this.drawLine = function(){
        if(drawLineI >= lineNum)
            return;
    
        ctx.fillStyle = '#000000';
        ctx.moveTo(SIZE, SIZE+drawLineI*SIZE);
        ctx.lineTo(SIZE+GOBANWIDTH, SIZE+drawLineI*SIZE);
    
        ctx.moveTo(SIZE+drawLineI*SIZE, SIZE);
        ctx.lineTo(SIZE+drawLineI*SIZE, SIZE+GOBANHEIGHT);
    
        ctx.stroke();
        drawLineI++; 
    };
    
    this.drawStar = function(){
        ctx.fillStyle='#000000';
        pp = [4, 10, 16];
        for(i=0;i<3;i++){
            for(var j=0;j<3;j++){
                ctx.moveTo(SIZE*pp[i], SIZE*pp[j]);
                ctx.arc(SIZE*pp[i], SIZE*pp[j], 5, 0, Math.PI*2, true);
            }
        }
        ctx.fill();
    };

    this.drawGoban = function(){
        this.drawBoard();
        for(drawLineI=0; drawLineI<lineNum;)
            this.drawLine();
        for(drawLineNumI=0; drawLineNumI<lineNum;)
            this.drawLineNumber();
        this.drawStar();
    };
    
    this.animDrawGoban = function(){
        this.drawBoard();
        drawLineI = 0;
        setInterval(this.drawLine, 200);
        drawLineNumI = 0;
        setInterval(this.drawLineNumber, 200);
        setTimeout(this.drawStar, 200*20); 
    };
}
