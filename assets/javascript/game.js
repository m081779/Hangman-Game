

//global game variables

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

//animation begins.  All animation code untill line 200

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 350;

// Functions for drawing the man

var head = function () {
	ctx.beginPath();
	ctx.arc(canvas.width/2,110,30,0,2*Math.PI);
	ctx.moveTo(canvas.width/2 - 10, 100);
	ctx.arc(canvas.width/2 - 10,100,5,0,2*Math.PI);
	ctx.moveTo(canvas.width/2 + 10, 100);
	ctx.arc(canvas.width/2 + 10,100,5,0,2*Math.PI);
	ctx.stroke();	
}

var body = function () {
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 140);
	ctx.lineTo(canvas.width/2, 210);
	ctx.stroke();
}

var rightArm = function () {
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 160);
	ctx.lineTo(canvas.width/2 + 30, 210);
	ctx.stroke();
}
var leftArm = function () {
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 160);
	ctx.lineTo(canvas.width/2 - 30, 210);
	ctx.stroke();
}
var rightLeg = function () {
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 210);
	ctx.lineTo(canvas.width/2+30, 260);
	ctx.stroke();
}
var leftLeg = function () {
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 210);
	ctx.lineTo(canvas.width/2 - 30, 260);
	ctx.stroke();
}


// Functions for drawing the various faces of the man

var smileFace5 = function () {

	ctx.beginPath();
	ctx.arc(canvas.width/2,115,10,0,1*Math.PI);
	ctx.stroke();
}
var smileFace4 = function () {
	ctx.clearRect(canvas.width/2-12, 115, 24, 10);
	ctx.beginPath();
	ctx.arc(canvas.width/2,105,20,0.6,0.7*Math.PI);
	ctx.stroke();
}

var smileFace3 = function () {
	ctx.clearRect(canvas.width/2-12, 115, 35, 14);
	ctx.beginPath();
	ctx.moveTo(canvas.width/2 - 10, 118);
	ctx.lineTo(canvas.width/2 + 10, 118);
	ctx.stroke();
}

var smileFace2 = function () {
	ctx.clearRect(canvas.width/2-12, 115, 24, 10);
	ctx.beginPath();
	ctx.arc(canvas.width/2,123,10,0,1 *Math.PI, true);
	ctx.stroke();
}

var smileFace1 = function () {
	ctx.clearRect(canvas.width/2-12, 115, 24, 10);
	ctx.beginPath();
	ctx.arc(canvas.width/2,123,10,0,2 *Math.PI, true);
	ctx.stroke();
}

var smileFace0 = function () {
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
}

//function for drawing the different stages of the man based on how many tries left

var drawMan = function () {
	switch(tryCount) {
		case 6:
	        break;
	    case 5:
	        head();
	        smileFace5();
	        break;
	    case 4:
	        body();
	        smileFace4();
	        break;
	    case 3:
	        rightArm();
	        smileFace3();
	        break;
	    case 2:
	        leftArm();
	        smileFace2();
	        break;
	    case 1:
	        rightLeg();
	        smileFace1();
	        break;
	    case 0:
	        leftLeg();
	        smileFace0();
	        break;
	    default:
	        console.log('default triggered');
	        break;
	}
}

// Function for drawing the hangman apparatus.

var draw = function () {

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
}

//Function for preloading the audio in hopes of helping them fire quicker when play() fires

var audioPreload = function () {
	punch.load();
	success.load();
	fail.load();
	batmanTransition.load();
	win.load();
}

// Function for making the canvas respond to resize events

var resize = function () {
	console.log(hangman.style.width + 'asdfasdfasdf');
	if (window.innerWidth<576) {
		console.log(canvas.width + ' window <640');
		canvas.width = 300;
	}
	if (window.innerWidth<980) {
		console.log(canvas.width + ' window <980');
		canvas.width = window.innerWidth/2.5;
		
	}
	ctx.clearRect(0,0, canvas.width, canvas.height);//clears the canvas for redrawing
	draw();//draws the hangman structure on resize
	drawMan();//draws the man according to the tryCount variable on resize
}

