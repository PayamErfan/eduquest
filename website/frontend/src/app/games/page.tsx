import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { VideoOff } from 'lucide-react';

export default function MediaCover() {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '50px',
        }}
      >
        {/* Video Links */}
        <Link href="/games/formula_1" passHref>
          <video
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls
          >
            <source src="/formula1/formula.mp4" />
          </video>
        </Link>

        <Link href="/games/mapQuest" passHref>
          <video
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls
          >
            <source src="/mapQuest_images/mapquest_demo.mp4" />
          </video>
        </Link>
        <Link href="/games/wordQuest">
          <video
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
          >
            <source src="/wordQuest.mp4"></source>
          </video>
        </Link>
        <Link href="/games/spelling">
          <video
            className="w-3/4 "
            style={{ height: '250px', borderRadius: '8px' }}
          >
            <source src-="/spell.mp4"></source>
          </video>
        </Link>
      </div>
    </div>
  );
}
