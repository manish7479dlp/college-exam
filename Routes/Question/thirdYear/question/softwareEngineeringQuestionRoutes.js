const router = require('express').Router();
const softwareEngineeringQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/softwareEngineeringQuestionController")


router.post("/software-engineering-question", softwareEngineeringQuestionController.registerQuestion)
router.get("/software-engineering-question", softwareEngineeringQuestionController.getAllQuestion)
router.delete("/software-engineering-question/:_id", softwareEngineeringQuestionController.deleteParticularQuestion)
router.patch("/software-engineering-question/:_id", softwareEngineeringQuestionController.updateParticularQuestion)
router.delete("/software-engineering-quesiton" , softwareEngineeringQuestionController.deleteAllQuestion)


module.exports = router;