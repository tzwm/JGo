function main(){
    gobanCanvas = document.getElementById('goban');
    gobanView = new GobanView();
    jgoban = new JGoban();

    gobanView.animDrawGoban();
}
