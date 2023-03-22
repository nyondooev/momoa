import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useItemMutation } from '../hooks/useItemMutation';

export default function ItempInput() {
  const { mutate: addItem } = useItemMutation();
  const { sheetId } = useParams();
  const [isFilter, setisFilter] = useState();
  const [isOption, setisOption] = useState();
  const [enteredNum, setEnterdNum] = useState();
  const [isDate, setisDate] = useState();
  const [isMemo, setisMemo] = useState('');

  const selectFilter = (e) => {
    setisFilter(e.target.value);
  };

  const selectOption = (e) => {
    setisOption(e.target.value);
  };

  const selectDate = (e) => {
    setisDate(e.target.value);
  };

  const inputMemo = (e) => {
    setisMemo(e.target.value);
  };

  const changeEnteredNum = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(',', ''));
    setEnterdNum(removedCommaValue.toLocaleString());
  };

  function ItemSubmit() {
    addItem({
      sheet_id: sheetId,
      type: isFilter,
      category: isOption,
      money: Number(enteredNum.replace(/,/g, '')),
      input_date: isDate,
      memo: isMemo,
    });
  }
  function InputReset() {
    setisFilter('');
    setisOption('');
    setEnterdNum('');
    setisDate('');
    setisMemo('');
  }

  return (
    <div className="w-full rounded p-4 bg-gray-100 dark:bg-gray-800">
      <div className="font-medium text-md text-gray-800 dark:text-gray-100 mb-4">
        사용 내역을 기록해보세요!
      </div>
      <div className="flex mb-3">
        <div className="flex items-center mr-2 pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            type="radio"
            name="filter"
            id="filter-1"
            value="1"
            onChange={selectFilter}
            checked={isFilter === '1'}
            className="w-6 h-6 accent-purple-700"
          />
          <label
            htmlFor="filter-1"
            className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            수입
          </label>
        </div>
        <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
          <input
            type="radio"
            name="filter"
            id="filter-2"
            value="2"
            onChange={selectFilter}
            checked={isFilter === '2'}
            className="w-6 h-6 accent-purple-700"
          />
          <label
            htmlFor="filter-2"
            className="w-full p-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            지출
          </label>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-2">
          <div className="w-3/5 mr-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              항목
            </label>

            <select
              id="item"
              onChange={selectOption}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            >
              <option>항목을 선택하세요.</option>
              {isFilter === '1' && (
                <>
                  <option value="급여">급여</option>
                  <option value="용돈">용돈</option>
                  <option value="금융수입">금융수입</option>
                  <option value="사업수입">사업수입</option>
                </>
              )}

              {isFilter === '2' && (
                <>
                  <option value="식비">식비</option>
                  <option value="생활">생활</option>
                  <option value="쇼핑">쇼핑</option>
                  <option value="교통">교통</option>
                  <option value="주거">주거</option>
                  <option value="통신">통신</option>
                  <option value="의료">의료</option>
                  <option value="금융">금융</option>
                  <option value="문화">문화</option>
                  <option value="교육">교육</option>
                </>
              )}
            </select>
          </div>

          <div className="w-2/5">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              금액
            </label>
            <input
              type="text"
              value={enteredNum}
              id="money"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              placeholder="ex.50,000"
              onChange={changeEnteredNum}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between mb-4">
          <div className="w-2/5 mr-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
              날짜
            </label>
            <input
              type="date"
              value={isDate}
              onChange={selectDate}
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"'
            />
          </div>
          <div className="w-3/5">
            <label
              htmlFor="memo"
              className="text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              메모
            </label>
            <input
              type="text"
              id="memo"
              value={isMemo}
              onChange={inputMemo}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            ItemSubmit();
            InputReset();
          }}
          className=" w-28 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          등록
        </button>
      </div>
    </div>
  );
}
