'use client';

import Navbar from '@/components/Navbar';
import Title from '@/components/Title';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';

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
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
          <span className="mx-8">
            Providing Education for All Through Games!
          </span>
        </div>
      </div>
      <Title />
      <div
        id="target-section"
        style={{ display: 'flex', alignItems: 'center', paddingTop: '100px' }}
      >
        <div
          style={{
            paddingLeft: '150px',
            paddingRight: '150px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: 'black',
              fontSize: '25px',
              paddingBottom: '20px',
              fontWeight: 'normal',
              textAlign: 'center',
            }}
          >
            Unlock the joy of learning with EduQuest! Our platform brings
            education to life through interactive games that make knowledge
            accessible and fun for everyone. Join us in transforming learning
            into an adventure!
          </div>
          <Button />
        </div>
        <div className="relative flex justify-center items-center">
          <img
            src="/images/pixel_char.png"
            alt="Background"
            className="w-[2000px] p-5 animate-float"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
