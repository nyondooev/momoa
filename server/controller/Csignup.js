const { User } = require('../model');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//인증코드(6자리 랜덤숫자) 생성 함수
let authCode = '';
function createAuthCode() {
  authCode = String(Math.floor(Math.random() * 1000000));
  return authCode;
}

let user_email = '';
let user_name = '';

//이메일 유효성 검사, 인증코드 발송
exports.send_code = async (req, res) => {
  //이메일 유효성 검사(중복확인)
  let find_email = await User.findOne({
    where: { user_email: req.body.user_email },
  });

  //중복될 경우 false
  if (find_email) {
    res.status(500).send({ msg: '이미 가입된 이메일입니다.' });
  } else {
    user_email = req.body.user_email;
    //인증코드 생성
    createAuthCode();
    console.log(`인증코드 생성 : ${authCode}`);
    //메일 발송 함수
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //메일 옵션
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.user_email,
      subject: 'momoa 인증코드 메일',
      html:
        '<h3>본 메일은 momoa 회원가입을 위한 이메일 인증을 위한 인증코드 발송 메일입니다.</h3>' +
        '<p>아래 인증코드를 15분 이내에 입력하여 인증을 완료해주세요.</p>' +
        `<h2>${authCode}</h2>`,
    };

    //사용자가 입력한 ID(=이메일)로 메일 발송
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send('이메일 발송 실패');
      } else {
        console.log(info);
        res.status(200).send('이메일 발송 성공');
        setTimeout(() => {
          authCode = null;
        }, 1000 * 6 * 15);
      }
    });
  }
};

//인증코드 확인, 회원가입 완료
exports.approve_code = async (req, res) => {
  //세션에 저장해 둔 코드와 사용자가 입력한 코드가 일치하는지 확인
  //일치한다면 DB에 회원정보 등록 및 가입절차 완료

  if (req.body.code == authCode) {
    let register = await User.create({
      user_email: req.body.user_email,
    });
    console.log(`회원가입 완료 : ${register}`);
    res.status(200).send('회원가입 완료');
  } else if (authCode === null) {
    res.status(500).send({
      msg: '인증 유효시간이 지나 인증할 수 없습니다. 인증코드를 재발급해주세요.',
    });
  } else
    res.status(400).send({
      msg: '인증코드가 일치하지 않습니다. 다시 한 번 확인해주세요.',
    });
};

//회원가입 완료 및 자동로그인
exports.finish_signup = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.user_pw, salt);
  user_name = req.body.user_name;
  try {
    await User.update(
      {
        user_name: req.body.user_name,
        user_pw: hashPassword,
      },
      {
        where: {
          user_email: user_email,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }

  ////JWT 발행////
  try {
    //access토큰 발행
    const accessToken = await jwt.sign(
      { user_email, user_name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1m',
        issuer: 'Momoa',
      }
    );
    console.log(`accessToken: ${accessToken}`);

    //refresh토큰 발행
    const refreshToken = await jwt.sign(
      { user_email, user_name },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '24h',
        issuer: 'Momoa',
      }
    );
    console.log(`refreshToken: ${refreshToken}`);

    await User.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          user_email: user_email,
        },
      }
    );

    //토큰 전달
    res
      .cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      })
      .status(200)
      .json({ accessToken: accessToken, msg: '회원가입 및 로그인 완료' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: '토큰 발급 오류', err: err });
  }
};
