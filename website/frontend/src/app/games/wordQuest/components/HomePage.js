import React, { useState, useEffect } from 'react';
import CrosswordBoard from './CrosswordBoard';

const HomePage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showInfo, setShowInfo] = useState(false); // State for toggling the info module

  useEffect(() => {
    // Generate a random index for the background image
    const randomIndex = Math.floor(Math.random() * 36) + 1;
    const backgroundImageUrl = `/images/${randomIndex}.jpg`;
    setBackgroundImage(backgroundImageUrl);
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh'; // Ensure the body takes full height
  }, []);

  if (selectedDifficulty) {
    return (
      <div>
        <button
          style={{ color: 'black' }}
          onClick={() => setSelectedDifficulty(null)}
        >
          Back to Home
        </button>
        <CrosswordBoard difficulty={selectedDifficulty} />
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '0px',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', // No background if undefined
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundColor: backgroundImage ? 'transparent' : 'white', // Set background to transparent or white if no image
        height: '0vh',
        color: 'white',
      }}
    >
      <h4
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #ff007f, #6a5bff, #004080)', // Updated darker blue
          backgroundClip: 'text',
          textFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow:
            '2px 2px 4px #ff69b4, -2px -2px 4px #6a5bff, 2px -2px 4px #004080', // Updated shadow for darker blue
          border: 'none',
        }}
      >
        WordQuest
      </h4>

      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          textShadow:
            '2px 2px 0px #FFA500, -2px -2px 0px #FFA500, 2px -2px 0px #FFA500, -2px 2px 0px #FFA500', // Orange outline effect
        }}
      >
        Select a difficulty to start playing:
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {['easy', 'medium', 'hard', 'extreme'].map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
            style={{
              padding: '12px 20px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#9331cc',
              border: '2px solid #333',
              borderRadius: '8px',
              background: 'linear-gradient(145deg, #e0e0e0, #f5f5f5)', // Light gradient for a raised effect
              boxShadow: '6px 6px 10px #aaa, -6px -6px 10px #fff', // 3D effect with inner shadow
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow =
                '8px 8px 12px #888, -8px -8px 1 2px #fff';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow =
                '6px 6px 10px #aaa, -6px -6px 10px #fff';
            }}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </button>
        ))}
      </div>

      {/* Info Tab */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setShowInfo(!showInfo)}
          style={{ padding: '10px', fontSize: '16px', color: 'black' }}
        >
          {showInfo ? 'Hide Info' : 'Show Info'}
        </button>
        {showInfo && (
          <div
            style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '8px',
              color: 'white',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <h2
              style={{
                fontSize: '35px',
                color: '#FFFFFF',
              }}
            >
              About WordQuest
            </h2>
            <p>
              'WordQuest is a game focused on developing mental recognition and
              agility with all ages. It consists of four levels of difficulty
              paralleling crossword with a small twist. The twist being
              text-to-speech availability and specific phrases made to help with
              memory and fast-thinking.'
            </p>
            {/* Add more paragraphs or information as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
