import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo2.svg';
import Toggle from './Toggle';
import { useRecoilState } from 'recoil';
import { isClickedAtom, isShareAtom } from '../atoms/InterfaceAtom';
import { HiOutlineShare, HiOutlineChatAlt } from 'react-icons/hi';

export default function AccountNav(props) {
  const [clicked, setClicked] = useRecoilState(isClickedAtom);
  const [isShare, setShare] = useRecoilState(isShareAtom);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setClicked(!clicked)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <div className="flex md:mr-24 ">
                <Logo className="h-8" width="50px" height="50px" />
                <span className="self-center text-gray-800 max-[1080px]:hidden font-semibold sm:text-2xl whitespace-nowrap dark:text-gray-50">
                  모모아
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start">
              <img
                className="mr-4 w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user_pic"
              />

              <div className="mr-2">{props.name}</div>

              {/* <HiOutlineChatAlt className="mr-3 h-6 w-6 hover:cursor-pointer hover:translate-y-1" /> */}
              <HiOutlineShare
                onClick={() => setShare(!isShare)}
                className="mr-3 h-6 w-6 hover:cursor-pointer hover:translate-y-1"
              />

              <Toggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
