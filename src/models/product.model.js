const { AppDataSource } = require("./data-source");

const productList = async (userId) => {
  // , userId, page, sort, category
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
    IF(liked.user_id="1" || liked.user_id= 1, "true", "false") AS isLike,
    products.quantity AS quantity
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN likes ON products.id = likes.product_id
    LEFT JOIN reviews ON products.id = reviews.product_id
    LEFT JOIN product_images ON product_images.product_id = products.id
    LEFT JOIN (SELECT user_id, product_id FROM likes WHERE user_id = ${input}) liked ON products.id = liked.product_id
    `;

  // if (queryParams.page) {
  //    query += + "";
  // }
  // Object.keys(queryParams)
  //
  // Object.entries(queryParams).map((key, value) => {
  //   if (key === "orderBy") {
  //     query += ` ORDER BY ${value}`;
  //   }
  //   if (key === "page") {
  //     query += ` LIMIT 12 OFFSET ${(page - 1) * 24}`;
  //   }
  // });
  // [(key, value), (key, value)]

  // if (category) {
  //   query += +"";
  // }

  // if (sort) {
  //   query += +"";
  // }

  // if (page) {
  //   query += +"";
  // }

  query += "GROUP BY products.id";

  const product = await AppDataSource.query(query);

  product.forEach((item) => {
    item.likeNumber = parseInt(item.likeNumber);
    item.reviewNumber = parseInt(item.reviewNumber);
    item.isNew = item.isNew === "true";
    item.isLike = item.isLike === "true";
  });

  return product;
};

const totalProduct = async () => {
  let product = await AppDataSource.query(`SELECT COUNT(*) AS product_count
  FROM products;`);
  console.log(product);

  product.forEach((item) => {
    item.product_count = parseInt(item.product_count);
  });
  return product;
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
