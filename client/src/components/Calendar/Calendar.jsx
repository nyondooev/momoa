import React, { useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import axios from '../../utils/axios';
import { useQuery } from 'react-query';
import AccountsHeader from '../accountsAllList/AccountsHeader';
import AccountsList from '../accountsAllList/AccountsList';
import RenderHeader from './RenderHeader';
import RenderDays from './RenderDays';
import RenderCells from './RenderCells';
import { useParams } from 'react-router-dom';
import axiosurl from '../../url';

const filters = ['전체', '수입', '지출'];
const newfilters = [...filters];
console.log('newfiltersnewfilters', newfilters);
export default function Calendar() {
  // 1. new Date() 날짜 가져오기
  // 2. 날짜 함수 라이브러리 date-fns 메소드 사용
  // 3. col-start에는 오늘이 속한월,년도 col-end에는 이동아이콘 2개
  // 4. 이동아이콘을 클릭했을 때, 이전월로 이동하는 함수 prevMonth & 다음월로 이동하는 함수 nextMonth
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState(filters[0]);
  const [accountFakeDB, setAccountFakeDB] = useState([]);
  const [clickDB, setClickDB] = useState(null);
  const { sheetId } = useParams();

  // 서버에서 달력 데이터 요청하는 함수
  const fetchCalendar = async () => {
    console.log('fetchCalendar');
    const { data } = await axios({
      url: axiosurl.fetchCalendar,
      method: 'get',
      params: {
        sheet_id: sheetId,
      },
    });
    console.log('--------------------------------');
    console.log('data : ', data);
    return data;
  };
  const { data, isLoading, error } = useQuery(
    ['getcalendar', sheetId],
    fetchCalendar,
    {
      //refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
      placeholderData: '',
    }
  );

  // useEffect(() => {
  //   fetch('data/account.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('데이터 도착:', data);
  //       setAccountFakeDB(data);
  //     });
  // }, []);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    console.log('날짜클릭: ', day);
    console.log('타입확인: ', typeof day);
    setClickDB(data[day]);
  };

  return (
    <div className="calendar">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        clickDate={() => {}}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        data={data}
      />
      <div className="h-60">
        <AccountsHeader
          filters={filters}
          filter={filter}
          onFilterChange={setFilter}
        />
        <AccountsList
          filter={filter}
          clickDay={clickDB}
          data={data}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
