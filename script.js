//(function () {
const ticTacToe = {
    //Represents a 3x3 gameboard
    gameBoard: ['', '', '', '', '', '', '', '', ''],

    //Indexes in gameboard for a win
    winConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    p1: undefined,
    p2: undefined,
    currentPlayer: undefined,

    //Initialises the game/page
    init: function () {
        this.cacheDom();
        this.bindEvents();
        this.start();
    },

    //Caches all DOM nodes/elements
    cacheDom: function () {
        this.mainContainer = document.querySelector('.main-container');
        this.dialogBox = document.querySelector('.state-dialog');

        this.scoreBoxP1 = document.querySelector('.score-p1');
        this.scoreBoxP2 = document.querySelector('.score-p2');

        this.tttCells = document.querySelectorAll('.ttt-cell');
        this.tttContainer = document.querySelector('.ttt-container');

        this.startButton = document.querySelector('.start');
        this.resetButton = document.querySelector('.reset');
    },

    //Binds events to the webpage
    bindEvents: function () {
        this.dialogBox.addEventListener('click', () => {
            this.dialogBox.close();
            this.fullResetBoard();
        });

        this.resetButton.addEventListener('click', () => {
            this.fullResetBoard();
            this.resetScore();
        });
        this.startButton.addEventListener('click', () => {
            this.start();
        });

        addCellListeners = () => {
            console.log('listeners added');
            const nodeArray = Array.from(this.tttCells);
            this.tttCells.forEach((cell) => {
                cell.addEventListener(
                    'click',
                    (event) => {
                        //if there is a currentPlayer, place that players marker
                        if (this.currentPlayer) {
                            this.currentPlayer.placeMarker(
                                nodeArray.indexOf(event.target)
                            );
                        }

                        const gameState = this.checkGameState();

                        if (gameState === 'draw') {
                            this.showGameState(gameState);
                        } else if (
                            gameState === 'xPositions' ||
                            gameState === 'oPositions'
                        ) {
                            this.currentPlayer.score += 1;
                            this.displayScore();
                            this.showGameState(gameState);
                        }

                        this.render();
                        this.alternateCurrentPlayer();
                    },
                    { once: true }
                );
            });
        };
    },

    //Appends the elements to the html
    render: function () {
        //Checks currentBoard and adds corresponding marker in the html
        const currentBoard = this.checkCurrentBoard();
        for (const player in currentBoard) {
            const positions = currentBoard[player];
            for (const key in positions) {
                const value = positions[key];

                if (value >= 0) {
                    if (player === 'xPositions') {
                        this.tttCells[value].appendChild(
                            this.createMarker('cross')
                        );
                    } else if (player === 'oPositions') {
                        this.tttCells[value].appendChild(
                            this.createMarker('circle')
                        );
                    }
                }
            }
        }
    },

    alternateCurrentPlayer: function () {
        if (this.currentPlayer === this.p1) {
            this.currentPlayer = this.p2;
        } else if (this.currentPlayer === this.p2) {
            this.currentPlayer = this.p1;
        }
    },

    //Other functions -->>
    Player: function (name, marker, score = 0) {
        this.name = name;
        this.marker = marker.toUpperCase();
        this.placeMarker = function (gameBoardIndex) {
            ticTacToe.gameBoard[gameBoardIndex] = this.marker;
        };
        this.score = score;
    },

    start: function () {
        if (!this.p1) {
            this.p1 = new this.Player('Player 1', 'X');
            this.scoreBoxP1.setAttribute('style', 'color:var(--main-color)');
        }
        if (!this.p2) {
            this.p2 = new this.Player('Player 2', 'O');
            this.scoreBoxP2.setAttribute('style', 'color:var(--main-color)');
        }

        this.fullResetBoard();
        this.resetScore();

        const randomNum = Math.random();
        if (randomNum >= 0.5) {
            this.currentPlayer = this.p1;
        } else if (randomNum <= 0.5) {
            this.currentPlayer = this.p2;
        }
        console.log('currentPlayer: ', this.currentPlayer);
    },

    fullResetBoard: function () {
        for (let i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i] = '';
        }
        this.clearHtmlBoard();
    },

    clearHtmlBoard: function () {
        document.querySelectorAll('.ttt-container > *').forEach((cell) => {
            cell.remove();
        });

        for (i = 0; i < 9; ++i) {
            const div = document.createElement('div');
            div.setAttribute('class', 'ttt-cell');

            this.tttContainer.appendChild(div);
        }

        this.tttCells = document.querySelectorAll('.ttt-cell');
        addCellListeners();
    },

    displayScore: function () {
        this.scoreBoxP1.textContent = `X Score: ${this.p1.score}`;
        this.scoreBoxP2.textContent = `O Score: ${this.p2.score}`;
    },

    resetScore: function () {
        this.p1.score = 0;
        this.p2.score = 0;
        this.displayScore();
    },

    highlightWinPattern: function (winCondition) {
        for (index in winCondition) {
            const value = winCondition[index];
            this.tttCells[value].setAttribute(
                'style',
                'border: 4px solid #40b531; border-radius: 4px;'
            );
        }
    },

    checkCurrentBoard: function (gameBoard = this.gameBoard) {
        //Fills out two arrays with current positions of X and O
        let currentBoard = {
            xPositions: [],
            oPositions: [],
        };
        for (marker in gameBoard) {
            if (this.gameBoard[marker] === 'X') {
                currentBoard.xPositions.push(+marker);
            } else if (this.gameBoard[marker] === 'O') {
                currentBoard.oPositions.push(+marker);
            }
        }
        return currentBoard;
    },

    checkGameState: function (gameBoard = this.gameBoard) {
        const currentBoard = this.checkCurrentBoard();

        //Compares the current positions of X and O to this.winConditions
        for (const player in currentBoard) {
            const positions = currentBoard[player];
            for (const condition of this.winConditions) {
                if (condition.every((cell) => positions.includes(cell))) {
                    this.highlightWinPattern(condition);
                    return player; // Returns the player ('X' or 'O') that matches the win condition
                }
            }
        }

        //If Board full and above function did not return player, return draw
        if (
            currentBoard.xPositions.concat(currentBoard.oPositions).length >= 9
        ) {
            return 'draw';
        }

        //Else return false (continue)
        return false;
    },

    createMarker: function (markerClass) {
        const div = document.createElement('div');
        div.setAttribute('class', markerClass);
        return div;
    },

    showGameState: function (gameState = this.checkGameState()) {
        if (gameState) {
            this.dialogBox.showModal();
        }
    },
};

ticTacToe.init();
//})();
