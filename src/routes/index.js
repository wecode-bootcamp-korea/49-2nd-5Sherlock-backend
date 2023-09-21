const express = require("express");

const { productRouter } = require("./productRouter");

const routes = express.Router();
routes.use("/product", productRouter);

module.exports = {
  routes,
};
