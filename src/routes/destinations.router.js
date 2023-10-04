const express = require("express");

const {destinationsController} = require("../controllers");

const destinationsRouter = express.Router();

destinationsRouter.get("/getDestination", destinationsController.getAddress);
destinationsRouter.post("/createDestination", destinationsController.createAddress);


module.exports = {
  destinationsRouter,
};
