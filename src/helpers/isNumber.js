const isNumber = (number) => {
  if (typeof number == "number") return true;
  if (Number(number)) return true;
  else return false;
};

module.exports = { isNumber };
