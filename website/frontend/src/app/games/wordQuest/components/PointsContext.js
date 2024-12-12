import React, { createContext, useContext, useState } from "react";

// Create Context
const PointsContext = createContext();

// Custom hook to use PointsContext
export const usePoints = () => useContext(PointsContext);

// Provider Component
export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0); // Global points state

  return (
    <PointsContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsContext.Provider>
  );
};
