"use client";

import React from 'react';
import DropdownMenu from './level_dropdownMenu';

const MainPage: React.FC = () => {
  return (
    <div>
      {/* Black Banner */}
      <header
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        MapQuest
      </header>

      {/* Main Content */}
      <div
        style={{
          margin: '20px',
          textAlign: 'center',
        }}
      >
        <h2 style = {{color: "black"}}>Welcome to MapQuest</h2>
        <p>Test your geography skills and explore the world!</p>

        {/* Start Game Button */}
        <DropdownMenu></DropdownMenu>
      </div>
    </div>
  );
};

export default MainPage;
