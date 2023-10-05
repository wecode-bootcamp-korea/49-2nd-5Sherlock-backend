
const { destinationsModel, usersModel } = require("../models");
const { throwError } = require("../utils/throwError");

const getAddress = async (userId) => {
    if (!userId) {
        throwError(400, "KEY_ERROR");
    }

    const data = await destinationsModel.getAddress(userId);
    return data;
}

const createAddress = async (address,addressName,receiverName,receiverPhoneNumber,userId) => {
    if (!address || !addressName || !receiverName || !receiverPhoneNumber || !userId) {
        throwError(400, "KEY_ERROR");
    }

    const user = await usersModel.getUserById(userId);
    if (!user) {
        throwError(404, "USER_NOT_FOUND");
    }

    await destinationsModel.createAddress(address,addressName,receiverName,receiverPhoneNumber,userId);
}


module.exports = {
    getAddress,
    createAddress,
  };
