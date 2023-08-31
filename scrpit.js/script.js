
const html = document.querySelector('html')

// Botões
const focoBT = document.querySelector('.app__card-button--foco')
const curtoBT = document.querySelector('.app__card-button--curto')
const longoBT = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBT = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')

// Tempo
const tempoNaTela = document.querySelector('#timer')

// Imgs
const banner = document.querySelector('.app__image')
const playOuPauseImg = document.querySelector('.app__card-primary-butto-icon')

// Texto
const titulo = document.querySelector('.app__title')

// Sons
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('../sons/luna-rise-part-one.mp3')
musica.loop = true
const playSong = new Audio('../sons/play.wav')
const pauseSong = new Audio('../sons/pause.mp3')
const zerarSong = new Audio('../sons/beep.mp3')

// Temporizador
let tempoDecorridoEmSegundos = 1500
let intervaloId = null


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBT.classList.add('active')
})

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
})

longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBT.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `../imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!<strong>
            `

            break;

        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superficie.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }

}

// Temporizador
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerarSong.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBT.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        zerar()
        pauseSong.play()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    playSong.play()

    iniciarOuPausarBt.textContent = "Pausar"
    playOuPauseImg.setAttribute('src', '../imagens/pause.png')

}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null

    iniciarOuPausarBt.textContent = "Começar"
    playOuPauseImg.setAttribute('src', '../imagens/play_arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
