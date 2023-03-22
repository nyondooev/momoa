import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MomoaImg from '../assets/screen-mockups.svg';

export default function Momoa() {
  const navigate = useNavigate();
  const gotoSignUp = () => {
    navigate('/signup');
  };
  return (
    <main className="px-[40px] pt-[112px] lg:px-[212px] flex flex-col items-center text-center">
      <motion.h1
        className="hidden lg:block text-[48px]"
        animate={{ x: [0, 150, 0], opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
      >
        금융의 모든 것 모모아에서 쉽고 간편하게
      </motion.h1>
      <h1 className="lg:hidden text-[24px]">
        금융의 모든 것 <br /> 모모아에서 쉽고 간편하게
      </h1>
      <p className="hidden lg:block mt-[26px]">
        내 모든 금융 내역을 한눈에 조회하고 한 곳에서 관리하세요.
        <br />
        이제껏 경험 못 했던 쉽고 편리한 금융 서비스, 모모아와 함께라면 당신의
        일상이 새로워질 거예요.
      </p>
      <p className="text-[14px] lg:hidden mt-[26px]">
        모든 금융 내역을 한눈에 조회하고 한 곳에서 관리하세요. <br />
        이제껏 경험 못 했던 쉽고 편리한 금융 서비스
        <br />
        모모아와 함께라면 당신의 일상이 새로워질 거예요.
      </p>
      <button
        className="w-[200px] h-[40px] mt-[49px] lg:w-[400px] bg-purple-700 text-white text-[12px] lg:text-[20px] font-[600] rounded-full shadow-x1 transition-all duration-300 hover:bg-purple-600"
        onClick={gotoSignUp}
      >
        시작하기
      </button>
      <img className="mt-[104px] lg:mt-[120px]" src={MomoaImg} alt="" />
    </main>
  );
}
