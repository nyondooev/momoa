import React from 'react';
import MyAccountStatus from '../components/MyAccountStatus';
import Profile from '../components/Profile';
import ShareAccountStatus from '../components/ShareAccountStatus';
import useMyPage from '../hooks/useMyPage';

export default function MyPage() {
  const { data, status } = useMyPage();

  return (
    <>
      <div className="p-4 sm:ml-40">
        <div className="p-4 mt-16 min-[1080px]:w-[1920px] text-gray-800 dark:text-gray-50">
          <div className="mb-10">
            <div className="text-2xl font-bold tracking-tight mb-2">
              마이페이지
            </div>
            <span className="text-lg">{data.user_name}님 안녕하세요!</span>
          </div>
          <div className="grid grid-rows-1 grid-cols-1 min-[1080px]:grid-rows-2 min-[1080px]:grid-flow-col min-[1080px]:grid-cols-[600px_minmax(310px,_1fr)_0px] ">
            <div className="w-full min-[1080px]:row-span-2 flex justify-items-center justify-center">
              <Profile
                {...(status === 'success' &&
                  data && {
                    user_email: data.user_email,
                    user_name: data.user_name,
                    isKakao: data.isKakao,
                  })}
              />
            </div>
            <div className="w-full p-2">
              <MyAccountStatus
                {...(status === 'success' &&
                  data.sheet && {
                    sheet: data.sheet,
                    share: data.sheet_share,
                  })}
              />
            </div>
            <div className="w-full p-2 ">
              <ShareAccountStatus
                {...(status === 'success' &&
                  data.sheet_before_accept && {
                    share: data.sheet_before_accept,
                  })}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
