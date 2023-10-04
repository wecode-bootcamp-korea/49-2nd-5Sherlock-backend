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
  // order 테이블에 주문내역 저장
  const addOrder = await AppDataSource.query(`
    INSERT INTO orders (user_id, receiver_name, receiver_phone_number, address, payment, status)
    VALUES (${userId}, "${receiverName}","${receiverPhoneNumber}","${receiverAddress}","${payment}",${status});
  `);

  // 방금 주문 내역에서 id 뽑아오기
  const getOrderId = await AppDataSource.query(
    `SELECT LAST_INSERT_ID() as order_id;`
  );
  const orderId = getOrderId[0].order_id;

  // 장바구니에 있는 내용 ordered_goods 테이블로 저장하고 carts 테이블에서 그만큼 삭제
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
    // carts 테이블의 수량과 주문수량이 같으면 carts 테이블에 해당 행 삭제
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
  // 기본 배송지 체크 유무로 users 테이블에 기본배송지 저장
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
