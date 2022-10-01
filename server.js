const express = require("express");
const cors = require("cors")
require('dotenv').config();
const app = express();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;


// cors
app.use(cors());

//called dbConfig function
dbConfig(mongoDbUrl)

app.use(express.json());

app.get("/" , (req , res) => {
    res.send("hlw from the other side...");
})

app.listen(port , () => {
    console.log("Server is running...");
})