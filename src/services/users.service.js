
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { checkEmptyValues } = require("../utils/checkEmptyValues");
const {
  checkExistingUser,
  checkCorrectPassword,
  generateToken,
} = require("./usersUtils/users.util");
const { usersModel } = require("../models");

const signUp = async (name, email, password, phoneNumber) => {

  if (
    name === undefined ||
    email === undefined ||
    password === undefined ||
    phoneNumber === undefined
    ) {
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      throw error;
    }
    //existingUser 선언 후 값 넣기
    const existingUser = await usersModel.getUserByEmail(email);
    
    if (existingUser) {
      const error = new Error("DUPLICATED_EMAIL_ADDRESS");
      error.statusCode = 400;
      throw error;
    }
    
    if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(email)) {
      const error = new Error("INVALID_EMAIL");
      error.statusCode = 400;
      throw error;
    }
    
    if (!/^[.@!#$%&'*+-/=?^_`{|}~\w\d]{9,}$/.test(password)) {
      const error = new Error("INVALID_PASSWORD");
      error.statusCode = 400;
      throw error;
      }
    
    if (!/^01\d{9,10}$/.test(phoneNumber)) {
      const error = new Error("INVALID_INPUT");
      error.statusCode = 400;
      throw error;
    }
    
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    const usermodelData = await usersModel.createUser(
      name,
      email,
      hashedPw,
      phoneNumber
    );
  };

const signIn = async (email, password) => {
  checkEmptyValues(email, password);

  const user = await checkExistingUser(email);
  console.log(user);

  await checkCorrectPassword(password, user.password);

  return generateToken(user.id);

}

module.exports = {
  signIn,
  signUp,
};
