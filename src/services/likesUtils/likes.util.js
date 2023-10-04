const { likesModel } = require("../../models");

async function checkExistingLike(userId, productId) {
  const like = await likesModel.getLikeByIds(userId, productId);
  return like;
}

module.exports = {
  checkExistingLike,
};
