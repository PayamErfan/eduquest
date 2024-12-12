import React, { useEffect, useState } from "react";
import "./styles.css"; // Add your CSS file for additional styling

const RandomBackground = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Generate a random number between 1 and 36
    const randomIndex = Math.floor(Math.random() * 36) + 1;
    // Set the background image URL
    setBackgroundImage(`/images/${randomIndex}.jpg`);
  }, []);

  return (
    <div
      className="random-background"
      style={{
        width: "100%",
        height: "100vh", // Full viewport height
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 style={{ color: "white", textAlign: "center", paddingTop: "20px" }}>
        Random Background
      </h1>
    </div>
  );
};

export default RandomBackground;
