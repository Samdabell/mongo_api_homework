var Team = require('./team');

var Teams = function() {

}

Teams.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
  },
  all: function(callback){
    this.makeRequest("http://localhost:3000/api/teams", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var teams = Teams.prototype.populateTeams(results);
      callback(films);
    })
  },
  populateTeams: function(results){
    var teams = [];
    for(var result of results){
      var team = new Team(result);
      teams.push(team);
    }
    return teams;
  },
  add: function(newTeam, callback){
    var teamToAdd = JSON.stringify(newTeam);
    this.makePostRequest("http://localhost:3000/api/team", teamToAdd, callback)
  },
  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Content-type", "application/json");
    request.addEventListener('load', callback);
    request.send(payload);
  }
}

module.exports = Teams;
