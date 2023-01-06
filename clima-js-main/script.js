document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();

    input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo()
        showMessage('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1fedc9db6bebab6e68fb6e0344c4b47e&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });

        } else {
            clearInfo()
            showMessage('Não Encontramos a Localização')
        }
    } else {
        clearInfo();
    }
});

// função para montar exibição do JSON na tela
function showInfo(json) {
    clearInfo()
    showMessage('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

// função para exibição de mensagens na tela
function showMessage(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

// função para limpar a tela
function clearInfo() {
    showMessage('')
    document.querySelector('.resultado').style.display = 'none';
}