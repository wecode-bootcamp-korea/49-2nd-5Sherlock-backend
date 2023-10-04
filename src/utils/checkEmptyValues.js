const { throwError } = require("./throwError");

function checkEmptyValues() {
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i]) {
      throwError(400, "KEY_ERROR");
    }
  }
}

module.exports = {
  checkEmptyValues,
};
