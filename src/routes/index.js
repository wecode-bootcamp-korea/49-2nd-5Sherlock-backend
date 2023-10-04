const express = require("express");

const { usersRouter } = require("./users.router");
const { productsRouter } = require("./products.router");
const { destinationsRouter } = require("./destinations.router");

const router = express.Router();

router.use("/users", usersRouter); 
router.use("/products", productsRouter); 
router.use("/destinations", destinationsRouter);

module.exports = { router };


