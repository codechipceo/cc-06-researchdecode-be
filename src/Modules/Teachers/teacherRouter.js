const { verifyToken } = require('../../Utils/utils');
const teacherCtrl = require('./teacherCtrl')

const router = require('express').Router();

router.post("/create" , teacherCtrl.create)
router.post("/getAll" , teacherCtrl.getAll)
router.post("/getById" , teacherCtrl.getById)
router.post("/delete" , teacherCtrl.delete)
router.post("/update" , teacherCtrl.update)
router.post("/sigIn" , teacherCtrl.signIn)
router.post("/verify" , verifyToken,teacherCtrl.verifyEmail)
const teacherRouter = router

module.exports= {teacherRouter}