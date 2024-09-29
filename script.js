const game = `<div class="wrapper">
<div class="wrapper_heading" id="wrapper_heading"></div>
<div class="board">
    <div id="box1" onclick="boxInputter(this)" class="box"></div>
    <div id="box2" onclick="boxInputter(this)" class="box"></div>
    <div id="box3" onclick="boxInputter(this)" class="box"></div>
    <div id="box4" onclick="boxInputter(this)" class="box"></div>
    <div id="box5" onclick="boxInputter(this)" class="box"></div>
    <div id="box6" onclick="boxInputter(this)" class="box"></div>
    <div id="box7" onclick="boxInputter(this)" class="box"></div>
    <div id="box8" onclick="boxInputter(this)" class="box"></div>
    <div id="box9" onclick="boxInputter(this)" class="box"></div>
</div>
<div class="btns">
    <button class="btn" onclick='gameQuitter()' id="quit">Quit</button>
    <button class="btn" onclick='gameRestarter()' id="restart">Restart</button>
</div>
</div>`

const home = `<div class="home">
<button class="home_btn home_btn1" onclick="playWithComputer()"><img src="Assets/news.png">Play With Computer</button>
<button class="home_btn home_btn2" onclick="playWithFriends()"><img src="Assets/group.png"> Play With Friends</button>
</div>`

let isComputerTurn = false
let computerPlay = false
let userPlay = false

function playWithComputer() {
    document.body.innerHTML = game;
    document.getElementById('wrapper_heading').innerHTML = 'Play With Computer'
    computerPlay = true
    isComputerTurn = true;
    computerInputter()
}

function playWithFriends() {
    document.body.innerHTML = game;
    userPlay = true
    document.getElementById('wrapper_heading').innerHTML = 'Play With Friends'
}

function computerInputter() {
    while (true) {
        let place = Math.ceil(Math.random() * 9)
        if (document.getElementById(`box${place}`).innerHTML === '') {
            document.getElementById(`box${place}`).innerHTML = player
            classAdder(document.getElementById(`box${place}`))
            break
        }
    }
    X_moveAudio.play()
    winChecker()
}

let player = 'X'

function boxInputter(elem) {
    if (elem.innerHTML === '') {
        elem.innerHTML = player
        classAdder(elem)
        O_moveAudio.play()
        winChecker()

        if (isComputerTurn && computerPlay) {
            setTimeout(() => {
                computerInputter()
            }, 200)
        }
    }
}


function winChecker() {
    const b1 = document.getElementById("box1").innerHTML
    const b2 = document.getElementById("box2").innerHTML
    const b3 = document.getElementById("box3").innerHTML
    const b4 = document.getElementById("box4").innerHTML
    const b5 = document.getElementById("box5").innerHTML
    const b6 = document.getElementById("box6").innerHTML
    const b7 = document.getElementById("box7").innerHTML
    const b8 = document.getElementById("box8").innerHTML
    const b9 = document.getElementById("box9").innerHTML

    if (((b1 === b2) && (b2 === b3) && (b1 != '')) || ((b4 === b5) && (b5 === b6) && (b4 != '')) || ((b7 === b8) && (b8 === b9) && (b7 != '')) || ((b1 === b4) && (b4 === b7) && (b1 != '')) || ((b2 === b5) && (b5 === b8) && (b2 != '')) || ((b3 === b6) && (b6 === b9) && (b3 != '')) || ((b1 === b5) && (b5 === b9) && (b1 != '')) || ((b3 === b5) && (b5 === b7) && (b3 != ''))) {
        if (computerPlay && player === 'X') {
            afterWinning('Computer Won')
            gameLostAudio.play()
        }
        else if (computerPlay && player === 'O') {
            afterWinning('You Won')
            gameEndAudio.play()
        }
        else {
            afterWinning(`Player ' ${player} ' Won`)
            gameEndAudio.play()

        }
        isComputerTurn = false
    }
    else if ((b1 != '') && (b2 != '') && (b3 != '') && (b4 != '') && (b5 != '') && (b6 != '') && (b7 != '') && (b8 != '') && (b9 != '')) {
        afterWinning("Match Draw!")
        matchDrawAudio.play()
    }
    else {
        player = (player === 'X') ? 'O' : 'X'
    }

}


function gameRestarter() {
    document.body.innerHTML = game
    player = 'X'
    const afterStartStr = `<button class="btn" onclick='gameRestarter()' id="restart">Restart</button></div>`
    document.querySelector('.btns').lastElementChild.remove()
    document.querySelector('.btns').innerHTML += afterStartStr

    if (computerPlay) {
        setTimeout(() => {
            computerInputter()
        }, 200)
        isComputerTurn = true
        document.getElementById("wrapper_heading").innerHTML = 'Play With Computer'
    }
    if (userPlay) {
        document.getElementById("wrapper_heading").innerHTML = 'Play With Friends'
    }
}

function gameQuitter() {
    document.body.innerHTML = home
    player = 'X'
    isComputerTurn = false
    computerPlay = false
    userPlay = false
}

function classAdder(elem) {
    elem.classList.add('box_filled')
    if (player === 'X') {
        elem.classList.add('colorRed')
    }
    else {
        elem.classList.add('colorBlue')
    }
}

function afterWinning(message) {
    const afterWinStr = `<button class="btn" onclick='gameRestarter()' id="restart">Play Again</button></div>`

    document.querySelector('.btns').lastElementChild.remove()
    document.querySelector('.btns').innerHTML += afterWinStr

    document.getElementById('wrapper_heading').innerHTML = message

    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => {
        if (!box.classList.contains('box_filled')) {
            box.classList.add('box_filled')
        }
        box.onclick = ''
    })
}

const X_moveAudio = new Audio('Assets/X_move.wav')
const O_moveAudio = new Audio('Assets/O_move.wav')
const gameEndAudio = new Audio('Assets/gameEnd.mp3')
const gameLostAudio = new Audio('Assets/gameLost.mp3')
const matchDrawAudio = new Audio('Assets/matchDraw.mp3')
