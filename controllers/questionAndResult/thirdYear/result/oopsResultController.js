const oopsResultModel = require("../../../../models/questionAndAnswer/thirdYear/result/oops");
const oopsQuestion = require("../../../../models/questionAndAnswer/thirdYear/question/oops");
//get all student result.
const getAllStudentResult = async (req, res) => {
    try {
        const response = await oopsResultModel.find();
        if (response.length === 0) {
            res.send({ status: false, message: "No Result Found." });
        } else {
            res.send({ status: true, response });
        }
    } catch (error) {
        res.send(error);
    }
};

const getParticularStudentResult = async (req , res) => {
    try {
        const universityRoll = req.params.universityRoll;
        const response = await oopsResultModel.find({universityRoll});
        if (response.length === 0) {
            res.send({ status: false, message: "No Result Found." });
        } else {
            res.send({ status: true, response });
        }
    } catch (error) {
        res.send(error);
    }
}

const calcMarks = async (marks) => {
    try {
        const response = await oopsQuestion.find();
        let result = 0;
        for (let i = 0; i < response.length; i++) {
            if (marks[i + 1] === response[i].answer.toLowerCase()) {
                result++;
            }
        }
        return result;
    } catch (error) {
        console.log(error);
    }
};

//add result
const submitResult = async (req, res) => {
    try {
        const universityRoll = req.body.universityRoll;
        const marks = await calcMarks(req.body.marks);
        const name = req.body.name;
        const department = req.body.department

        const response = await oopsResultModel({ universityRoll, marks, name , department});
        const result = await response.save();

        if (result.length === 0) {
            res.send({ status: false, message: "Answer is not Submitted." });
        } else {
            res.send({
                status: true,
                message: "Answer Submitted Sucessfully.",
            });
        }
    } catch (error) {
        res.send(error);
    }
};

//delete cse oops marks
const deleteAllResult = async (req, res) => {
    try {
        const response = await oopsResultModel.deleteMany({
            department: "CSE",
        });
        if (response.deletedCount != 0) {
            res.send({ status: true, message: "Result Deleted Sucessfylly." });
        } else if (response.deletedCount === 0) {
            res.send({ status: true, message: "No Result Found." });
        } else {
            res.send({ status: false, message: "Result not deleted." });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = { getAllStudentResult, deleteAllResult, submitResult,getParticularStudentResult };
