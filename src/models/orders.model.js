const { AppDataSource } = require("./data-source");

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
  // 첫 번째 쿼리 실행
  const addOrder = await AppDataSource.query(`
    INSERT INTO orders (user_id, receiver_name, receiver_phone_number, address, payment, status)
    VALUES (${userId}, "${receiverName}","${receiverPhoneNumber}","${receiverAddress}","${payment}",${status});
  `);

  // 두 번째 쿼리 실행
  const getOrderId = await AppDataSource.query(
    `SELECT LAST_INSERT_ID() as order_id;`
  );
  const orderId = getOrderId[0].order_id;

  // 세 번째 쿼리 및 네 번째 쿼리 실행
  for (let i = 0; i < products.length; i++) {
    const { productId, quantity } = products[i];
    console.log("productId:", productId);
    console.log("userId:", userId);
    console.log("quantity", quantity);
    console.log("orderId:", orderId);

    await AppDataSource.query(
      `
      INSERT INTO ordered_goods (order_id, product_id, quantity)
      SELECT
        ${orderId} as order_id,
        "${productId}" as product_id,
        "${quantity}" as quantity
      FROM
        carts
      WHERE
        user_id = ${userId} AND
        product_id = ${productId};
    `
    );

    const cartQuantity = await AppDataSource.query(
      `
      SELECT quantity FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
    `
    );

    if (cartQuantity[0].quantity == quantity) {
      await AppDataSource.query(
        `
        DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
      `
      );
    } else {
      await AppDataSource.query(
        `
      UPDATE carts SET quantity= quantity - ${quantity} WHERE user_id = ${userId} AND product_id = ${productId} 
    `
      );
    }
  }
  // 다섯 번째 쿼리 실행
  if (defaultAddress == true) {
    await AppDataSource.query(`
      INSERT INTO users (default_destination) VALUES ("${receiverAddress}");
    `);
  }

  const orderList = await AppDataSource.query(
    `SELECT * FROM orders WHERE ${orderId}`
  );
  return orderList;
};

module.exports = {
  createOrder,
};
