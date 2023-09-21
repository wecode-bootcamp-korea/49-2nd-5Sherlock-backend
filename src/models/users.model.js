const { AppDataSource } = require("./data-source");

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
  getUserByEmail,
  getUserById,
};
