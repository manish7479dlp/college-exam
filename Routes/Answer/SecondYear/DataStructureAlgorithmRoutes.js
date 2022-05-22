const express = require("express");
const router = express.Router();
const DSA = require("../../../Schema/Admin/SecondYear/AnswerSchema/DataStructureAlgorithmAnswerSchema");

router.get("/data_structure_and_algorithm_answer", async (req, res) => {
  try {
    const response = await DSA.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

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

module.exports = router;
