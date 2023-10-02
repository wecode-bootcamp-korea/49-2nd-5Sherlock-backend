const express = require("express");

const { usersRouter } = require("./users.router");
const { productsRouter } = require("./products.router");

const router = express.Router();

router.use("/users", usersRouter); 
router.use("/products", productsRouter); 

module.exports = { router };


