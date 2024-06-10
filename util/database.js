const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;


const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://aarib9892:HIgELpNPOTgZhbvw@cluster0.pnfxqvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    
    })
    .catch((err) => {
      console.log(err);
      throw err
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "Eror in Connection...";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
