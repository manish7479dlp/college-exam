const express = require("express");
const router = express.Router();
const Teacher = require("../../Schema/Teacher/Teacher");

router.get("/teacher", async (req, res) => {
  try {
    const response = await Teacher.find();
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/teacher/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    //This code return only password
    // const response = await Student.find({universityRoll} , {password : 1 , _id : 0});

    const response = await Teacher.find({ userId });
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

router.post("/teacher" , async (req , res) => {
    try {
        // this line make password = first four digit of unserId + first four character of name.
        const password = req.body.userId.toString().substring(0,4) + req.body.name.substring(0,4);
        const data = {...req.body , password};
        const response = new Teacher(data);
        const result = await response.save();
        console.log(data);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})

module.exports = router;
