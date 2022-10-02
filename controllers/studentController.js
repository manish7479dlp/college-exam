const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const studentModel = require("../models/student/studentModel");

//get particular student on the basis of id
const getParticularStudent = async (req, res) => {
    try {
        const universityRoll = req.params.universityRoll;

        if (universityRoll) {
            const response = await studentModel
                .find({ universityRoll })
                .select("-password");
            if (response.length === 0) {
                res.status(404).send({
                    status: false,
                    message: "Invalid University Roll.",
                });
            } else {
                res.status(200).send({ status: true, response: response });
            }
        } else {
            res.send({
                status: false,
                message: "Please Enter University Roll.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//register new student
const registerStudent = async (req, res) => {
    try {
        const { year, universityRoll, name, department } = req.body;

        // password = starting 4 digits of universtiy roll and first name of the student
        let password =
            req.body.universityRoll.toString().substring(0, 4) +
            name.split(" ")[0].toLowerCase();

        // encrypt the password
        password = await bcrypt.hash(password, 10);

        if (year && universityRoll && name && department) {
            const response = new studentModel({
                year,
                universityRoll,
                name,
                department,
                password,
            });
            const result = await response.save();
            console.log(result);
            res.status(201).send({
                status: true,
                message: "Details Inserted Sucessfully",
            });
        } else {
            res.send({ status: false, message: "All fields are required." });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//get All student
const getAllStudentDetails = async (req, res) => {
    try {
        const response = await studentModel.find().select("-password");
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

//delete particular student on the basis of id
const deleteParticularStudent = async (req, res) => {
    try {
        const _id = req.params._id;
        const response = await studentModel.findByIdAndDelete({ _id });

        if (response.length === 0) {
            res.send({ status: false, messgae: "Invalid Id" });
        } else {
            res.send({
                status: true,
                message: "Student Details Deleted Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//update particular student on the basis of id
const updateParticularStudent = async (req, res) => {
    try {
        const { year, universityRoll, name, department } = req.body;
        const _id = req.params._id;
        // password = starting 4 digits of universtiy roll and first name of the student
        let password =
            req.body.universityRoll.toString().substring(0, 4) +
            name.split(" ")[0].toLowerCase();

        // encrypt the password
        password = await bcrypt.hash(password, 10);
        const response = await studentModel.findByIdAndUpdate(
            { _id },
            {
                $set: {
                    year,
                    universityRoll,
                    name,
                    department,
                    password,
                },
            }
        );

        if (response.length === 0) {
            res.send({ status: false, messgae: "Invalid Id" });
        } else {
            res.send({
                status: true,
                message: "Student Details Update Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//student login
const studentLogIn = async (req, res) => {
    try {
        const { universityRoll, password } = req.body;

        const response = await studentModel.findOne({ universityRoll });
        if (response) {
            const isMatch = await bcrypt.compare(password, response.password);
            
            if (isMatch) {
                res.send({
                    status: true,
                    messgae: "Valid User",
                    response: response,
                });
            } else {
                res.send({ status: false, message: "Invalid Details" });
            }
        } else {
            res.send({ status: false, message: "Invalid Details" });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

module.exports = {
    getParticularStudent,
    registerStudent,
    getAllStudentDetails,
    deleteParticularStudent,
    updateParticularStudent,
    studentLogIn,
};
