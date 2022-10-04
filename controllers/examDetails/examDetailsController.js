const examDetailsModel = require("../../models/examDetails/examDetails");

// get all examDetails
const getAllExamDetails = async (req, res) => {
    try {
        const response = await examDetailsModel.find();
        if (response.length === 0) {
            res.send({ status: true, message: "No Data Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//get particular Exam Details on the basis of subject Name.
const getParticularExamDetails = async (req, res) => {
    try {
        const subject = req.params.subject;
        const response = await examDetailsModel.find({ subject });

        if (response.length === 0) {
            res.send({ status: false, message: "Exam Details Not Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//register exam details
const registerExamDetails = async (req, res) => {
    try {
        const { semester, subject, examDate, examStartTime, examDuration } =
            req.body;

        const validation = await examDetailsModel.findOne({ subject });
        console.log(validation);
        if (validation) {
            res.send({
                status: false,
                message: "Question details already Present",
            });
        } else {
            const response = new examDetailsModel({
                semester,
                subject,
                examDate,
                examStartTime,
                examDuration,
            });
            const result = await response.save();
            res.status(201).send({
                status: true,
                message: "Data Inserted Sucessfully",
            });
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

//update exam details on the basis of id.
const updateParticularExamDetails = async (req, res) => {
    try {
        const { semester, subject, examDate, examStartTime, examDuration } =
            req.body;
        const id = req.params._id;
        await examDetailsModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    semester,
                    subject,
                    examDate,
                    examStartTime,
                    examDuration,
                },
            }
        );

        res.send({ status: true, message: "Details Updated Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

//delete particular exam details on the basis of id..
const deleteParticularExamDetails = async (req, res) => {
    try {
        const id = req.params._id;
        await examDetailsModel.findByIdAndDelete({ _id: id });
        res.send({ status: true, message: "Data Deleted Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getAllExamDetails,
    getParticularExamDetails,
    deleteParticularExamDetails,
    updateParticularExamDetails,
    registerExamDetails,
};