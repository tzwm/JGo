function JGoban(){
    this.nowPlay = 0; 
    this.boardState = new Array(LINENUM);
    for(var i = 0; i<LINENUM; i++){
        this.boardState[i] = new Array(LINENUM);
        for(var j = 0; j<LINENUM; j++){
            this.boardState[i][j] = 0;
        }
    }
}


