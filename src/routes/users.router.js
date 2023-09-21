const express = require("express");

const {usersController} = require("../controllers");

const usersRouter = express.Router();

usersRouter.post("/signUp", usersController.signUp);

module.exports = {
  usersRouter,
};