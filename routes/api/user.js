const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const schemas = require("../../schemas/user");
const { authenticate, validateBody } = require("../../middlewares");

router.post(
  "/register",
  validateBody(schemas.signupSchema, "missing required field"),
  ctrl.register
);

router.post(
  "/login",
  validateBody(schemas.signupSchema, "missing required field"),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
