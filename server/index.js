const express = require('express');
let app = express();
let bodyParser = require ('body-parser');
let Helper = require('../helpers/github');
let database = require('../database/index');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var putIntoDatabase = function (err, response, body) {
    database.save(JSON.parse(body));
    res.send("success");
  }
  
  Helper.getReposByUsername(req.body.term, putIntoDatabase);
  console.log('end of app.post');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  var getCallback = function (err, arrOfRepos) {
    if (err) {
      res.send(err); 
    }
    res.send(arrOfRepos);
  }

  database.find(getCallback);
});




let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
