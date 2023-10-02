const {productsModel} = require("../models")


const getProductDetail = async (productId) => {
    if (!productId) {
        throw new Error("input이 없습니다");
    }

    const data = await productsModel.getProductDetail(productId);
    return data;
}

module.exports = {
    getProductDetail,
};