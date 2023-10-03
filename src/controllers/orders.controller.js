const { ordersService } = require("../services");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      receiverName,
      receiverAddress,
      defaultAddress = false,
      receiverPhoneNumber,
      payment,
      status = 1,
    } = req.body;
    const orderList = await ordersService.createOrder(
      userId,
      products,
      receiverName,
      receiverAddress,
      defaultAddress,
      receiverPhoneNumber,
      payment,
      status
    );
    res.status(200).json({
      message: "orderSuccess",
      data: orderList,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: "안돼" });
  }
};

// const deleteOrder = async (req, res) => {
//   try {
//     res.status(200).json({
//       message: "querySuccess",
//       data: reviews,
//       reviewsCount: count,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(error.status).json({ message: error.message });
//   }
// };

module.exports = {
  createOrder,
};
