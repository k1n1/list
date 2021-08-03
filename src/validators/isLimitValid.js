const { isNumber } = require("../helpers/isNumber");
const isLimitValid = (req, res, next) => {
  const { limit = 10 } = req.query;
  if (!isNumber(limit)) {
    res.status(400).json({
      message: "Limit is not valid",
      field: "limit",
    });
    return;
  }
  return next();
};

module.exports = { isLimitValid };
