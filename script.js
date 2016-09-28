
function setTransformElement(elm, deg){
	elm.style['transform'] = "rotate(" + deg + "deg)";
	elm.style['msTransform'] = "rotate(" + deg + "deg)"; //IE
	elm.style['MozTransform'] = "rotate(" + deg + "deg)"; //firefox
	elm.style['WebkitTransform'] = "rotate(" + deg + "deg)"; //chrome
	elm.style['OTransform'] = "rotate(" + deg + "deg)"; //opera
}

function toggleClock () {
	if (document.getElementById("clock").style.visibility == "hidden"){
		document.getElementById("clock").style.visibility = "visible";
		document.getElementById("butTxt").innerHTML = "Esconder Relógio";
	} else {
		document.getElementById("clock").style.visibility = "hidden";
		document.getElementById("butTxt").innerHTML = "Mostrar Relógio";
	}
}

window.onload = function(){
	var numbers = document.getElementsByClassName("number");
	for (var i = 0; i < 12; i++) {
		var deg = (i+1)*15 - 90;
		var include = "<div class='lNum'>" + (i+13) + "</div><div class='lNumMin'>";
		if (i==5||i==11) {
			if (i==5) {
				include = include + "45</div><div class='rNumMin'>15";
			}else{
				include = include + "00</div><div class='rNumMin'>30";
			}
			
		}else{
			include = include + "</div><div class='rNumMin'>";
		}
		include = include + "</div><div class='rNum'>" + (i+1) + "</div>";
		numbers[i].innerHTML = include;
		setTransformElement(numbers[i], deg);
		setTransformElement(numbers[i].children[0], -deg);
		if (i==5||i==11) {
			setTransformElement(numbers[i].children[1], -deg);
			setTransformElement(numbers[i].children[2], -deg);
		};
		setTransformElement(numbers[i].children[3], -deg);

	};
	updatePointers();
}

function updatePointers(){
	var data = new Date();
	var hour = data.getHours();
	var min = data.getMinutes();
	var sec = data.getSeconds();

	var degSecs = Math.round((sec*360/60) - 90);
	var degMins = Math.round(((min+sec/60)*360/60) - 90);
	var degHrs = Math.round(((hour+(min+sec/60)/60)*360/24) - 90);

	setTransformElement(document.getElementById("pointer-hour"), degHrs);
	setTransformElement(document.getElementById("pointer-minute"), degMins);
	setTransformElement(document.getElementById("pointer-second"), degSecs);

	//setTimeout(function(){ updatePointers();}, 1000);
}
window.setInterval( 'updatePointers()', 1000 );