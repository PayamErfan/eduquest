"use client";

import Navbar from '@/components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full bg-[#FEF5D6] py-2 overflow-hidden border-b-1 border-black shadow-md">
        <div
          className="flex items-center whitespace-nowrap animate-infinite-scroll text-lg font-semibold text-black"
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
