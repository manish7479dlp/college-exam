const router = require('express').Router();
const industrialManagementQuestionController = require("../../../../controllers/questionAndResult/thirdYear/question/industrialManagementQuestionController")


router.post("/industrial-management-question", industrialManagementQuestionController.registerQuestion)
router.get("/industrial-management-question", industrialManagementQuestionController.getAllQuestion)
router.delete("/industrial-management-question/:_id", industrialManagementQuestionController.deleteParticularQuestion)
router.patch("/industrial-management-question/:_id", industrialManagementQuestionController.updateParticularQuestion)
router.delete("/industrial-management-quesiton" , industrialManagementQuestionController.deleteAllQuestion)


module.exports = router;