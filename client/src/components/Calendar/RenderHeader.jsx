import React, { useState } from 'react';
import { format } from 'date-fns'; // 날짜 라이브러리, format() 함수를 사용하여 원하는 형태 입력
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';

export default function RenderHeader({
  currentMonth,
  prevMonth,
  nextMonth,
  clickDate,
}) {
  return (
    <div className="header flex justify-between border-1">
      <div className="col flex justify-start text-lg font-semibold border-1">
        <span className="text">
          {format(currentMonth, 'yyyy')}년
          <span className="text month ml-2">{format(currentMonth, 'M')}월</span>
        </span>
        <button
          type="button"
          onClick={() => {
            clickDate();
          }}
          className=" w-25 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          전체
        </button>
      </div>
      <div className="col flex justify-items-center items-center border-1 text-gray-500">
        <HiArrowCircleLeft onClick={prevMonth} />
        <HiArrowCircleRight onClick={nextMonth} />
      </div>
    </div>
  );
}
