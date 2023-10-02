const {productsService} = require("../services")

const getProductDetail = async (req, res) => {
    const params = req.params;
    const productId = params.product_id;

    const data = await productsService.getProductDetail(productId);

    return res.status(200).json({ data });

}

module.exports = {
    getProductDetail,
};
