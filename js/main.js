function main(){
    var goban = new Goban(LINENUM, document.getElementById('goban'));
    goban.animDrawGoban();

    var gx;
    var gy;
    goban.canvas.addEventListener('mousemove', function onMouseMove(evt){
        gx = evt.layerX;
        gy = evt.layerY;
        document.getElementById('getX').innerHTML = "mouse X:" + gx;
        document.getElementById('getY').innerHTML = "mouse Y:" + gy;

        gg = toPoint(gx, gy);
        gx = gg[0];
        gy = gg[1];

        goban.drawGoban();
        goban.ctx.globalAlpha= 0.4;
        var tmp = toCoor(gx, gy);
        goban.ctx.fillStyle='#000000';
        goban.ctx.moveTo(tmp[0], tmp[1]);
        goban.ctx.arc(tmp[0], tmp[1], 15, 0, Math.PI*2, true);
        goban.ctx.fill();
    });
}
