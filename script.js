var startTime;
var curQuestion = 1;
var nQuestions = 7;
var curTrial = 1;
var msecPreloadMovie = 4000; //4000;
var msecMovie = 7000; //5000;
var MIN_WIDTH = 550;
var MIN_HEIGHT = 350;
var timeStartDescription;
var nWindowResizes = 0;
var numParticipants;
var trial = 1;
var started = true;
var finished = false;

window.onload = function() {
	startTime = new Date;
}

/*
 * Decriments the count on the web server if the MTurk 
 * form has not been submitted, i.e. the worker has exited
 * without finishing. 
 * This code will run when the mturk worker exists the page, 
 * however they do so. 
 */
window.addEventListener('beforeunload', function (e) {
	if (started && !finished){
        console.log("not finished, so we decrement counter");
		decCount();
		var confirmationMessage = "\o/";
	  	//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	  	return confirmationMessage;                            //Webkit, Safari, Chrome
	}
});

/*
 * Sends http request to counter_page.php, which 
 * sends back the number of participants. 
 */
function getNumParticipant() {
	$.ajaxSetup({ cache: false });
	$.get(                             //call the server
		"counter/call_counter_function.php?function=getCounter",                     //At this url
		{}                               //And send this data to it
		).done(                             //And when it's done
		function(data) {
			numParticipants = parseInt(data);
			document.getElementById('numParticipants').value = numParticipants;
			console.log("participant: " + numParticipants);
			setMovie(numParticipants);
			incCount();
		}
		);
}

	/*
	 * Increments the particpant count on the webserver by calling a 
	 * php funciton 
	 * This is called when the particpant clicks the first grey button, so 
	 * when they confirm that they are willing to particpate. 
	 */
	function incCount() {
		console.log("incCount");
		var data = "n=" + numParticipants.toString();
		navigator.sendBeacon('counter/call_counter_function.php?function=incCount&' + data, data);
	}

	/*
	 * send beacon to dec count. We are using sendBeacon becasue 
	 * it will work even while the user is navigating away from 
	 * the page. 
	 */ 
	function decCount() {
		var data = "n=" + numParticipants.toString();
		navigator.sendBeacon('counter/decCount.php?' + data, data);
	}	

/*
 * Hides the instructions, shows the first question. 
 */
function showFirstQuestion() {
	//console.log("showFirstQuestion");
	getNumParticipant();
	started = true;
	$('#questionInstructions').hide();
	$('#question1').show();
}

/*
 * Iterates through the 6 test trials and assignes a movie to
 * each of them. The order of the movies assigned is determined
 * by the number of participants, passed as a int to the function  
 * order = n / NUM_PARTICIPANT_PER_MOVIE_TYPE
 * movie_num = (n /5) % 9 + 1
 * 5 participants per set of movies, each movie set consists of 
 * 3A_i, 3E_i, 5A_i, ..., 11A_i, where 0 \leq i \leq 9
 * There are 6 orders in which we show the movies, so there are
 * 9 * 5 = 45 that start with 3A, 45 with 3E, and so on. 
 * this means there are 270 total participants. 
 */
function setMovie(participantNum) {
  var NUM_MOVIES_PER_CONDITION = 9;
  var NUM_PARTICIPANTS_PER_MOVIE = 5; //This is hard coded in external participant tracker, cannot be changed easily
  var NUM_PARTICIPANTS_PER_CONDITION = NUM_MOVIES_PER_CONDITION * NUM_PARTICIPANTS_PER_MOVIE;

	/*console.log("we are in setMovie");*/
	var movieType = Math.floor(participantNum / NUM_PARTICIPANTS_PER_CONDITION);
	var movieString = ["T","T","T","T"];//First 4 elements set to empty for ease of calculation
	notDefaultMovie = true;
	switch(movieType) {
	  	case 0:
	    	movieString = ["T","T","T","T","3A_", "5E_", "11A_", "3E_", "5A_", "11E_"];
	    	break;
	  	case 1:
	    	movieString = ["T","T","T","T","5A_", "11E_", "3A_", "5E_", "11A_", "3E_"];
	    	break;
	    case 2:
	    	movieString = ["T","T","T","T","11A_", "3E_", "5A_", "11E_", "3A_", "5E_"];
	    	break;
	  	case 3:
	    	movieString = ["T","T","T","T","3E_", "5A_", "11E_", "3A_", "5E_", "11A_"];
	    	break;
	    case 4:
	    	movieString = ["T","T","T","T","5E_", "11A_", "3E_", "5A_", "11E_", "3A_"];
	    	break;
	  	case 5:
	    	movieString = ["T","T","T","T","11E_", "3A_", "5E_", "11A_", "3E_", "5A_"];
	    	break;
	  	default:
	    	movieString = "3A.mov";
	    	notDefaultMovie = false;
	}
	if (notDefaultMovie) {
		movieNum = Math.floor(participantNum / NUM_PARTICIPANTS_PER_MOVIE) % NUM_MOVIES_PER_CONDITION + 1;
    	for (i = 4; i < 10; i++) {
      		movieString[i] = movieString[i] + movieNum ;
    	}
		document.getElementById('movie').value = movieString.slice(4,10);
    	for (i = 4; i < 10; i++) {
      		movieString[i] = movieString[i] + ".mp4";
    	}
	} else {
    	for (i = 4; i < 10; i++) {
      		movieString[i] = "Error: particpant saw no movie." ;
    	}
		document.getElementById('movie').value = movieString.slice(4,10);
	}
	var sourceString = "https://experimentresources.s3.us-east-2.amazonaws.com/movies/";
  for (i = 4; i < 10; i++) {
	  document.getElementById('vid' + i).src = sourceString + movieString[i]; ///////////////////////THIS NEEDS TO BE UPDATED
	  //console.log("movie:" + movieString);
	  vid4.load();
  }
}

