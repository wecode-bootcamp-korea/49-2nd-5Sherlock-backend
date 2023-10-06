const throwError = (statusCode, message) => {
  const error = new Error(message);
  error.status = statusCode;
  throw error;
};

module.exports = {
  throwError,
};
