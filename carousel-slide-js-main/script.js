let currentSlide = 0 //variavel de slide atual

// definindo largura pelo total de imagens no slide
let totalSlides = document.querySelectorAll('.slider-item').length
document.querySelector('.slider-width').style.width = `calc(100vw * ${totalSlides})`

// definindo altura do slider
document.querySelector('.slider-controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`

// função para voltar slide
function goPrev() {
    currentSlide--
    if(currentSlide < 0) {
        currentSlide = totalSlides - 1
    }
    updateMargin()
}

// função para avançar slide
function goNext() {
    currentSlide++
    if(currentSlide > (totalSlides - 1)) {
        currentSlide = 0
    }
    updateMargin()
}

// função para ajustar o desocamento das margens
function updateMargin() {
    //pegando largura do item do slide
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth
    // nova margem é a largura da tela multiplicado pelo numero do slide
    let newMargin = (currentSlide * sliderItemWidth)
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`
}

// passar o slide de forma automática
setInterval(goNext, 6000)