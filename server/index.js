const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const router = require('./routes/Index');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();

let corsOption = {
  origin: process.env.NODE_SERVER_IP, // 허락하는 요청 주소
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  optionsSuccessStatus: 200, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

//세션
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60000 * 15),
    },
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`app listening at port : ${process.env.PORT}`);
});
