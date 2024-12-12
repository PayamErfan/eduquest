'use client';

import * as React from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
// import Link from 'next/link';
const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white' }}>
      <link
        rel="icon"
        type="image/x-con"
        href="/images/EduQuest_Logo.png"
      ></link>
      <AppBar position="static" color="transparent">
        <Toolbar
          sx={{
            justifyContent: 'center', // Center everything
            gap: '8rem', // Adds equal spacing between items
          }}
        >
          <Link
            href="https://openprojectberkeley.com/about/"
            passHref
            target="_blank"
          >
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <svg
                width="50"
                height="65"
                viewBox="0 0 70 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="70" height="85" fill="url(#pattern0_45_3)" />
                <defs>
                  <pattern
                    id="pattern0_45_3"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      href="#image0_45_3"
                      transform="matrix(0.00943396 0 0 0.00776915 0 -0.0710322)"
                    />
                  </pattern>
                  <image
                    id="image0_45_3"
                    width="106"
                    height="147"
                    href="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </IconButton>
          </Link>

          <Link href="/" passHref>
            <Typography
              color="black"
              variant="h6"
              component="div"
              className={`relative text-xl w-fit block ${
                isActive('/home')
                  ? 'font-bold after:scale-x-100'
                  : 'after:scale-x-0'
              } after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-1`}
              align="center"
            >
              Home
            </Typography>
          </Link>
          <Link href="/about" passHref>
            <Typography
              color="black"
              variant="h6"
              component="div"
              className={`relative text-xl w-fit block ${
                isActive('/about')
                  ? 'font-bold after:scale-x-100'
                  : 'after:scale-x-0'
              } after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-1`}
              align="center"
            >
              About
            </Typography>
          </Link>
          <Link href="/games" passHref>
            <Typography
              color="black"
              variant="h6"
              component="div"
              className={`relative text-xl w-fit block ${
                isActive('/games')
                  ? 'font-bold after:scale-x-100'
                  : 'after:scale-x-0'
              } after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-1`}
              align="center"
            >
              Games
            </Typography>
          </Link>
          <Link href="/contact" passHref>
            <Typography
              color="black"
              variant="h6"
              component="div"
              className={`relative text-xl w-fit block ${
                isActive('/contact')
                  ? 'font-bold after:scale-x-100'
                  : 'after:scale-x-0'
              } after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:hover:scale-x-100 after:transition after:duration-300 after:origin-center mx-1`}
              align="center"
            >
              Contact
            </Typography>
          </Link>
          <div>
            <img
              src="/images/EduQuest_Logo.png" // Replace with your logo's actual path
              alt="Logo"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain',
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
