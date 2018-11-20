
let content;
let body;
let oldColor = [255, 255, 255];
let newColor = [0, 0, 0];

function setup() {
  	noCanvas();
  	loadStrings('/password', onPasswordLoaded);
  	content = document.querySelector("#content");
  	titleSyle();
}

function draw(){
	console.log(oldColor);
	for(let i = 0 ; i < oldColor.length && i<newColor.length ; i ++){
		oldColor[i] = Math.floor(lerp(oldColor[i], newColor[i], 0.01));	
	}
	document.body.style.backgroundColor = "#" + oldColor[0].toString(16)+
												oldColor[1].toString(16)+
												oldColor[2].toString(16);
	
	content.style.color = "#" +	(255-oldColor[0]).toString(16)+
								(255-oldColor[1]).toString(16)+
								(255-oldColor[2]).toString(16);

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
		newColor[index] += currentChar;
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
			loadStrings('/password', onPasswordLoaded);
		}
	}
	waitUntilStopSpeaking();
}