require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const URL = process.env.mongoDB;
mongoConnection = new MongoClient(URL, {
  useUnifiedTopology: true,
});
mongoConnection.connect().then(() => {
  console.log("Database Connected!");
});

module.exports = mongoConnection;
