const router = require('express').Router();
const artificialIntelligenceResultController = require("../../../controllers/questionAndResult/thirdYear/result/artificialIntelligenceResultController")

router.get("/artificial-intelligence-result", artificialIntelligenceResultController.getAllStudentResult)
router.get("/artificial-intelligence-result/:universityRoll", artificialIntelligenceResultController.getParticularStudentResult)
router.post("/artificial-intelligence-result", artificialIntelligenceResultController.submitResult)
router.delete("/artificial-intelligence-result", artificialIntelligenceResultController.deleteAllResult)

module.exports = router;