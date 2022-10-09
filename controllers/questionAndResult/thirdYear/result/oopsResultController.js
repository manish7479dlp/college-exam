const oopsResultModel = require("../../../../models/questionAndAnswer/thirdYear/result/oops");

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

//add result

const submitResult = async (req, res) => {
    try {
        const response = await oopsResultModel(req.body);
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

module.exports = { getAllStudentResult, deleteAllResult, submitResult };
