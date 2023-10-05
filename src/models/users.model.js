const { AppDataSource } = require("./data-source");

const createUser = async (name, email, hashedPw, phoneNumber) => {
  await AppDataSource.query(`
  INSERT INTO users (                    
    pw,
    email, 
    name,
    phone_number
    )
  VALUES (
    '${hashedPw}', 
    '${email}',
    '${name}',
    '${phoneNumber}'
    )
`);
};

async function getUserByEmail(email) {
  const users = await AppDataSource.query(`
    SELECT
      id,
      email,
      pw AS password
    FROM
      users
    WHERE
      email = "${email}"
    ;
  `);
  return users[0];
}

async function getUserById(userId) {
  const users = await AppDataSource.query(`
    SELECT
      id
    FROM
      users
    WHERE
      id = "${userId}"
    ;
  `);
  return users[0];
}

const getUserOrderData = async (userId)=> {
  const users = await AppDataSource.query(`
    SELECT
    users.id,
    users.name,
    users.email,
    users.phone_number AS phoneNumber,
    destinations.address,
    destinations.address_name AS addressName,
    destinations.receiver_name AS receiverName,
    destinations.receiver_phone_number AS receiverPhoneNumber
  FROM
    users
  INNER JOIN
    destinations ON users.default_destination = destinations.id
  WHERE
    users.id = ${userId}
`);
    return users[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUserOrderData
};
