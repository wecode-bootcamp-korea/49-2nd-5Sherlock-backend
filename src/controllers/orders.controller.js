const { ordersService } = require("../services");

const createOrder = async (req, res) => {
  try {
    const { userId } = req;
    const {
      cart,
      products,
      customerName,
      customerEmail,
      customerPhoneNumber,
      shipperName,
      receiverName,
      receiverAddress,
      addressName = "기본배송지",
      defaultAddress = false,
      shippingMessage = null,
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
      shippingMessage,
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

const checkoutOrder = async (req, res) => {
  try {
    const { cart, ...itemsQuery } = req.query;
    const items = JSON.parse(itemsQuery.items);
    const data = await ordersService.checkoutOrder(req.userId, items);
    res.status(200).json({
      message: "querySuccess",
      data: data,
    });

  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: "Failed order" });
  }
};

module.exports = {
  createOrder,
  checkoutOrder,
};
