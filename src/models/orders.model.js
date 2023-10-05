const { AppDataSource } = require("./data-source");

const createOrder = async (
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
) => {
  // order 테이블에 주문내역 저장
  const addOrder = await AppDataSource.query(`
    INSERT INTO orders 
    (
      user_id,
       receiver_name, 
       receiver_phone_number, 
       address, 
       payment, 
       status, 
       customer_name, 
       customer_email, 
       customer_Phone_Number, 
       shipper_name,
       shipping_message)
    VALUES 
    (
      ${userId}, 
      "${receiverName}",
      "${receiverPhoneNumber}",
      "${receiverAddress}",
      "${payment}",
      "${status}",
      "${customerName}",
      "${customerEmail}",
      "${customerPhoneNumber}",
      "${shipperName}",
      "${shippingMessage}");
  `);

  const orderId = addOrder.insertId;
  return orderId;
};
// 장바구니에 있는 내용 ordered_goods 테이블로 저장
const saveOrderedGoodsTableByCarts = async (
  productId,
  quantity,
  userId,
  orderId
) => {
  await AppDataSource.query(
    `
          INSERT INTO ordered_goods (order_id, product_id, quantity)
          SELECT
            ${orderId} as order_id,
            ${productId} as product_id,
            ${quantity} as quantity
          FROM
            carts
          WHERE
            user_id = ${userId} AND
            product_id = ${productId};
        `
  );
};

//카트가 아닌경우 한개씩 받은 값으로 넣기
const saveOrderedGoodsTable = async (productId, quantity, orderId) => {
  await AppDataSource.query(
    `INSERT INTO ordered_goods (order_id, product_id, quantity) 
    VALUES (
            ${orderId}, 
            ${productId}, 
            ${quantity})`
  );
};

const checkCartQuantity = async (userId, productId) => {
  const result = await AppDataSource.query(
    `
  SELECT quantity FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
`
  );
  return result;
};
//carts 테이블 행 삭제
const deleteCartsTable = async (userId, productId) => {
  await AppDataSource.query(
    `
        DELETE FROM carts WHERE user_id = ${userId} AND product_id = ${productId};
      `
  );
};

//carts 테이블 quantity 수정
const modifyCartsTable = async (quantity, userId, productId) => {
  await AppDataSource.query(
    `
      UPDATE carts SET quantity= quantity - ${quantity} WHERE user_id = ${userId} AND product_id = ${productId} 
    `
  );
};

// 기본 배송지 체크 유무로 users 테이블에 기본배송지 저장하고 배송지id 리턴
const saveDestination = async (
  receiverAddress,
  addressName,
  receiverName,
  receiverPhoneNumber,
  userId
) => {
  await AppDataSource.query(`
      INSERT INTO destinations 
      (address, address_name, receiver_name, receiver_phone_number, user_id) 
      VALUES
       ("${receiverAddress}","${addressName}","${receiverName}","${receiverPhoneNumber}",${userId});
    `);

  const getDestinationId = await AppDataSource.query(
    `SELECT LAST_INSERT_ID() as destination_id;`
  );
  const destinationId = getDestinationId[0].destination_id;
  return destinationId;
};

//users 테이블 default_destination에 기본배송지 id 저장
const saveDefaultDestination = async (destinationId, userId) => {
  await AppDataSource.query(
    `UPDATE users SET default_destination = "${destinationId}" WHERE id = "${userId}"`
  );
};

const orderList = async (orderId) => {
  const list = await AppDataSource.query(
    `SELECT * FROM orders WHERE orders.id = "${orderId}"`
  );
  return list;
};

module.exports = {
  createOrder,
  saveOrderedGoodsTableByCarts,
  saveOrderedGoodsTable,
  deleteCartsTable,
  modifyCartsTable,
  checkCartQuantity,
  saveDestination,
  saveDefaultDestination,
  orderList,
};
