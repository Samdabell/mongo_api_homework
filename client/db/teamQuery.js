var MongoClient = require('mongodb').MongoClient;

var TeamQuery = function(){
  this.url = "mongodb://localhost:27017/cricket";
};

TeamQuery.prototype = {
  all: function(callback){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection('teams');
      collection.find().toArray(function(err, result){
        callback(result);
      })
    })
  },
  add: function(teamToAdd, callback){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('teams');
        collection.insert(teamToAdd);
        collection.find().toArray(function(err, results){
          callback(results);
        })
      }
    })
  }
}

module.exports = TeamQuery;