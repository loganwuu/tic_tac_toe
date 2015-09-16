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
    if(this.activePlayer.mark == this.player1.mark) {
        console.log(this.activePlayer.mark);
        //debugger;
        this.activePlayer = this.player2;

    } else {
        console.log(this.activePlayer.mark);
        //debugger;
        this.activePlayer = this.player1;

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
        //debugger;
        //issue is if (1,1) and (2,2) are equal then this logic will be false and the loop will not break. Which means that you can with with only (1,1) and (2,2) marked
        if((this.board.find(i,i).letter == null) || (this.board.find(i,i).letter != this.board.find(i+1,i+1).letter)) {
            //debugger;
            break;
        }
        //debugger;
        r eturn "You have won!"
    }

    //checks top-right to bottom-left if they contain all of the same mark
    for(var i = this.board.squareRoot, j = 1; i >= 1, j <= this.board.squareRoot; i--, j++) {
        ////issue is if (1,3) and (2,2) are equal then this logic will be false and the loop will not break. Which means that you can with with only (1,3) and (2,2) marked
        if((this.board.find(i,j).letter == null) || (this.board.find(i,j).letter != this.board.find(i-1,j+1).letter)) {
            break;
        }
        return "You have won!"
    }

    return "nobody wins";
}

$(document).ready(function() {
    var player1 = new Player("X");
    var player2 = new Player("O");
    var board = new Board(9);
    var game = new Game(player1, player2, board);
    for(var j = 1; j < board.squareRoot+1; j++) {
        $(".game").append("<div class='row'>");
        for(var i = 1; i < board.squareRoot+1; i++) {
            $(".game").append("<div class='col-sm-1'><button type='submit' class='btn btn-info' id='" + i + "," + j + "'></button></div>");
        }
        $(".game").append("</div>");
    }
    $(".btn-info").click(function() {
        var space = $(this).attr("id");
        var xCoord = parseInt(space.slice(0,1));
        var yCoord = parseInt(space.slice(2,3));
        board.find(xCoord, yCoord).markBy(game.activePlayer);
        $(this).text(board.find(xCoord, yCoord).letter);
        game.turn();
        alert(game.checkWin());
    });
    $("form#new-game").submit(function(event) {
        event.preventDefault();
    });
});
