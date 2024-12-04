import React from 'react';

interface AnswerBoxProps {
    text: string,
    isSelected: boolean,
    onSelect: () => void,
    className: string;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ text, isSelected, onSelect, className}) => {
    return (
        <div 
            className={`answer-box ${className || ''}`}
            style = {{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: "10px",
                //backgroundColor: isSelected ? "green" : 'transparent',
            }}
            onClick={onSelect}
        >

        
        <div
            style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: `2px solid ${isSelected ? '#007BFF' : '#ccc'}`,
            backgroundColor: isSelected ? '#007BFF' : 'transparent',
            marginRight: '8px',
            }}
        ></div>

        <span style = {{fontSize: "16px", color: "black"}}>{text}</span>
    </div>
 );
};

export default AnswerBox;