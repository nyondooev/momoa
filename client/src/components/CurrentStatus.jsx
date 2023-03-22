import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import Graph from './Graph';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { useGoalMutation } from '../hooks/useGoalMutation';
import { useQuery } from 'react-query';
import axiosurl from '../url';

export default function CurrentStatus() {
  const { mutate: setGoal } = useGoalMutation();
  const { sheetId } = useParams();
  const [enteredNum, setEnterdNum] = useState();
  const [none, setNone] = useState(true);
  const [percent, setPercent] = useState(0);

  const fetchGoal = async () => {
    const { data } = await axios({
      url: axiosurl.fetchgoal,
      method: 'get',
      params: {
        sheet_id: sheetId,
      },
    });
    return data;
  };

  const { data, status, error } = useQuery(['getgoal', sheetId], fetchGoal, {
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
    placeholderData: '',
  });

  const { test, addSpend } = data ?? {};
  const { goal } = test ?? {};

  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    setEnterdNum(removedCommaValue.toLocaleString());
  };

  function goalApi() {
    setPercent(((addSpend / goal) * 100).toFixed());
    setNone(false);
    setGoal({
      sheet_id: sheetId,
      goal: Number(enteredNum.replace(/,/g, '')),
    });
  }

  return (
    <>
      <div className="w-full rounded-lg p-6 mb-2 bg-purple-700 text-white">
        <div className="flex justify-between">
          <div className="text-xl font-medium">이번 달의 예산</div>
          {goal && !none && (
            <div className="flex">
              <div className="text-xl font-semibold mr-2">{goal}원</div>
              <HiOutlinePencilAlt
                className="h-7 w-7 hover:cursor-pointer hover:translate-y-1"
                onClick={() => setNone(true)}
              />
            </div>
          )}
        </div>
        {none && (
          <>
            <div className="flex mt-3 justify-center">
              <input
                type="text"
                value={enteredNum}
                onChange={changeEnteredNum}
                className="w-full min-[1080px]:w-72 mr-2 focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:ring-2 focus:ring-purple-300"
                placeholder="ex.50,000"
              />
              <button
                onClick={() => {
                  goalApi();
                }}
                className=" w-28 focus:outline-none hover:bg-purple-300 hover:text-white text-purple-700 bg-gray-50 font-medium rounded-lg text-sm px-5 py-2.5 "
              >
                설정
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between p-1 mb-1">
        {goal && (
          <>
            {percent <= 100 && (
              <span className="text-base font-bold text-gray-800 dark:text-gray-50">
                예산까지 {goal - addSpend}원 남았습니다.
              </span>
            )}
            {percent >= 100 && (
              <span className="text-base font-bold text-red-700">
                예산에서 {goal - addSpend}원 초과되었습니다.
              </span>
            )}
          </>
        )}
        <span className="text-sm font-medium ml-auto text-gray-800 dark:text-gray-50">
          {percent}%
        </span>
      </div>

      <div className="w-full rounded-full h-3.5 bg-gray-200 dark:bg-gray-700">
        {percent <= 100 && (
          <div
            className="bg-purple-600 text-xs font-medium text-purple-100 text-center p-0.5 leading-none  rounded-full"
            style={{ width: `${percent}%` }}
          >
            {percent}
          </div>
        )}

        {percent > 100 && (
          <div
            className="bg-red-600 text-xs font-medium text-red-100 text-center p-0.5 leading-none  rounded-full"
            style={{ width: '100%' }}
          >
            {percent}
          </div>
        )}
      </div>

      <div className="mt-4">
        <Graph />
      </div>
    </>
  );
}
