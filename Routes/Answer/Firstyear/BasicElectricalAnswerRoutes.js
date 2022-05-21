const express = require("express");
const router = express.Router();
const BasicElectricAnswer = require("../../../Schema/Admin/FirstYear/AnswerSchema/BasicElectricalAnswerSchema");

router.get("/basic_electric_answer", async (req, res) => {
  try {
    const response = await BasicElectricAnswer.find();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/basic_electric_answer", async (req, res) => {
  try {
    const response = await BasicElectricAnswer(req.body);
    const result = await response.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
