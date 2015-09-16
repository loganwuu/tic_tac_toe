describe('Player', function() {
    it("returns the player's mark", function() {
        var testPlayer = new Player("X");
        expect(testPlayer.mark).to.equal("X");
    });
});

describe('Space', function() {
    it("returns a player's space", function() {
        var testSpace = new Space(1,2);
        expect(testSpace.xCoordinate).to.equal(1);
    });

    it("let's a player mark a space", function() {
        var testPlayer = new Player("X");
        var testSpace = new Space(1,2);
        testSpace.markBy(testPlayer);
        expect(testSpace.letter).to.equal("X");
    });
});

describe('Board', function() {
    it("creates 9 spaces when it's initialized", function() {
        var testBoard = new Board(9);
        var spaceArray = [];
        for(var i = 1; i < 4; i++){
            for(var j = 1; j < 4; j++){
                var testSpace = new Space(i,j);
                spaceArray.push(testSpace);
            }
        }

        expect(testBoard.spaces).to.eql(spaceArray);
    });

    it("can find a space based on the coordinates entered", function() {
        var testBoard = new Board(9);
        var spaceArray = [];
        for(var i = 1; i < 4; i++){
            for(var j = 1; j < 4; j++){
                var space = new Space(i,j);
                spaceArray.push(testSpace);
            }
        }
        var testSpace = new Space(1,2);

        expect(testBoard.find(1,2)).to.eql(testSpace);
    });

});

describe('Game', function() {
    it("switches between players for each turn", function() {
        var testPlayer1 = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board(9);
        var testGame = new Game(testPlayer1, testPlayer2, testBoard);
        testGame.turn();
        expect(testGame.activePlayer).to.equal(testPlayer2);
    });

    it("checks 1st column if there is a win", function() {
        var testPlayer1 = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board(9);
        testBoard.spaces[0].markBy(testPlayer1);
        testBoard.spaces[1].markBy(testPlayer1);
        testBoard.spaces[2].markBy(testPlayer1);
        var testGame = new Game(testPlayer1, testPlayer2, testBoard);

        expect(testGame.checkWin()).to.equal("You have won!");
    });

    it("check 1st column if there is not win", function() {
        var testPlayer1 = new Player("X");
        var testPlayer2 = new Player("O");
        var testBoard = new Board(9);
        testBoard.spaces[0].markBy(testPlayer1);
        testBoard.spaces[1].markBy(testPlayer2);
        testBoard.spaces[2].markBy(testPlayer1);
        var testGame = new Game(testPlayer1, testPlayer2, testBoard);

        expect(testGame.checkWin()).to.equal("you have not won");
    });
});
