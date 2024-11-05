import React from 'react';

function Title() {
    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src="/images/background1.png" alt="Background" style={{width: '100vw', height: '55vh', objectFit: 'cover'}} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'black',
                fontSize: '50px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px black',
                textAlign: 'center'
            }}>
                WELCOME TO EDUQUEST!
            </div>
        </div>
    );
}

export default Title;