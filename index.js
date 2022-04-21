const express = require('express');
const cors = require('cors')
const app = express();
require("./DataBaseConfig/DBConfig");
const StudentRouter = require("./Routes/Student/StudentRoutes");
const TeacherRouter = require("./Routes/Teacher/TeacherRoutes")
const QuesitonRouter = require("./Routes/Question/QuestionRoutes")
const PORT = process.env | 8000

app.use(express.json());
app.use(cors());
app.use(StudentRouter);
app.use(TeacherRouter);
app.use(QuesitonRouter)

app.listen(PORT , () => {
    console.log("Connection to the server... Port number " + PORT);
})