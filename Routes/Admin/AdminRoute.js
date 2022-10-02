const router = require('express').Router();
const adminController = require("../../controllers/adminController")


router.get("/admin/:userId", adminController.getParticularAdmin)
router.post("/admin", adminController.registerAdmin)
router.get("/admin", adminController.getAllAdminDetails)
router.delete("/admin/:_id", adminController.deleteParticularAdmin)
router.patch("/admin/:_id", adminController.updateParticularAdmin)
router.post("/admin-login" , adminController.adminLogIn)

module.exports = router;