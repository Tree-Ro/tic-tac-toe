const ticTacToe = {
    gameBoard: {
        row1: ['p', 'p', 'p'],
        row2: ['p', 'p', 'p'],
        row3: ['p', 'p', 'p'],
    },

    init: function () {
        this.resetBoard();
    },

    cacheDom: function () {},

    bindEvents: function () {},

    render: function () {},

    CreatePlayer: function (name, marker) {
        this.name = name;
        this.marker = marker.toUpperCase();
    },

    resetBoard: function () {
        this.gameBoard = {
            row1: ['p', 'p', 'p'],
            row2: ['p', 'p', 'p'],
            row3: ['p', 'p', 'p'],
        };
    },
};

ticTacToe.init();
