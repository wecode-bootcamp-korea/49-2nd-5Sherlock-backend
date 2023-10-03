const { ordersModel } = require("../models");
const { throwError } = require("../utils/throwError");

const createOrder = async (
  userId,
  products,
  receiverName,
  receiverAddress,
  defaultAddress,
  receiverPhoneNumber,
  payment,
  status
) => {
  const orderList = await ordersModel.createOrder(
    userId,
    products,
    receiverName,
    receiverAddress,
    defaultAddress,
    receiverPhoneNumber,
    payment,
    status
  );

  // if (!productId) {
  //   throwError(403, "CONTENT_NOT_FOUND");
  // }

  return orderList;
};

module.exports = {
  createOrder,
};
