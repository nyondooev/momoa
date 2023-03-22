import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo2 } from '../assets/logo2.svg';
import SignUpForm from '../components/SignUpForm';
import KakaoAuth from '../components/KakaoAuth';

export default function SignUp() {
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
            <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl text-gray-900 dark:text-white">
                가입하기
              </h1>
              <p className=" text-sm font-medium text-gray-400 dark:text-gray-400">
                이미 회원이신가요?{' '}
                <Link
                  to="/login"
                  className="hover:underline font-bold text-purple-700 dark:text-purple-700"
                >
                  로그인
                </Link>
              </p>

              <KakaoAuth btnText="카카오로 시작하기" />

              <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

              <SignUpForm />

              <p className="text-xs font-normal text-gray-400">
                위의 “카카오/이메일로 시작하기” 클릭 시 모모아의
                <Link to="/" className="underline">
                  {' '}
                  이용약관
                </Link>{' '}
                및
                <Link to="/" className="underline">
                  {' '}
                  개인정보 보호정책
                </Link>
                을 읽고 이해했으며 그에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
