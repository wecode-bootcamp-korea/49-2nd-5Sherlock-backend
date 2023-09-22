const { checkEmptyValues } = require("../utils/checkEmptyValues");
const {
  checkExistingUserByEmail,
  checkCorrectPassword,
  generateToken,
} = require("./usersUtils/users.util");

const signIn = async (email, password) => {
  checkEmptyValues(email, password);

  const user = await checkExistingUserByEmail(email);
  if (!user) {
    throwError(404, "USER_NOT_FOUND");
  }
  await checkCorrectPassword(user.password, password);

  return generateToken(user.id);
};

module.exports = {
  signIn,
};
