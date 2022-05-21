const express = require("express")
const app = express();
const router = express.Router();
const BasicElectricQuestion = require("../../../Schema/Admin/FirstYear/QuestionSchema/BasicElectricalQuestionSchema")

router.get("/basic_electric_question" , async (req , res) => {
    try {
        const response = await BasicElectricQuestion.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post("/basic_electric_question" , async (req , res) => {
    try {
       const response = new BasicElectricQuestion(req.body);
       const result = await response.save();
       console.log(result);
       res.send(result); 
    // console.log(req.body);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})

module.exports = router;