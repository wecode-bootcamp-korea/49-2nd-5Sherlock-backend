const { usersService } = require("../services");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.signIn(email, password);
    res.status(200).json({
      message: "signInSuccess",
      data: {
        token: token
      },
    });
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({
      message: error.message
    });
  }
};

module.exports = {
  signIn,
};
