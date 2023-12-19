//(function () {
const ticTacToe = {
    //Represents a 3x3 gameboard
    gameBoard: ['', '', '', '', 'a', '', '', '', ''],

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

    //Initialises the game/page
    init: function () {
        this.cacheDom();
        this.bindEvents();
    },

    //Caches all DOM nodes/elements
    cacheDom: function () {
        // Cache Dom elements here
    },

    //Binds events to the webpage
    bindEvents: function () {
        //Bind events here
    },

    //Renders/creates the elements in the html
    render: function () {
        //Render Elements Here
    },

    //Other functions -->>
    Player: function (name, marker) {
        this.name = name;
        this.marker = marker.toUpperCase();
        this.placeMarker = function (gameBoardIndex) {
            ticTacToe.gameBoard[gameBoardIndex] = this.marker;
            return ticTacToe.checkGameState();
        };
    },

    resetBoard: function () {
        for (let i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i] = '';
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

    checkGameState: function (gameBoard) {
        const currentBoard = this.checkCurrentBoard();

        //Compares the current positions of X and O to this.winConditions
        for (const player in currentBoard) {
            const positions = currentBoard[player];
            for (const condition of this.winConditions) {
                if (condition.every((cell) => positions.includes(cell))) {
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
};

ticTacToe.init();

const p1 = new ticTacToe.Player('Player 1', 'X');
const p2 = new ticTacToe.Player('Player 2', 'O');
//})();
