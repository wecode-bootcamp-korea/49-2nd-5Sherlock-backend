const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const { router } = require("./src/routes");
const { verifyToken } = require("./src/middleware/tokencheck");


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
const server = http.createServer(app);

app.get('/generateToken', authController.generateToken);

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: '이 페이지는 보호됩니다.', user: req.decodedToken });
});

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

