const router = require('express').Router();
const oopsQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/oopsQuestionController")


router.post("/object-oriented-programming-question", oopsQuestionController.registerQuestion)
router.get("/object-oriented-programming-question", oopsQuestionController.getAllQuestion)
router.delete("/object-oriented-programming-question/:_id", oopsQuestionController.deleteParticularQuestion)
router.patch("/object-oriented-programming-question/:_id", oopsQuestionController.updateParticularQuestion)
router.delete("/object-oriented-programming-quesiton" , oopsQuestionController.deleteAllQuestion)


module.exports = router;