const { reviewsService } = require("../services");

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const queryParams = req.query;
    const {reviews, count, averageRating} = await reviewsService.getReviews(productId, queryParams);
    res.status(200).json({
      message: "querySuccess",
      data: {
        reviewsList: reviews, // array
        reviewsCount: count, // number
        averageRating: averageRating, // number
      }
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
};
