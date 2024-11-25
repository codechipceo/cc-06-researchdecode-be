const { verifyToken } = require('../../Utils/utils');
const  teacheronboardingCtrl= require('./teacherOnBoardingCtrl')

const router = require('express').Router();

router.post("/create" , teacheronboardingCtrl.create)
router.post("/acceptorreject" , verifyToken ,teacheronboardingCtrl.acceptOrReject)
router.post("/verify",verifyToken, teacheronboardingCtrl.verifyEmail);


const teacherOnBoardingRouter = router

module.exports= {teacherOnBoardingRouter}