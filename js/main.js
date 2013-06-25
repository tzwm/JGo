function main(){
    gobanCanvas = document.getElementById('goban');
    gobanView = new GobanView();
    goban = new JGoban();
    go = new Go();

    gobanView.animDrawGoban();
}
