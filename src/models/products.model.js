const { AppDataSource } = require("./data-source");

const productList = async (
  userId,
  teasort,
  offset,
  limit,
  categorizingQuery,
  orderingQuery
) => {
  let input = 0;
  if (userId) {
    input = userId;
  }
  let query = `SELECT 
    products.id AS id,
    products.name AS name,
    categories.name AS category,
    JSON_ARRAYAGG(
      JSON_OBJECT(
          "id", product_images.order,
          "url", product_images.url
      ) 
    ) AS productImg,
    products.price - (products.price * (products.discount_rate / 100)) AS price,
    products.price AS originalPrice,
    products.discount_rate AS discountRate,
    COUNT(likes.product_id) AS likeNumber,
    COUNT(reviews.product_id) AS reviewNumber,
    IF(DATEDIFF(NOW(),products.created_at) < 30, "true", "false") AS isNew,
    IF(liked.user_id='${input}'|| liked.user_id= ${input}, "true", "false") AS isLike,
    products.quantity AS quantity,
    IFNULL(SUM(reviews.rating), 0) AS rating
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN likes ON products.id = likes.product_id
    LEFT JOIN reviews ON products.id = reviews.product_id
    LEFT JOIN product_images ON product_images.product_id = products.id
    LEFT JOIN (SELECT user_id, product_id FROM likes WHERE user_id = ${input}) liked ON products.id = liked.product_id
    LEFT JOIN product_types ON products.product_type_id = product_types.id `;

  query += categorizingQuery;

  if (teasort) {
    const teasorting = teasort.split(",").map((tea) => parseInt(tea));
    query += ` AND products.product_type_id IN (${teasorting.join(",")})`;
  }

  if (!teasort) {
    query += ` AND (products.product_type_id IN (1, 2, 3, 4) OR products.product_type_id IS NULL OR products.product_type_id = '')`;
  }

  query += `
      GROUP BY products.id

      ${orderingQuery}
      LIMIT ${limit} OFFSET ${offset}`;
  const product = await AppDataSource.query(query);
  product.forEach((item) => {
    item.likeNumber = parseInt(item.likeNumber);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.isNew = item.isNew === "true";
    item.isLike = item.isLike === "true";
    item.rating = item.reviewNumber > 0 ? item.rating / item.reviewNumber : 0;
  });

  return product;
};

const totalProduct = async (categorizingQuery, teasort) => {
  let query = `SELECT products.id FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN product_types ON products.product_type_id = product_types.id`;

  query += categorizingQuery;
  if (teasort) {
    const teasorting = teasort.split(",").map((cat) => parseInt(cat)); // 쉼표로 구분된 카테고리를 배열로 분할
    query += ` AND products.product_type_id IN (${teasorting.join(",")})`;
  }

  if (!teasort) {
    // teasort 값이 없는 경우 모든 값을 가져오며, 비어있는 category_id도 포함
    query += ` AND (products.product_type_id IN (1, 2, 3, 4) OR products.product_type_id IS NULL OR products.product_type_id = '')`;
  }
  console.log(query);
  const product = await AppDataSource.query(query);
  return product.length;
};

module.exports = {
  productList,
  totalProduct,
};

/*[
    {
      id: 1,
      productImg = {
        picFirst:
        'https://image.osulloc.com/upload/kr/ko/adminImage/NK/UF/304_20221114150238508QK.png',
        picSecond:
        'https://image.osulloc.com/upload/kr/ko/adminImage/HW/AQ/304_20220921131344082JD.png',
      }
      category: '차 세트',
      price: 27000,
      originalPrice: 30000,
      discountRate: 10,
      likeNumber: 77,
      reviewNumber: 107,
      isNew: true, 
      isLiked: true,
      quantity: 10
    }
]*/
