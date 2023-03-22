import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as Logo } from '../assets/logo2.svg';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { FinishAtom } from '../atoms/AuthAtom';
import axiosurl from '../url';
import { setToken } from '../utils/axios';

export default function InfoInit() {
  const [Password, setPassword] = useState('');
  const [Nickname, setNickname] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const navigate = useNavigate();
  const setFinish = useSetRecoilState(FinishAtom);

  function isVaildPw(pw) {
    return /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test(pw);
  }

  const onPwHandler = (e) => {
    if (!isVaildPw(e.target.value)) {
      setpasswordError('8자 이상의 영문, 숫자 조합으로 설정해주세요.');
    } else {
      isVaildPw(null);
      setpasswordError(false);
    }
    setPassword(e.target.value);
  };

  const onNicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  function finalSignup() {
    axios({
      url: axiosurl.finalSignup,
      method: 'POST',
      withCredentials: true,
      data: {
        user_name: Nickname,
        user_pw: Password,
      },
    })
      .then((res) => {
        console.log(res.data);
        const { accessToken } = res.data;
        localStorage.setItem('accessToken', accessToken);
        setFinish(false);
        setToken();
        navigate('/account');
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  }
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Logo width="50px" height="50px" />{' '}
      </div>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <p className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            환영합니다.
          </p>
          <span className="text-md font-normal text-gray-900 dark:text-white">
            아래 몇 가지 정보를 입력하면 회원가입이 완료됩니다!
          </span>
          <form className="space-y-4 md:space-y-4">
            <label
              htmlFor="nickname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              닉네임
            </label>
            <input
              type="nickname"
              name="nickname"
              id="nickname"
              className="user-primary-input"
              placeholder="닉네임을 입력하세요."
              onChange={onNicknameHandler}
            />

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호를 입력하세요."
                className="user-primary-input"
                required=""
                onChange={onPwHandler}
              />
              {passwordError && (
                <p className="mt-2 mb-2 text-xs font-semibold text-red-600">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={finalSignup}
              className="user-submit-btn"
            >
              가입 완료 및 시작하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
