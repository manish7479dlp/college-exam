const bcrypt = require("bcrypt");
const adminModel = require("../models/admin/adminModel");

// get all admin
const getAllAdminDetails = async (req, res) => {
    try {
        const response = await adminModel.find().select("-password");
        if (response.length === 0) {
            res.send({ status: true, message: "No Data Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//get particular admin on the basis of User id.
const getParticularAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await adminModel.find({ userId });

        if (response.length === 0) {
            res.send({ status: false, message: "User Not Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//register admin
const registerAdmin = async (req, res) => {
    try {
        const { userId, password , name } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const response = new adminModel({
            userId,
            password: hashPassword,
            name
        });
        const result = await response.save();
        res.status(201).send({
            status: true,
            message: "Data Inserted Sucessfully",
        });
    } catch (error) {
        res.status(404).send(error);
    }
};

//update admin details on the basis of id.
const updateParticularAdmin = async (req, res) => {
    try {
        const id = req.params._id;
        const { userId, password , name} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        await adminModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    userId,
                    password: hashPassword,
                    name
                },
            }
        );

        res.send({ status: true, message: "Details Updated Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

//delete particular admin on the basis of id..
const deleteParticularAdmin = async (req, res) => {
    try {
        const id = req.params._id;
        await adminModel.findByIdAndDelete({ _id: id });
        res.send({ status: true, message: "Data Deleted Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

//admin login
const adminLogIn = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (userId && password) {
            const response = await adminModel.findOne({ userId });
            if (response) {
                const isMatch = await bcrypt.compare(
                    password,
                    response.password
                );
                if (isMatch) {
                    res.send({ status: true, message: "Login Sucessful", response: response });
                } else {
                    res.send({
                        status: false,
                        message: "Invalid User Details",
                    });
                }
            } else {
                res.send({ status: false, message: "Invalid Details" });
            }
        } else {
            res.send({ status: false, message: "Please Fill all Details" });
        }
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getAllAdminDetails,
    getParticularAdmin,
    deleteParticularAdmin,
    updateParticularAdmin,
    registerAdmin,
    adminLogIn,
};
