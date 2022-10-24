const router = require('express').Router();
const industrialManagementResultController = require("../../../controllers/questionAndResult/thirdYear/result/industrialManagementResultController")

router.get("/industrial-management-result", industrialManagementResultController.getAllStudentResult)
router.get("/industrial-management-result/:universityRoll", industrialManagementResultController.getParticularStudentResult)
router.post("/industrial-management-result", industrialManagementResultController.submitResult)
router.delete("/industrial-management-result", industrialManagementResultController.deleteAllResult)

module.exports = router;