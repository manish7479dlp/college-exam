const router = require('express').Router();
const compilerDesignQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/compilerDesignQuestionController")


router.post("/compiler-design-question", compilerDesignQuestionController.registerQuestion)
router.get("/compiler-design-question", compilerDesignQuestionController.getAllQuestion)
router.delete("/compiler-design-question/:_id", compilerDesignQuestionController.deleteParticularQuestion)
router.patch("/compiler-design-question/:_id", compilerDesignQuestionController.updateParticularQuestion)
router.delete("/compiler-design-quesiton" , compilerDesignQuestionController.deleteAllQuestion)


module.exports = router;