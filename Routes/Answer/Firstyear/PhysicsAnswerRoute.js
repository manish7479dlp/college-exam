const express = require("express");
const router = express.Router();
const PhysicsAnswer = require("../../../Schema/Admin/FirstYear/AnswerSchema/PhysicsAnswerSchema");

router.get("/physics_answer", async (req, res) => {
  try {
    const response = await PhysicsAnswer.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/physics_answer", async (req, res) => {
  try {
    const response = await PhysicsAnswer(req.body);
    const result = await response.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
