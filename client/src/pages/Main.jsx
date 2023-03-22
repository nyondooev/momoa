import React from 'react';
import Description from '../components/Description';
import Header from '../components/Header';
import Momoa from '../components/Momoa';

export default function Main() {
  return (
    <>
      <Header />
      <Momoa />
      <div className="my-[130px]">
        <Description />
      </div>
    </>
  );
}
