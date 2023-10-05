const jwt = require("jsonwebtoken");
const { usersService } = require("../services");
const { throwError } = require("../utils/throwError");

const { JWT_SECRET_KEY } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const token = req.get("authorization");
    if (!token) {
    throwError(401, "UNAUTHORIZED");
    }
    // 토큰이 존재하지 않을 경우, 
    // 401 상태코드와 "UNAUTHORIZED" 오류를 발생 시킴
    let userId;
    try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY); 
    userId = decoded.id;
    //토큰이 존재하는 경우, JWT를 사용하여 검증, 
    //성공하면 해당 토큰의 payload 에서 사용자 ID 추출
    } catch (error) {
    throwError(400, "INVALID_TOKEN");
    }
    const user = await usersService.findUser(userId);
    //추출한 사용자 ID를 사용하여 usersService에서 해당 사용자를 조회, 
    //사용자가 존재하지 않으면 400 상태 코드와 "INVALID_TOKEN" 오류를 발생 시킴
    req.userId = userId; 
    next(); 
  } catch (error) {
    next(error);
  }
    //만약 오류가 발생하면 catch 에서 next(error)를 호출, 
    // 오류를 다음 미들웨어나 에러 핸들러로 전달
};

module.exports = { validateToken };