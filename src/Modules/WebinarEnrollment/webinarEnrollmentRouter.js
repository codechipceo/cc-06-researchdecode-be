const {verifyToken} = require("../../Utils/utils");
const WebinarEnrollmentsCtrl = require("./webinarEnrollmentCtrl")

const router = require("express").Router();

router.post("/enroll", verifyToken, WebinarEnrollmentsCtrl.create);
router.post("/myEnrollments", verifyToken, WebinarEnrollmentsCtrl.getById);
router.post("/unenroll", verifyToken,  WebinarEnrollmentsCtrl.delete);

const webinarEnrollmentRouter = router;
module.exports = webinarEnrollmentRouter;