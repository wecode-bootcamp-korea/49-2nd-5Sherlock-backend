const { checkEmptyValues } = require("../utils/checkEmptyValues");
const {checkExistingUser, checkCorrectPassword, generateToken} = require("./usersUtils/users.util");

const signIn = async (email, password) => {
  checkEmptyValues(email, password);

  const user = await checkExistingUser(email);

  await checkCorrectPassword(user.password, password);

  return generateToken(user.id);
};

module.exports = {
  signIn,
};
