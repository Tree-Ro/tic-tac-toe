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

    //Initialises the game/page
    init: function () {
        this.resetBoard();
        this.cacheDom();
    },

    //Caches all DOM nodes/elements
    cacheDom: function () {},

    //Binds events to the webpage
    bindEvents: function () {},

    //Renders/creates the elements in the html
    render: function () {},

    //Other functions -->>
    CreatePlayer: function (name, marker) {
        this.name = name;
        this.marker = marker.toUpperCase();
    },

    resetBoard: function () {
        this.gameBoard = ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'O'];
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
console.log();
ticTacToe.init();
//})();
