var express = require('express');
var app = express();
var teamRouter = express.Router();
//models
var teams = require('../client/src/models/teams')();
var Team = require('../client/src/models/team');

var TeamQuery = require('../client/db/teamQuery');
var query = new TeamQuery();

//film by id
teamRouter.get('/:id', function(req, res){
  res.json(teams[req.params.id]);
});

//film index
teamRouter.get('/', function(req, res) {
  query.all(function(results){
    res.json(results);
  })
});

//film update
teamRouter.put('/:id', function(req, res) {
  var team = new Team({
    country: req.body.country,
    testRanking: req.body.testRanking,
    odiRanking: req.body.odiRanking,
    t20Ranking: req.body.t20Ranking
  });
  teams[req.params.id] = team;
  res.json({data: teams});
});

//add new film
teamRouter.post('/', function(req, res) {
  var team = new Team({
      country: req.body.country,
      testRanking: req.body.testRanking,
      odiRanking: req.body.odiRanking,
      t20Ranking: req.body.t20Ranking
  });
  query.add(team, function(results){
    res.redirect('/')
  });
});

//delete film
teamRouter.delete('/:id', function(req, res) {
  teams.splice(req.params.id, 1);
  res.json({data: teams});
});

module.exports = teamRouter;
