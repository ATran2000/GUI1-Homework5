/*
Assignment: Homework5 - Scrabble
Name: Alvin Tran
Contact Information: Alvin_Tran@student.uml.edu
Date: 12/16/2021
Resources Used:
    https://api.jquery.com/
    https://jqueryui.com/
Note: Incomplete
*/

/*  
Dictionary to set the values for each specific tile.
*/
let TileValues = [] ;
TileValues["A"] = { "value" : 1  };
TileValues["B"] = { "value" : 3  };
TileValues["C"] = { "value" : 3  };
TileValues["D"] = { "value" : 2  };
TileValues["E"] = { "value" : 1  };
TileValues["F"] = { "value" : 4  };
TileValues["G"] = { "value" : 2  };
TileValues["H"] = { "value" : 4  };
TileValues["I"] = { "value" : 1  };
TileValues["J"] = { "value" : 8  };
TileValues["K"] = { "value" : 5  };
TileValues["L"] = { "value" : 1  };
TileValues["M"] = { "value" : 3  };
TileValues["N"] = { "value" : 1  };
TileValues["O"] = { "value" : 1  };
TileValues["P"] = { "value" : 3  };
TileValues["Q"] = { "value" : 10 };
TileValues["R"] = { "value" : 1  };
TileValues["S"] = { "value" : 1  };
TileValues["T"] = { "value" : 1  };
TileValues["U"] = { "value" : 1  };
TileValues["V"] = { "value" : 4  };
TileValues["W"] = { "value" : 4  };
TileValues["X"] = { "value" : 8  };
TileValues["Y"] = { "value" : 4  };
TileValues["Z"] = { "value" : 10 };
TileValues["_"] = { "value" : 0  };

/*
An array of the original-distribution of tiles. This is used to get the weighted
probablity of each specific tile. ex. "A" has a 9/100 chance of occuring initially.
*/
let ScrabbleTiles = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B",
                    "B", "C", "C", "D", "D", "D", "D", "E", "E", "E",
                    "E", "E", "E", "E", "E", "E", "E", "E", "E", "F",
                    "F", "G", "G", "G", "H", "H", "I", "I", "I", "I",
                    "I", "I", "I", "I", "I", "J", "K", "L", "L", "L",
                    "L", "M", "M", "N", "N", "N", "N", "N", "N", "O",
                    "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q",
                    "R", "R", "R", "R", "R", "R", "S", "S", "S", "S",
                    "T", "T", "T", "T", "T", "T", "U", "U", "U", "U",
                    "V", "V", "W", "W", "X", "Y", "Y", "Z", "_", "_"]

/*  
Function will reset the entire Scrabble game. Resets all of the letter tile's number remaining 
back to the original distribution. Resets the array of the original-distribution of tiles.
Resets and removes all of the tiles that are dropped on the screen.
*/
function restartGame() {
    ScrabbleTiles = ["A", "A", "A", "A", "A", "A", "A", "A", "A", "B",
                    "B", "C", "C", "D", "D", "D", "D", "E", "E", "E",
                    "E", "E", "E", "E", "E", "E", "E", "E", "E", "F",
                    "F", "G", "G", "G", "H", "H", "I", "I", "I", "I",
                    "I", "I", "I", "I", "I", "J", "K", "L", "L", "L",
                    "L", "M", "M", "N", "N", "N", "N", "N", "N", "O",
                    "O", "O", "O", "O", "O", "O", "O", "P", "P", "Q",
                    "R", "R", "R", "R", "R", "R", "S", "S", "S", "S",
                    "T", "T", "T", "T", "T", "T", "U", "U", "U", "U",
                    "V", "V", "W", "W", "X", "Y", "Y", "Z", "_", "_"];
    
    document.getElementById("Word").innerHTML="Word: "; // Removes any letters that got appended

    // Removes any draggable tiles that got dropped onto any of the positions
    document.getElementById("Position1").innerHTML="";
    document.getElementById("Position2").innerHTML="";
    document.getElementById("Position3").innerHTML="";
    document.getElementById("Position4").innerHTML="";
    document.getElementById("Position5").innerHTML="";
    document.getElementById("Position6").innerHTML="";
    document.getElementById("Position7").innerHTML="";
    document.getElementById("Position8").innerHTML="";
    document.getElementById("Position9").innerHTML="";
    document.getElementById("Position10").innerHTML="";
    document.getElementById("Position11").innerHTML="";
    document.getElementById("Position12").innerHTML="";
    document.getElementById("Position13").innerHTML="";
    document.getElementById("Position14").innerHTML="";
    document.getElementById("Position15").innerHTML="";

    /*
    Removes all of the tiles on the tile racks
    */
    var tiles = $("#tilePlaceHolders").children();
    tiles.remove();
}

/*
Function to generate 7 tiles on the tile rack to be used to play Scrabble
*/
function generateTiles() {
    while ($("#tilePlaceHolders").children().length < 7) {
        var randomIndex = Math.floor(Math.random() * ScrabbleTiles.length); // gets a random index
        var randomLetter = ScrabbleTiles[randomIndex]; // uses the index to get the letter tile it corresponds to in the array
        ScrabbleTiles.splice(randomIndex, 1); // after getting the letter tile, remove the letter from the ScrabbleTiles array

        // console.log("Letter: ", ScrabbleTiles[randomIndex]);

        var tilePlaceHolders = $("#tilePlaceHolders");
        // create an image element using the obtained letter and append the image to the tile rack
        var imgItem = "<img src='images/Scrabble_Tile_" + randomLetter + ".jpg' alt=" + randomLetter + ">"; 
        tilePlaceHolders.append(imgItem);
    }
}

$(function() {
    /*
    when the restartGame button is clicked, restarts the scrabble game and generate tiles
    */
    document.getElementById("restartGame").addEventListener("click", (event) => {
        restartGame();
        generateTiles();

        // makes the newly generated tiles draggable
        $("img").draggable({
            revert: "invalid", // reverts the location of the draggable element is not dropped in a droppable location
            cursorAt: {top: 33, left: 33} // when dragging the element, the cursor will have a specified location
        });
    })

    generateTiles(); // generate the 7 tiles

    /*
    Each of the 15 positions are droppable.

    */
    $("#Position1").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active" // highlights the location to show that it is droppable
        },
        // when dropped, do this
        drop: function(event, ui) {
            /*
            As long as there is nothing dropped in the location yet, append the draggable element that gets
            dropped in the location and then get the letter of the tile that was dropped in the position.
            */
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt"); // get letter by checking alt of the image element
                $("#Word").append(itemLetter); // appends the letter to the word container that appends the dropped letters
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position2").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position3").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position4").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position5").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position6").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position7").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position8").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position9").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position10").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position11").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position12").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position13").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position14").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    $("#Position15").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active"
        },
        drop: function(event, ui) {
            if ($(this).find("img").length != 1) {
                var item = $(ui.draggable);
                $(this).append(item)

                // console.log("ITEM: ", $(this).html())
                itemLetter = $(this).find("img").attr("alt");
                $("#Word").append(itemLetter);
                // console.log("LETTER: ", itemLetter);
            }
        }
    });

    /*
    makes the tile rack droppable so that the user can drop a tile onto the board and then
    drop it back into the tile rack
    */
    $("#tileContainer").droppable({
        accept: "img",
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        }
    });

    // makes the newly generated tiles draggable
    $("img").draggable({
        revert: "invalid",
        cursorAt: {top: 33, left: 33}
    });
})