const router = require('express').Router();
const oopsQuestionController = require("../../../controllers/questionAndResult/thirdYear/result/oopsResultController")

router.get("/object-oriented-programming-result", oopsQuestionController.getAllStudentResult)
router.get("/object-oriented-programming-result/:universityRoll", oopsQuestionController.getParticularStudentResult)
router.post("/object-oriented-programming-result", oopsQuestionController.submitResult)
router.delete("/object-oriented-programming-result", oopsQuestionController.deleteAllResult)

module.exports = router;