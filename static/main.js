const EMPTY = 0;
const DARK = 1;
const LIGHT = 2;


const boardElement = document.getElementById('board');

async function showBoard() {
    const turnCount = 0;
    const response = await fetch(`/api/games/latest/turns/${turnCount}`);
    const responseBody = await response.json();
    const board = responseBody.board;

    while (boardElement.firstChild){
        boardElement.removeChild(boardElement.firstChild);
    }
    board.forEach((line, y) => {
        line.forEach((square, x) => {
            // <div class="square">
            const squareElement = document.createElement('div');
            squareElement.className = 'square';
            if (square !== EMPTY) {
                const stoneElement = document.createElement('div');
                const color = square === DARK ? 'dark' : 'light';
                stoneElement.className = `stone ${color}`;

                squareElement.appendChild(stoneElement);
            } else {
                squareElement.addEventListener('click', async () => {
                    const turnNewCount = turnCount + 1;
                    await resisterTurn(turnNewCount, DARK, x, y);
                });
            }
            boardElement.appendChild(squareElement);
        });
    });
}

async function resisterGame() {
    await fetch('/api/games', {
        method: 'POST'
    });
}

async function resisterTurn(turnCount, disc, x, y) {
    const requestBody = {
        turnCount,
        move: {
            disc,
            x,
            y
        }
    }
    await fetch(`/api/games/latest/turns/${turnCount}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
}
async function main() {
    await showBoard();
    await resisterGame();
}
main();