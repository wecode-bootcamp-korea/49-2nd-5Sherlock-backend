const express = require("express");

const { usersRouter } = require("./users.router");
const { productsRouter } = require("./products.router");
const { cartsRouter } = require("./carts.router");

const router = express.Router();

router.use("/users", usersRouter); 
router.use("/products", productsRouter); 
router.use("/carts", cartsRouter);

module.exports = { router };

