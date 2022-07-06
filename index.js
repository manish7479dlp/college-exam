const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
require("./DataBaseConfig/DBConfig");
const StudentRouter = require("./Routes/Student/StudentRoutes");
const TeacherRouter = require("./Routes/Teacher/TeacherRoutes");
const AdminRouter = require("./Routes/Admin/AdminRoute");

const ExamDetails = require("./Routes/ExamDetails/ExamDetailsRoute");
const BasicElectricalQuestion = require("./Routes/Question/FirstYear/BasicElectricalQuestionRoute");
const BasicElectricalAnswer = require("./Routes/Answer/Firstyear/BasicElectricalAnswerRoutes");
const PhysicsQuestion = require("./Routes/Question/FirstYear/PhysicsQuestionRoute");
const PhysicsAnswer = require("./Routes/Answer/Firstyear/PhysicsAnswerRoute");
const Math1Question = require("./Routes/Question/FirstYear/Math1QuestionRoute");
const Math1Answer = require("./Routes/Answer/Firstyear/Math1AnswerRoute");

const DSAQuestion = require("./Routes/Question/SecondYear/DataStructureAndAlgorithmQuestionRouter");
const DSAAnswer = require("./Routes/Answer/SecondYear/DataStructureAlgorithmRoutes");

const port = process.env.PORT || 8000;

var publicFolder = path.resolve(__dirname, "./ui/build");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(publicFolder)));

app.use(StudentRouter);
app.use(TeacherRouter);
app.use(AdminRouter);

app.use(ExamDetails);

app.use(BasicElectricalQuestion);
app.use(BasicElectricalAnswer);
app.use(PhysicsQuestion);
app.use(PhysicsAnswer);
app.use(Math1Question);
app.use(Math1Answer);

app.use(DSAQuestion);
app.use(DSAAnswer);

// Serve frontend
app.all("/*", function (req, res) {
    res.sendFile("index.html", { root: publicFolder });
});

// Error 404 for no route
app.get("*", (req, res) => {
    res.status(404);
    res.send("404 Page not found..");
});

app.listen(port, () => {
    console.log("Connection to the server... Port number " + port);
});
