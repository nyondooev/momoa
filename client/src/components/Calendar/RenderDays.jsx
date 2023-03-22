import React from 'react';
export default function RenderDays() {
  const days = [];
  const date = ['일', '월', '화', '수', '목', '금', '토'];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        className="w-full flex justify-center p-1 font-semibold text-xs pl-2  border-1"
        key={i}
      >
        {date[i]}
      </div>
    );
  }

  return <div className="flex flex-row mt-2 border-b-2">{days}</div>;
}
