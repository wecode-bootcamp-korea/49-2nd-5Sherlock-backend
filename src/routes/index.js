const express = require("express");

const { productsRouter } = require("./products.router");
const { usersRouter } = require("./users.router");

const router = express.Router();
router.use("/products", productsRouter);
router.use("/users", usersRouter); 

module.exports = { router };
