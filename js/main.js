function main(){
    var goban = new Goban(LINENUM);
    goban.animDrawGoban();

    var canvas = document.getElementById('goban');
    var ctx = canvas.getContext('2d');
    var gx;
    var gy;
    canvas.addEventListener('mousemove', function onMouseMove(evt){
        gx = evt.layerX;
        gy = evt.layerY;
        document.getElementById('getX').innerHTML = "mouse X:" + gx;
        document.getElementById('getY').innerHTML = "mouse Y:" + gy;

        gg = toPoint(gx, gy);
        gx = gg[0];
        gy = gg[1];

        ctx.globalAlpha = 1;
        goban.drawGoban();
        ctx.globalAlpha= 0.4;
        var tmp = toCoor(gx, gy);
        ctx.fillStyle='#000000';
        ctx.moveTo(tmp[0], tmp[1]);
        ctx.arc(tmp[0], tmp[1], 15, 0, Math.PI*2, true);
        ctx.fill();
    });
}
