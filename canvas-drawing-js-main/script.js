// DADOS INICIAIS
let currentColor = 'black';

let screen = document.querySelector('#tela');
let contexto = screen.getContext('2d');

let canDraw = false;

let mouseX = 0;
let mouseY = 0;

// EVENTOS
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
});

screen.addEventListener('mousedown', mouseDownEvent); // 1 - Quando click do mouse ABAIXAR, ativar o modo desenho
screen.addEventListener('mousemove', mouseMoveEvent); // 2 - Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
screen.addEventListener('mouseup', mouseUpEvent); // 3 - Quando o click do mouse LEVANTAR, desative o modo desenho.

document.querySelector('.clear').addEventListener('click', clearScreen);

// FUNÇÕES
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) { 
    canDraw = true; 

    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY)        
    }
}

function mouseUpEvent() { canDraw = false; }

function draw(x, y) {
    
    let pointX = x - screen.offsetLeft; // tirando a diferença do canvas na horizontal
    let pointY = y - screen.offsetTop; // tirando a diferença do canvas na vertical

    // FUNÇÕES PARA DESENHO NO CANVAS
    contexto.beginPath();
    contexto.lineWidht = 10;
    contexto.lineJoin = "round";
    contexto.moveTo(mouseX, mouseY);
    contexto.lineTo(pointX, pointY);
    contexto.closePath()
    contexto.strokeStyle = currentColor;
    contexto.stroke();

    // colocando novo ponto inicil na posição do ponto final
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    contexto.setTransform(1, 0, 0, 1, 0, 0);
    contexto.clearRect(0, 0, contexto.canvas.width, contexto.canvas.height);
}