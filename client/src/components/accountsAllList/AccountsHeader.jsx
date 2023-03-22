import React from 'react';

export default function AccountsHeader({ filters, filter, onFilterChange }) {
  return (
    <header className="flex justify-between mb-3">
      <div className="font-semibold">전체내역</div>
      <ul className="flex">
        {filters.map((value, index) => (
          <li key={index} className=" mx-2">
            <button onClick={() => onFilterChange(value)}>{value}</button>
          </li>
        ))}
      </ul>
    </header>
  );
}
