const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const teacherModel = require("../models/teacher/teacherModel");

//get particular teacher on the basis of id
const getParticularTeacher = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (universityRoll) {
            const response = await teacherModel
                .find({ userId })
                .select("-password");
            if (response.length === 0) {
                res.status(404).send({
                    status: false,
                    message: "Invalid User Id.",
                });
            } else {
                res.status(200).send({ status: true, response: response });
            }
        } else {
            res.send({
                status: false,
                message: "Please Enter User Id.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//register new teacher
const registerTeacher = async (req, res) => {
    try {
        const { userId, name, department , subject } = req.body;

        // password = starting 4 digits of user id and first name of the student
        let password =
            req.body.userId.toString().substring(0, 4) +
            name.split(" ")[0].toLowerCase();

        // encrypt the password
        password = await bcrypt.hash(password, 10);

        if (userId && subject && name && department) {
            const response = new teacherModel({
                userId,
                subject,
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

//get All teacher
const getAllTeacherDetails = async (req, res) => {
    try {
        const response = await teacherModel.find().select("-password");
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

//delete particular teacher on the basis of id
const deleteParticularTeacher = async (req, res) => {
    try {
        const _id = req.params._id;
        const response = await teacherModel.findByIdAndDelete({ _id });

        if (response.length === 0) {
            res.send({ status: false, messgae: "Invalid Id" });
        } else {
            res.send({
                status: true,
                message: "Teacher Details Deleted Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//update particular teacher on the basis of id
const updateParticularTeacher = async (req, res) => {
    try {
        const { subject, userId, name, department } = req.body;
        const _id = req.params._id;
        // password = starting 4 digits of universtiy roll and first name of the student
        let password =
            req.body.userId.toString().substring(0, 4) +
            name.split(" ")[0].toLowerCase();

        // encrypt the password
        password = await bcrypt.hash(password, 10);
        const response = await teacherModel.findByIdAndUpdate(
            { _id },
            {
                $set: {
                    subject,
                    userId,
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
                message: "Teacher Details Update Sucessfully.",
            });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

//teacher login
const teacherLogIn = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const response = await teacherModel.findOne({ userId });
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
    getParticularTeacher,
    registerTeacher,
    getAllTeacherDetails,
    deleteParticularTeacher,
    updateParticularTeacher,
    teacherLogIn,
};
