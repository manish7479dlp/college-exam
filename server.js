const express = require("express");
const cors = require("cors");
const path = require("path")
require("dotenv").config();
const app = express();
const dbConfig = require("./config/dbConfig");
const studentRoutes = require("./Routes/Student/studentRoutes");
const teacherRoutes = require("./Routes/Teacher/TeacherRoutes");
const adminRoutes = require("./Routes/Admin/adminRoutes")
const examDetailsRoutes = require("./Routes/ExamDetails/examDetailsRoute")
const oopsResultRouters = require("./Routes/Answer/ThirdYear/oopsResultRoutes")

//oops Question routes
const oopsQuestionRoutes = require("./Routes/Question/thirdYear/question/oopsQuestionRoutes")

const port = process.env.PORT;
const mongoDbUrl = process.env.MONGODB_URL;

var publicFolder = path.resolve(__dirname, "./ui/build");


// cors
app.use(cors());

app.use(express.static(path.join(publicFolder)));


//called dbConfig function
dbConfig(mongoDbUrl);

app.use(express.json());

//integrate student routes
app.use("/api", studentRoutes);
//integrate teacher routes
app.use("/api", teacherRoutes);
//integrate admin routes
app.use("/api", adminRoutes);
//integrate exam Details routes
app.use("/api", examDetailsRoutes);
//integrate oops question routes
app.use("/api" , oopsQuestionRoutes)
//integrate oops result routes
app.use("/api" , oopsResultRouters)

// Serve frontend
app.all("/", function (req, res) {
    res.sendFile("index.html", { root: publicFolder });
});

// Error 404 for no route
app.get("*", (req, res) => {
    res.status(404);
    res.send("404 Page not found..");
});

app.listen(port, () => {
    console.log("Server is running...");
});
