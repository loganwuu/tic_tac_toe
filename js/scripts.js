function Player(mark) {
    this.mark = mark;
}

function Space(xCoordinate, yCoordinate, letter){
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    if(typeof(letter) === 'undefined'){
        this.letter = null;
    } else {
        this.letter = letter;
    }

}

Space.prototype.markBy = function(player) {
    this.letter = player.mark;
}

function Board(number) {
    this.number = number;
    this.squareRoot = Math.floor(Math.sqrt(number));
    this.spaces = [];
    for(var i =1; i < squareRoot + 1; i++) {
        for (var j=1; j < squareRoot + 1; j++) {
            var space = new Space(i, j);
            this.spaces.push(space);
        }
    }
}

Board.prototype.find = function(searchX, searchY){
    for(var i in this.spaces){
        if((this.spaces[i].xCoordinate == searchX) && (this.spaces[i].yCoordinate == searchY)) {
            return this.spaces[i];
        }
    }
}

function Game(player1, player2, board) {
    this.player1 = player1;
    this.player2 = player2;
    this.activePlayer = player1;
    this.board = board;
}

Game.prototype.turn = function() {
    if(this.activePlayer == this.player1) {
        this.activePlayer = this.player2;
    } else {
        this.activeplayer = this.player1;
    }
}

Game.prototype.checkWin = function() {
    for(var i =1; i < board.squareRoot + 1; i++) {
        for(var j = 1; j < board.squareRoot; j++) {
            if((board.find(i,j) !== board.find(i,j+1) || (board.find(i,j) === null;))){
                break;
            } else {
                return j;
            }
        }


}

// Board.prototype.find = function(xCoordinate, yCoordinate) {
//     return
// }

// Space.prototype.markedBy = function() {
//
// }