//function for converting the keyboard letter ID's to numeric values for 
//guessList function to operate correctly

var convertLetterToNum = function (index) {
	return letterArr.indexOf(index)+65;
}

//blankify produces the blanks for the currentPuzzle
	
var blankify = function () {
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
}

//function that deletes the span elements from #blanks 
//so that they can be created again for new game

var clearBlanks = function () {
	//continues removing the first child of #blanks as long as there are children
	while (blanks.firstChild) {
    	blanks.removeChild(blanks.firstChild);
	}
}

//creates <img> element on win according to the currentPuzzle

var showImage = function () {
	showPic.innerHTML = '<img class="img-circle" src="assets/images/'+ currentPuzzle +'.jpg" alt="Image of '+ currentPuzzle +'">'
}

//function that turns a blank into a letter when guessed correctly

var showCorrect = function () {
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
}

//Function that checks to see if userGuess has been made before, 
//and if userGuess is a letter.  Creates an array of correct guesses and 
//eliminates any non letter characters in order to write guessArr to #guesses

var guessList = function () {
	if (guessArr.indexOf(userGuess) === -1 && tryCount>0) {
		if (keyNum>=65 && keyNum<=90) {
			guessArr.push(userGuess);
			guesses.innerHTML = guessArr;
		}
	}
}

//checks to see if userGuess is an incorrect guess that hasn't been made before, 
//and is a letter character. If so, it decrements the tryCount variable by
//one, writes that value to #try-counter, and plays a punch sound effect

var checkGuess = function () {
	if (currentPuzzle.indexOf(userGuess)===-1 
		&& tryCount > 0 && guessArr.indexOf(userGuess) === -1) {
		if (keyNum>=65 && keyNum<=90) {
			tryCount-=1;
			punch.play();
			tryCounter.innerHTML = tryCount;
		}
	}
}

//function that resets everything to the start state when a win or a loss is detected

var tryAgain = function () {

	//resets canvas
	canvas.width = canvas.width;
	canvas.height = canvas.height;

	//plays batman-transition music
	batmanTransition.play();

	//resets #show-pic to be blank
	// showPic.innerHTML = '';

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
	clearBlanks();
	blankify();
	draw();
}

//Function that checks the win and loss conditions, and creates conditions based on them

var checkWin = function () {
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
		//increments the winCount and writes it to #win-count
		winCount++;
		winCounter.innerHTML = winCount;

		//shows the image corresponding to the current puzzle, plays win music,
		//and displays win text in #win-text
		showImage();
		win.play();
		winText.innerHTML = 'You <br> <strong style="color:red"><i class="glyphicon glyphicon-star"></i>Win!<i class="glyphicon glyphicon-star"></i></strong>';

		//Creates a delay of 2s before running the reset
		setTimeout(tryAgain, 2000);
	}

	//conditional that checks loss conditions
	if (tryCount <= 0) {

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
		setTimeout(tryAgain, 4000);
	} 
}

//loads the function that creates the start state

document.onload = tryAgain();

//Function that captures the key and keycode of keyup event, and
//runs several functions checking if the userGuess is correct,
//showing the correct guess, updating the list of guesses made, 
//drawing the body parts of the man if userGuess is incorrect,
//and checking the win/loss conditions

document.onkeyup = function (event) {
		userGuess = event.key.toUpperCase();
		keyNum = event.keyCode
		checkGuess();
		showCorrect();
		guessList();
		drawMan();
		checkWin();
}

//Function that repeats the functionality of the keyup function, but 
//used for the keyboard that displays for mobile devices

document.onclick = function (event) {

	userGuess = event.target.id.toUpperCase();
	keyNum = convertLetterToNum(userGuess);
	checkGuess();
	showCorrect();
	guessList();
	drawMan();
	checkWin();
}

//Resize event listener for the canvas

document.onresize = resize();