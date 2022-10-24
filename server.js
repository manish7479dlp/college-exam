const express = require("express");
const cors = require("cors");
const path = require("path")
require("dotenv").config();
const app = express();
const dbConfig = require("./config/dbConfig");
const studentRoutes = require("./Routes/Student/studentRoutes");
const teacherRoutes = require("./Routes/Teacher/TeacherRoutes");
const adminRoutes = require("./Routes/Admin/adminRoutes")
const examDetailsRoutes = require("./Routes/ExamDetails/ExamDetailsRoute")


// third year CSE question routes


const compilerDesignQuestionRoutes = require("./Routes/Question/thirdYear/question/compilerDesignQuestionRoutes");

const industrialManagementQuestionRoutes = require("./Routes/Question/thirdYear/question/industrialManagementQuestionRoutes");

const oopsQuestionRoutes = require("./Routes/Question/thirdYear/question/oopsQuestionRoutes");

const softwareEngineeringQuestionRoutes = require("./Routes/Question/thirdYear/question/softwareEngineeringQuestionRoutes");

const operatingSystemQuestionRoutes = require("./Routes/Question/thirdYear/question/operatingSystemQuestionRoutes");

const artificialIntelligenceQuestionRoutes = require("./Routes/Question/thirdYear/question/artificialIntelligenceQuestionRoutes")

// third year CSE answer routes

const compilerDesignAnswerRoutes = require("./Routes/Answer/ThirdYear/compilerDesingResultRoutes")

const oopsAnswerRoutes = require("./Routes/Answer/ThirdYear/oopsResultRoutes")

const softwareEngineeringAnswerRoutes = require("./Routes/Answer/ThirdYear/softwareEngineeringResultRoutes")

const artificialIntelligenceAnswerRoutes = require("./Routes/Answer/ThirdYear/artificialIntelligenceResultRoutes")

const operatingSystemAnswerRoutes = require("./Routes/Answer/ThirdYear/operatingSystemResultRoutes")

const industrialManagementAnswerRoutes = require("./Routes/Answer/ThirdYear/industrialManagementResultRoutes")





const port = process.env.PORT || 8000;
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

// third year CSE question routes integration 
app.use("/api" , oopsQuestionRoutes)
app.use("/api" , compilerDesignQuestionRoutes)
app.use("/api" , operatingSystemQuestionRoutes)
app.use("/api" , artificialIntelligenceQuestionRoutes)
app.use("/api" , industrialManagementQuestionRoutes)
app.use("/api" , softwareEngineeringQuestionRoutes)

// third year CSE answer routes integration

app.use("/api" ,oopsAnswerRoutes)
app.use("/api" ,compilerDesignAnswerRoutes)
app.use("/api" ,operatingSystemAnswerRoutes)
app.use("/api" ,artificialIntelligenceAnswerRoutes)
app.use("/api" ,industrialManagementAnswerRoutes)
app.use("/api" ,softwareEngineeringAnswerRoutes)




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
    console.log("Server is running...");
});
