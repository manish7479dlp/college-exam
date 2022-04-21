const { log } = require("console");
const express = require("express");
const router = express.Router();
const Student = require("../../Schema/Student/StudentSchema");

router.get("/student", async (req, res) => {
  try {
    const response = await Student.find();
    res.send(response);
  } catch (error) {
    console.log(err);
  }
});

router.get("/student/:universityRoll", async (req, res) => {
  try {
    const universityRoll = req.params.universityRoll;
    //This code return only password
    // const response = await Student.find({universityRoll} , {password : 1 , _id : 0});

    const response = await Student.find({ universityRoll });
    console.log(response);
    if (response.length === 0) {
      console.log("Wrong university Roll");
      res.status(404).send(response);
    } else {
      res.send(response);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/student", async (req, res) => {
  try {
    // this line make password = first four digit of universityRoll + first four character of name.
    const password =
      req.body.universityRoll.toString().substring(0, 4) +
      req.body.name.substring(0, 4);
    const data = { ...req.body, password };
    const response = new Student(data);
    const result = await response.save();
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = router;
