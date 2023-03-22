import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.svg';
import Toggle from './Toggle';

export default function Header() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  const goToLogin = () => {
    navigate('/login');
  };
  return (
    <div className="px-[24px] pt-[24px] lg:px-[80px] lg:pt-[78px] flex justify-between">
      <div className="flex ml-3 h-[16px] w-[96px] lg:h-[38px] lg:w-[240px] cursor-pointer transition-all duration-300 hover:scale-110">
        <img className="mr-3" src={logo} alt="momoa_logo" onClick={goToMain} />
        <span className="self-center text-[16px] font-semibold lg:text-[35px] whitespace-nowrap dark:text-white">
          모모아 Momoa
        </span>
      </div>
      {/* <Link to="/" className="flex ml-2 md:mr-24">
        <Logo2 className="h-8 mr-3" width="50px" height="50px" />

        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          모모아 Momoa
        </span>
      </Link> */}
      <div className="flex items-center">
        <Toggle className="py-4" />
        <button
          className="text-purple-700 text-[10px] lg:text-[18px] border border-purple-700 rounded-full btn_shadow w-[80px] h-[24px] lg:w-[136px] lg:h-[40px] capitalize transition-all duration-300 hover:opacity-50"
          onClick={goToLogin}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
