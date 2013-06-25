function Go(){
    this.scoreBlack = 0;
    this.scoreWhite = 0;

    this.colorTmp = -1;
    this.stonesTmp = new Array(LINENUM);

    this.initStonesTmp = function(){
        for(var i=0;i<LINENUM;i++){
            this.stonesTmp[i] = new Array(LINENUM);
            for(var j=0;j<LINENUM;j++)
                this.stonesTmp[i][j] = false;
        }
    };

    this.checkPoint = function(x, y){
        this.stonesTmp[x][y] = true;

        var tot = 1;
        for(var i=0;i<4;i++){
            var xx = x +DIRECTION[0][i];
            var yy = y +DIRECTION[1][i];
            if(xx<0||xx>=LINENUM||yy<0||yy>=LINENUM)
                continue;

            if(goban.stones10[xx][yy] != -1){
                if(this.colorTmp === -1){
                    this.colorTmp = goban.stones10[xx][yy];
                    continue;
                }
                if(goban.stones10[xx][yy] != this.colorTmp)
                   return -1;
            }else{
                if(this.stonesTmp[xx][yy])
                    continue;
                var tmp = this.checkPoint(xx, yy);
                if(tmp === -1)
                    return -1;
                tot += tmp;
            }
        }

        return tot;
    };

    this.getScore = function(){
        this.scoreBlack = 0;
        this.scoreWhite = 0;
        this.colorTmp = -1;
        this.initStonesTmp();

        for(var i=0;i<LINENUM;i++)
           for(var j=0;j<LINENUM;j++){
               if(this.stonesTmp[i][j])
                   continue;

               this.stonesTmp[i][j] = true;
               if(goban.stones10[i][j] === 0)
                   this.scoreBlack++;
               if(goban.stones10[i][j] === 1)
                   this.scoreWhite++;
               if(goban.stones10[i][j] != -1)
                   continue;

               this.colorTmp = -1;
               var tot = this.checkPoint(i, j);
               if(tot === -1)
                   return false; 
               if(this.colorTmp === 0)
                   this.scoreBlack += tot;
               if(this.colorTmp === 1)
                   this.scoreWhite += tot;
           } 

        return true;
    };

    this.displayScore = function(){
        this.getScore();
        document.getElementById("scoreBlack").innerHTML = this.scoreBlack;
        document.getElementById("scoreWhite").innerHTML = this.scoreWhite;
    };
}
