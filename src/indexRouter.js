const{profileRouter}=require("./Modules/Profiles/profileRouter")
const { subjectRouter } = require("./Modules/Subject/subjectRouter")
const { teacherRouter } = require("./Modules/Teachers/teacherRouter")


const adminRouter = require('express').Router()
const userRouter = require('express').Router()

// ADMIN ROUTES
adminRouter.use("/profile", profileRouter)
adminRouter.use("/subject", subjectRouter)
adminRouter.use("/teacher", teacherRouter)





// USER ROUTES




module.exports= {adminRouter, userRouter}