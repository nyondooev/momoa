const { User } = require('../model');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//토큰 요청할 카카오 서버 옵션
const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const GRANT_TYPE = 'authorization_code';
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

let kakao_token = {};
let user_email = '';
let user_name = '';

// 카카오 로그인
exports.KakaoLogin = async (req, res, next) => {
  let code = req.body.authcode;
  console.log(`인가 코드 : ${req.body.authcode}`);

  //사용자 인증 후 로그인 요청 시 전달받은 인가 코드로 토큰 요청
  let get_token = await axios({
    url: `${KAKAO_TOKEN_URL}?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  console.log(`{
    엑세스 토큰 : ${get_token.data.access_token}, 
    엑세스 토큰 만료시간 : ${get_token.data.expires_in}, 
    리프레시 토큰 : ${get_token.data.refresh_token},
    리프레시 토큰 만료시간: ${get_token.data.refresh_token_expires_in}
    }`);

  kakao_token.access_token = get_token.data.access_token;
  kakao_token.refresh_token = get_token.data.refresh_token;

  //받은 토큰으로 사용자 정보 가져오기
  let user_info = await axios({
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${kakao_token.access_token}`,
    },
  });
  console.log(`유저 이메일 : ${user_info.data.kakao_account.email}`);
  console.log(`유저 닉네임 : ${user_info.data.kakao_account.profile.nickname}`);
  user_email = user_info.data.kakao_account.email;
  user_name = user_info.data.kakao_account.profile.nickname;

  //가입여부 확인하여 로그인 처리 완료
  let find_user = await User.findOne({
    where: {
      user_email: user_email,
    },
  });

  if (find_user) {
    try {
      ////jwt 발행
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
      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });
      res.status(200).json({ accessToken: accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  } else {
    await User.create({
      user_email: user_email,
      user_name: user_name,
      isKakao: 'Y',
    });

    ////jwt 발행////
    try {
      //access토큰 발행
      const accessToken = await jwt.sign(
        { user_email, user_name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '10m',
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
        .cookie('kakao_token', kakao_token, {
          secure: false,
          httpOnly: true,
        })
        .status(200)
        .json({ accessToken: accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
};

exports.KakaoLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  const user_email = user.user_email;

  User.update(
    { refresh_token: null },
    {
      where: {
        user_email: user_email,
      },
    }
  );
  //로그아웃 완료 응답 보내기
  res.clearCookie('refreshToken');
  return res.status(200).json({ msg: '로그아웃 성공' });
};
