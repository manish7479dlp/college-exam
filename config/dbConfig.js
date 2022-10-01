const mongoose = require("mongoose");

//create data base
const dbConfig = async (mongoDbUrl) => {
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("DataBase Conntected Successfully.");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConfig;