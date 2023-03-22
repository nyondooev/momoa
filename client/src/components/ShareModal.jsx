import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShareMutation } from '../hooks/useShareMutation';
export default function ShareModal() {
  const { mutate: shareInfo, data } = useShareMutation();

  const { sheetId } = useParams();
  const [Email, setEmail] = useState('');
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  console.log(sheetId);
  console.log(data);

  function shareInvite() {
    if (sheetId === undefined) {
      alert('가계부 페이지에서 공유해주세요.');
    } else
      shareInfo({
        sheet_id: sheetId,
        guest: Email,
      });
  }

  function reset() {
    setEmail('');
    alert('초대가 완료되었습니다!');
  }

  return (
    <>
      <div className="fixed top-0 right-0 z-10 mt-[60px] min-[1080px]:w-96 w-72 rounded-md bg-white dark:bg-gray-700 shadow-lg ">
        <div className="py-1">
          <div className="flex text-sm px-4 py-2 text-gray-900 dark:text-white ">
            <input
              type="text"
              onChange={onEmailHandler}
              className="min-[1080px]:w-4/5 w-2/3 mr-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-purple-300"
              placeholder="이메일로 초대해보세요."
            />
            <button
              onClick={() => {
                shareInvite();
                reset();
              }}
              className="min-[1080px]:w-1/5 w-1/3 focus:outline-none bg-purple-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              초대
            </button>
          </div>
          <div className="flex text-xs px-4 py-2 text-gray-900 dark:text-white ">
            현재 모모아 회원끼리 공유 및 편집 기능을 사용할 수 있습니다.
          </div>
        </div>
      </div>
    </>
  );
}
