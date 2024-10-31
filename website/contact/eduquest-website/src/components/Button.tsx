import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';

function Button() {
    const handleClick = () => {
        
    };

    return (
        <Link href='/about' passHref>
            <button onClick={handleClick} style={{ padding: '10px 20px', backgroundColor: '#F2D6A7',
                color: 'black',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '16px'}}>
                Learn More
            </button>
        </Link>
    );
}

export default Button;