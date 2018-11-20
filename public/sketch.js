
let content;

let body;

function setup() {
  	noCanvas();
  	loadStrings('/password', onPasswordLoaded);
  	content = document.querySelector("#content");
  	titleSyle();
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
	let colors = [0, 0, 0];
	let v = word.split("").reduce((acc, char)=>{
		let index = Math.floor(Math.random() * 3);
		colors[index] += char.charCodeAt(0);
		colors[index] %= 255;
		return acc += char.charCodeAt(0);
	}, 0);

	document.body.style.backgroundColor = "#" + colors[0].toString(16)+
												colors[1].toString(16)+
												colors[2].toString(16);
	
	content.style.color = "#" +	(255-colors[0]).toString(16)+
								(255-colors[1]).toString(16)+
								(255-colors[2]).toString(16);
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
			loadStrings('/password', onPasswordLoaded);
		}
	}
	waitUntilStopSpeaking();
}