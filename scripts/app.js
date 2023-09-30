const menu = document.querySelector(".menu")
const game = document.querySelector(".game")
const casasTabuleiro = document.querySelectorAll(".tictactoe__casa")
const turnPlayer = document.querySelector(".turn__img")
const contadoresPlacar = document.querySelectorAll(".contador__vitorias")
const botaoRestart = document.querySelector(".btn-restart")
const modal = document.querySelector(".tictactoe__modal")
const modalJogo = document.querySelector(".modal__overlayer")
const botaoUmModal = document.querySelector(".modal__principalbtn")
const botaoDoisModal = document.querySelector(".modal__secundariobtn")
const vsCPUBtn = document.querySelector(".newgame__vscpu")
const vsPlayerBtn = document.querySelector(".newgame__vsplayer")
const firstX = document.querySelector(".painel__img:first-of-type")
const firstO = document.querySelector(".painel__img:last-of-type")
let casasLivres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let placar = [0, 0, 0]
let placarJogadorUm = placar[0]
let placarJogadorDois = placar[2]
let placarEmpates = placar[1]
let jogadorVez = 1
let tipoJogador = 0
let firstIsX = false
let contadorJogadas = 0
let ganhador = false
let tabuleiro = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

const jogadorHandle = event => {
  const casaClicada = event.currentTarget
  const posicaoCasaSelecionada = Number(casaClicada.getAttribute("casa"))

  if (jogadorVez === 0) {
    contadorJogadas++
    removeEventoCasa(casaClicada)
    prencherTabuleiro(posicaoCasaSelecionada, casaClicada, firstIsX ? "./assets/icon-x.svg" : "./assets/icon-o.svg", firstIsX ? "X" : "O")
    verificaGanhador(firstIsX ? "X" : "O")
    jogadorUmVencedor(firstIsX ? "X" : "O")

  } else if (tipoJogador === 1) {
    contadorJogadas++
    removeEventoCasa(casaClicada)
    prencherTabuleiro(posicaoCasaSelecionada, casaClicada, firstIsX ? "./assets/icon-o.svg" : "./assets/icon-x.svg", firstIsX ? "O" : "X")
    verificaGanhador(firstIsX ? "O" : "X")
    jogadorDoisVencedor(firstIsX ? "O" : "X")

  }
}



