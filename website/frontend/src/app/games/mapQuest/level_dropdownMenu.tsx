"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();

  const menuItems = [
    { label: 'Continents', path: '/games/mapQuest/Continents' },
    { label: 'US States', path: '/games/mapQuest/US_States' },
    { label: 'North America', path: '/games/mapQuest/NorthAmerica' },
    { label: 'South America', path: '/games/mapQuest/SouthAmerica' },
    { label: 'Africa', path: '/games/mapQuest/Countries/Africa' },
    { label: 'Europe', path: '/games/mapQuest/Countries/Europe' },
    { label: 'Asia', path: '/games/mapQuest/Countries/Asia' },
    { label: 'Australia', path: '/games/mapQuest/Australia' },

  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectItem = (item: { label: string; path:string}) => {
    setSelectedItem(item.label);
    setIsOpen(false); 
    router.push(item.path);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', color:"black", font:"bold" }}>
      {/* Dropdown Toggle */}
      <button
        onClick={toggleDropdown}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {selectedItem ? selectedItem : 'Select a Level!'}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            width: '200px',
          }}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectItem(item)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: index < menuItems.length - 1 ? '1px solid #ddd' : 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
