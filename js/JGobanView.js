function GobanView(){
    this.ctx = gobanCanvas.getContext('2d');

    this.onMoveMouseListener = function(evt){
        var point = toPoint(evt.layerX, evt.layerY);
        var x = point[0];
        var y = point[1];
        var coor = toCoor(x, y);

        gobanView.drawMouseStone(coor[0], coor[1], STONECOLOR[jgoban.nowPlay]);
    };

    this.drawMouseStone = function(x, y, color){
        this.drawGoban();
        this.ctx.globalAlpha = 0.4;
        this.ctx.fillStyle = color;
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, 15, 0, Math.PI*2, true);
        this.ctx.fill(); 
    };
    
    this.drawBoard = function(){
        gobanCanvas.height = CANVASHEIGHT;
        gobanCanvas.width = CANVASWIDTH;
    
        this.ctx.fillStyle=BACKGROUNDCOLOR;
        this.ctx.fillRect(0,0,CANVASHEIGHT,CANVASWIDTH);
        this.ctx.strokeRect(0,0,CANVASHEIGHT,CANVASWIDTH);
    };
    
    this.drawLineNumber = function(){
        if(drawLineNumI >= LINENUM)
            return;
        this.ctx.font = BACKGROUNDFONT;
        this.ctx.strokeText(drawLineNumI+1, 7, (drawLineNumI+1)*SIZE + 4);
        this.ctx.strokeText(String.fromCharCode(LINENUM-drawLineNumI-1+65), (LINENUM-drawLineNumI)*SIZE -4, 15);
        this.ctx.strokeText(LINENUM-drawLineNumI, CANVASWIDTH-18, (LINENUM-drawLineNumI)*SIZE+4);
        this.ctx.strokeText(String.fromCharCode(drawLineNumI+65), (drawLineNumI+1)*SIZE -4, CANVASHEIGHT-8);
        drawLineNumI++;
    };
    
    this.drawLine = function(){
        if(drawLineI >= LINENUM)
            return;
    
        this.ctx.fillStyle = COLORBLACK;
        this.ctx.moveTo(SIZE, SIZE+drawLineI*SIZE);
        this.ctx.lineTo(SIZE+GOBANWIDTH, SIZE+drawLineI*SIZE);
    
        this.ctx.moveTo(SIZE+drawLineI*SIZE, SIZE);
        this.ctx.lineTo(SIZE+drawLineI*SIZE, SIZE+GOBANHEIGHT);
    
        this.ctx.stroke();
        drawLineI++; 
    };
    
    this.drawStar = function(){
        this.ctx.fillStyle= COLORBLACK;
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
        for(drawLineI=0; drawLineI<LINENUM;)
            this.drawLine();
        for(drawLineNumI=0; drawLineNumI<LINENUM;)
            this.drawLineNumber();
        this.drawStar();
    };
    
    this.animDrawGoban = function(){
        this.drawBoard();
        THIS = this;
        drawLineI = 0;
        setInterval("THIS.drawLine()", 200);
        drawLineNumI = 0;
        setInterval("THIS.drawLineNumber()", 200);
        setTimeout(this.drawStar(), 200*20); 
    };

    gobanCanvas.addEventListener('mousemove', this.onMoveMouseListener);
}

