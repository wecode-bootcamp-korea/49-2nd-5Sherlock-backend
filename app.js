const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { router } = require("./src/routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use(router);

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
    // ============================= CONTROLLER

    // 데이터베이스에 있는 데이터를 선택해서 데이터라는 변수에 저장한다 
    const data = await AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
    console.log(data, "productdata")
    // ============================= MODELS

    // 데이터를 넣어서 응답한다 
    // ============================= CONTROLLER
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
