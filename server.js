const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const dbConfig = require("./config/dbConfig");
const studentRoutes = require("./Routes/Student/studentRoutes");
const teacherRoutes = require("./Routes/Teacher/teacherRoutes");
const adminRoutes = require("./Routes/Admin/adminRoutes")

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;

// cors
app.use(cors());

//called dbConfig function
dbConfig(mongoDbUrl);

app.use(express.json());

//integrate student routes
app.use("/api", studentRoutes);
//integrate teacher routes
app.use("/api", teacherRoutes);
//integrate admin routes
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
    res.send("hlw from the other side...");
});

app.listen(port, () => {
    console.log("Server is running...");
});
