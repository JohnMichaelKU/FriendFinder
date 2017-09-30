var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var friends = require('./app/data/friends.js')

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});
var matchPosition = 0;
var newMatch
app.post("/api/friends", function(req, res) {
  newMatch = req.body;

  console.log(newMatch.scores);

  friends.friend.push(newMatch);

  var newMatchInt = [];
  for(i=0;i<newMatch.scores.length;i++) {
    newMatchInt.push(parseInt(newMatch.scores[i]));
  };
  var a = 0;
  var b = 0;
  var score = 0;
  var scores = [];
  console.log(newMatchInt);
  	for(i=0;i<friends.friend.length - 1;i++) {
		score = 0
  		for(x=0;x<10;x++) {
  			a = friends.friend[i].scores[x] - newMatchInt[x];
  			if (a<0){
  				b = a*(-1);
  			} else {
  				b = a;
  			}
  			console.log(b);
  			score += b;
  		}
  		console.log(score);
  		scores.push(score);
  	};
  	var matchScore = 100;
  	var c = 0;
  	for(i=0;i<scores.length;i++) {
  		c = scores[i];
  		if(c<matchScore) {
  			matchScore = c;
  			matchPosition = i;
  		}
  	}
  	console.log(matchPosition);
  	console.log(matchScore);
  	console.log(friends.friend[matchPosition]);
  	res.json(friends.friend[matchPosition]);
});
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

