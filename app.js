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





const controller = async (req, res) => {
  const params = req.params;
  const productId = params.product_id;
  console.log(productId, "productId")

  const data = await service(productId);

  return res.status(200).json({ data });

}

app.get("/products/:product_id", controller);

const service = async (productId) => {
    if (!productId) {
      throw new Error("input이 없습니다");
    }

const data = await model(productId);
return data;
}

const model = async (productId) => {
  const data = await AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
  console.log(data, "productdata")

  return data;
}




// const controller = async (req, res) => { 
//   // 요청 온 걸 확인하고 productID를 꺼낸다
//   const params = req.params;
//   const productId = params.product_id;
//   console.log(productId, "productId")
  
//   // 서비스한테 추가 작업 요청 
//   const data = await service(productId);
  
//   // 데이터를 넣어서 응답한다 
//   return res.status(200).json({ data });
  
// }

// app.get("/products/:product_id", controller); 

// const service = async (productId) => {
  
//   if (!productId) {
//   throw new Error("input이 없습니다");
// } 

// const data = await model(productId);
// return data;
// }

// const model = async (productId) => {
//   // 데이터베이스에 있는 데이터를 선택해서 저장한다 
//   const data = await AppDataSource.query(`SELECT * FROM products WHERE id=${productId};`);
//   console.log(data, "productdata")

//   return data;
// }




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

















