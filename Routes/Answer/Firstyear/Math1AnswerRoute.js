const express = require("express");
const router = express.Router();
const Math1Answer = require("../../../Schema/QuestionDetails/FirstYear/AnswerSchema/Math1AnswerSchema");

router.get("/math1_answer", async (req, res) => {
  try {
    const response = await Math1Answer.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/math1_answer", async (req, res) => {
  try {
    const response = await Math1Answer(req.body);
    const result = await response.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
