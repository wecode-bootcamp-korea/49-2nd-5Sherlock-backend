
const express = require("express");

const router = express.Router();

const { usersRouter } = require("./users.router");
const { productRouter } = require("./product.router");

router.use("/users", usersRouter); 
router.use("/products", productRouter);

module.exports = { router };

