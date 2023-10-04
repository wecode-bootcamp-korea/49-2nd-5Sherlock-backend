const { destinationsService } = require("../services");

const getAddress = async (req, res) => {
    try {
      const userId  = req.userId;
      const destinations = await destinationsService.getAddress(userId)

      return res.status(201).json({
        message: "querySuccess",
        data: destinations
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  };

  const createAddress = async (req, res) => {
    try {
      const { address,addressName,receiverName,receiverPhoneNumber } = req.body;
      const userId  = req.userId;
      await destinationsService.createAddress(address,addressName,receiverName,receiverPhoneNumber,userId);

      return res.status(201).json({
        message: "addressCreated"
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  };

  module.exports = {
    getAddress,
    createAddress,
  };
   
