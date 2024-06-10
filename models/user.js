const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
class User {
  constructor(username , email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: mongodb.ObjectId.createFromHexString(userId) })
      .next()
      .then((user) => {
        console.log("Fetched User", user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
}

module.exports = User;
