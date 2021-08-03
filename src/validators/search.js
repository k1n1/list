const { createSearch } = require("../helpers/serchRegex");
const { isStringValid } = require("../helpers/isStringValid");
const isFieldValid = ["fullName", "hospitalName", "phoneNo"];
const search = (req, res, next) => {
  const { q = "" } = req.query;
  const validString = isStringValid(q, true);
  if (!validString) {
    res.status(400).json({
      message: "invalid quary string",
      field: "q",
    });
    return;
  }
  const quary = createSearch(isFieldValid, validString);
  req.searchQuary = quary;
  return next();
};

module.exports = { search };
