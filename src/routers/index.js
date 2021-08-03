const Router = require("express").Router();
const { index } = require("../controllers");
const { userList } = require("../controllers/user");
const { search } = require("../validators/search");
const { sort } = require("../validators/sort");
const { filter } = require("../validators/filtter");
const { isLimitValid } = require("../validators/isLimitValid");

Router.get("/", index);
Router.get("/user", search, sort, filter, isLimitValid, userList);

module.exports = Router;
