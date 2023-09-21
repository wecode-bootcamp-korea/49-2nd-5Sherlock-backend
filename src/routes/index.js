// 작성 예시
// const express = require('express');                // express 라이브러리를 불러옴
// const {usersRouter} = require('./users.router.js); // users.router.js 파일에 작성한 users router를 불러옴
// const router = express.Router();                   // 기본 라우터를 생성
// router.use('/users', usersRouter);                 // router가 '/users' 라는 엔드포인트에 요청을 받은 경우 usersRouter를 호출하도록 구성
// module.exports = { router };                       // router를 외부 파일에서 쓸 수 있도록 export 함



//이름,이메일,비밀번호,전화번호
const express = require("express"); 

const { usersRouter } = require("./users.router");

const router = express.Router(); 

router.use("/users", usersRouter); 

module.exports = { router };



