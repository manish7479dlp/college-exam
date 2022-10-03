const router = require('express').Router();
const examDetailsController = require("../../controllers/examDetails/examDetailsController")


router.get("/exam-details/:subject", examDetailsController.getParticularExamDetails)
router.post("/exam-details", examDetailsController.registerExamDetails)
router.get("/exam-details", examDetailsController.getAllExamDetails)
router.delete("/exam-details/:_id", examDetailsController.deleteParticularExamDetails)
router.patch("/exam-details/:_id", examDetailsController.updateParticularExamDetails)

module.exports = router;