const { assignmentRouter } = require("./Assignments/assignmentRouter");
const { courseRouter } = require("./Courses/courseRouter");
const {paperRequestRouter} = require("./PaperRequest/paperRequestRouter");
const { profileRouter } = require("./Profiles/profileRouter");
const { researchPaperRouter } = require("./ResearchPapers/researchPaperRouter");
const { studentRouter } = require("./Students/studentRouter");
const { subjectRouter } = require("./Subject/subjectRouter");
const { teacherRouter } = require("./Teachers/teacherRouter");
const { videoRouter } = require("./Videos/videoRouter");

const adminRouter = require("express").Router();
const userRouter = require("express").Router();

// ADMIN ROUTES
adminRouter.use("/profile", profileRouter);
adminRouter.use("/subject", subjectRouter);
adminRouter.use("/teacher", teacherRouter);
adminRouter.use("/course", courseRouter);
adminRouter.use("/video", videoRouter);
adminRouter.use("/researchPaper", researchPaperRouter);
adminRouter.use("/assignment", assignmentRouter);



// USER ROUTES
userRouter.use("/paperRequest", paperRequestRouter);
userRouter.use("/student",studentRouter)
module.exports = { adminRouter, userRouter };
