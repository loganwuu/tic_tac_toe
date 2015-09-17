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
        this.activePlayer = this.player2;

    } else {
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
        if((this.board.find(i,i).letter == null) || (this.board.find(i,i).letter != this.board.find(i+1,i+1).letter)) {
            break;
        }
        if(i == this.board.squareRoot - 1){
            return "You have won!";
        }
    }

    //checks top-right to bottom-left if they contain all of the same mark
    for(var i = this.board.squareRoot, j = 1; i > 1, j < this.board.squareRoot; i--, j++) {
        if((this.board.find(i,j).letter == null) || (this.board.find(i,j).letter != this.board.find(i-1,j+1).letter)) {
            break;
        }
        if(j == this.board.squareRoot - 1){
            return "You have won!"
        }
    }

    return "nobody wins";
}

$(document).ready(function() {
    var turnCount = 0;
    var player1 = new Player("X");
    var player2 = new Player("O");
    var board = new Board(9);
    var game = new Game(player1, player2, board);
    $(".playerTurn").text(game.activePlayer.mark + "'s turn")
    for(var j = 1; j < board.squareRoot+1; j++) {
        $(".game").append("<div class='row'>");
        for(var i = 1; i < board.squareRoot+1; i++) {
            $(".game").append("<div class='col-xs-1 col'><button type='submit' class='btn btn-info btn-lg animated bounceInRight' id='" + i + "," + j + "'></button></div>");
        }
        $(".game").append("</div>");
    }

    $(".btn-info").click(function() {
        var space = $(this).attr("id");
        var xCoord = parseInt(space.slice(0,1));
        var yCoord = parseInt(space.slice(2,3));
        board.find(xCoord, yCoord).markBy(game.activePlayer);
        if(board.find(xCoord, yCoord).letter == "X"){
            $(this).append('<i class="fa fa-times fa-lg" align="center"></i>');
            $(this).toggleClass('btn-info btn-danger');
        } else {
            $(this).append('<i class="fa fa-circle-o fa-lg" align="center"></i>');
            $(this).toggleClass('btn-info btn-warning');
        }
        $(this).prop('disabled','true');
        if(game.checkWin() === "You have won!"){
            $(".playerTurn").text(game.activePlayer.mark + " has won!");
            $(".btn-info").each(function() {
                $(this).prop('disabled','true');
            });
        }
        turnCount++;
        if(turnCount == parseInt($("select#grid").val())){
            $(".playerTurn").text("Cat's game");
        }
        game.turn();
        if(($(".playerTurn").text().slice(2,9) != "has won") && ($(".playerTurn").text() != "Cat's game")){
            $(".playerTurn").text(game.activePlayer.mark + "'s turn");
        }
    });

    $("form#new-game").submit(function(event) {
        turnCount = 0;
        event.preventDefault();
        $(".game").empty();
        board = new Board(parseInt($("select#grid").val()));
        game = new Game(player1, player2, board);
        $(".playerTurn").text(game.activePlayer.mark + "'s turn")
        for(var j = 1; j < board.squareRoot+1; j++) {
            $(".game").append("<div class='row'>");
            for(var i = 1; i < board.squareRoot+1; i++) {
                $(".game").append("<div class='col-xs-1'><button type='submit' class='btn btn-info btn-lg animated bounceInRight' id='" + i + "," + j + "'></button></div>");
            }
            $(".game").append("</div>");
        }

        $(".btn-info").click(function() {
            var space = $(this).attr("id");
            var coords = space.split(",");
            var xCoord = parseInt(coords[0]);
            var yCoord = parseInt(coords[1]);
            // debugger;
            board.find(xCoord, yCoord).markBy(game.activePlayer);
            if(board.find(xCoord, yCoord).letter == "X"){
                $(this).append('<i class="fa fa-times fa-lg" align="center"></i>');
                $(this).toggleClass('btn-info btn-danger');
            } else {
                $(this).append('<i class="fa fa-circle-o fa-lg" align="center"></i>');
                $(this).toggleClass('btn-info btn-warning');
            }
            $(this).prop('disabled','true');
            if(game.checkWin() === "You have won!"){
                $(".playerTurn").text(game.activePlayer.mark + " has won!");
                $(".btn-info").each(function() {
                    $(this).prop('disabled','true');
                });
            }
            turnCount++;
            if(turnCount == parseInt($("select#grid").val())){
                $(".playerTurn").text("Cat's game");
            }
            game.turn();
            if(($(".playerTurn").text().slice(2,9) != "has won") && ($(".playerTurn").text() != "Cat's game")){
                $(".playerTurn").text(game.activePlayer.mark + "'s turn");
            }
        });
    });
});
