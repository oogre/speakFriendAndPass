
let content;
let title;
let oldColor = [255, 255, 255];
let newColor = [0, 0, 0];


function setup() {
  	noCanvas();
  	loadStrings('/password', onPasswordLoaded);
  	content = document.querySelector("#content");
  	title = document.querySelector("#title");
  	titleSyle();
}


function draw(){
	oldColor[0] = lerp(oldColor[0], newColor[0], 0.1);	
	oldColor[1] = lerp(oldColor[1], newColor[1], 0.1);	
	oldColor[2] = lerp(oldColor[2], newColor[2], 0.1);	
	
	let inverseColor = [255-oldColor[0], 255-oldColor[1], 255 - oldColor[2]];

	let lum = 0.2126 * inverseColor[0] + 0.7152 * inverseColor[1] + 0.0722 * inverseColor[2];
	lum  = map(lum, 0, 255, -1, 2);
	let nlum = lum / sqrt(1 + lum*lum);
	nlum += 1;
	nlum *= 128;
	
	document.body.style.backgroundColor = "#" + Math.floor(oldColor[0]).toString(16)+
												Math.floor(oldColor[1]).toString(16)+
												Math.floor(oldColor[2]).toString(16);
	
	content.style.color = "#" +	Math.floor(inverseColor[0]).toString(16)+
								Math.floor(inverseColor[1]).toString(16)+
								Math.floor(inverseColor[2]).toString(16);


	title.style.color = "#" + Math.floor(nlum).toString(16)+
							  Math.floor(nlum).toString(16)+
							  Math.floor(nlum).toString(16);
}

function titleSyle(){
	let arcs = document.querySelectorAll(".arc");
  	for(let arc of arcs){
  		let chars = arc.innerText.split("");
  		let r = 250;
  		arc.innerHTML = chars.map((char, k)=>{
  			let alpha = (PI+0.1) + (k+1) * (PI-0.2)/(chars.length+1);
  			let x = r * Math.cos(alpha);
  			let y = r * Math.sin(alpha);
  			return "<span style='-webkit-transform: rotate("+(PI/2 + alpha)+"rad);position:absolute;top:"+y+"px;left:"+x+"px;'>"+char+"</span>";
  		}).join("");
  	}
}

function passwordStyle(word){
	content.innerHTML = word;
	
	word.split("").map(char=>{
		let index = Math.floor(Math.random() * 3);
		let currentChar = char.charCodeAt(0);
		newColor[index] = currentChar;
		newColor[index] %= 255;	
	});
}

function onPasswordLoaded(wordsToSay){
	wordsToSay = wordsToSay[0];
	passwordStyle(wordsToSay);
	var synth = window.speechSynthesis;
	var utterThis = new SpeechSynthesisUtterance(wordsToSay);
	let voices = synth.getVoices();
	utterThis.voice = voices[Math.floor(Math.random() * voices.length)]
	synth.speak(utterThis);
	function waitUntilStopSpeaking(){
		if(synth.speaking){
			setTimeout(waitUntilStopSpeaking, 20);	
		}else{
			setTimeout(loadStrings('/password', onPasswordLoaded), 20);
		}
	}
	waitUntilStopSpeaking();
}