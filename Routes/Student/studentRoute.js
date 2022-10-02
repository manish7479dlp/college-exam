const router = require('express').Router();
const studentController = require("../../controllers/studentController")


router.get("/student/:universityRoll", studentController.getParticularStudent)
router.post("/student", studentController.registerStudent)
router.get("/student", studentController.getAllStudentDetails)
router.delete("/student/:_id", studentController.deleteParticularStudent)
router.patch("/student/:_id", studentController.updateParticularStudent)
router.post("/student-login" , studentController.studentLogIn)

module.exports = router;