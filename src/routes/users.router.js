const express = require("express");

const { usersController } = require("../controllers");

const usersRouter = express.Router();

usersRouter.post("/signIn", usersController.signIn);

module.exports = {
  usersRouter,
};
