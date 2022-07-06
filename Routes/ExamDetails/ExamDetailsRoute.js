const express = require("express");
const router = express.Router();
const ExamDetails = require("../../Schema/ExamDetails/ExamDetailsSchema");

//Get Current Date;

const getCurrentDate = () => {
    const DateObject = new Date();
    let day = DateObject.getDate();
    let month = DateObject.getMonth()
    let year = DateObject.getFullYear();
    month++;
    
    day = (day >= 1 && day <= 9) ? "0" + day : day;
    month = (month >= 1 && month <= 9) ? "0" + month : month;
    return (year + "-" + month + "-" + day);
}


router.get("/exam_details", async (req, res) => {
  try {
    const response = await ExamDetails.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/exam_details/:department/:semester", async (req , res) => {
  try {
    // const temp = req.params.semesterNumber;
    console.log(req.params);
    const response = await ExamDetails.find(req.params);
    const CurrentDate = getCurrentDate();
    const result = response.filter((data) => {
      return data.examDate === CurrentDate;
    })
    console.log(result);
    res.send(result)
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
