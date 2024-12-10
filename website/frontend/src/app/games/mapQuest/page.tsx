"use client";

import React from "react";
import DropdownMenu from "./level_dropdownMenu";

const MainPage: React.FC = () => {
  return (
    <div>
      {/* Black Banner */}
      <header
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        MapQuest
      </header>
      {/* This is for horizontal linke */}
      <div
        style={{
          width: "100%",
          height: "8px", 
          backgroundColor: "yellow", 
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          textAlign: "center",
          backgroundImage: 'url("/mapQuest_images/Earth.png")',
          backgroundSize: "cover",
          justifyContent: "center",
          height: "100vh"
        }}
      >
        <h2 style={{ color: "black" }}>Welcome to MapQuest</h2>
        <p>Test your geography skills and explore the world!</p>

        {/* Globe Container */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            width: "200px",
            height: "200px",
          }}
        >

          {/* Dropdown Menu */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2, // Ensure the dropdown is above the globe
            }}
          >
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
