import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

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
          gap: '20px', // Spacing between videos
          marginTop: '50px', // Space below the Navbar
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
            <source src="spell.mp4" />
          </video>
        </Link>

        <Link href="/games/WordQuest-main" passHref>
          <video
            className="w-3/4"
            style={{ height: '250px', borderRadius: '8px' }}
            controls
          >
            <source src="spell.mp4" />
          </video>
        </Link>
      </div>
    </div>
  );
}
