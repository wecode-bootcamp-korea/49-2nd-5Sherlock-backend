const { reviewsService } = require("../services");

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await reviewsService.getReviews(productId);
    res.status(200).json({
      message: "querySuccess",
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
};
