const { ordersModel, usersModel, productsModel, destinationsModel } = require("../models");
const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { throwError } = require("../utils/throwError");

const createOrder = async (
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
) => {
  const orderId = await ordersModel.createOrder(
    userId,
    customerName,
    customerEmail,
    customerPhoneNumber,
    shipperName,
    receiverName,
    receiverAddress,
    receiverPhoneNumber,
    payment,
    status,
    shippingMessage
  );
  if (cart == 1) {
    for (let i = 0; products.length > i; i++) {
      const { productId, quantity } = products[i];
      await ordersModel.saveOrderedGoodsTableByCarts(
        productId,
        quantity,
        userId,
        orderId
      );
      const cartQuantity = await ordersModel.checkCartQuantity(
        userId,
        productId
      );
      if (cartQuantity && cartQuantity[0].quantity == quantity) {
        await ordersModel.deleteCartsTable(userId, productId);
      } else {
        await ordersModel.modifyCartsTable(quantity, userId, productId);
      }
    }
  } else if (cart == "" || cart == undefined) {
    const { productId, quantity } = products[0];
    await ordersModel.saveOrderedGoodsTable(productId, quantity, orderId);
  }

  if (defaultAddress == true) {
    const destinationId = await ordersModel.saveDestination(
      receiverAddress,
      addressName,
      receiverName,
      receiverPhoneNumber,
      userId
    );
    await ordersModel.saveDefaultDestination(destinationId, userId);
  }

  const result = await ordersModel.orderList(orderId);
  return result;
};

const checkoutOrder = async (userId, items) => {
  checkEmptyValues(userId, ...items);

  // is user exists
  const user = await usersModel.getUserOrderData(userId);

  if (!user) throwError(404, "USER_NOT_FOUND");

  const defaultDestination = await destinationsModel.getDefaultAddress(userId);

  const ids = [];
  const quantities = [];
  items.map(item => {
    ids.push(item.id);
    quantities.push(item.quantitiy);
  });

  // are products exist
  const products = await productsModel.getProductsByIds(ids);

  if (products.length !== ids.length) throwError(404, "CONTENT_NOT_FOUND");

  products.map(product => {
    if (product.stockQuantity === 0) throwError(400, "CONTENT_NOT_FOUND");
  });
  
  // get item  info
  products.map(product => {
    product.quantity = quantities[ids.indexOf(product.id)];
  });

  return {
    ...user,
    ...defaultDestination,
    products: products,
  };
};

module.exports = {
  createOrder,
  checkoutOrder,
};
