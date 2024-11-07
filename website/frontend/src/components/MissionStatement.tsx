"use client";
import React, { useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';



const MissionStatement: React.FC = () => {
    const entireText = "EdduQuest aims to establish a free, online learning community for young learners. Through various subjects, English, Science, and math, we hope to build a strong foundation for early education."
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < entireText.length){
                setDisplayedText((prev) => prev + entireText[currentIndex]);
                currentIndex += 1;
            } else{
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
                maxWidth: '600px'
            }}>

            <Typography variant="h4" fontWeight="bold" sx={{fontSize: "2.0rem"}}>
                Our Mission
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{fontSize: "1.25rem"}}>
                {displayedText}
            </Typography>
        </Box>
    );
};

export default MissionStatement;