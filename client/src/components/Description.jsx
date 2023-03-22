import React from 'react';
import imgTopDesktop from '../assets/bg-section-top-desktop-1.svg';
import imgBottomDesktop from '../assets/bg-section-bottom-desktop-1.svg';
import imgDescription from '../assets/illustration-grow-together.svg';

export default function Description() {
  return (
    <section className="Description relative hidden lg:block">
      <div>
        {/* <img
          className="w-full h-[421px]"
          src={imgTopDesktop}
          alt="section_image"
        />
        <img
          className="w-full h-[421px]"
          src={imgBottomDesktop}
          alt="section_image"
        /> */}
      </div>
      <div className="flex w-[1200px] absolute top-[20%] left-[50%] translate-x-[-50%] ">
        <div className="text basis-1/2 flex flex-col justify-center">
          <h2 className="text-[40px] mb-[26px]">한눈에 보이는 내 자산</h2>
          <p className="text-veryDarkCyan">
            집과 자동차의 공통점은 잘 사서, 잘 관리하고, 잘 팔아야 한다는 것.{' '}
            <br />
            시세조회부터 아파트 관리비 납부, 자동차 보험료 조회까지 부동산과
            <br />
            자동차 관리도 모모아에서 시작해 보세요.
          </p>
        </div>
        <div className="image basis-1/2 ">
          <img
            className="w-[560px] "
            src={imgDescription}
            alt="description_image"
          />
        </div>
      </div>
    </section>
  );
}
