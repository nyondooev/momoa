import React, { useEffect, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from 'date-fns';

export default function RenderCells({
  currentMonth,
  selectedDate,
  onDateClick,
  data,
}) {
  const monthStart = startOfMonth(currentMonth); // 오늘이 속한 달의 시작일
  const monthEnd = endOfMonth(monthStart); // 오늘이 속한 달의 마지막일
  const startDate = startOfWeek(monthStart); // monthStart 속한 주의 시작일
  const endDate = endOfWeek(monthEnd); // monthEnd가 속한 주의 마지막일

  const [rowData, setRows] = useState([]);
  let days = []; // 한주
  let day = startDate;
  let formattedDate = '';
  let add = '';
  let minus = '';

  // let data = '';

  useEffect(() => {
    const rows = []; // 한주 * 4또는 5주
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        // const cloneDay = day;
        const cloneDay = format(day, 'yyyy-MM-dd');

        // if (cloneDay == data.calendar[0].input_date) {
        //   console.log('같음!!', cloneDay == data.calendar[0].input_date);
        // }

        let result = [];
        if (data !== '' && data !== null) {
          result = data.calendar.filter(
            (account) => account.input_date == cloneDay
          );
        }
        if (result[0]) {
          // add = result[0].money;
          let type1 = result[0].type == 1;

          console.log('타입은??', result[0].type == 1);
          type1 ? (add = result[0].money) : (minus = '-' + result[0].money);
        } else {
          add = '';
          minus = '';
        }

        const newFormat = new Date(day);
        const newDay =
          newFormat.getFullYear() +
          '-' +
          '0' +
          (newFormat.getMonth() + 1) +
          '-' +
          newFormat.getDate();
        days.push(
          <div
            className={`flex flex-row m-0 w-full h-24  ${
              !isSameMonth(day, monthStart)
                ? 'text-slate-300'
                : newDay === selectedDate
                ? 'selected bg-violet-400 rounded-lg'
                : format(currentMonth, 'M') !== format(day, 'M')
                ? 'not-valid'
                : 'first:text-red-600 last:text-blue-600'
            }`}
            key={day}
            // onClick={() => onDateClick(parse(cloneDay))}
            onClick={() => onDateClick(cloneDay)}
          >
            <div
              className={`mt-2 mr-0 mb-0 text-center w-full ${
                !isSameDay(day, selectedDate)
                  ? 'selected'
                  : format(currentMonth, 'M') !== format(day, 'M')
                  ? 'text not-valid'
                  : ''
              }`}
            >
              {formattedDate}

              <span
                className={` block h-1/3 text-xs ${
                  result[0] ? 'selected text-zinc-500' : ''
                }`}
              >
                {add}
              </span>

              <span
                className={` block h-1/3 text-xs ${
                  result[0] ? 'selected text-zinc-500' : ''
                }`}
              >
                {minus}
              </span>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex space-between mt-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    setRows(rows);
  }, [selectedDate]);

  return <div className="body">{rowData}</div>;
}
