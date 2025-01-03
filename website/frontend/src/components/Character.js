import "../style/Character.css";
import React, { useState } from 'react';

const ShowCharacter = (xPos, yPos) => {
    const [position, setPosition] = useState({ x: xPos, y: yPos }); // Character position

    // Function to update position
    const moveCharacter = (newX, newY) => {
        setPosition({ x: newX, y: newY });
    };
    return (
        <>
        <img 
            src={`${process.env.PUBLIC_URL}/assets/images/oski.png`} 
            style={{position: 'absolute',
                    left: `${position.x}rem`,  
                    bottom: `${position.y}rem`}}
            id="Moski" 
            alt="Oski"/>
        </>
    )
};
export default ShowCharacter;
