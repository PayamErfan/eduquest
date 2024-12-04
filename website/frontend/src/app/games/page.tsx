import 'react';
// import { Card, CardMedia } from '@mui/material';
// import Grid from '@mui/material/Grid2';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function MediaCover() {
  return (
    <div className="realtive h-full ">
      <Navbar />
      <div>
        <Link href="/games/formula_1" passHref>
          {' '}
          <video className=" w-3/4 h-3/4 absolute left-48 top-32 ">
            <source src="/formula1/formula.mp4" />
          </video>
        </Link>
      </div>
      <div>
        <Link href="/games/spelling" passHref>
          <video className="w-3/4 h-3/4 absolute left-48 top-96 my-80 p-2">
            <source src="./spell.mp4" />
          </video>
        </Link>
      </div>
      <div>
        <Link href="/games/mapQuest" passHref>
          {' '}
          {/* <video
            className=" w-3/4 h-3/4 absolute left-48  "
            style={{ top: '80rem' }}
          >
            <source src="/mapQuest_images/..." />
          </video> */}
          <img
            className=" w-1/2 h-1/2 absolute left-96 mb-10"
            style={{ top: '80rem' }}
            src="mapQuest_images/mapQuest.png"
          />
        </Link>
      </div>
    </div>
  );
}
