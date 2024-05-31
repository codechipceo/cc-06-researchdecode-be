const studentCtrl = require('./studentCtrl')

const router = require('express').Router();

router.post("/create" , studentCtrl.create)
router.post("/getAll" , studentCtrl.getAll)
router.post("/getUser" , studentCtrl.getById)
router.post("/delete" , studentCtrl.delete)
router.post("/update" , studentCtrl.update)
router.post("/signIn" , studentCtrl.signIn)
router.post("/verify", studentCtrl.verifyEmail);

const studentRouter = router

module.exports= {studentRouter}