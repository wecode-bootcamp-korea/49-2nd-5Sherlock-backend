const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

require("dotenv").config();

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized_userServices!");
});
const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("combined"))

app.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "Welcome to Team5's server!" });
  } catch (err) {
    console.log(err);
  }
});




app.get("/products/:product_id", async (req, res) => {
  try {
    // 요청 온 걸 확인하고 productID를 꺼낸다
    const params = req.params;
    const productId = params.product_id;
    console.log(productId, "productId")

    // 데이터베이스에 있는 데이터를 선택해서 데이터라는 변수에 저장한다 
    const data = await AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
    console.log(data, "productdata")

    // 데이터를 넣어서 응답한다 
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
  }
});






const server = http.createServer(app);


const portNumber = process.env.PORT || 8000;

const start = async () => {
  try {
    await server.listen(portNumber);
    console.log(`Server is listening on ${portNumber}`);
  } catch (err) {
    console.error(err);
  }
};
start();

















