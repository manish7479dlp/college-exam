const router = require('express').Router();
const softwareEngineeringQuestionController = require("../../../controllers/questionAndResult/thirdYear/result/oopsResultController")

router.get("/software-engineering-result", softwareEngineeringQuestionController.getAllStudentResult)
router.get("/software-engineering-result/:universityRoll", softwareEngineeringQuestionController.getParticularStudentResult)
router.post("/software-engineering-result", softwareEngineeringQuestionController.submitResult)
router.delete("/software-engineering-result", softwareEngineeringQuestionController.deleteAllResult)

module.exports = router;