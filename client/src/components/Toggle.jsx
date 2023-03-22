import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Toggle() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [checked, setChecked] = useState(false);

  function toggle() {
    setDarkTheme(!darkTheme);
    setChecked(!checked);
  }

  useEffect(() => {
    if (window.localStorage.getItem('DarkTheme') !== null) {
      setDarkTheme(JSON.parse(window.localStorage.getItem('DarkTheme')));
      setChecked(JSON.parse(window.localStorage.getItem('DarkTheme')));
    }
  }, []);

  useEffect(() => {
    if (darkTheme === true) {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }

    window.localStorage.setItem('DarkTheme', JSON.stringify(darkTheme));
    window.localStorage.setItem('DarkTheme', JSON.stringify(checked));
  }, [darkTheme, checked]);

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          className="sr-only peer"
          onClick={toggle}
          readOnly
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
      </label>
    </>
  );
}
