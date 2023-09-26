const casasTabuleiro = document.querySelectorAll(".tictactoe__casa")
const turnPlayer = document.querySelector(".turn__img")
const contadoresPlacar = document.querySelectorAll(".contador__vitorias")
const botaoRestart = document.querySelector(".btn-restart")
const modal = document.querySelector(".tictactoe__modal")
const modalJogo = document.querySelector(".modal__overlayer")
const botaoUmModal = document.querySelector(".modal__principalbtn")
const botaoDoisModal = document.querySelector(".modal__secundariobtn")
let casasLivres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let placar = [0, 0, 0]
let jogadorVez = 0
let ganhador = false
let contadorJogadas = 0
let tabuleiro = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
let placarJogadorUm = placar[0]
let placarJogadorDois = placar[2]
let placarEmpates = placar[1]

const jogadorHandle = event => {
  if (jogadorVez === 0) {
    const casaClicada = event.currentTarget
    const posicaoCasaSelecionada = Number(casaClicada.getAttribute("casa"))
    const estaSelecional = casasLivres.includes(posicaoCasaSelecionada)

    if (estaSelecional) {
      contadorJogadas++
      prencherTabuleiro(posicaoCasaSelecionada, casaClicada)
      verificaGanhador("X")
      jogadorUmVencedor()
    } else {
      console.log("esta selecionada")
    }
  }
}

function prencherTabuleiro(posicao, casaClicada) {
  const indexCasa = casasLivres.indexOf(posicao)
  const indexTabuleiro = Number(casaClicada.getAttribute("casa")) - 1

  casasLivres.splice(indexCasa, 1)
  marcaNoHTML(indexTabuleiro, "./assets/icon-x.svg")
  marcaNoTabuleiro(posicao, "X")
}

function marcaNoTabuleiro(posicao, jogador) {
  for (let i = 0; i < tabuleiro.length; i++) {
    for (let z = 0; z < tabuleiro[i].length; z++) {
      if (tabuleiro[i][z] == posicao) {
        tabuleiro[i][z] = jogador
      }
    }
  }
}

function alterarContador(elemento, valor) {
  elemento.textContent = valor
}

function jogadorUmVencedor() {


  if (ganhador == true) {
    placarJogadorUm++
    modal.innerHTML = `<span class="modal__subtitle font-principal-xs cor-7">YOU WON!</span>
    <h1 class="modal__title font-principal-l  cor-7"><img src="./assets/icon-x.svg" class="icon-jogador">TAKES THE ROUND</h1>
    <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="proximoJogo()">QUIT</button>
    <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
  `
  modalJogo.classList.toggle("disablemodal")
    
    setTimeout(() => {
      alterarContador(contadoresPlacar[0], placarJogadorUm)
      limparTabuleiro()
    }, 500)
  } else {
    jogadorVez++

    if (contadorJogadas === 9) {
      placarEmpates++
      modal.innerHTML = `
      <h1 class="modal__title font-principal-l  cor-7">ROUND TIED</h1>
      <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="proximoJogo()">QUIT</button>
      <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
    `
    modalJogo.classList.toggle("disablemodal")
      setTimeout(() => {
        alterarContador(contadoresPlacar[1], placarEmpates)
        limparTabuleiro()
      }, 500)

      return
    }
    mudarVezHTML("./assets/jogador-vez-o.svg")
    setTimeout(() => {
      jogadaBot()
    }, 1000)
  }
}

function cpuVenceu() {
  if (ganhador == true) {
    placarJogadorDois++
    modal.innerHTML = `<span class="modal__subtitle font-principal-xs cor-7">OH NO, YOU LOST…</span>
    <h1 class="modal__title font-principal-l  cor-3"><img src="./assets/icon-o.svg" class="icon-jogador">TAKES THE ROUND</h1>
    <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="proximoJogo()">QUIT</button>
    <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
  `
  modalJogo.classList.toggle("disablemodal")
    setTimeout(() => {
      alterarContador(contadoresPlacar[2], placarJogadorDois)
      limparTabuleiro()
    }, 500)

  } else {
    jogadorVez--
    mudarVezHTML("./assets/jogador-vez-x.svg")
  }
}

