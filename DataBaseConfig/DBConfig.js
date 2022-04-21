const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/clgDb").then(() => {
    console.log("Connection Stablish Sucessfully..");
}).catch((err) => {
    console.log(err);
})