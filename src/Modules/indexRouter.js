const { verifyToken } = require("../Utils/utils");
const { assignmentRouter } = require("./Assignments/assignmentRouter");
const { chatRouter } = require("./Chats/ChatRouter");
const consultancyRouter = require("./Consultancy/consultancyRouter");
const consultancyCardRouter = require("./ConsultancyCard/consultancyCardRouter");
const courseEnrollmentRouter = require("./CourseEnrollment/courseEnrollmentRouter");
const { courseRouter } = require("./Courses/courseRouter");
const { paperRequestRouter } = require("./PaperRequest/paperRequestRouter");
const { profileRouter } = require("./Profiles/profileRouter");
const { researchPaperRouter } = require("./ResearchPapers/researchPaperRouter");
const { studentRouter } = require("./Students/studentRouter");
const { subjectRouter } = require("./Subject/subjectRouter");
const { teacherRouter } = require("./Teachers/teacherRouter");
const { videoRouter } = require("./Videos/videoRouter");
const { labsRouter } = require("./Labs/labsRouter");
const {
  collaborationRequestRouter,
} = require("./Collaboration/collaborationRouter");
const { teacherOnBoardingRouter } = require("./TeacherOnBording/teacherOnBoardingRoute");
const { webinarRouter } = require("./Webinars/webinarRouter");
const webinarEnrollmentRouter = require("./WebinarEnrollment/webinarEnrollmentRouter");

const adminRouter = require("express").Router();
const userRouter = require("express").Router();

// ADMIN ROUTES
adminRouter.use("/profile", profileRouter);
adminRouter.use("/subject", subjectRouter);
adminRouter.use("/teacher", teacherRouter);
adminRouter.use("/course", verifyToken, courseRouter);
adminRouter.use("/video", verifyToken, videoRouter);
adminRouter.use("/researchPaper", researchPaperRouter);
adminRouter.use("/assignment", assignmentRouter);
adminRouter.use("/consultancyCard", consultancyCardRouter);
adminRouter.use("/consultancy", consultancyRouter);
adminRouter.use("/labs", labsRouter);
adminRouter.use("/teacheronboarding", teacherOnBoardingRouter);
adminRouter.use("/webinar",verifyToken, webinarRouter);
adminRouter.use("/webinarEnrollment",verifyToken, webinarEnrollmentRouter);

// USER ROUTES
userRouter.use("/paperRequest", paperRequestRouter);
userRouter.use("/student", studentRouter);
userRouter.use("/course", courseRouter);
userRouter.use("/chats", chatRouter);
userRouter.use("/video", videoRouter);
userRouter.use("/teacher", teacherRouter);
userRouter.use("/consultancyCard", consultancyCardRouter);
userRouter.use("/consultancy", consultancyRouter);
userRouter.use("/courseEnrollment", verifyToken, courseEnrollmentRouter);
userRouter.use("/labs", labsRouter);
userRouter.use("/collaboration", collaborationRequestRouter);
userRouter.use("/teacheronboarding",teacherOnBoardingRouter)
module.exports = { adminRouter, userRouter };
