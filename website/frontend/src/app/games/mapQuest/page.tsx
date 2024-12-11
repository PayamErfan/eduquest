"use client";

import React from "react";
import DropdownMenu from "./level_dropdownMenu";

const MainPage: React.FC = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
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

      {/* Vertical Line */}
      <div
        style={{
          width: "100%",
          height: "4px", // Thickness of the line
          backgroundColor: "yellow", // Color of the line
        }}
      ></div>

      {/* Main Content */}
      <div
        style={{
          backgroundImage: 'url("/mapQuest_images/Earth.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw", // Full screen width
          height: "calc(100vh - 84px)", // Full screen height minus banner and line height
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "10px" }}>Welcome to MapQuest</h2>
        <p style={{ color: "white", marginBottom: "20px" }}>
          Test your geography skills and explore the world!
        </p>

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
