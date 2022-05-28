const express = require("express")
const app = express();
const router = express.Router();
const Math1Question = require("../../../Schema/QuestionDetails/FirstYear/QuestionSchema/Math1QuestionSchema")

router.get("/math1_question" , async (req , res) => {
    try {
        const response = await Math1Question.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post("/math1_question" , async (req , res) => {
    try {
       const response = new Math1Question(req.body);
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