const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// const dataSource = {
//     host: "localhost",
//     username: "root",
//     initialize: () => {
//         // connect to database
//     }
// }

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

module.exports = {
  AppDataSource,
};
