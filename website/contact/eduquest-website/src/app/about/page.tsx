import Navbar from '@/components/Navbar';
import { Box, Typography, Avatar, Grid2 } from '@mui/material';

//import TeamMember from '@/components/TeamMember';
import TeamBanner from '@/components/TeamBanner';

const teamMembers = [
    { name: 'Payamullah Erfan', image: '/pictures/Payam.jpg'},
    { name: 'Gabriel Gomes', image: 'Pictures/IMG_2778.jpg'},
    { name: 'Isaac Lei', image: 'Pictures/IMG_0262.JPG' },
    { name: 'Rachel Cheung', image: 'Pictures/IMG_2417.jpg' },
    { name: 'Avery Estes', image: 'Pictures/Screenshot\ 2024-10-24\ 130322.png' },
    { name: 'Ava Joshi', image: 'Pictures/Ava_Joshi.jpg' },
    { name: 'Anupriya Islam', image: 'Pictures/Anupriya.jpg' },
    { name: 'Bhavita Peddi', image: 'Pictures/Bhavita.jpg' },
    { name: 'Mihir Mirchandani', image: 'Pictures/mihir_mirchandani.jpeg' },
    { name: 'Jasraj Dhillon', image: 'Pictures/Jasraj.jpg' },
    { name: 'Jenny Liang', image: 'Pictures/Jenny_liang.png' },
    { name: 'Temmie Park', image: 'Pictures/Temmie.jpg' },
    { name: 'Jonathan Herrera Gonzalez', image: 'Pictures/IMG_2544.jpg' },
    { name: 'Turner Osswald', image: 'Pictures/Screenshot\ 2024-10-24\ 114908.png' },
    { name: 'Jun Kim', image: 'Pictures/IMG_8804.jpeg' },
    { name: 'Alyssa Chiu', image: 'Pictures/Alyssa.jpeg' },
    { name: 'Anushka Verma', image: 'Pictures/anushka_verma.jpg' },
    
]; 

const About = () => {
  return (
    <div>
      <Navbar />
      <h1>About Page</h1>
      {/* Add content for the Games page */}
      <TeamBanner teamMembers={teamMembers}/>;
    </div>
  );
};

export default About;