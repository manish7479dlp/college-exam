const router = require('express').Router();
const operatingSystemResultController = require("../../../controllers/questionAndResult/thirdYear/result/operatingSystemResultController")

router.get("/operating-system-result", operatingSystemResultController.getAllStudentResult)
router.get("/operating-system-result/:universityRoll", operatingSystemResultController.getParticularStudentResult)
router.post("/operating-system-result", operatingSystemResultController.submitResult)
router.delete("/operating-system-result", operatingSystemResultController.deleteAllResult)

module.exports = router;