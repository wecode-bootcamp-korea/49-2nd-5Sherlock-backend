const express = require("express");

const {destinationsController} = require("../controllers");

const destinationsRouter = express.Router();

const { validateToken } = require("../middleware/auth");

destinationsRouter.get("/getDestination", validateToken, destinationsController.getAddress);

destinationsRouter.post("/createDestination", validateToken, destinationsController.createAddress);

module.exports = {
  destinationsRouter,
};
