const mongoose = require("mongoose");
const operatingSystemModel = require("../../../../models/questionAndAnswer/thirdYear/question/operatingSystem");

//Insert new Question
const registerQuestion = async (req, res) => {
    try {
        const { question, opt1, opt2, opt3, opt4, answer } = req.body;

        const validationCheck = await operatingSystemModel.findOne({ question });

        if (validationCheck) {
            res.send({
                status: false,
                message: "This question is already Present.",
            });
        } else {
            if (question && opt1 && opt2 && opt3 && opt4 && answer) {
                const response = new operatingSystemModel({
                    question,
                    opt1,
                    opt2,
                    opt3,
                    opt4,
                    answer,
                });
                const result = await response.save();
                const totalQuestionCount = await operatingSystemModel.find().count();
                res.status(201).send({
                    status: true,
                    message: "Question Added Sucessfully",
                    totalQuestion: totalQuestionCount,
                });
            } else {
                res.send({
                    status: false,
                    message: "All fields are required.",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//get All question
const getAllQuestion = async (req, res) => {
    try {
        const response = await operatingSystemModel.find();
        if (response.length === 0) {
            res.status(200).send({ status: false, message: "No data Found" });
        } else {
            res.status(200).send({ status: true, response: response });
        }
    } catch (error) {
        console.log(err);
        res.send(error);
    }
};

//delete particular question on the basis of id
const deleteParticularQuestion = async (req, res) => {
    try {
        const _id = req.params._id;
        const response = await operatingSystemModel.findByIdAndDelete({ _id });

        if (response.length === 0) {
            res.send({ status: false, messgae: "Invalid Id" });
        } else {
            res.send({
                status: true,
                message: "Question Deleted Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//update particular question on the basis of id
const updateParticularQuestion = async (req, res) => {
    try {
        const { question, opt1, opt2, opt3, opt4, answer } = req.body;
        const _id = req.params._id;

        const response = await operatingSystemModel.findByIdAndUpdate(
            { _id },
            {
                $set: {
                    question,
                    opt1,
                    opt2,
                    opt3,
                    opt4,
                    answer,
                },
            }
        );

        if (response.length === 0) {
            res.send({ status: false, messgae: "Invalid Id" });
        } else {
            res.send({
                status: true,
                message: "Question Updated Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//delete all question
const deleteAllQuestion = async (req, res) => {
    try {
        const response = await operatingSystemModel.deleteMany({ department: "CSE" });

        if (response) {
            res.send({
                status: true,
                message: "All Question Deleted Sucessfylly.",
            });
        } else {
            res.send({
                status: false,
                message: "Question is not Delted due to some Technical issues.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = {
    registerQuestion,
    getAllQuestion,
    deleteParticularQuestion,
    updateParticularQuestion,
    deleteAllQuestion,
};
