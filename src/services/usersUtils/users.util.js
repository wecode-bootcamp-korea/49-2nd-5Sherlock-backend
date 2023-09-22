const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { usersModel } = require("../../models");
const { throwError } = require("../../utils/throwError");

function validateEmailInput(email) {
  const regExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regExp.test(email)) {
    throwError(400, "INVALID_EMAIL");
  }
}

function validatePasswordInput(password) {
  const hasNumber = /[\d]/;
  const hasWord = /[\w]/;
  const hasSpecial = new RegExp("[.@!#$%&'*+-/=?^_`{|}~]");
  if (
    !hasNumber.test(password) ||
    !hasWord.test(password) ||
    !hasSpecial.test(password) ||
    password.length < 8
  ) {
    throwError(400, "INVALID_PASSWORD");
  }
}

async function checkExistingUserByEmail(email) {
  const user = await usersModel.getUserByEmail(email);
  return user;
}

async function checkExistingUserById(userId) {
  const user = await usersModel.getUserById(userId);
  return user;
}

async function checkCorrectPassword(passwordInput, correctPassword) {
  console.log(passwordInput, correctPassword);
  const isPasswordCorrect = await bcrypt.compare(
    passwordInput,
    correctPassword
  );
  if (!isPasswordCorrect) {
    throwError(400, "INVALID_INPUT");
  }
}

function generateToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY);
}

module.exports = {
  generateToken,
  checkCorrectPassword,
  checkExistingUserByEmail,
  validateEmailInput,
  validatePasswordInput,
  checkExistingUserById,
};
