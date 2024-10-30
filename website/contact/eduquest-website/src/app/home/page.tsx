"use client";

import Navbar from '@/components/Navbar';
import Title from '@/components/Title';
import Button from '@/components/Button';
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
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
          <span className="mx-8">Providing Education for All Through Games!</span>
        </div>
      </div>
      <Title />
      <div style={{display: 'flex', alignItems: 'center', paddingTop: '100px'}}>
        <div style ={{paddingLeft: '150px', 
                    paddingRight: '200px',
                    textAlign: 'center',
                    }}>
          <div style={{
                    
                    color: 'black',
                    fontSize: '25px',
                    paddingBottom: '20px',
                    fontWeight: 'normal',
                    textAlign: 'center',
                    
                }}>
            Our platform is known as EduQuest, and we believe everybody should have access to education! We try making learning fun through interactive games!
          </div>
          <Button />
        </div>
        <div style={{paddingRight: '150px'}}>
          <img src="/images/character.png" alt="Background" style={{padding: '20px', width: '2000px'}} />
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', padding: '20px'}}>
        <img src="/images/background1.png" alt="Background" style={{width: '450px', height: '200px', padding: '20px'}} />
        <img src="/images/background1.png" alt="Background" style={{width: '450px', height: '200px', padding: '20px'}} />
        <img src="/images/background1.png" alt="Background" style={{width: '450px', height: '200px', padding: '20px'}} />
        <img src="/images/background1.png" alt="Background" style={{width: '450px', height: '200px', padding: '20px'}} />
      </div>
    </div>
  );
};

export default Home;
