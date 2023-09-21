const { usersService } = require("../services");

const signUp = async (req, res) => {
    try {
      const { password, email, name, phoneNumber } = req.body;
      const complete = await usersService.signUp(name, email, password, phoneNumber)

      return res.status(201).json({
        message: "userCreated"
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  };


  
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await usersService.signIn(email, password);
    res.status(200).json({
      message: "signInSuccess",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).json({
      message: error.message,
    });
  }
};


module.exports = {
  signIn,
  signUp,
};

