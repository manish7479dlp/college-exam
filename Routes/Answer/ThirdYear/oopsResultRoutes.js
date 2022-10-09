const router = require('express').Router();
const oopsQuestionController = require("../../../controllers/questionAndResult/thirdYear/result/oopsResultController")

router.get("/oops-result", oopsQuestionController.getAllStudentResult)
router.post("/oops-result", oopsQuestionController.submitResult)
router.delete("/oops-result", oopsQuestionController.deleteAllResult)

module.exports = router;