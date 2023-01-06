// evento para monitorar o teclado em qualquer lugar do navegador
document.body.addEventListener('keydown', (event) => {
    playSound(event.code.toLowerCase());
});

// evento para monitorar o click no formulario de composição
document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value;

    if(song !== '') {
        let songArray = song.split('');
        playComposition(songArray);
    }
});

// função para tocar som conforme tecla selecionada
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement) {
       keyElement.classList.add('active'); 

       setTimeout(() => {
           keyElement.classList.remove('active')
       }, 500);
    }
}

// função para tocar composição feita no formulário
function playComposition(songArray) {
    let wait = 0;
    
    // loop para tocar cada som com tempo de espera
    for(let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);
        
        wait += 250;
    }
}