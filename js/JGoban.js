function Goban(_lineNum, _canvas){
    this.canvas = _canvas; 
    this.ctx = this.canvas.getContext('2d');
    var lineNum = _lineNum; 
    var drawLineI, drawLineNumI;

    this.drawBoard = function(){
        this.canvas.height = CANVASHEIGHT;
        this.canvas.width = CANVASWIDTH;
        this.ctx = this.canvas.getContext('2d');

        this.ctx.fillStyle=BACKGROUNDCOLOR;
        this.ctx.fillRect(0,0,CANVASHEIGHT,CANVASWIDTH);
        this.ctx.strokeRect(0,0,CANVASHEIGHT,CANVASWIDTH);
    };
    
    this.drawLineNumber = function(){
        if(drawLineNumI >= lineNum)
            return;
        this.ctx.font = BACKGROUNDFONT;
        this.ctx.strokeText(drawLineNumI+1, 7, (drawLineNumI+1)*SIZE + 4);
        this.ctx.strokeText(String.fromCharCode(lineNum-drawLineNumI-1+65), (lineNum-drawLineNumI)*SIZE -4, 15);
        this.ctx.strokeText(lineNum-drawLineNumI, CANVASWIDTH-18, (lineNum-drawLineNumI)*SIZE+4);
        this.ctx.strokeText(String.fromCharCode(drawLineNumI+65), (drawLineNumI+1)*SIZE -4, CANVASHEIGHT-8);
        drawLineNumI++;
    };
    
    this.drawLine = function(){
        if(drawLineI >= lineNum)
            return;
    
        this.ctx.fillStyle = '#000000';
        this.ctx.moveTo(SIZE, SIZE+drawLineI*SIZE);
        this.ctx.lineTo(SIZE+GOBANWIDTH, SIZE+drawLineI*SIZE);
    
        this.ctx.moveTo(SIZE+drawLineI*SIZE, SIZE);
        this.ctx.lineTo(SIZE+drawLineI*SIZE, SIZE+GOBANHEIGHT);
    
        this.ctx.stroke();
        drawLineI++; 
    };
    
    this.drawStar = function(){
        this.ctx.fillStyle='#000000';
        pp = [4, 10, 16];
        for(i=0;i<3;i++){
            for(var j=0;j<3;j++){
                this.ctx.moveTo(SIZE*pp[i], SIZE*pp[j]);
                this.ctx.arc(SIZE*pp[i], SIZE*pp[j], 5, 0, Math.PI*2, true);
            }
        }
        this.ctx.fill();
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
