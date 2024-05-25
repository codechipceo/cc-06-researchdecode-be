const { assignmentRouter } = require("./Assignments/assignmentRouter");
const { courseRouter } = require("./Courses/courseRouter");
const { profileRouter } = require("./Profiles/profileRouter");
const { researchPaperRouter } = require("./ResearchPapers/researchPaperRouter");
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
adminRouter.use("/assignment",assignmentRouter );

// USER ROUTES

module.exports = { adminRouter, userRouter };
