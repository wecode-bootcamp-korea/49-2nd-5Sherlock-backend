const express = require("express");

const { productsRouter } = require("./products.router");
const { cartsRouter } = require("./carts.router");
const { usersRouter } = require("./users.router");

const router = express.Router();
router.use("/products", productsRouter);
router.use("/users", usersRouter); 
router.use("/carts", cartsRouter);

module.exports = { router };
