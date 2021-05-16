//global variables
let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();

// note the switch toUpperCase(), we want to always work in upper case letters to avoid confusing 'a' and 'A' as unequal.

let revealedLetters = new Array(word.length); // creates an array with as many elements as word has characters. Each index of revealedLetters will correspond to a character in word, and if revealedLetters[n] is truthy, then word[n] has been correctly guessed.
revealedLetters.fill(false);

const maxStrikes = 6; 
let strikes = 0; // the number of incorrect guesses made so far

let strikeLetters = new Array(); // this will contain every letter that has been incorrectly guessed.

//drawWordProgress(); // run this now, to draw the empty word at the start of the game.
function drawStrikeLetters() {
    // your DOM manipulation code here
    // should create a String from strikeLetters and put that into the content of some element.
    document.getElementById("strikeLetters").innerHTML = strikeLetters.toString()
}

// Manipulates the DOM to write the successfully guessed letters of the word, replacing them with dashes if not yet guessed
function drawWordProgress() {
    // your DOM manipulation code here
    document.getElementById("word").innerHTML = "";
    for (var i = 0; i < revealedLetters.length; i++){
        if(revealedLetters[i] == true){
 
           document.getElementById("word").innerHTML += word.charAt(i);

        } else {
            document.getElementById("word").innerHTML += "_ ";

        }
    }
    // should iterate over revealedLetters, and if the value at each index is truthy, print the corresponding letter from word. Otherwise, it should print a -.
}

// Manipulates the DOM to update the image of the gallows for the current game state.
function drawGallows() { 
    // your DOM manipulation code here 
    // should update an <img> element in the appropriate hangman.html section to point to "images/strike-"+strikes+".png"
    let tag = document.getElementById("image1");
    tag.setAttribute("src","images/strike-"+strikes+".png");
}

function processGuess() {
    let guess = document.getElementById("playerGuess").value.toUpperCase();// the value of the <form>'s <input> element, toUpperCase()!
    //clear value and resets focus
    document.getElementById("playerGuess").value='';
    document.getElementById("playerGuess").focus;
    if (strikes < maxStrikes) {
        // game logic goes here
        //1. check if the word includes the guessed letter
        var found = false;
        for(var i = 0; i < word.length; i++){
            if(word.charAt(i)==guess){
                revealedLetters[i] = true;
                found = true;
            } 
        }
        
        if(found){
            drawWordProgress();
        } else {
            strikes += 1;
            strikeLetters.push(guess);
            drawGallows();
            drawStrikeLetters();
        }

        //check for the win
        if(!revealedLetters.includes(false)){alert("Player 2 Wins!!!");}

    } else
        alert("The game is over!"); 
}

