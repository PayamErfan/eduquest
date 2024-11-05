"use client";
import React, { useState } from 'react';
import { Box, Typography, IconButton, Collapse, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TeamMember from '@/components/TeamMember';


interface TeamToggleProps{
    teamMembers: { name: string; image: string }[];
}

const TeamBanner: React.FC<TeamToggleProps> = ({ teamMembers }) => {
    const [showTeam, setShowTeam] = useState(false);

    const handleToggle = () => {
        setShowTeam((prev) => !prev);
    };

    return (
        <Box sx={{ textAlign: 'center', backgroundColor: '#f4e7e1', padding: 2}}>
            <Box 
               onClick={handleToggle}
               sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '24px',
                color: 'black',
              }}
            >
                <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 1 }}>EDUQUEST TEAM</Typography>
            <IconButton
            sx={{
                transition: 'transform 0.3s',
                transform: showTeam ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            >
          <ExpandMoreIcon />
        </IconButton>

        </Box>
        <Collapse in={showTeam}>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                backgroundColor: '#f4e7e1',
                minHeight: '100vh',
            }}
            >
            <Typography variant="h4" gutterBottom>
                Meet Our Team
            </Typography>
            <Grid2 container spacing={4} justifyContent="center" sx={{ maxWidth: '800px', marginTop: 2 }}>
                {teamMembers.map((member, index) => (
                <Grid2
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={index}>
                    <TeamMember name={member.name} image={member.image} title={member.title}/>
                
                    
                </Grid2>
                ))}
            </Grid2>
        </Box>
    </Collapse>
    </Box>
    );
};

export default TeamBanner;