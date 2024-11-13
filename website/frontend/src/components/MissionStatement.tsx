"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const MissionStatement: React.FC = () => {
    const entireText = "EduQuest aims to establish a free, online learning community for young learners. Through various subjects, English, Science, and math, we hope to build a strong foundation for early education.";
    const [displayedText, setDisplayedText] = useState("");
    const currentIndex = useRef(0);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (currentIndex.current < entireText.length) {
                setDisplayedText(entireText.slice(0, currentIndex.current + 1));
                currentIndex.current += 1;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <Box 
            sx={{
                backgroundColor: "#f4e7e1",
                padding: 4,
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
            <Typography variant="h4" fontWeight="bold" sx={{ fontSize: "2.0rem" }}>
                Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.25rem" }}>
                {displayedText}
            </Typography>
        </Box>
    );
};

export default MissionStatement;
