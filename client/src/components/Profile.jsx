import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosurl from '../url';

export default function Profile(Info) {
  const navigate = useNavigate();
  const { isKakao, user_email, user_name } = Info;

  function logout() {
    axios({
      url: axiosurl.logout,
      method: 'get',
    })
      .catch((error) => {
        console.log(error.response.status);
        alert('로그아웃 실패');
      })
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.msg === 'kakao') {
          window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URI}`;
          localStorage.removeItem('accessToken');
          navigate('/');
        } else {
          alert(res.data.msg);
          localStorage.removeItem('accessToken');
          navigate('/');
        }
      });
  }
  return (
    <div className="mt-4 p-10">
      <img
        className="w-36 h-36 rounded-full mb-10"
        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        alt="user_pic"
      />
      <div>
        <div className="mb-2">
          <span className="font-bold">이메일</span> : {user_email}
        </div>
        <div className="mb-2">
          <span className="font-bold">닉네임</span> : {user_name}
        </div>
        {/* <div className="mb-2">
          <span className="font-bold">회원유형</span> :{' '}
          {isKakao ? '카카오' : '이메일'} 가입
        </div> */}

        <button className="user-submit-btn" onClick={logout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
