const express = require("express")
const app = express();
const router = express.Router();
const PhysicsQuestion = require("../../../Schema/QuestionDetails/FirstYear/QuestionSchema/PhysicsQuestionSchema")

router.get("/physics_question" , async (req , res) => {
    try {
        const response = await PhysicsQuestion.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post("/physics_question" , async (req , res) => {
    try {
       const response = new PhysicsQuestion(req.body);
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