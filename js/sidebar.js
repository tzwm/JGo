function Sidebar(){
    this.setPlayer = function(str){
        $("#playerCurLi").text("Current Player: \n" + str);
    };

    this.setNumCur = function(str){
        $("#numCurLi").text("Current Step: \n" + str);
    };

    this.showScore = function(player, score){
        if(score === -1){
            $("#playerCurLi").text("The Game is not over.");
            return;
        }

        $("#playerCurLi").text("Victor: \n" + player);
        $("#numCurLi").text("Victor Score: \n" + score);
    };

    this.div = document.createElement("div");
    this.div.className = "divSidebar";

    this.list = document.createElement("ul");
    this.list.className = "listSidebar";

    var playerCur = document.createElement("li");
    playerCur.id= "playerCurLi";
    playerCur.innerHTML = "Current Player: \n" + NAMEPLAYER[0];
    $(this.list).append(playerCur);

    var numCur= document.createElement("li");
    numCur.id= "numCurLi";
    numCur.innerHTML = "Current Step: \n 0";
    $(this.list).append(numCur);


    this.scoringBtn = document.createElement("a");
    this.scoringBtn.className = "scoreBtn button button-rounded button-flat-primary";
    this.scoringBtn.innerHTML = "Score";
    this.scoringBtn.href = "#";

    $(this.div).append(this.list);
    $(this.div).append(this.scoringBtn);
    $("body").append(this.div);

    this.scoringBtn.addEventListener("click", go.displayScore);
}
