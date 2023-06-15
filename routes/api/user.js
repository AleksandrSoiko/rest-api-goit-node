const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const schemas = require("../../schemas/signupJoiSchema");
const schema = require("../../schemas/signupJoiSchema");

const { authenticate, validateBody } = require("../../middlewares");
const upload = require("../../middlewares/upload");

router.post(
  "/register",
  validateBody(schemas.signupSchema, "missing required field"),
  ctrl.register
);
router.get("/verify/:verificationToken", ctrl.verifyWr);

router.post("/verify", validateBody(schema.emailSchema), ctrl.resendVerify);

router.post(
  "/login",
  validateBody(schemas.signupSchema, "missing required field"),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
