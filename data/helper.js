// const {MongoClient} = require('mongodb');
 const uri = "mongodb+srv://dbUser:dbPassword@examcluster-vkinr.azure.mongodb.net/test?useUnifiedTopology=true";

// const client = new MongoClient(uri);


var MongoClient = require("mongodb").MongoClient;
var _db;
var _client;
// var connectionString = "mongodb+srv://admin:m0b1l3@cluster0-gmij9.mongodb.net/test?useUnifiedTopology=true&retryWrites=true&w=majority"; 

//var connectionString = "mongodb://localhost:27017/clinicdb"
//console.log(config);

module.exports = {
  connectToDb: function (callback) {
    MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      _client = client;
      _db = _client.db("examdb");

      if (err) return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
  closeDb: function () {
    _client.close();
  },
};