function proximoJogo(){
  limparTabuleiro()
  modalJogo.classList.toggle("disablemodal")
}

function voltarAoJogo(){
  modalJogo.classList.toggle("disablemodal")
}

function mudarVezHTML(src) {
  turnPlayer.setAttribute("src", src)
}

function jogadaBot() {
  const indexAleatorio = Math.ceil(Math.random() * casasLivres.length) - 1
  const casaEscolhida = casasLivres[indexAleatorio]
  const indexJogadaCasa = casasLivres.indexOf(casaEscolhida)
  const indexCasaSelecionada = casaEscolhida - 1

  casasLivres.splice(indexJogadaCasa, 1)
  marcaNoTabuleiro(casaEscolhida, "O")
  marcaNoHTML(indexCasaSelecionada, './assets/icon-o.svg')
  verificaGanhador("O")
  cpuVenceu()
  contadorJogadas++
}

function controleJogadas(index) {
  casasLivres.splice(index, 1)
}

function marcaNoHTML(indexJogada, src) {
  const playerImg = document.createElement("img")

  playerImg.setAttribute("src", src)
  casasTabuleiro[indexJogada].appendChild(playerImg)
}

function verificaGanhador(jogador) {
  verificarGanhadorLinha(jogador)
  verificarGanhadorColuna(jogador)
  verificarGanhadorDiagonal(jogador)
}

function verificarGanhadorLinha(jogador) {
  let qntJogadasQueCombinam = 0

  for (let i = 0; i < tabuleiro.length; i++) {
    qntJogadasQueCombinam = 0
    for (let z = 0; z < tabuleiro[i].length; z++) {
      if (tabuleiro[i][z] === jogador) {
        qntJogadasQueCombinam++
        if (qntJogadasQueCombinam === 3) {
          ganhador = true
        }
      }
    }
  }
}

function verificarGanhadorColuna(jogador) {
  const primeiraLinhaCombina = tabuleiro[0][0] === jogador && tabuleiro[1][0] === jogador && tabuleiro[2][0] === jogador
  const segundaLinhaCombina = tabuleiro[0][1] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][1] === jogador
  const terceiraLinhaCombina = tabuleiro[0][2] === jogador && tabuleiro[1][2] === jogador && tabuleiro[2][2] === jogador

  if (primeiraLinhaCombina || segundaLinhaCombina || terceiraLinhaCombina) {
    ganhador = true
  }
}

function verificarGanhadorDiagonal(jogador) {
  const primeiraDiagonalCombina = tabuleiro[0][0] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][2] === jogador
  const segundaDiagonalCombina = tabuleiro[0][2] === jogador && tabuleiro[1][1] === jogador && tabuleiro[2][0] === jogador

  if (primeiraDiagonalCombina || segundaDiagonalCombina) {
    ganhador = true
  }
}

function limparTabuleiro() {
  casasLivres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  jogadorVez = 0
  contadorJogadas = 0
  tabuleiro = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  ganhador = false

  mudarVezHTML("./assets/jogador-vez-x.svg")
  casasTabuleiro.forEach((item) => {
    if (item.firstChild != null) {
      item.firstChild.remove()
    }
  })
}

function montarHtmlGanhador() {

}
casasTabuleiro.forEach((casa, index) => {
  casa.setAttribute("casa", index + 1)
  casa.addEventListener("click", jogadorHandle)
})

botaoRestart.addEventListener("click", event => {
  modal.innerHTML = `
      <h1 class="modal__title font-principal-l  cor-7">RESTART GAME?</h1>
      <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarAoJogo()">NO, CANCEL</button>
      <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">YES, RESTART</button>
    `
    modalJogo.classList.toggle("disablemodal")
})

