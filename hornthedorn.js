$(document).ready(function(){
//______begin readyShell
var interval;
function logToGrid() {
	var randomNumber = (Math.floor(Math.random() * 3) + 1);
	$("#grid" + randomNumber).addClass("hornless");
	enableHornlessListeners();
	setTimeout(function(){
		disableHornlessListeners();
		$("#grid" + randomNumber).removeClass("hornless");
		$("#grid" + randomNumber).removeClass("dorned");
	}, interval);
};
//Intervalic Horn Dorn Materialization
function logToGridByInterval() {
	var randomNumber;
	intervalID = setInterval(function() {
		logToGrid();
	}, interval * (1.1 + (Math.random())));
	};
var hornCount = 0;
//event listeners on and off. CONSOLIDATE THESE!!!
function enableHornlessListeners() {
	$(".hornless").on("click", function(){
		disableHornlessListeners();
		$(".hornless").removeClass("hornless").addClass("dorned");
		hornCount++;
		console.log(hornCount);
		$("#hornCount").html(hornCount);
	});
};
function disableHornlessListeners() {
	$(".hornless").off("click");
};
function disableLevelListeners() {
	$("#easy").off("click");
	$("#medium").off("click");
	$("#hard").off("click");
	console.log("level disabled");
};
function enableLevelListeners() {
	$("#easy").on("click");
	$("#medium").on("click");
	$("#hard").on("click");
	console.log("level enabled");
	levelButtons();
};
function disableStartListeners() {
	$(".start").off("click");
	console.log("start disabled")
};
function enableStartListeners() {
	$(".start").on("click");
	console.log("start enabled");
	startButton();
};
//restart button
var clearMarker;
function halt(){
	$(".dropbtn").html("How Dorny Are You?");
	$(".start").html("Summon the Dorns!");
	clearInterval(intervalID);
	clearMarker = 1;
	enableLevelListeners();
	enableStartListeners();
	scoreLogger();
};
$("#halt").on("click", function(){
	halt();
	hornCount = 0;
	$("#hornCount").html(hornCount);
});
//high score array and comparison conditional
var scoreLog = [0];
function scoreLogger() {
	scoreLog.push(hornCount);
	scoreLog.sort(function(a, b){return a-b});
	if (hornCount >= (scoreLog[scoreLog.length -1])) {
		$("#highScore").html(hornCount);
	};
};
//Start button && "Select a Level" warning
function startButton() {
	$(".start").on("click", function(){
			if((isNaN(interval) == true) | (clearMarker == 1)) {
				greenToRed();
			} else {
				logToGridByInterval();
				disableLevelListeners();
				disableStartListeners();
			};
	});
};
function greenToRed(){
	$(".start").html("Select a level!");
	$(".start").removeClass("start").addClass("red");
};
function redToGreen(){
	$(".red").removeClass("red").addClass("start");
	$(".start").html("Summon the Dorns!");
};
//difficulty level click events
function levelButtons(){
$("#easy").on("click", function(){
	interval = 1500;
	$(".dropbtn").html("Level: Softy");
	redToGreen();
	clearMarker = 0;
});
$("#medium").on("click", function(){
	interval = 500;
	$(".dropbtn").html("Level: Intermediate");
	redToGreen();
	clearMarker = 0;
});
$("#hard").on("click", function(){
	interval = 10;
	$(".dropbtn").html("Level: DORN ADDICTION")
	redToGreen();
	clearMarker = 0;
});
};
//active functions
startButton();
levelButtons();
//____________________________end readyShell
});
/*PROBLEMS:
counter registers clicks AFTER the adorning
*/