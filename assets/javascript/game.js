var userGuess;
var guessArr = [];
var letterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var puzzleArr = ['magneto', 'joker', 'doctor doom', 'lex luthor', 'loki', 'catwoman', 'two face', 'green goblin', 'red skull', 'mystique', 'juggernaut', 'venom', 'ultron', 'bizarro', 'doctor octopus', 'bane', 'the penguin', 'harley quinn', 'scarecrow', 'the riddler', 'the lizard', 'poison ivy', 'mister freeze', 'magog', 'mandarin', 'mysterio', 'negan', 'the governor'];
var random = Math.floor(Math.random() * puzzleArr.length);
var currentPuzzle = puzzleArr[random].toUpperCase();
var keyNum;
var tryCount = 6;
var winCount = 0;
var correctArr = [];
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
var guesses = document.getElementById('guesses');
var tryAgain =  document.getElementById('try-again')
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth/4.5;
canvas.height = window.innerHeight/2;

var audioPreload = function () {
	punch.load();
	success.load();
	fail.load();
	batmanTransition.load();
	win.load();
}

var resize = function () {
	var hangman = document.getElementById('hangman');
	
	if (window.innerWidth<576) {
		console.log(canvas.width + ' window <640');
		canvas.width = window.innerWidth;
	}
	if (window.innerWidth<980) {
		console.log(canvas.width + ' window <980');
		canvas.width = window.innerWidth/2.5;
		
	}
	ctx.clearRect(0,0, canvas.width, canvas.height);
	draw();
	drawMan();
}

var convertLetterToNum = function (index) {
	return letterArr.indexOf(index)+65;
}

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

var draw = function () {
	ctx.beginPath();
	ctx.fillStyle = 'saddlebrown';
	ctx.fillRect(canvas.width/6.5,50,20,270);
	ctx.fillRect(canvas.width/6.5,300,200,55);
	ctx.fillRect(canvas.width/6.5,30,165,20);

	ctx.beginPath();
	ctx.strokeStyle = 'saddlebrown';
	ctx.moveTo(canvas.width/5.4,90);
	ctx.lineTo(canvas.width/2.6,38);
	ctx.lineWidth = '20';
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = 'black';
	ctx.moveTo(canvas.width/2, 50);
	ctx.lineTo(canvas.width/2, 80);
	ctx.lineWidth = '2';
	ctx.stroke();
}
	
var blankify = function () {
	for (var i = 0; i < currentPuzzle.length; i++) {
		var span = document.createElement("span");
		var current = span.setAttribute("id", currentPuzzle[i]); 
		
		blanks.appendChild(span);

		if (currentPuzzle[i]=== " ") {
			span.innerHTML = '&nbsp;';
		}
		else {
			span.innerHTML = '_';
		}
	}
}

var clearBlanks = function () {
	while (blanks.firstChild) {
    	blanks.removeChild(blanks.firstChild);
	}
}


var showImage = function () {
	showPic.innerHTML = '<img class="img-circle" src="assets/images/'+ currentPuzzle +'.jpg" alt="Image of '+ currentPuzzle +'">'
}

var showCorrect = function () {
	var letterSpans = blanks.getElementsByTagName("span");
	for (var i = 0; i < letterSpans.length; ++i) {

		if (letterSpans[i].getAttribute('id')==userGuess && tryCount > 0) {
			letterSpans[i].innerHTML = userGuess;
			if (correctArr.indexOf(userGuess) === -1) {
				correctArr.push(userGuess);
				document.getElementById('success').play();
			}
		}
	}
}

var guessList = function () {
	if (guessArr.indexOf(userGuess) === -1 && tryCount>0) {
		if (keyNum>=65 && keyNum<=90) {
			guessArr.push(userGuess);
			guesses.innerHTML = guessArr;
		}
	}
}

var checkGuess = function () {
	if (currentPuzzle.indexOf(userGuess)===-1 
		&& tryCount > 0 && guessArr.indexOf(userGuess) === -1) {
		if (keyNum>=65 && keyNum<=90) {
			tryCount-=1;
			document.getElementById('punch').play();
			tryCounter.innerHTML = tryCount;
			return true;
		}
	}
}

function checkSpan () {
	if (solution===currentPuzzle) {
		console.log('You win');
	}
	concatArr = [];
	var solution;
	var array = blanks.getElementsByTagName("span");
	for (var i=0; i<array.length; i++) {
			concatArr.push(array[i].innerHTML);
	}
	
	solution = concatArr.join('').replace(/&nbsp;/gi,' ');
}

var tryAgain = function () {
	canvas.width = canvas.width;
	canvas.height = canvas.height;
	batmanTransition.play();
	document.getElementById('try-again').style.visibility = 'hidden';
	// showPic.innerHTML = '';
	random = Math.floor(Math.random() * puzzleArr.length);
	currentPuzzle = puzzleArr[random].toUpperCase();
	tryCount=6;
	guessArr = [];
	guesses.innerHTML = guessArr;
	tryCounter.innerHTML = tryCount;
	winText.innerHTML = 'Let\'s play!  Select a letter to start. Guess the Supervillain...'	
	clearBlanks();
	blankify();
	draw();
}

var checkWin = function () {
	var solution;
	var array = blanks.getElementsByTagName("span");
	concatArr = [];
	for (var i=0; i<array.length; i++) {
		concatArr.push(array[i].innerHTML);
	}

	solution = concatArr.join('').replace(/&nbsp;/gi,' ');

	if (solution===currentPuzzle && tryCount > 0) {	
		winCount++;
		winCounter.innerHTML = winCount;
		win.play();
		winText.innerHTML = 'You <br> <strong style="color:red"><i class="glyphicon glyphicon-star"></i>Win!<i class="glyphicon glyphicon-star"></i></strong>';
		// document.getElementById('try-again').style.visibility = 'visible';
		showImage();
		setTimeout(tryAgain, 2000);
	}

	if (tryCount <= 0) {
		document.getElementById('fail').play();
		winText.innerHTML = 'You <br> <i style="color:">Lose!</i>';
		// document.getElementById('try-again').style.visibility = 'visible';
		var letterSpans = blanks.getElementsByTagName("span");
		for (var i = 0; i < letterSpans.length; ++i) {
			letterSpans[i].innerHTML = letterSpans[i].getAttribute('id');
		}
		setTimeout(tryAgain, 2000);
	} 
}

var loadGame = function () {
	tryCounter.innerHTML = tryCount;
	winCounter.innerHTML = winCount;
	winText.innerHTML = 'Let\'s play!  Select a letter to start. Guess the Supervillain...'	
	blankify();
	draw();
	audioPreload();
}

document.onload = loadGame();

document.onkeyup = function (event) {
		userGuess = event.key.toUpperCase();
		keyNum = event.keyCode
		checkGuess();
		showCorrect();
		guessList();
		drawMan();
		checkWin();
}

// document.getElementById('try-again').addEventListener('click', tryAgain);

document.onclick = function (event) {
	console.log(userGuess);
	userGuess = event.target.id.toUpperCase();
	keyNum = convertLetterToNum(userGuess);
	checkGuess();
		showCorrect();
		guessList();
		drawMan();
		checkWin();
}

document.onresize = resize();