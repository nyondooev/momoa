import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import LoginForm from '../components/LoginForm';
import KakaoAuth from '../components/KakaoAuth';

export default function Login() {
  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Logo2 width="50px" height="50px" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl text-gray-900 dark:text-white">
                로그인
              </h1>

              <KakaoAuth btnText="카카오로 로그인" />

              <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

              <LoginForm />

              <Link
                to="/signup"
                className=" text-sm text-right font-medium text-gray-400 hover:underline dark:text-gray-400 "
              >
                <p className="mt-4">가입하기</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
