// const contacts = require("../models/contacts");
const { Contacts } = require("../schemas/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contacts.find({ owner }, "name email phone", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndDelete(contactId);
  if (!result) {
    throw new HttpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contacts.create({ ...req.user, ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new HttpError(404, "not found");
  res.json(result);
};

module.exports = {
  getContactsWr: ctrlWrapper(getContacts),
  getContactByIdWr: ctrlWrapper(getContactById),
  removeContactWr: ctrlWrapper(removeContact),
  addContactWr: ctrlWrapper(addContact),
  updateContactWr: ctrlWrapper(updateContact),
  updateStatusContactWr: ctrlWrapper(updateStatusContact),
};
