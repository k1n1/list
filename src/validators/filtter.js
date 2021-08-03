const { isNumber } = require("../helpers/isNumber");
const { isAgeRangeValid } = require("../helpers/isAgeRangeValid");

const filter = (req, res, next) => {
  const { gender, vaccineCode, hospitalCode, ageRange } = req.query;
  const filterFields = {};

  if (gender) {
    if (gender == "M" || gender == "F") {
      filterFields["gender"] = gender;
    } else {
      res.status(400).json({
        message: "invalid Gender value",
        field: "gender",
      });
      return;
    }
  } else if (vaccineCode) {
    if (isNumber(vaccineCode)) {
      filterFields["vaccinations.code"] = Number(vaccineCode);
    } else {
      res.status(400).json({
        message: "invalid vaccinations code value",
        field: "vaccineCode",
      });
      return;
    }
  } else if (hospitalCode) {
    if (isNumber(hospitalCode)) {
      filterFields["lastHospitalCode"] = Number(hospitalCode);
    } else {
      res.status(400).json({
        message: "invalid Hospital code value",
        field: "HospitalCode",
      });
      return;
    }
  } else if (ageRange) {
    if (isAgeRangeValid(ageRange)) {
      res.status(400).json({
        message: "invalid Age Range value",
        field: "ageRange",
      });
      return;
    }
    const dates = ageRange.split(",");
    const stateDate = Number(dates[0]);
    const endDate = Number(dates[1]);
    const data = [
      {
        age: {
          $gte: stateDate,
        },
      },
      {
        age: {
          $lte: endDate,
        },
      },
    ];
    filterFields["$and"] = data;
  }

  req.filter = filterFields;
  return next();
};

module.exports = { filter };
