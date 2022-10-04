const router = require('express').Router();
const oopsQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/oopsQuestionController")


router.post("/oops-question", oopsQuestionController.registerQuestion)
router.get("/oops-question", oopsQuestionController.getAllQuestion)
router.delete("/oops-question/:_id", oopsQuestionController.deleteParticularQuestion)
router.patch("/oops-question/:_id", oopsQuestionController.updateParticularQuestion)
router.delete("/oops-quesiton" , oopsQuestionController.deleteAllQuestion)


module.exports = router;