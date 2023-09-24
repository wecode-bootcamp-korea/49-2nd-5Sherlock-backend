const { AppDataSource } = require("./data-source");

const categorizing = async (category) => {
  if (!isNaN(category)) {
    return ` WHERE products.category_id=${category}`;
  }

  switch (category) {
    case "tea":
      return ` WHERE products.category_id IN (1,2,3,4)`;
    case "teafood":
      return ` WHERE products.category_id IN (5,6,7)`;
    case "undefined":
      return ` WHERE products.category_id IN (1,2,3,4,5,6,7)`;
    default:
      return ` WHERE products.category_id IN (1,2,3,4,5,6,7)`;
  }
};
const ordering = async (sort) => {
  switch (sort) {
    case "priceASC":
      return ` ORDER BY price ASC, products.id ASC`;
    case "priceDESC":
      return ` ORDER BY price DESC, products.id ASC`;
    case "review":
      return ` ORDER BY islike ASC, products.id ASC`;
    case "newest":
      return ` ORDER BY products.created_at DESC, products.id ASC`;
    case "rating":
      return ` ORDER BY rating DESC, products.id ASC`;
    default:
      return ` ORDER BY rating DESC, products.id ASC`;
  }
};

module.exports = { categorizing, ordering };
