const router = require('express').Router();
const operatingSystemQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/operatingSystemQuestionController")


router.post("/operating-system-question", operatingSystemQuestionController.registerQuestion)
router.get("/operating-system-question", operatingSystemQuestionController.getAllQuestion)
router.delete("/operating-system-question/:_id", operatingSystemQuestionController.deleteParticularQuestion)
router.patch("/operating-system-question/:_id", operatingSystemQuestionController.updateParticularQuestion)
router.delete("/operating-system-quesiton" , operatingSystemQuestionController.deleteAllQuestion)


module.exports = router;