import React from 'react';
import { useRouter } from "next/navigation";

interface GameOverPopupProps {
  score: number;
  onPlayAgain: () => void;
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({ score, onPlayAgain }) => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/games/mapQuest'); // Navigates to the homepage
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '3px solid red',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'red', fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
        GAME OVER
      </h1>
      <p style={{ fontSize: '20px', marginBottom: '24px', color: 'black' }}>Your Final Score: {score}</p>
      <div style = {{display: 'flex', flexDirection:'column', gap: '16px'}}>

      
        <button
          onClick={onPlayAgain}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Play Again
        </button>
        <button onClick={goToHome}
          style ={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
          Go To Home Page
        </button>
        </div>
    </div>
  );
};

export default GameOverPopup;
