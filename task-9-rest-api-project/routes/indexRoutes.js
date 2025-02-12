const express = require("express");
const routes = express.Router();

routes.use("/admin", require('./adminRoutes'));
routes.use("/user", require('./userRoutes'));

module.exports = routes;