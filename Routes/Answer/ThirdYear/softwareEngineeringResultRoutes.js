const router = require('express').Router();
const softwareEngineeringQuestionController = require("../../../controllers/questionAndResult/thirdYear/result/oopsResultController")

router.get("/object-oriented-programming-result", softwareEngineeringQuestionController.getAllStudentResult)
router.get("/object-oriented-programming-result/:universityRoll", softwareEngineeringQuestionController.getParticularStudentResult)
router.post("/object-oriented-programming-result", softwareEngineeringQuestionController.submitResult)
router.delete("/object-oriented-programming-result", softwareEngineeringQuestionController.deleteAllResult)

module.exports = router;