const express = require('express')
const router = express.Router();
const DSAAnswerSchema = require("../../Schema/Answe")

router.get("/dsa_answer" , async (req , res) => {
    try {
        const response = await DSAAnswerSchema.find();
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.post("/dsa_answer" , async(req , res) => {
    try {
        const response = await DSAAnswerSchema(req.body);
        const result = await response.save();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})

module.exports = router;