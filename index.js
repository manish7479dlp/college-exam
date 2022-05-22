const express = require('express');
const cors = require('cors')
const app = express();
require("./DataBaseConfig/DBConfig");
const StudentRouter = require("./Routes/Student/StudentRoutes");
const TeacherRouter = require("./Routes/Teacher/TeacherRoutes")

const BasicElectricalQuestion = require("./Routes/Question/FirstYear/BasicElectricalQuestionRoute");
const BasicElectricalAnswer = require("./Routes/Answer/Firstyear/BasicElectricalAnswerRoutes")
const PhysicsQuestion = require("./Routes/Question/FirstYear/PhysicsQuestionRoute")
const PhysicsAnswer = require("./Routes/Answer/Firstyear/PhysicsAnswerRoute");
const Math1Question = require("./Routes/Question/FirstYear/Math1QuestionRoute")
const Math1Answer = require("./Routes/Answer/Firstyear/Math1AnswerRoute")

const DSAQuestion = require("./Routes/Question/SecondYear/DataStructureAndAlgorithmQuestionRouter")
const DSAAnswer = require("./Routes/Answer/SecondYear/DataStructureAlgorithmRoutes")

const PORT = process.env | 8000

app.use(express.json());
app.use(cors());
app.use(StudentRouter);
app.use(TeacherRouter);
app.use(BasicElectricalQuestion);
app.use(BasicElectricalAnswer);
app.use(PhysicsQuestion);
app.use(PhysicsAnswer);
app.use(Math1Question);
app.use(Math1Answer);

app.use(DSAQuestion);
app.use(DSAAnswer);

app.get("*" , (req , res) => {
    res.status(404);
    res.send("404 Page not found..")
})

app.listen(PORT , () => {
    console.log("Connection to the server... Port number " + PORT);
})