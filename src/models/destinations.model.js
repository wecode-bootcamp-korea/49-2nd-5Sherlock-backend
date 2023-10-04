const { AppDataSource } = require("./data-source");

const getAddress = async (userId) => {
  const data = await AppDataSource.query(`
    SELECT 
        id,
        address,
        address_name AS addressName,
        receiver_name AS receiverName,
        receiver_phone_number AS receiverPhoneNumber,
        user_id AS userId,

    FROM destinations
    WHERE user_id=${userId}
  ;`);
  return data; // data = [{id}, {address}, {addressName}, {receiverName}, {receiverPhoneNumber}]
};

const createAddress = async (address,addressName,receiverName,receiverPhoneNumber,userId) => {
    await AppDataSource.query(`
    INSERT INTO destinations
    (address, address_name, receiver_name, receiver_phone_number, user_id)
    VALUES
    ('${address}', '${addressName}', '${receiverName}', '${receiverPhoneNumber}', '${userId}')
    ;`);
}

module.exports = {
  getAddress,
  createAddress,
};