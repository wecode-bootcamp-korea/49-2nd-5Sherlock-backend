const express = require("express");

const {usersController} = require("../controllers");
const { validateToken } = require("../middleware/auth");

const usersRouter = express.Router();

usersRouter.post("/signUp", usersController.signUp);

usersRouter.post("/signIn", usersController.signIn);

module.exports = {
  usersRouter,
};
