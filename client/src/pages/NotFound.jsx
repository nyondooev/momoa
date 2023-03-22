import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Error from '../assets/404.svg';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="px-[40px] pt-[112px] lg:px-[212px] flex flex-col items-center text-center">
        <img src={Error} alt="404" />
        <span className="text-lg mt-[40px]">페이지를 찾을 수 없습니다!</span>
        <button
          className="w-[200px] h-[40px] mt-[40px] lg:w-[400px] bg-purple-700 text-white text-[12px] lg:text-[20px] font-[600] rounded-full shadow-x1 transition-all duration-300 hover:bg-purple-600 "
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로
        </button>
      </div>
    </>
  );
}
