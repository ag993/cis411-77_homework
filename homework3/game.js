var playerOne = { //Define Player One
    mark: 'X',
    name: 'Player One',
    style: 'playerOneCell',
    score: 'playerOneWins',
    wins: 0
};
var playerTwo = { //Define Player Two
    mark: 'O',
    name: 'Player Two',
    style: 'playerTwoCell',
    score: 'playerTwoWins',
    wins: 0
};

var players = [playerOne, playerTwo]; //create an array to hold the defined players
var currentPlayer = 0; //set the current player to playerOne because its index value is 0
var numOfCols = 3; //set columns to 3
var numOfRows = 3; //set rows to 3

$(document).ready(function() {
        $("#restartGame").bind("click", restartGame);

        //Expand something with JQuery that didn't make much sense but the logic behind the game!
        $.expr[":"].mod =function(el, i, m) {
                return i % m[3] === 0
            };
        $.expr[":"].sub_mod =function(el, i, m) {
                var params = m[3].split(",");
                return (i-params[0]) % params[1] === 0
            };
        initGame();
    });

function initGame() { //Creates the gameMap and the divs, and sets evs, and calls initTurn function.

    $("#gameMap").empty(); //Empty the gameMap div

    for (var i=0; i<numOfCols*numOfRows; ++i)
    {
        var cell = $("<div></div>") //Creates a div to be a specific cell in the gameMap
                    .addClass("cell")
                    .appendTo("#gameMap");

        if (i % numOfCols === 0) { //Adds the line break to handle the rows!
            cell.before('<div class="clear"></div>');
        }
    }

    $("#gameMap .cell")//set effects when the pointer clicks, mouseover, or mouseouts
        .bind("click",playMove)
        .bind('mouseover', hoverCell)
        .bind('mouseout', leaveCell);

     initTurn(currentPlayer);
    };

function disableGame(ev) {
    $("#gameMap .cell")
        .unbind("click")
        .unbind("mouseover")
        .unbind("mouseout");
};

function restartGame(ev) {
    ev.preventDefault();
    $(".endGame").hide();
    currentPlayer=0;
    initGame();
    return false;
}
//When a cell is clicked, format it with current player's style and add their mark, trigger
//mouseout ev, and unbind click, mouseover, and mouseout on that specific cell. Then
//within the same function check is someone won!
function playMove(ev) {
    var cell = $(this);
    cell
        .addClass(players[currentPlayer].style)
        .addClass("marked")
        .text(players[currentPlayer].mark)
        .trigger("mouseout")
        .unbind("click mouseover mouseout");

    if (!checkAndProcessWin()) { //if no one won
        currentPlayer = (++currentPlayer) % players.length;
        initTurn(currentPlayer);
    }
    return false;  //Why is this false????

};

function initTurn() { //Function to replace the span placeholder for name and mark
    $("#playerName").text(players[currentPlayer].name);
    $("#playerMark").text(players[currentPlayer].mark);
};



function hoverCell(ev) { //add hover class formatting when ev is mouseover
    $(this).addClass("hover");
    return false;
};

function leaveCell(ev) { //remove hover class formatting when ev is mouseout
    $(this).removeClass("hover");
    return false;
};

function checkAndProcessWin() {
    //To speed it up, check if we can't win at all yet
    var currentClass = players[currentPlayer].style;
    var markedCells = $("#gameMap ."+currentClass);
    var win = false; //set default win to false
    if (markedCells.length >= numOfCols)
    {
        //Check rows then
        var cells = $("#gameMap .cell");
        var cellsInspected = {};
        for (var row=1; row<= numOfRows && !win; ++row)
        {
            cellsInspected = cells
                .filter(":lt("+numOfCols*row+")")
                .filter(":eq("+(numOfCols*(row-1))+"),:gt("+(numOfCols*(row-1))+")")
                .filter("."+currentClass);
            if (cellsInspected.length == numOfCols)
            {
                win = true;
            }
        }

        //Check the columns next
        for (var col=0; col <= numOfCols && !win; ++col )
        {
            cellsInspected = cells
                .filter(":sub_mod("+col+","+numOfRows+")")
                .filter("."+currentClass);

            if ( cellsInspected.length == numOfRows ) win = true;
        }
        //Check the diagonals
        // We always have 2 diagonals
        // From left up to right down
        if ( !win )
        {
            cellsInspected = cells
                .filter(":mod("+(numOfRows+1)+")")
                .filter("."+currentClass);
            if ( cellsInspected.length == numOfRows ) win = true;
            else{
                // From right down to left up
                cellsInspected = cells
                    .filter(":mod("+(numOfRows-1)+"):not(:last,:first)")
                    .filter("."+currentClass);
                if ( cellsInspected.length == numOfRows ) win = true;
            }
        }


    }

    if (win) {
        disableGame();
        cellsInspected.addClass("win");
        ++players[currentPlayer].wins;
        $("#winner #winnerName").text(players[currentPlayer].name);
        $("#"+players[currentPlayer].score).text(players[currentPlayer].wins);
        $(".endGame").show();
    }
    else {
        //Restart the game because it's a no win!
        if ( $("#gameMap .marked").length == numOfCols *numOfRows) $("#askRestart").show();
    }
    return win;
};




