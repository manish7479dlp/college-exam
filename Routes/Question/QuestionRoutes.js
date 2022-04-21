const express = require("express")
const app = express();
const router = express.Router();
const Question = require("../../Schema/Question/Question")

router.get("/question" , async (req , res) => {
    try {
        const response = await Question.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post("/question" , async (req , res) => {
    try {
       const response = new Question(req.body);
       const result = await response.save();
       console.log(result);
       res.send(result); 
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
})

module.exports = router;