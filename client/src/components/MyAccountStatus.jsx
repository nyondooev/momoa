import React from 'react';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export default function MyAccountStatus(props) {
  const { sheet, share } = props;

  return (
    <>
      <div className="mt-10 mb-6 text-xl font-bold tracking-tight ">
        나의 가계부
      </div>

      <div className="flex flex-wrap w-full">
        {sheet?.map((el) => {
          return (
            <div
              key={el.sheet_id}
              className="p-6 mb-6 shadow-md border-t-4 border-indigo-500 bg-white dark:bg-gray-700 rounded w-full min-[1080px]:w-[320px] min-[1080px]:mr-6"
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold mb-2">{el.sheet_name}</div>
                <HiOutlinePencilAlt className="h-7 w-7 hover:cursor-pointer hover:translate-y-1" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap w-full">
        {share?.map((el) => {
          return (
            <div
              key={el.sheet_id}
              className="p-6 mb-6 shadow-md border-t-4 border-red-500 bg-white dark:bg-gray-700 rounded w-full min-[1080px]:w-[320px] min-[1080px]:mr-6"
            >
              <div className="flex justify-between">
                <div className="text-lg font-bold mb-2">{el.sheet_name}</div>
                <HiOutlinePencilAlt className="h-7 w-7 hover:cursor-pointer hover:translate-y-1" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
