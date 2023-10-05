const { ordersService } = require("../services");

const createOrder = async (req, res) => {
  try {
    const { cart } = req.query;
    const { userId } = req;
    const {
      products,
      customerName,
      customerEmail,
      customerPhoneNumber,
      shipperName,
      receiverName,
      receiverAddress,
      addressName = "기본배송지",
      defaultAddress = false,
      receiverPhoneNumber,
      payment,
      status = 1,
    } = req.body;
    const orderList = await ordersService.createOrder(
      userId,
      products,
      customerName,
      customerEmail,
      customerPhoneNumber,
      shipperName,
      receiverName,
      receiverAddress,
      addressName,
      defaultAddress,
      receiverPhoneNumber,
      payment,
      status,
      cart
    );

    res.status(200).json({
      message: "orderSuccess",
      data: orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: "Failed order" });
  }
};

module.exports = {
  createOrder,
};
