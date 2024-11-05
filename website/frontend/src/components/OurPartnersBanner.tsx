"use client";
import React, { useState } from 'react';
import { Box, Typography, IconButton, Collapse, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';


interface Partner{
    name: string;
    logo: string;
    link: string;
}

interface PartnersProps{
    partners: Partner[];
}

const OurPartnersBanner: React.FC<PartnersProps> = ({ partners }) => {
    const [showPartners, setShowPartners] = useState(false);

    const handleToggle = () => {
        setShowPartners((prev) => !prev);
    };

    return(
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
                <Typography variant="h6" fontWeight="bold" sx={{ marginRight: 1 }}>Our Partners</Typography>
                <IconButton
                sx={{
                    transition: 'transform 0.3s',
                    transform: showPartners ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
                >
                <ExpandMoreIcon />
                </IconButton>

            </Box>
        
        <Collapse in={showPartners}>
            
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4, // Space between logos
                    paddingTop: 4,
                    paddingBottom: 4,
                  }}
                >
                {partners.map((partner, index, link) => (
                    <Link href={partner.link} passHref target="_blank">
                        <Box key={index} sx={{ textAlign: 'center' }}>
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                style={{ width: 'auto', height: 'auto' }}
                            />
                            <Typography variant="body2" color="textPrimary" mt={1}>
                                {partner.name}
                            </Typography>
                        </Box>
                      </Link>
                    ))}    
                </Box>
        </Collapse>
    </Box>
    );
};

export default OurPartnersBanner;