const { usersService } = require("../services");

const signUp = async (req, res) => {
    try {
      const { password, email, name, phoneNumber } = req.body;
      const complete = await userService.signUp(name, email, password, phoneNumber)

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

  module.exports = {
    signUp
  };
  

