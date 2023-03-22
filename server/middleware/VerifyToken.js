// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //authorization 대문자?
  console.log('헤더: ', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  //access token값을 비교
  if (token == null) return res.status(401).send({ message: 'TokenNull' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err1, decoded) => {
    req.decoded = decoded;
    console.log('decoded : ', decoded);

    //여기에서 req.decoded에 담아서 보냈기때문에 이걸 받는 controller의 getusers에서 user_email: req.decoded.user_email,라고 받는다!
    if (err1) {
      console.log(err1.name);
      return res.status(403).send({ message: err1.name });
    }

    next();
  });
};
