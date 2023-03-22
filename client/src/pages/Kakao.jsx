import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import axiosurl from '../url';
import { setToken } from '../utils/axios';

export default function Kakao(props) {
  const navigate = useNavigate();
  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  const getAccessToken = () => {
    axios.post(axiosurl.getAccesstoken, { authcode: code }).then((res) => {
      if (res.status === 200) {
        const { accessToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        setToken();
        setTimeout(() => {
          navigate('/account');
        }, 1500);
      } else {
        alert('로그인에 실패하였습니다.');
        navigate('/login');
      }
    });
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo2 className="animate-bounce mb-6" width="100px" height="100px" />
        <h4 className="text-xl font-bold md:text-2xl text-center text-gray-900 dark:text-white">
          카카오 로그인 중입니다. <br />
          잠시만 기다려주세요!
        </h4>
      </div>
    </>
  );
}
