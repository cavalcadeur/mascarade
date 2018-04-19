var W,H;
var ctx,canvas,audioCtx,decor,canvasFond;
var alertDiv;
var truc;



//donnee


// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    alertDiv = document.querySelector("#alert");
    W = canvas.width;
    H = canvas.height;
    resize();
    alertDiv.addEventListener("touchend", onTouch, false);
    alertDiv.addEventListener("mouseup", onTouch, false);
    truc = new Chapter();
    truc.start("test",undefined,Draw,ctx);
}

function onTouch(evt){
    truc.touch();
}
