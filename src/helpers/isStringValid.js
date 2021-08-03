const isStringValid = (str, decode = false) => {
  if (!typeof str == "string") return false;
  if (!decode) return str;
  return decodeURI(str);
};

module.exports = { isStringValid };
