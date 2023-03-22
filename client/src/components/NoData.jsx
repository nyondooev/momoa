import React from 'react';
import { HiOutlineExclamation } from 'react-icons/hi';

export default function NoData() {
  return (
    <div className="p-4 sm:ml-40">
      <div className="p-4 mt-52 min-[1080px]:mt-16 min-[1080px]:w-[1920px] text-gray-800 dark:text-gray-50">
        <div className="mb-10">
          <div className="w-full p-10 min-[1080px]:w-3/4 min-[1080px]:p-32 text-center bg-gray-100 dark:bg-gray-700 ">
            <HiOutlineExclamation className="h-20 w-20 mx-auto mb-6" />
            <p className="text-base min-[1080px]:text-xl font-bold min-[1080px]:leading-relaxed">
              메뉴에서 가계부를 선택하거나
              <br />
              새 문서로 시작해보세요!
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
