function main(){
    wel = new Welcome();
}

function begin(){
    $("body").css("text-align", "left");
    gobanView = new GobanView();
    goban = new JGoban();
    go = new Go();
    gobanView.animDrawGoban();
}

