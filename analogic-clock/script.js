// pegando relogio digital e ponteiros na DOM
let digitalElement = document.querySelector('.digital');
let sElement = document.querySelector('.p_s');
let mElement = document.querySelector('.p_m');
let hElement = document.querySelector('.p_h');

// funcão para matualiza
function updateClock() {
    let now = new Date();

    let hNow = now.getHours();
    let mNow = now.getMinutes(); 
    let sNow = now.getSeconds();

    // relogio digital
    digitalElement.innerHTML = `${fixZero(hNow)}:${fixZero(mNow)}:${fixZero(sNow)}`;

    // relogio analogico
    let sDeg = ((360 / 60) * sNow) - 90;
    let mDeg = ((360 / 60) * mNow) - 90;
    let hDeg = ((360 / 12) * hNow) - 90;

    sElement.style.transform = `rotate(${sDeg}deg)`;
    mElement.style.transform = `rotate(${mDeg}deg)`;
    hElement.style.transform = `rotate(${hDeg}deg)`;

}

// função para acrescentar zero a esquerda em numeros menores de 10
function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

// função para chamar atualização do relogio a cada 1 segundo
setInterval(updateClock, 1000);

updateClock();
