function JGoban(){
    this.numCurrent = 0;
    this.koPoint = null;
    this.stonesOnGoban = new Array(LINENUM);
    this.stones10 = new Array(LINENUM);
    for(var i=0;i<LINENUM;i++){
        this.stonesOnGoban[i] = new Array(LINENUM);
        this.stones10[i] = new Array(LINENUM);
        for(var j=0;j<LINENUM;j++){
            this.stonesOnGoban[i][j] = null;
            this.stones10[i][j] = -1;
        }
    }
    
    this.stonesList = new Array();

    this.stoneTmp = new Array(LINENUM);

    this.initStoneTmp = function(){
        for(var i=0;i<LINENUM;i++){
            this.stoneTmp[i] = new Array(LINENUM);
            for(var j=0;j<LINENUM;j++)
                this.stoneTmp[i][j] = false;
        }
    };

    this.getStonesLiberty = function(x, y){
        this.stoneTmp[x][y] = true;

        var tot = 0;
        for(var i=0;i<4;i++){
            var xx = x +DIRECTION[0][i];
            var yy = y +DIRECTION[1][i];
            if(xx<0||xx>=LINENUM||yy<0||yy>=LINENUM)
                continue;
            if(this.stoneTmp[xx][yy])
                continue;
            if(this.stones10[xx][yy] == -1)
                tot++;

            if(this.stones10[xx][yy] == this.stones10[x][y])
                tot += this.getStonesLiberty(xx, yy);
        }

        return tot;
    };

    this.removeStones = function(x, y){
        var color = this.stones10[x][y];
        this.stonesOnGoban[x][y].dead = true;
        this.stonesOnGoban[x][y] = null;
        this.stones10[x][y] = -1;
        
        var tot = 1;
        for(var i=0;i<4;i++){
            var xx = x +DIRECTION[0][i];
            var yy = y +DIRECTION[1][i];
            if(xx<0||xx>=LINENUM||yy<0||yy>=LINENUM)
                continue;
            if(this.stones10[xx][yy] == color)
                tot += this.removeStones(xx, yy);
        }

        return tot;
    };

    this.clearDead = function(x, y){
        var getTmp = false;

        for(var i=0;i<4;i++){
            var xx = x +DIRECTION[0][i];
            var yy = y +DIRECTION[1][i];
            if(xx<0||xx>=LINENUM||yy<0||yy>=LINENUM)
                continue;
            if(this.stones10[xx][yy] != this.numCurrent % 2)
                continue;

            this.initStoneTmp();
            var liberty = this.getStonesLiberty(xx, yy);
            if(liberty === 0){
                if(this.removeStones(xx, yy) == 1){
                    if(getTmp){
                        this.koPoint = null;
                        continue;
                    }
                    getTmp = true;
                    this.koPoint = [xx, yy];
                }
            }

        }
    };

    this.canCapture = function(x, y){
        var color = this.numCurrent % 2;
        for(var i=0;i<4;i++){
            var xx = x +DIRECTION[0][i];
            var yy = y +DIRECTION[1][i];
            if(xx<0||xx>=LINENUM||yy<0||yy>=LINENUM)
                continue;
            if(this.stones10[xx][yy] != (color ^ 1))
                continue;

            this.initStoneTmp();
            var liberty = this.getStonesLiberty(xx, yy);
            if(liberty === 0)
                return true;
        }

        return false;
    };

    this.addStone = function(pos, stone){
        this.numCurrent++;
        this.stonesOnGoban[pos[0]][pos[1]] = stone;
        this.stones10[pos[0]][pos[1]] = (this.numCurrent -1) %2;
        this.stonesList.push(stone);

        this.koPoint = null;
        this.clearDead(pos[0], pos[1]);
    };

    this.canPlay = function(pos){
        if(this.stonesOnGoban[pos[0]][pos[1]])
            return false;

        var ret = true;
        this.initStoneTmp();
        this.stones10[pos[0]][pos[1]] = this.numCurrent %2;
        var liberty = this.getStonesLiberty(pos[0], pos[1]);
        if(liberty === 0){
           if(!this.canCapture(pos[0], pos[1]))
               ret = false;
           if(this.koPoint && pos[0]==this.koPoint[0] && pos[1]==this.koPoint[1])
               ret = false; 
        }

        this.stones10[pos[0]][pos[1]] = -1;
        return ret;
    };

}


