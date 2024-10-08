const { verifyToken } = require("../../Utils/utils");
const studentCtrl = require("./studentCtrl");

const router = require("express").Router();

router.post("/create", studentCtrl.create);
router.post("/getAll", studentCtrl.getAll);
router.post("/getUser", studentCtrl.getById);
router.post("/delete", studentCtrl.delete);
router.post("/update", studentCtrl.update);
router.post("/signIn", studentCtrl.signIn);
router.post("/verify", verifyToken, studentCtrl.verifyEmail);
// router.post("/upload", studentCtrl.uploadStudentFile);

router
  .route("/:StudentId/lab")
  .get(studentCtrl.getStudentLab)
  .put(studentCtrl.addLabsToStudent);
const studentRouter = router;

module.exports = { studentRouter };
