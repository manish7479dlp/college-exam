const express = require("express");
const cors = require("cors")
require('dotenv').config();
const app = express();
const dbConfig = require("./config/dbConfig");
const studentRoute = require("./Routes/Student/studentRoute")

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;


// cors
app.use(cors());

//called dbConfig function
dbConfig(mongoDbUrl)

app.use(express.json());

//integrate student routes
app.use("/api" ,studentRoute )

app.get("/" , (req , res) => {
    res.send("hlw from the other side...");
})





app.listen(port , () => {
    console.log("Server is running...");
})