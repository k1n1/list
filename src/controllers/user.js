const { getUserList } = require("../db/queries/user");
const { changeGender, getAgeGroup } = require("../helpers/user");

module.exports.userList = async (req, res) => {
  const { limit = 10, currentPage = 1, q = "" } = req.query;
  const { searchQuary, sort, filter } = req;
  const skip = (Number(+currentPage) - 1) * Number(+limit);

  const list = await getUserList(
    searchQuary,
    sort,
    Number(limit),
    filter,
    skip
  );

  let userList = list[0].list;
  userList = changeGender(userList);
  userList = getAgeGroup(userList);

  res.status(200).json({
    message: "List Display sucessufully",
    list: {
      totalPage: Math.ceil(list[0].total[0].count / Number(+limit)), // Date reange filter not possible
      totalRecord: list[0].total[0].count,
      currentPage: Number(currentPage),
      pageLimit: Number(limit),
      list: userList,
    },
  });
};
