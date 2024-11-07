import React from 'react';

function Title() {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Background Image */}
            <img 
                src="/images/background_home.webp" 
                alt="Background" 
                style={{ width: '100vw', height: '70vh', objectFit: 'cover' }} 
            />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(0, 12, 93, 0.7) 0%, rgba(9, 69, 121, 0.5) 35%, rgba(204, 254, 255, 0.3) 100%)',
                zIndex: 1,
            }}></div>

            {/* Title Text */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontSize: '50px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px black',
                textAlign: 'center',
                zIndex: 2,
            }}>
                WELCOME TO EDUQUEST!
            </div>

            {/* Scroll Arrow as Image */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                cursor: 'pointer'
            }}>
                <a href="#target-section">
                    <img src="/images/arrow.png" alt="Scroll Down" className="animate-bounce w-10 h-10" style={{ width: '60px', height: '50px' }} />
                </a>
            </div>
        </div>
    );
}

export default Title;
