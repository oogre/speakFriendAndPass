/*----------------------------------------*\
  speakFriendAndPass - index.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-11-20 17:32:31
  @Last Modified time: 2018-11-20 19:20:15
\*----------------------------------------*/


const pwds = [];
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('rockyou.1.txt')
});
lineReader.on('line', function (line) {
  pwds.push(line);
});
lineReader.on('close', function (line) {
	var lineReader2 = require('readline').createInterface({
		input: require('fs').createReadStream('rockyou.2.txt')
	});
	lineReader2.on('line', function (line) {
		pwds.push(line);
	});
	lineReader2.on('close', function (line) {
		console.log("rockyou loaded");
	})
});

const express = require("express");
const app = express();
const port = 3000;

app.listen(port, ()=> console.log("Your app's running on : http://localhost:"+port));


app.get("/password", (req, res) => {
	let index = Math.floor(Math.random() * pwds.length);
	res.send(pwds[index]);
});

app.use(express.static("public"));