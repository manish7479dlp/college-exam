const router = require('express').Router();
const artificialIntelligenceQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/artificialIntelligenceQuestionController")


router.post("/artificial-intelligence-question", artificialIntelligenceQuestionController.registerQuestion)
router.get("/artificial-intelligence-question", artificialIntelligenceQuestionController.getAllQuestion)
router.delete("/artificial-intelligence-question/:_id", artificialIntelligenceQuestionController.deleteParticularQuestion)
router.patch("/artificial-intelligence-question/:_id", artificialIntelligenceQuestionController.updateParticularQuestion)
router.delete("/artificial-intelligence-quesiton" , artificialIntelligenceQuestionController.deleteAllQuestion)


module.exports = router;