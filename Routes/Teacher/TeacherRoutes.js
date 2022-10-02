const router = require('express').Router();
const teacherController = require("../../controllers/teacherController")


router.get("/teacher/:userId", teacherController.getParticularTeacher)
router.post("/teacher", teacherController.registerTeacher)
router.get("/teacher", teacherController.getAllTeacherDetails)
router.delete("/teacher/:_id", teacherController.deleteParticularTeacher)
router.patch("/teacher/:_id", teacherController.updateParticularTeacher)
router.post("/teacher-login" , teacherController.teacherLogIn)

module.exports = router;