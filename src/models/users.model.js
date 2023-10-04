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

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
