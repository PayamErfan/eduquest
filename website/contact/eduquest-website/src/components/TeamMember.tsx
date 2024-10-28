import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface TeamMemberProps {
  name: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, image }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* Outer box to serve as a wooden frame */}
      <Box
        sx={{
          width: 120, // Slightly larger than the avatar to show the border
          height: 120,
          borderRadius: '50%',
          backgroundImage: 'url(/images/wood_background_photo.jpg)',
          backgroundSize: 'cover',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <Avatar
          alt={name}
          src={image}
          sx={{
            width: 110,
            height: 110,
            boxShadow: 2,
            borderRadius: '50%',
          }}
        />
      </Box>
      <Box
        sx={{
          backgroundColor: '#ffe5b4',
          borderRadius: '8px',
          padding: '4px 8px',
          display: 'inline-block',
          marginTop: 1,
          border: '3px solid #ffb74d',
        }}
      >
        <Typography variant="body1" fontWeight="bold" color="black">
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamMember;
