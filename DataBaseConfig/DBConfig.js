const mongoose = require("mongoose");

const { mongoURL } = require("../config/config.js");

const mongodb_url = mongoURL 
    || "mongodb+srv://manish:E5o89cwq79rHN4GC@cluster0.0cobzpc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodb_url).then(() => {
    console.log("Connection Stablish Sucessfully..");
}).catch((err) => {
    console.log(err);
})