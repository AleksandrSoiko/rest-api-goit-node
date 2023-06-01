const express = require("express");
const contactsRouter = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

contactsRouter.get("/", authenticate, ctrl.getContactsWr);

contactsRouter.get("/:contactId", authenticate, ctrl.getContactByIdWr);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, "missing required name field"),
  ctrl.addContactWr
);

contactsRouter.delete("/:contactId", authenticate, ctrl.removeContactWr);

contactsRouter.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.updateSchema, "incorrect data"),
  ctrl.updateContactWr
);

contactsRouter.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.favoriteSchema, "missing field favorite"),
  ctrl.updateStatusContactWr
);

module.exports = contactsRouter;
