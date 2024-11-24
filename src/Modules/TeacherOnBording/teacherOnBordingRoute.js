const { verifyToken } = require('../../Utils/utils');
const  teacheronbordingCtrl= require('./teacherOnBordingCtrl')

const router = require('express').Router();

router.post("/create" , teacheronbordingCtrl.create)
router.post("/verify",verifyToken, teacheronbordingCtrl.verifyEmail);


const teacherOnBordingRouter = router

module.exports= {teacherOnBordingRouter}