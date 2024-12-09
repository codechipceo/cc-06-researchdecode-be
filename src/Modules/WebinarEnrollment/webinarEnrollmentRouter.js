const {verifyToken} = require("../../Utils/utils");
const WebinarEnrollmentsCtrl = require("./webinarEnrollmentCtrl")

const router = require("express").Router();

router.post("/enroll", verifyToken, WebinarEnrollmentsCtrl.create);

const webinarEnrollmentRouter = router;
module.exports = webinarEnrollmentRouter;