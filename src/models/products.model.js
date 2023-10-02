const AppDataSourceModule = require("./data-source")

const getProductDetail = async (productId) => {
    const data = await AppDataSourceModule.AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
    
    return data;
}

module.exports = {
    getProductDetail,
}