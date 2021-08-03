const sort = (req, res, next) => {
  const sortValid = ["age", "date"];
  const sortOrder = ["ASC", "DESC"];
  const { sort = "date.ASC" } = req.query;
  const sortParams = sort.split(".");
  if (!sortValid.includes(sortParams[0]))
    res.status(400).json({ message: "Please provide valid sort fiels" });
  if (!sortOrder.includes(sortParams[1]))
    res.status(400).json({ message: "Please provide valid sort Order" });
  const sortOrd = {};
  sortOrd[sortParams[0] == "date" ? "vaccinations.date" : sortParams[0]] =
    sortParams[1] == "ASC" ? 1 : -1;
  req.sort = sortOrd;
  return next();
};

module.exports = { sort };
