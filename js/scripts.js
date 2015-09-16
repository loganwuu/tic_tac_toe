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
    for(var i =1; i < this.squareRoot + 1; i++) {
        for (var j=1; j < this.squareRoot + 1; j++) {
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
    //checks column by column if it contain all of the same mark

    //rows
    for(var i =1; i < this.board.squareRoot + 1; i++) {
        //column
        for(var j = 1; j < this.board.squareRoot; j++) {
            if((this.board.find(i,j).letter == null) || (this.board.find(i,j).letter != this.board.find(i,j+1).letter)) {
                break;
            }
        }
        if(j == this.board.squareRoot){
            return "You have won!";
        }
    }

    //checks row by row if it contain all of the same mark

    //column
    for(var j = 1; j < this.board.squareRoot + 1; j++) {
        //row
        for(var i = 1; i < this.board.squareRoot; i++) {
            if((this.board.find(i,j).letter == null) || (this.board.find(i,j).letter != this.board.find(i+1,j).letter)) {
                break;
            }
        }
        if(i == this.board.squareRoot){
            return "You have won!";
        }
    }

    //checks top-left to bottom-right if they contain all of the same mark
    for(var i = 1; i < this.board.squareRoot; i++) {
        if((this.board.find(i,i).letter == null) || (this.board.find(i,i).letter != this.board.find(i+1,i+1).letter)) {
            break;
        }
        return "You have won!"
    }

    //checks top-right to bottom-left if they contain all of the same mark
    for(var i = this.board.squareRoot, j = 1; i > 1, j < this.board.squareRoot; i--, j++) {
        if((this.board.find(i,j).letter == null) || (this.board.find(i,j).letter != this.board.find(i-1,j+1).letter)) {
            break;
        }
        return "You have won!"
    }

    return "you have not won";
}
