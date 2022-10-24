const router = require('express').Router();
const compilerDesignResultController = require("../../../controllers/questionAndResult/thirdYear/result/compilerDesignResultController")

router.get("/compiler-design-result", compilerDesignResultController.getAllStudentResult)
router.get("/compiler-design-result/:universityRoll", compilerDesignResultController.getParticularStudentResult)
router.post("/compiler-design-result", compilerDesignResultController.submitResult)
router.delete("/compiler-design-result", compilerDesignResultController.deleteAllResult)

module.exports = router;