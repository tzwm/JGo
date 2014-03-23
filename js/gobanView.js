function GobanView(){
    this.gobanCanvas = document.createElement("canvas");
    this.gobanCanvas.className = "goban";
    $("body").append(this.gobanCanvas);
    this.ctx = this.gobanCanvas.getContext('2d');
    this.imgs = new Array();
    this.imgs[0] = new Image();
    this.imgs[0].src = STONEIMG[0];
    this.imgs[1] = new Image();
    this.imgs[1].src = STONEIMG[1];



    this.drawMouseStone = function(pos, color){
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.4;
        this.ctx.fillStyle = STONECOLOR[color];
        this.ctx.moveTo(pos[0], pos[1]);
        this.ctx.arc(pos[0], pos[1], 13, 0, Math.PI*2, true);
        this.ctx.fill(); 
    };
    
    this.drawStone = function(pos, color){
        this.ctx.drawImage(this.imgs[color], pos[0]-13, pos[1]-13, 26, 26);

/*        img = new Image();*/
        //img.src = STONEIMG[color];

        /*this.ctx.drawImage(img, pos[0]-13, pos[1]-13, 26, 26);*/
    };
    
    this.drawBoard = function(){
        this.gobanCanvas.height = CANVASHEIGHT;
        this.gobanCanvas.width = CANVASWIDTH;
    
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
        for(var i=0;i<3;i++){
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

    this.reDraw = function(){
        this.drawGoban();

        for(var i=0;i<LINENUM;i++)
           for(var j=0;j<LINENUM;j++){
                stone = goban.stonesOnGoban[i][j];
                if(!stone)
                   continue;
                this.drawStone(toCoor(stone.pos[0], stone.pos[1]), stone.color);
           } 
    };

    this.onMoveMouseListener = function(evt){
        gobanView.reDraw();

        //var point = toPoint(evt.layerX - this.offsetLeft, evt.layerY - this.offsetTop);
        var point = toPoint(evt.layerX - gobanView.gobanCanvas.offsetLeft, evt.layerY - gobanView.gobanCanvas.offsetTop);
        var x = point[0];
        var y = point[1];
        if(x<0)
            x = 0;
        if(x>=LINENUM)
            x = LINENUM-1;
        if(y<0)
            y = 0;
        if(y>=LINENUM)
            y = LINENUM-1;

        gobanView.drawMouseStone(toCoor(x, y), goban.numCurrent % 2);
    };

    this.onClickMouseListener = function(evt){
        //var point = toPoint(evt.layerX - this.offsetLeft, evt.layerY - this.offsetTop);
        var point = toPoint(evt.layerX - gobanView.gobanCanvas.offsetLeft, evt.layerY - gobanView.gobanCanvas.offsetTop);
        var x = point[0];
        var y = point[1];
        if(x<0 || x>=LINENUM)
            return;
        if(y<0 || y>=LINENUM)
            return;

        if(!goban.canPlay(point))
           return; 

        stone = new Stone(goban.numCurrent % 2, point, goban.numCurrent+1);
        goban.addStone(point, stone); 

        gobanView.reDraw();
    };

    //this.gobanCanvas.addEventListener('mousemove', this.onMoveMouseListener);
    //this.gobanCanvas.addEventListener('click', this.onClickMouseListener);
    document.body.addEventListener('mousemove', this.onMoveMouseListener);
    document.body.addEventListener('click', this.onClickMouseListener);
}

