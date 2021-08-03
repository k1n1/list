const createSearch = (fields, q) => {
  const searchQuary = [];
  fields.forEach((e, i) => {
    const createq = {};
    createq[e] = { $regex: q, $options: "i" };
    searchQuary.push(createq);
  });
  return searchQuary;
};

module.exports = { createSearch };
