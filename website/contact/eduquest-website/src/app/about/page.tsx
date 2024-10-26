import Navbar from '@/components/Navbar';
import { Box, Typography, Avatar, Grid2 } from '@mui/material';

const teamMembers = [
    { name: 'Payamullah Erfan', image: '/pictures/Payam.jpg'},
    { name: 'Gabriel Gomes', image: 'Pictures/IMG_2778.jpg'},
    { name: 'Isaac Lei', image: '/images/isaac.jpg' },
    { name: 'Rachel Cheung', image: '/images/rachel.jpg' },
    { name: 'Avery Estes', image: '/images/avery.jpg' },
    { name: 'Ava Joshi', image: '/images/ava.jpg' },
    { name: 'Anupriya Islam', image: '/images/anupriya.jpg' },
    { name: 'Bhavita Peddi', image: '/images/bhavita.jpg' },
    { name: 'Mihir Mirchandani', image: '/images/mihir.jpg' },
    { name: 'Jasraj Dhillon', image: '/images/jasraj.jpg' },
    { name: 'Jenny Liang', image: '/images/jasraj.jpg' },
    { name: 'Temmie Park', image: '/images/rachel.jpg' },
    { name: 'Jonathan Herrera Gonzalez', image: '/images/avery.jpg' },
    { name: 'Turner Osswald', image: '/images/ava.jpg' },
    { name: 'Jun Kim', image: '/images/anupriya.jpg' },
    { name: 'Alyssa Chiu', image: '/images/bhavita.jpg' },
    { name: 'Anushka Verma', image: '/images/mihir.jpg' },
    
]; 

const About = () => {
  return (
    <div>
      <Navbar />
      <h1>About Page</h1>
      {/* Add content for the Games page */}
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
        <Grid2 container spacing={4} sx={{ maxWidth: '800px', marginTop: 2 }}>
            {teamMembers.map((member, index) => (
            <Grid2
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                key={index}
                sx={{ textAlign: 'center' }}
            >
                <Avatar
                alt={member.name}
                src={member.image}
                sx={{
                    width: 100,
                    height: 100,
                    margin: 'auto',
                    boxShadow: 2,
                }}
                />
                <Box
                sx={{
                    backgroundColor: '#ffecb3',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    display: 'inline-block',
                    marginTop: 1,
                }}
                >
                <Typography variant="body1" fontWeight="medium">
                    {member.name}
                </Typography>
                </Box>
            </Grid2>
            ))}
        </Grid2>
    </Box>
    </div>
  );
};

export default About;