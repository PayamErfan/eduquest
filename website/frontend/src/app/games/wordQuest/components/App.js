'use client';
import React from 'react';
import HomePage from './HomePage';
import { PointsProvider } from './PointsContext'; // Import the PointsProvider

const App = () => {
  return (
    <PointsProvider>
      {' '}
      {/* Wrap HomePage with PointsProvider */}
      <div>
        <HomePage />
      </div>
    </PointsProvider>
  );
};

export default App;
