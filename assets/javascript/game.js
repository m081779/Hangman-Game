//global variables

var userGuess;
var keyNum;
var tryCount = 6;
var winCount = 0;
var guessArr = [];
var correctArr = [];
var letterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var puzzleArr = ['magneto', 'joker', 'doctor doom', 'lex luthor', 'loki', 'catwoman', 'two face', 'green goblin', 'red skull', 'mystique', 'juggernaut', 'venom', 'ultron', 'bizarro', 'doctor octopus', 'bane', 'the penguin', 'harley quinn', 'scarecrow', 'the riddler', 'the lizard', 'poison ivy', 'mister freeze', 'magog', 'mandarin', 'mysterio', 'negan', 'the governor'];
var random = Math.floor(Math.random() * puzzleArr.length);
var currentPuzzle = puzzleArr[random].toUpperCase();
var endState = false;


//variables for selecting ID elements

var win = document.getElementById('win');
var punch = document.getElementById('punch');
var success = document.getElementById('success');
var fail = document.getElementById('fail');
var batmanTransition = document.getElementById('batman-transition');
var winText = document.getElementById('win-text');
var blanks = document.getElementById('blanks');
var showPic = document.getElementById('show-pic');
var tryCounter = document.getElementById('try-counter');
var winCounter = document.getElementById('win-counter');
var hangman = document.getElementById('hangman');
var guesses = document.getElementById('guesses');
var tryAgain =  document.getElementById('try-again')

//animation variables

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 350;