/*
 *
 */
function windowWrongSize() {
		if (($('#trial1').width() < MIN_WIDTH || $(window).height() < MIN_HEIGHT) && nWindowResizes <= 5) {
			$('#windowSize').show();
			if (nWindowResizes == 1) {
				document.getElementById('windowResizeAlert').innerHTML = "Please make window larger.";
			}
			if (nWindowResizes > 1) {
				document.getElementById('windowResizeAlert').innerHTML = "Please make window larger. <br> Current window width: " + $('#trial1').width() + " <br> Necessary window width:" + MIN_WIDTH +  ". <br> Current height: " + $(window).height() + " <br> Necesary height: " + MIN_HEIGHT;
			}
			nWindowResizes++;
      return true;
		}
    return false;
}

/*
 *
 */
function nextQuestion() {
	$('#question' + curQuestion).hide();
	curQuestion++;
	if (curQuestion >= nQuestions) {
    if (windowWrongSize()) {
      //do nothing;
    }
		else {
			$('#windowSize').hide();
			$('#movieInstructions1').show();
		}
	} 
  else {
		$('#question' + curQuestion).show();
	}
}

/*
 *
 */
function showInstructions() {
	$('#describeMovie' + (trial-1 ) ).hide();
	//console.log("The trial is " + trial);
	$('#movieInstructions' + trial).show();
}

/*
 *
 */
function preloadMovie() {
	$('.instructions').hide();
	$('#movieLoading').show();
	countdown()
	setTimeout(showFirstTrial, msecPreloadMovie);
}

/*
 *
 */
var timer;

/*
 *
 */
function countdown() {
	var countdownInterval = 1000;
	var c = Math.floor(msecPreloadMovie / countdownInterval - 1);
	timer = setInterval(function () {
		document.getElementById("countdown").innerHTML = c;
		c--;
	},countdownInterval)
}

/*
 *
 */
function playVideo() {
  document.getElementById("vid" + trial).play();
	clearInterval(timer);
}

/*
 *
 */
function showFirstTrial() {
	playVideo();
	$('#movieLoading').hide();
	$('#trial' + trial).show();
	$('#noMouseoverBox' + trial).show();
 	setTimeout(showdescription, msecMovie);

}

/*
 *
 */
function showdescription() {
	document.getElementById("countdown").innerHTML = "*";
	if (trial > 9) {
		trial = 9;
	}
	$('#trial' + trial).hide();
	$('#describeMovie' + trial).show();
	$('#noMouseoverBox' + trial).hide();
	timeStartDescription = new Date();
	trial++;
}


/*
 *
 */
function showSubmitPage() {
	finished = true;
	var dateObj = new Date(); 
	var seconds = (dateObj.getTime() - startTime.getTime()) / 1000;
	$('#time_taken').val(seconds);
	var month = dateObj.getUTCMonth() + 1; //months from 1-12
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	var hour = dateObj.getUTCHours();
	var minute = dateObj.getUTCMinutes();
	var second = dateObj.getUTCSeconds();
	var millisecond = dateObj.getUTCMilliseconds();
	var curr_date = year + "_" + month + "_" + day + "_" + minute + "_" + second + "_" + millisecond;	
	$('#yr_mo_day_hr_min_sec_msec').val(curr_date);
	$('#submitPage').show();
	$('#submitButton').show();
	$('#describeMovie' + (trial-1) ).hide();
	console.log("almostFinished");
	var data = "n=" + numParticipants.toString();
	navigator.sendBeacon('counter/call_counter_function.php?function=almostFinished&' + data, data);
}
	


/*
 *
 */
/* Wait for clicks */
$('#startQuestionsButton').click(showFirstQuestion);
$('.nextQuestionButton').click(nextQuestion);
$('#startExperiment').click(preloadMovie);
$('.nextTrial').click(showInstructions);
$('.nextMovie').click(preloadMovie);
$('#endExperimentButton').click(showSubmitPage);
