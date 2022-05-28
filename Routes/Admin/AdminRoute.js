const express = require("express");
const router = express.Router();
const Admin = require("../../Schema/Admin/Admin");

router.get("/admin", async (req, res) => {
    try {
        const response = await Admin.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

router.get("/admin/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        //This code return only password
        // const response = await Student.find({universityRoll} , {password : 1 , _id : 0});

        const response = await Admin.find({ userId });
        console.log(userId);
        if (response.length === 0) {
            console.log("Wrong UserId");
            res.status(404).send(response);
        } else {
            res.send(response);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post("/admin", async (req, res) => {
    try {
        // this line make password = first four digit of unserId + first four character of name.
        // const password = req.body.userId.toString().substring(0,4) + req.body.name.substring(0,4);
        // const data = {...req.body , password};
        const response = new Admin(req.body);
        const result = await response.save();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});

module.exports = router;
