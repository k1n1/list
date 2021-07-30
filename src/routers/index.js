const Router = require("express").Router();
const { index } = require("../controllers");
Router.get("/", index);
module.exports = Router;
