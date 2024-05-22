const { courseRouter } = require("./Courses/courseRouter")
const{profileRouter}=require("./Profiles/profileRouter")
const { subjectRouter } = require("./Subject/subjectRouter")
const { teacherRouter } = require("./Teachers/teacherRouter")


const adminRouter = require('express').Router()
const userRouter = require('express').Router()

// ADMIN ROUTES
adminRouter.use("/profile", profileRouter)
adminRouter.use("/subject", subjectRouter)
adminRouter.use("/teacher", teacherRouter)
adminRouter.use("/course", courseRouter);





// USER ROUTES




module.exports= {adminRouter, userRouter}