var game = {

	// Functions for drawing the man
	head: function () {
		ctx.beginPath();
		ctx.arc(canvas.width/2,110,30,0,2*Math.PI);
		ctx.moveTo(canvas.width/2 - 10, 100);
		ctx.arc(canvas.width/2 - 10,100,5,0,2*Math.PI);
		ctx.moveTo(canvas.width/2 + 10, 100);
		ctx.arc(canvas.width/2 + 10,100,5,0,2*Math.PI);
		ctx.stroke();	
	},

	body: function () {
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, 140);
		ctx.lineTo(canvas.width/2, 210);
		ctx.stroke();
	},

	rightArm: function () {
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, 160);
		ctx.lineTo(canvas.width/2 + 30, 210);
		ctx.stroke();
	},

	leftArm: function () {
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, 160);
		ctx.lineTo(canvas.width/2 - 30, 210);
		ctx.stroke();
	},

	rightLeg: function () {
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, 210);
		ctx.lineTo(canvas.width/2+30, 260);
		ctx.stroke();
	},

	leftLeg: function () {
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, 210);
		ctx.lineTo(canvas.width/2 - 30, 260);
		ctx.stroke();
	},

	// Functions for drawing the various faces of the man
	smileFace5: function () {

		ctx.beginPath();
		ctx.arc(canvas.width/2,115,10,0,1*Math.PI);
		ctx.stroke();
	},

	smileFace4: function () {
		ctx.clearRect(canvas.width/2-12, 115, 24, 10);
		ctx.beginPath();
		ctx.arc(canvas.width/2,105,20,0.6,0.7*Math.PI);
		ctx.stroke();
	},

	smileFace3: function () {
		ctx.clearRect(canvas.width/2-12, 115, 35, 14);
		ctx.beginPath();
		ctx.moveTo(canvas.width/2 - 10, 118);
		ctx.lineTo(canvas.width/2 + 10, 118);
		ctx.stroke();
	},

	smileFace2: function () {
		ctx.clearRect(canvas.width/2-12, 115, 24, 10);
		ctx.beginPath();
		ctx.arc(canvas.width/2,123,10,0,1 *Math.PI, true);
		ctx.stroke();
	},

	smileFace1: function () {
		ctx.clearRect(canvas.width/2-12, 115, 24, 10);
		ctx.beginPath();
		ctx.arc(canvas.width/2,123,10,0,2 *Math.PI, true);
		ctx.stroke();
	},

	smileFace0: function () {
		ctx.clearRect(canvas.width/2-15, 110, 30, 25);
		ctx.beginPath();
		ctx.moveTo(canvas.width/2 - 10, 121);
		ctx.lineTo(canvas.width/2 + 10, 121);
		ctx.stroke();

		ctx.clearRect(canvas.width/2-18, 90, 36, 20);
		ctx.beginPath();
		
		ctx.font="16px Arial";
		ctx.fillStyle='black';
		ctx.fillText("X",canvas.width/2 - 15,110);
		ctx.fillText("X",canvas.width/2 + 5 ,110);
	},

	//function for drawing the different stages of the man based on how many tries left
	drawMan: function () {
		switch(tryCount) {
			case 6:
		        break;
		    case 5:
		        game.head();
		        game.smileFace5();
		        break;
		    case 4:
		        game.body();
		        game.smileFace4();
		        break;
		    case 3:
		        game.rightArm();
		        game.smileFace3();
		        break;
		    case 2:
		        game.leftArm();
		        game.smileFace2();
		        break;
		    case 1:
		        game.rightLeg();
		        game.smileFace1();
		        break;
		    case 0:
		        game.leftLeg();
		        game.smileFace0();
		        break;
		    default:
		        console.log('default triggered');
		        break;
		}
	},//end of drawMan

	// Function for drawing the hangman apparatus.
	draw: function () {

		//Draws the two horizontal and one vertical rectangle for the structure
		ctx.beginPath();
		ctx.fillStyle = 'saddlebrown';
		ctx.fillRect(canvas.width/6.5,50,20,270);
		ctx.fillRect(canvas.width/6.5,300,200,55);
		ctx.fillRect(canvas.width/6.5,30,165,20);

		//Draws the angled support for structure
		ctx.beginPath();
		ctx.strokeStyle = 'saddlebrown';
		ctx.moveTo(canvas.width/5.4,90);
		ctx.lineTo(canvas.width/2.6,38);
		ctx.lineWidth = '20';
		ctx.stroke();

		//Draws the hangman's "noose"
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.moveTo(canvas.width/2, 50);
		ctx.lineTo(canvas.width/2, 80);
		ctx.lineWidth = '2';
		ctx.stroke();
	},//end of draw

	//Function for preloading the audio in hopes of helping them fire quicker when play() fires
	audioPreload: function () {
		punch.load();
		success.load();
		fail.load();
		batmanTransition.load();
		win.load();
	},//end of audioPreload

	//function for converting the keyboard letter ID's to numeric values for 
	//guessList function to operate correctly
	convertLetterToNum: function (index) {
		return letterArr.indexOf(index)+65;
	},//end of convertLetterToNum

	//blankify produces the blanks for the currentPuzzle
	blankify: function () {
		for (var i = 0; i < currentPuzzle.length; i++) {

			//creating a span element with the ID of the current letter of the puzzle
			//and then appending it to the div #blanks
			var span = document.createElement("span");
			var current = span.setAttribute("id", currentPuzzle[i]); 
			blanks.appendChild(span);

			//conditional that checks if iterator is a blank or space, and renders accordingly
			if (currentPuzzle[i]=== " ") {
				span.innerHTML = '&nbsp;';
			}
			else {
				span.innerHTML = '_';
			}
		}
	}, //end of blankify

	//function that deletes the span elements from #blanks 
	//so that they can be created again for new game
	clearBlanks: function () {
		//continues removing the first child of #blanks as long as there are children
		while (blanks.firstChild) {
	    	blanks.removeChild(blanks.firstChild);
		}
	},//end of clearBlanks

	//creates <img> element on win according to the currentPuzzle
	showImage: function () {
		showPic.innerHTML = '<img class="img-circle" src="assets/images/'+ currentPuzzle +'.jpg" alt="Image of '+ currentPuzzle +'">'
	},//end of showImage

	//function that turns a blank into a letter when guessed correctly
	showCorrect: function () {
		var letterSpans = blanks.getElementsByTagName("span");
		for (var i = 0; i < letterSpans.length; ++i) {

			//conditional that checks if the spans that are created in blankify() have an ID 
			//that matches userGuess, and if so changes the span's text to userGuess and 
			//plays a success sound
			if (letterSpans[i].getAttribute('id')==userGuess && tryCount > 0 && guessArr.indexOf(userGuess) === -1) {
				letterSpans[i].innerHTML = userGuess;
				success.play();
			}
		}
	},//end of showCorrect function

	//Function that checks to see if userGuess has been made before, 
	//and if userGuess is a letter.  Creates an array of correct guesses and
	//eliminates any non letter characters in order to write guessArr to #guesses
	guessList: function () {
		if (guessArr.indexOf(userGuess) === -1 && tryCount>0) {
			if (keyNum>=65 && keyNum<=90) {
				guessArr.push(userGuess);
				guesses.innerHTML = guessArr;
			}
		}
	},//end of guessList

	//checks to see if userGuess is an incorrect guess that hasn't been made before, 
	//and is a letter character. If so, it decrements the tryCount variable by
	//one, writes that value to #try-counter, and plays a punch sound effect
	checkGuess: function () {
		if (currentPuzzle.indexOf(userGuess)===-1 
			&& tryCount > 0 && guessArr.indexOf(userGuess) === -1) {
			if (keyNum>=65 && keyNum<=90) {
				tryCount-=1;
				punch.play();
				tryCounter.innerHTML = tryCount;
			}
		}
	},//end of checkGuess

	//function that resets everything to the start state when a win or a loss is detected
	tryAgain: function () {
		endState = false;
		//resets canvas
		canvas.width = canvas.width;
		canvas.height = canvas.height;

		//plays batman-transition music
		batmanTransition.play();

		//resets #show-pic to be blank
		showPic.innerHTML = '';

		//resets the current puzzle to something new
		random = Math.floor(Math.random() * puzzleArr.length);
		currentPuzzle = puzzleArr[random].toUpperCase();

		//resets number of tries back to 6 and writes it to #try-counter
		tryCount=6;
		tryCounter.innerHTML = tryCount;

		//resets guessArr to blank array and writes it to #guesses
		guessArr = [];
		guesses.innerHTML = guessArr;
		
		//resets #win-text to initial value
		winText.innerHTML = 'Let\'s play!  Select a letter to start. Guess the Supervillain...'	

		//clears old puzzle blanks, writes currentPuzzle 
		//blanks and draws the hangman structure
		game.clearBlanks();
		game.blankify();
		game.draw();
	},//end of tryAgain

	//Function that checks the win and loss conditions, and creates conditions based on them
	checkWin: function () {
		var array = blanks.getElementsByTagName("span");
		concatArr = [];

		//creates an array based on the inner HTML of the span elements in #blanks 
		for (var i=0; i<array.length; i++) {
			concatArr.push(array[i].innerHTML);
		}

		//joins concatArr into a string to compare to the currentPuzzle;
		var solution = concatArr.join('').replace(/&nbsp;/gi,' ');

		//conditional that checks win conditions
		if (solution===currentPuzzle && tryCount > 0) {	
			endState = true;
			//increments the winCount and writes it to #win-count
			winCount++;
			winCounter.innerHTML = winCount;

			//shows the image corresponding to the current puzzle, plays win music,
			//and displays win text in #win-text
			game.showImage();
			win.play();
			winText.innerHTML = 'You <br> <strong style="color:red"><i class="glyphicon glyphicon-star"></i>Win!<i class="glyphicon glyphicon-star"></i></strong>';

			//Creates a delay of 4s before running the reset
			setTimeout(game.tryAgain, 4000);
		}

		//conditional that checks loss conditions
		if (tryCount <= 0) {
			endState = true;
			//plays fail music
			fail.play();
			// displays loss text to #win-text
			winText.innerHTML = 'You <br> <i style="color:">Lose!</i>';

			//loop to overwrite the blanks left over after loss, so user can
			//see the currentPuzzle
			var letterSpans = blanks.getElementsByTagName("span");
			for (var i = 0; i < letterSpans.length; ++i) {
				letterSpans[i].innerHTML = letterSpans[i].getAttribute('id');
			}

			//Creates a delay of 4s before running the reset
			//so that fail music can finish playing
			setTimeout(game.tryAgain, 4000);
		} 
	}//end of checkWin

};//end of game object


//loads the function that creates the start state
document.onload = game.tryAgain();

//Function that captures the key and keycode of keyup event, and
//runs several functions checking if the userGuess is correct,
//showing the correct guess, updating the list of guesses made, 
//drawing the body parts of the man if userGuess is incorrect,
//and checking the win/loss conditions
document.onkeyup = function (event) {

	if (!endState) {
		userGuess = event.key.toUpperCase();
		keyNum = event.keyCode
		game.checkGuess();
		game.showCorrect();
		game.guessList();
		game.drawMan();
		game.checkWin();
	}
}

//Function that repeats the functionality of the keyup function, but 
//used for the keyboard that displays for mobile devices
document.onclick = function (event) {
	userGuess = event.target.id.toUpperCase();
	keyNum = game.convertLetterToNum(userGuess);
	game.checkGuess();
	game.showCorrect();
	game.guessList();
	game.drawMan();
	game.checkWin();
}