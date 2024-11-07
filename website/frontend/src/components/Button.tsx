import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';

function Button() {
    const handleClick = () => {
        
    };

    return (
        <Link href="/about" passHref>
            <button
            onClick={handleClick}
            className="px-5 py-2 bg-[#FEF5D6] text-black font-bold rounded-full text-lg cursor-pointer hover:bg-[#F2D6A7] shadow-md"
            >
            Learn More
            </button>
        </Link>

    );
}

export default Button;