"use client";

import React from 'react';
import { Box, Typography, Grid2 } from '@mui/material';

interface Statistic {
    label: string,
    value: number | string;
}

interface StatisticsProps {
    stats: Statistic[];
}

const Statistics: React.FC<StatisticsProps> = ({ stats }) => {
    return (
        <Box 
          sx={{
            padding: 4,
            backgroundColor: "#f4e7e1",
            borderRadius: "8px",
            textAlign: 'center',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px',
            margin: 'auto',
          }}>
        
            <Grid2 container spacing = {2} justifyContent = "center">
                {stats.map((stat, index) => (
                    <Grid2 item xs={12} sm={3} md={4} key={index}>
                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            border: '1px solid black',
                            borderRadius: '4px',
                            padding: 3,
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: "center",
                            width: "250px",
                            height: "150px",
                            
                            opacity: 0,
                            animation: `fadeIn 1s ease ${index * 0.3}s forwards`,
                        }}
                    >
                    <Typography variant="h4" fontWeight="bold" color="black">
                    {stat.value}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                    {stat.label}
                    </Typography>
                  </Box>
                 </Grid2>
                ))}
            </Grid2>

            <style jsx>{`
                @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px); /* Optional: slide up effect */
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }
            `}</style>
          </Box>
    );
};

export default Statistics;