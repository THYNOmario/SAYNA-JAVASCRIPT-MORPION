const items = document.getElementsByClassName('grid-item');
const itemsArray = Array.from(items);

const gameBoard = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const PLAYERS = {
    x: {
        mark: "X",
        score: 0
    },
    o: {
        mark: "0",
        score: 0
    }
};

const winningConditionIdx = [
    // 1 er condition
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // 2 eme condition
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // 3 eme condition
    [0, 4, 8],
    [2, 4, 6]
]

let turn = PLAYERS.x.mark;


function switchTurn(currentPLayer) {
    if (currentPLayer === PLAYERS.x.mark) {
        turn = PLAYERS.o.mark;
    } else {
        turn = PLAYERS.x.mark
    }
}


function getCurrentItemsIndex(currentCell) {
    return itemsArray.indexOf(currentCell);
}


function chooseCase(id) {
    const haveWinner = hasWinner();

    const currentCell = document.getElementById(id);
    const currentItemIdx = getCurrentItemsIndex(currentCell);
    if (gameBoard[currentItemIdx] !== '' && !haveWinner) {
        return;
    }

    if (turn === PLAYERS.x.mark && !haveWinner) {
        currentCell.textContent = PLAYERS.x.mark;
        updateGameBoard(currentItemIdx, PLAYERS.x.mark);
        setTimeout(cpuTurn, 400);
    } else if (turn === PLAYERS.o.mark && !haveWinner) {
        currentCell.textContent = PLAYERS.o.mark;
        updateGameBoard(currentItemIdx, PLAYERS.o.mark);
        switchTurn(turn);
    }

    if (haveWinner) {
        const winner = getWinner();
        showWinner(winner);
        outputScore();
        reset();
    }
    resetIfNoOneWin();
}


function hasEmptyCell() {
    let hasEmptyCell = true;
    if (!(itemsArray.some(element => element.textContent === ""))) {
        hasEmptyCell = false;
    }
    return hasEmptyCell;
}


function getFreeCell() {
    let randomIdx = 0;
    do {
        randomIdx = Math.floor(Math.random() * gameBoard.length);
    } while (gameBoard[randomIdx] !== "" && hasEmptyCell())

    return randomIdx;
}

function getCpuChosenElementId() {
    let freeCell = getFreeCell();
    return itemsArray[freeCell].id;

}

function cpuTurn() {
    switchTurn(turn);
    const chosenElement = getCpuChosenElementId()
    document.getElementById(chosenElement).click();
}

function updateGameBoard(idx, content) {
    gameBoard[idx] = content;
}

function hasWinner() {
    let hasWinner = false;
    for (const conditions of winningConditionIdx) {
        const a = gameBoard[conditions[0]];
        const b = gameBoard[conditions[1]];
        const c = gameBoard[conditions[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            hasWinner = true;
        }
    }
    return hasWinner;
}

function getWinner() {
    let winner = "";
    if (turn === PLAYERS.o.mark) {
        winner = PLAYERS.x.mark
    } else if (turn === PLAYERS.x.mark) {
        winner = PLAYERS.o.mark
    }
    return winner;
}

function showWinner(winner) {
    if (winner === PLAYERS.x.mark) {
        alert("You Win!");
    } else if (winner === PLAYERS.o.mark) {
        alert("Defeat")
    }
    setScore(winner);
}


function setScore(winner) {
    if (winner === PLAYERS.x.mark) {
        PLAYERS.x.score++
    } else {
        PLAYERS.o.score++
    }
}

function outputScore() {
    const playerScoreOutput = document.getElementById("player-score");
    const cpuScoreOutput = document.getElementById("cpu-score");

    playerScoreOutput.textContent = PLAYERS.x.score;
    cpuScoreOutput.textContent = PLAYERS.o.score;
}

function reset() {
    for (const item of itemsArray) {
        item.textContent = '';
    }

    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = "";
    }

    if (getWinner() === PLAYERS.x.mark) {
        switchTurn(turn);
    }
}

function resetIfNoOneWin() {
    if (!hasWinner() && !hasEmptyCell()) {
        const resetConfirmation = confirm("MatchNul")
        reset();
    }
}