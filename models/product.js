const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id;
    this.userId = userId
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      //UPDATE EXISTING PRODUCT
      dbOp = db
        .collection("products")
        .updateOne(
          { _id: this._id },
          { $set: this }
        );
    } else {
      //CREATE NEW PRODUCT
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("Fetched Products", products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectId.createFromHexString(prodId) })
      .next()
      .then((product) => {
        console.log("Fetched Product", product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(prodId){
      const db = getDb();
      return db
        .collection("products")
        .deleteOne({ _id: mongodb.ObjectId.createFromHexString(prodId) })
        .then((resp) => {
          console.log(resp);
          return resp;
        })
        .catch((err) => {
          console.log(err);
        });

  }
}

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: Sequelize.FLOAT,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
// });
module.exports = Product;
