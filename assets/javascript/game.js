
var userGuess;
var guessArr = [];
var puzzleArr = ['awesome pizza', 'delicious pie', 'GrEaSy FrIeS'];
var random = Math.floor(Math.random() * puzzleArr.length);
var currentPuzzle = puzzleArr[random].toUpperCase();
var userGuess;
var keyNum;
var tryCount = 6;
var correctArr = [];
var winText = document.getElementById('win-text');
var blanks = document.getElementById('blanks');
var tryCounter = document.getElementById('try-counter');
var winCounter = 0;
var guesses = document.getElementById('guesses');
var tryAgain =  document.getElementById('try-again')
var html = document.getElementsByTagName('html')[0].innerHTML;
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth/4;
canvas.height = window.innerHeight/1.75;

var head = function () {
	ctx.beginPath();
	ctx.arc(canvas.width/2,110,30,0,2*Math.PI);
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

var drawMan = function () {
	switch(tryCount) {
		case 6:
	     
	        break;
	    case 5:
	        head();
	        break;
	    case 4:
	        body();
	        break;
	    case 3:
	        rightArm();
	        break;
	    case 2:
	        leftArm();
	        break;
	    case 1:
	        rightLeg();
	        break;
	    case 0:
	        leftLeg();
	        break;
	    default:
	        console.log('default triggered');
	        break;
	}
}

var draw = function () {
	ctx.beginPath();
	ctx.strokeRect(20,50,20,350);
	ctx.strokeRect(20,400,200,35);
	ctx.strokeRect(20,30,200,20);
	ctx.moveTo(20,80);
	ctx.lineTo(70,30);
	ctx.lineTo(90,50);
	ctx.lineTo(40,100);
	ctx.lineTo(20,80);
	ctx.moveTo(canvas.width/2, 50);
	ctx.lineTo(canvas.width/2, 80);
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



var showCorrect = function () {
	var letterSpans = blanks.getElementsByTagName("span");
	for (var i = 0; i < letterSpans.length; ++i) {

		if (letterSpans[i].getAttribute('id')==userGuess && tryCount > 0) {
			letterSpans[i].innerHTML = userGuess;
			if (correctArr.indexOf(userGuess) === -1) {
				correctArr.push(userGuess);
				console.log(correctArr +'correctArr output');
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
	if (currentPuzzle.indexOf(userGuess)===-1 && tryCount > 0 && guessArr.indexOf(userGuess) === -1) {
		if (keyNum>=65 && keyNum<=90) {
			tryCount-=1;
			tryCounter.innerHTML = tryCount;
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
	var again = confirm('Game over.  Would you like to play again?');
	if (again) {
		location.reload();
	} else {
		alert('Have a nice day!')
		window.location.href = "https://www.google.com";
	}
}
var checkWin = function () {
	var underscore = html.search('_')
	var solution;
	var array = blanks.getElementsByTagName("span");
	concatArr = [];
	for (var i=0; i<array.length; i++) {
			concatArr.push(array[i].innerHTML);
	}

	solution = concatArr.join('').replace(/&nbsp;/gi,' ');
		console.log(solution);
	if (solution===currentPuzzle && tryCount > 0) {
			
		winText.innerHTML = 'You win!';

		// document.getElementById('try-again').style.visibility = 'visible';
		setTimeout(tryAgain, 1000);
	}
}

var checkLoss = function () {
	if (tryCount <= 0) {
	winText.innerHTML = 'You Lose!';
	// document.getElementById('try-again').style.visibility = 'visible';
	setTimeout(tryAgain, 1000);
	} 
}






var loadGame = function () {
	tryCounter.innerHTML = tryCount;
	winText.innerHTML = 'Let\'s play!  Select a letter to start.'	

	blankify();
	draw();
}
document.onload = loadGame();
document.onkeyup = function (event) {
		userGuess = event.key.toUpperCase();
		keyNum = event.keyCode
		checkGuess();
		showCorrect();
		guessList();
		checkWin();
		checkLoss();
		drawMan();
		// checkSpan();	
}
// tryAgain.addEventListener('click', function () {
// 		location.reload();
// 	});



