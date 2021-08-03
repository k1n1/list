const isAgeRangeValid = (date) => {
  const dates = date.split(",");
  if (dates.length !== 2) return false;
  if (dates[0] < 17 || dates[1] < 17) return false;
  return true;
};

module.exports = { isAgeRangeValid };