function prencherTabuleiro(posicao, casaClicada, src, player) {
  const indexCasa = casasLivres.indexOf(posicao)
  const indexTabuleiro = Number(casaClicada.getAttribute("casa")) - 1

  casasLivres.splice(indexCasa, 1)
  marcaNoHTML(indexTabuleiro, src)
  marcaNoTabuleiro(posicao, player)
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

function jogadorUmVencedor(tipo) {
  const tipoJogadorIs = firstIsX === true ? "O" : "X"

  if (ganhador == true) {
    placarJogadorUm++
    modal.innerHTML = `<span class="modal__subtitle font-principal-xs cor-7">${tipoJogador === 0 ? "YOU WON!" : "PLAYER 1 WINS!"}</span>
    <h1 class="modal__title font-principal-l  ${tipoJogadorIs === "X" ? "cor-3" : "cor-2"}"><img src="./assets/icon-${tipo.toLowerCase()}.svg" class="icon-jogador">TAKES THE ROUND</h1>
    <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
    <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
  `
    modalJogo.classList.toggle("disablemodal")
    if (tipo === "X") {
      alterarContador(contadoresPlacar[0], placarJogadorUm)
    } else {
      alterarContador(contadoresPlacar[2], placarJogadorUm)
    }
    setTimeout(() => {
      limparTabuleiro()
    }, 600)
  } else {
    jogadorVez++

    if (contadorJogadas === 9) {
      placarEmpates++
      modal.innerHTML = `
      <h1 class="modal__title font-principal-l  cor-7">ROUND TIED</h1>
      <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
      <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
    `
      modalJogo.classList.toggle("disablemodal")
      alterarContador(contadoresPlacar[1], placarEmpates)
      setTimeout(() => {
        limparTabuleiro()
      }, 600)

      return
    }
    mudarVezHTML(`./assets/jogador-vez-${tipoJogadorIs.toLowerCase()}.svg`)

    if (!(tipoJogador === 1)) {
      setTimeout(() => {
        jogadaBot(tipoJogadorIs)
      }, 1000)
    }
  }
}

function jogadorDoisVencedor(tipo) {
  const tipoJogadorIs = firstIsX === true ? "X" : "O"
  if (ganhador == true) {
    placarJogadorDois++
    modal.innerHTML = `<span class="modal__subtitle font-principal-xs cor-7">PLAYER 2 WINS!</span>
    <h1 class="modal__title font-principal-l ${tipoJogadorIs === "X" ? "cor-3" : "cor-2"}"><img src="./assets/icon-${tipo.toLowerCase()}.svg" class="icon-jogador">TAKES THE ROUND</h1>
    <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
    <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
  `
    modalJogo.classList.toggle("disablemodal")
    if (tipo === "X") {
      alterarContador(contadoresPlacar[0], placarJogadorDois)
    } else {
      alterarContador(contadoresPlacar[2], placarJogadorDois)
    }
    setTimeout(() => {
      limparTabuleiro()
    }, 600)
  } else {
    jogadorVez--

    if (contadorJogadas === 9) {
      placarEmpates++
      modal.innerHTML = `
      <h1 class="modal__title font-principal-l  cor-7">ROUND TIED</h1>
      <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
      <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
    `
      modalJogo.classList.toggle("disablemodal")
      alterarContador(contadoresPlacar[1], placarEmpates)
      setTimeout(() => {
        limparTabuleiro()
      }, 600)

      return
    }
    mudarVezHTML(`./assets/jogador-vez-${tipoJogadorIs.toLowerCase()}.svg`)
  }
}

function cpuVenceu(tipo) {
  const tipoJogador = tipo === "X" ? "O" : "X"
  if (ganhador == true) {
    placarJogadorDois++
    modal.innerHTML = `<span class="modal__subtitle font-principal-xs cor-7">OH NO, YOU LOST…</span>
    <h1 class="modal__title font-principal-l  ${tipo === "X" ? "cor-2" : "cor-3"}"><img src="./assets/icon-${tipo.toLowerCase()}.svg" class="icon-jogador">TAKES THE ROUND</h1>
    <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
    <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
  `
    modalJogo.classList.toggle("disablemodal")
    if (tipo === "X") {
      alterarContador(contadoresPlacar[0], placarJogadorDois)
    } else {
      alterarContador(contadoresPlacar[2], placarJogadorDois)
    }

    setTimeout(() => {
      limparTabuleiro()
    }, 600)

  } else {
    jogadorVez--
    if (contadorJogadas === 9) {
      placarEmpates++
      modal.innerHTML = `
      <h1 class="modal__title font-principal-l  cor-7">ROUND TIED</h1>
      <button class="modal__principalbtn font-principal-xs cor-5 btn-secondary-minor" onClick="voltarMenu()">QUIT</button>
      <button class="modal__secundariobtn font-principal-xs cor-5 btn-primary-minor" onClick="proximoJogo()">NEXT ROUND</button>
    `
      modalJogo.classList.toggle("disablemodal")
      alterarContador(contadoresPlacar[1], placarEmpates)
      setTimeout(() => {
        limparTabuleiro()
      }, 600)

      return
    }
    mudarVezHTML(`./assets/jogador-vez-${tipoJogador.toLowerCase()}.svg`)
  }
}

function jogadaBot(tipo) {
  const indexAleatorio = Math.ceil(Math.random() * casasLivres.length) - 1
  const casaEscolhida = casasLivres[indexAleatorio]
  const indexJogadaCasa = casasLivres.indexOf(casaEscolhida)
  const indexCasaSelecionada = casaEscolhida - 1

  casasLivres.splice(indexJogadaCasa, 1)
  contadorJogadas++
  marcaNoTabuleiro(casaEscolhida, tipo)
  marcaNoHTML(indexCasaSelecionada, `./assets/icon-${tipo.toLowerCase()}.svg`)
  verificaGanhador(tipo)
  cpuVenceu(tipo)

}

function alterarContador(elemento, valor) {
  elemento.textContent = valor
}

function mudarVezHTML(src) {
  turnPlayer.setAttribute("src", src)
}

function proximoJogo() {
  reiniciarEventosCasas()
  botJogaPrimeiro()
  modalJogo.classList.toggle("disablemodal")
}

function voltarMenu() {
  tipoJogador = 0
  limparContadores()
  reiniciarEventosCasas()
  modalJogo.classList.toggle("disablemodal")
  game.classList.add("hidden")
  menu.classList.remove("hidden")
}

function limparContadores() {
  placarJogadorUm = 0
  placarJogadorDois = 0
  placarEmpates = 0
  alterarContador(contadoresPlacar[0], placarJogadorUm)
  alterarContador(contadoresPlacar[2], placarJogadorDois)
  alterarContador(contadoresPlacar[1], placarEmpates)
}

function voltarAoJogo() {
  modalJogo.classList.toggle("disablemodal")
}

function limparTabuleiro() {
  casasLivres = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  jogadorVez = firstIsX ? 0 : 1

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

function botJogaPrimeiro() {
  if (!firstIsX && tipoJogador == 0) {

    jogadorVez = 1
    setTimeout(() => {
      jogadaBot("X")
    }, 500)
  }
}

function removeEventoCasa(casa) {
  casa.removeEventListener("click", jogadorHandle)
}

function reiniciarEventosCasas() {
  casasTabuleiro.forEach(casa => {
    casa.addEventListener("click", jogadorHandle)
  })
}

vsCPUBtn.addEventListener("click", () => {
  const labelContadores = document.querySelectorAll(".contador__player")
  labelContadores[0].innerText = jogadorVez === 1 ? "X (CPU)" : "X (YOU)"
  labelContadores[2].innerText = jogadorVez === 1 ? "O (YOU)" : "O (CPU)"
  game.classList.remove("hidden")
  menu.classList.add("hidden")

  botJogaPrimeiro()
})

vsPlayerBtn.addEventListener("click", () => {
  const labelContadores = document.querySelectorAll(".contador__player")
  labelContadores[0].innerText = jogadorVez === 1 ? "X (P2)" : "X (P1)"
  labelContadores[2].innerText = jogadorVez === 1 ? "O (P1)" : "O (P2)"
  tipoJogador = 1
  game.classList.remove("hidden")
  menu.classList.add("hidden")
})

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

firstX.addEventListener("click", event => {
  firstIsX = true
  jogadorVez = 0
  const iconPlayerX = firstX.querySelector("img")
  const iconPlayerO = firstO.querySelector("img")
  iconPlayerX.setAttribute("src", "./assets/icon-x-menu-blue.svg")
  firstO.classList.remove("ativo")
  iconPlayerO.setAttribute("src", "./assets/icon-o-menu-blue.png")
  event.currentTarget.classList.add("ativo")
})

firstO.addEventListener("click", event => {
  jogadorPadrao(event)
})

function jogadorPadrao(event) {
  firstIsX = false
  const iconPlayerX = firstX.querySelector("img")
  const iconPlayerO = firstO.querySelector("img")
  iconPlayerX.setAttribute("src", "./assets/icon-x-menu.svg")
  firstX.classList.remove("ativo")
  iconPlayerO.setAttribute("src", "./assets/icon-o-menu.png")
  event.currentTarget.classList.add("ativo")
  jogadorVez++
}