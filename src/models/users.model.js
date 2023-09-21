const { AppDataSource } = require("./data-source");

const getUserByEmail = async (email) => {
  const existingUser = await AppDataSource.query(`
  SELECT id, email FROM users WHERE email='${email}';   
  `);
  return existingUser;
};

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

module.exports = {
  createUser,
  getUserByEmail,
};
