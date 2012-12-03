/*********************************

	DEMO PAGE BEHAVIOR

*********************************/

var demoColor = new Object();
	demoColor.h = 0;
	demoColor.s = 0;
	demoColor.v = 0;
var rgbCurr = new Object();
	rgbCurr.r = 0;
	rgbCurr.g = 0;
	rgbCurr.b = 0;	
	
var intervalLength = 25;
var cycleInterval;

var	timeElapsed = 0;
var pct, increment, durationInSeconds, fadeColor1, fadeColor2, tempColor, numColors, lum;
var fadeColors = [];
var fadeDurations = [];
	pct = 0;		
var currIndex1 = 0;
var currIndex2 = 1;

$('.demo-grid-square').live('click', function(e) {
	var buttonName = $(this).attr('id').replace('demo-', '');
	$('.demo-grid-square.active').removeClass('active');
	$(this).addClass('active');
	runDemoEffect(buttonName);

});	
 

/*************************************

	FUNCTIONS: DEMO PAGE

*************************************/

function setCycleValues(colors, durations) {
/* console.log(colors); */
	numColors = colors.length;
	fadeColors = colors;
	fadeDurations = durations;
	durationInSeconds = durations[0];
	increment = 1/(durationInSeconds*(1000/intervalLength));
	cycleInterval = setInterval(playColorCycle, intervalLength);			
}

function playColorCycle() {
	
	timeElapsed += intervalLength;
	
	
	demoColor.r = (1-pct)*fadeColors[currIndex1][0] + pct*fadeColors[currIndex2][0];
	demoColor.g = (1-pct)*fadeColors[currIndex1][1] + pct*fadeColors[currIndex2][1];
	demoColor.b = (1-pct)*fadeColors[currIndex1][2] + pct*fadeColors[currIndex2][2];		
	increment = 1/(fadeDurations[currIndex1]*(1000/intervalLength));
	
	pct += increment;
	
	if(pct > (1 - increment)) {
		// reset percentage for next color transition
		pct = 0;
		if(currIndex2 > currIndex1) {
			if(currIndex2 < numColors - 1) {
				currIndex1 ++;
				currIndex2 ++;			
			}
			else {
				currIndex1 ++;
				currIndex2 = 0;					
			}
		}
		else {
			currIndex1 = 0;
			currIndex2  = 1;
		}
	}
	// calculate luminosity for potential use
	var tempHsl = rgbToHsl(demoColor.r, demoColor.g, demoColor.b);
	lum = tempHsl[2];
	var tempColor = 'rgb(' + parseInt(demoColor.r) + ', ' + parseInt(demoColor.g) + ', ' + parseInt(demoColor.b)+ ')';
	console.log(tempColor);
	$('#virtual-blink-demo').css('background-color', tempColor );

}	


function runDemoEffect(demoName) {
	// reset values whenever a demo button is pressed 
	clearInterval(cycleInterval);
	pct = 0;
	currIndex1 = 0;
	currIndex2 = 1;	
	// cases for different buttons
	switch(demoName) {
		case 'light-on':
			console.log('rgb(255, 255, 255)');
			$('#virtual-blink-demo').css('background-color', 'white');
			$('#virtual-blink-overlay-demo').removeClass('dark');
			$('#main-content').attr('class', '');
			break;
		case 'light-off':
			console.log('rgb(0, 0, 0)');
			$('#virtual-blink-overlay-demo').addClass('dark');
			$('#virtual-blink-demo').css('background-color', '#ccc');
			$('#main-content').attr('class', 'dark');
			break;
		case 'rgb':
			$('#virtual-blink-overlay-demo').removeClass('dark');
			$('#main-content').attr('class', '');
			setCycleValues([[255, 0, 0],[0, 255, 0], [0, 0, 255]],[2, 2, 2]);
			playColorCycle();											
			break;	
		case 'mood':
			$('#virtual-blink-overlay-demo').removeClass('dark');
			$('#virtual-blink-demo').css('background-color', 'magenta');
			$('#main-content').attr('class', '');	
			setCycleValues([[255, 84, 229],[35, 138, 255]],[1, 1]);
			playColorCycle();										
			break;	
		case 'color-picker':
			$('#virtual-blink-overlay-demo').removeClass('dark');
			$('#main-content').attr('class', '');									
			break;																
	}
}


	
