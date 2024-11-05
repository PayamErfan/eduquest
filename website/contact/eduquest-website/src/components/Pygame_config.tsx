'use client';

import { useEffect } from 'react';
import 'react';

const Pygame_config = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/pygbag.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <canvas id="canvas" width="800" height="600"></canvas>
    </div>
  );
};
export default Pygame_config;
