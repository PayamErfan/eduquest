import React from "react";

interface AnswerBoxProps {
  text: string; // Correctly typing the "text" prop
  isSelected: boolean; // Indicates if this option is selected
  onSelect: () => void; // Function to handle the selection
  className: string; // Additional class names for styling
}

const AnswerBox: React.FC<AnswerBoxProps> = ({
  text,
  isSelected,
  onSelect,
  className,
}) => {
  return (
    <div
      className={`answer-box flex items-center p-4 border rounded-lg cursor-pointer transition-all ${className}`}
      onClick={onSelect}
    >
      {/* Circular Indicator */}
      <div
        className={`w-5 h-5 rounded-full mr-4 ${
          isSelected ? "bg-blue-500 border-blue-500" : "bg-transparent border-gray-300"
        } border-2`}
      ></div>
      {/* Answer Text */}
      <span className="text-lg font-medium text-black">{text}</span>
    </div>
  );
};

export default AnswerBox;