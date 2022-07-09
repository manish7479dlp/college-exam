const express = require("express");
const router = express.Router();
const DSA = require("../../../Schema/QuestionDetails/SecondYear/AnswerSchema/DataStructureAlgorithmAnswerSchema");

router.get("/data_structure_and_algorithm_answer", async (req, res) => {
  try {
    const response = await DSA.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// by the help of this router we check student already given exam or not..
router.get("/data_structure_and_algorithm_answer/:universityRoll", async (req , res) => {
  try {
    const response = await DSA.find(req.params).select(req.params);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

router.post("/data_structure_and_algorithm_answer", async (req, res) => {
  try {
    const response = await DSA(req.body);
    const result = await response.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/data_structure_and_algorithm_answer" , async(req , res) => {
  try {
    const response = await DSA.deleteMany({department : "CSE"})
    res.send(respond);
  } catch (error) {
    console.log(error);
    res.send(error);
    
  }
})

module.exports = router;
