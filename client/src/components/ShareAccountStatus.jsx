import React, { useState } from 'react';
import { useApproveMutation } from '../hooks/useApproveMutation';

export default function ShareAccountStatus(props) {
  const { share } = props;
  const [SheetId, setSheetId] = useState('');
  const { mutate: setApprove } = useApproveMutation();

  function isApprove(e) {
    setApprove({ sheet_id: SheetId, approval: e });
  }
  return (
    <>
      <div className="mb-6 text-xl font-bold tracking-tight ">
        가계부 초대 현황
      </div>
      <div className="w-full min-[1080px]:w-3/5">
        {share?.map((el) => {
          return (
            <div
              key={el.sheet_id}
              className="p-6 mb-6 shadow-md bg-white dark:bg-gray-700 rounded"
            >
              <div className="flex justify-between">
                <div className="text-base min-[1080px]:text-lg font-bold mb-2">
                  {el.sheet_name}
                </div>
                <div className="flex">
                  <button
                    onClick={(a) => {
                      isApprove('Y');
                      setSheetId(el.sheet_id);
                    }}
                    className=" min-[1080px]:w-24 focus:outline-none text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    승인
                  </button>
                  <button
                    onClick={(a) => {
                      isApprove('N');
                      setSheetId(el.sheet_id);
                    }}
                    className="min-[1080px]:w-24 ml-2 focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    거절
                  </button>
                </div>
              </div>
              <div>{el.creator}님이 초대하셧읍니다..</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
