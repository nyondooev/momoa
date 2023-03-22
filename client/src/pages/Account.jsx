import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountContents from '../components/AccountContents';
import AccountNav from '../components/AccountNav';
import AccountSideBar from '../components/AccountSideBar';
import MyPage from './MyPage';
import useSheetId from '../hooks/useSheetId';
import NoData from '../components/NoData';
import Modal from '../components/Modal';

export default function Account() {
  const { data, status } = useSheetId();
  console.log(data);
  return (
    <>
      <AccountNav {...(data.user_name && { name: data.user_name })} />
      <AccountSideBar
        {...(status === 'success' && data.sheet && { sheetInfo: data.sheet })}
      />
      <Routes>
        <Route path="/" element={<NoData />} />
        {/* {data.sheet && <Route path="/" element={<Navigate to="/" />} />} */}
        <Route path="/:sheetId" element={<AccountContents />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Modal />
    </>
  );
}
