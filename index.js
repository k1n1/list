const express = require("express");
const app = express();
const route = require("./src/routers");
const PORT = process.env.PORT || 3000;

MongoDB = module.exports = require("./src/db");
app.use(express.json());
app.use(route);

app.listen(PORT, () => console.log(`Server run At PORT ${PORT}`));
