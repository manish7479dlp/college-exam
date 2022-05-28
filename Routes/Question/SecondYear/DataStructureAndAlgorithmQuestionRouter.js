const express = require("express")
const app = express();
const router = express.Router();
const DSA = require("../../../Schema/QuestionDetails/SecondYear/QuestionSchema/DataStructureAlgorithmQuestionSchema")

router.get("/data_structure_and_algorithm_question" , async (req , res) => {
    try {
        const response = await DSA.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
})

router.post("/data_structure_and_algorithm_question" , async (req , res) => {
    try {
       const response = new DSA(req.body);
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