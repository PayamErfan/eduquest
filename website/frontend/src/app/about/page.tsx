import Navbar from '@/components/Navbar';
import { Box, Typography, Avatar, Grid2 } from '@mui/material';


//import TeamMember from '@/components/TeamMember';
import TeamBanner from '@/components/TeamBanner';
import MissionStatement from '@/components/MissionStatement';
import OurPartnersBanner from '@/components/OurPartnersBanner';
import Footer from '@/components/Footer';

import Statistics from '@/components/Statistics';

const teamMembers = [
    { name: 'Payamullah Erfan', image: '/pictures/Payam.jpg', title: "Project Manager"},
    { name: 'Gabriel Gomes', image: 'Pictures/IMG_2778.jpg', title: "Project Manager"},
    { name: 'Isaac Lei', image: 'Pictures/IMG_0262.JPG', title: "Project Manager"},
    { name: 'Mihir Mirchandani', image: 'Pictures/mihir_mirchandani.jpeg', title: "Team Lead" },
    { name: 'Jasraj Dhillon', image: 'Pictures/Jasraj.jpg', title: "Team Lead" },
    { name: 'Rachel Cheung', image: 'Pictures/IMG_2417.jpg', title: "General Member"},
    { name: 'Avery Estes', image: 'Pictures/Screenshot\ 2024-10-24\ 130322.png', title: "General Member"},
    { name: 'Ava Joshi', image: 'Pictures/Ava_Joshi.jpg', title: "General Member" },
    { name: 'Anupriya Islam', image: 'Pictures/Anupriya.jpg', title: "General Member"},
    { name: 'Bhavita Peddi', image: 'Pictures/Bhavita.jpg', title: "General Member" },
    { name: 'Jenny Liang', image: 'Pictures/Jenny_liang.png', title: "General Member"},
    { name: 'Temmie Park', image: 'Pictures/Temmie.jpg', title: "General Member"},
    { name: 'Jonathan Gonzalez', image: 'Pictures/IMG_2544.jpg', title: "General Member" },
    { name: 'Turner Osswald', image: 'Pictures/Screenshot\ 2024-10-24\ 114908.png', title: "General Member" },
    { name: 'Jun Kim', image: 'Pictures/IMG_8804.jpeg', title: "General Member" },
    { name: 'Alyssa Chiu', image: 'Pictures/Alyssa.jpeg', title: "General Member"},
    { name: 'Anushka Verma', image: 'Pictures/anushka_verma.jpg', title: "General Member"},
    
]; 

const partners = [
    { name: "LMNT", logo: '/images/LMNT_Logo.png', link: 'https://www.lmnt.com/'},
    { name: "Open Project", logo: "/images/OpenProject.png", link: 'https://openprojectberkeley.com/about/'},
]

const statsData = [
  { label: 'Percent of K-12 instructors who use educational technology in their classrooms', value: "89%" },
  { label: 'Percent of students who say that technology makes learning more engaging', value: "76%" },
  { label: 'Percent of teachers who say that technology makes it easier to access their students', value: "90%" },
]

const About = () => {
  return (
    <div>
      <Navbar />
      <h1>About Page</h1>
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: 2,
            backgroundColor: "#f4e7e1",
        }}>
        <MissionStatement></MissionStatement>
        <Statistics stats={statsData}/>
        {/* Add content for the Games page */}
        <TeamBanner teamMembers={teamMembers}/>;
        <OurPartnersBanner partners={partners}/>;
      </Box>
      <Footer></Footer>
    </div>
  );
};

export default About;