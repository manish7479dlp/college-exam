const mongoose = require("mongoose");
require("dotenv").config();

const dbConfig = async (dbName) => {
  try {
    await mongoose.connect(dbName);
    console.log("DataBase Conntected Successfully.");
  } catch (error) {
    console.log(error);
  }
}