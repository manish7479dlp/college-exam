const express = require("express");
const router = express.Router();
const ExamDetails = require("../../Schema/ExamDetails/ExamDetailsSchema");

router.get("/exam_details", async (req, res) => {
  try {
    const response = await ExamDetails.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/exam_details/:department", async (req , res) => {
  try {
    // const temp = req.params.semesterNumber;
    const response = await ExamDetails.find(req.params);
    res.send(response)
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

router.post("/exam_details", async (req, res) => {
  try {
    const response = await ExamDetails(req.body);
    const result = await response.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



module.exports = router;
