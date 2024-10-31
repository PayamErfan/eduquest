import React from 'react';

const footerPictures = [
  { name: "Open Project", logo: "/images/smallOpenProject.jpg", link: 'https://openprojectberkeley.com/about/' }, 
  { name: "Phone Icon", logo: "/images/phone_logo.png", link: '' },
  { name: "Pin Icon", logo: "/images/pin_logo.png", link: '' },
  { name: "OpenProject", logo: "/images/smallOpenProject.jpg", link: 'https://openprojectberkeley.com/about/' },
  { name: "Linkedin", logo: "/images/linkedin_logo.png", link: 'https://linkedin.com' },
  { name: "Instagram", logo: "/images/instagram_logo.png", link: 'https://instagram.com' }
];

const Footer: React.FC = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerLeft}>
        {/* Open Project Logo and EduQuest Text aligned horizontally */}
        <a href={footerPictures[0].link} target="_blank" rel="noopener noreferrer" style={styles.openProjectIcon}>
          <img src={footerPictures[0].logo} alt="Open Project Icon" style={styles.icon} />
        </a>
        <h1 style={styles.eduQuestText}>EduQuest</h1>

        {/* Divider Line */}
        <hr style={styles.divider} />

        {/* Location with Pin Icon */}
        <div style={styles.locationContainer}>
          <img src="/images/pin_logo.png" alt="Pin Icon" style={styles.icon} />
          <p style={styles.contactText}>University of California, Berkeley, 110 Sproul Hall #5801</p>
        </div>

        {/* Phone Icon and Number with Increased Spacing */}
        <div style={styles.phoneContainer}>
          <img src="/images/phone_logo.png" alt="Phone Icon" style={styles.icon} />
          <p style={styles.contactText}>(123) 456-7890</p>
        </div>
      </div>
      
      <div style={styles.footerNav}>
        {/* Navigation Links - Center Aligned Vertically */}
        <ul style={styles.navLinks}>
          <li><a href="#" style={styles.link}>Home</a></li>
          <li><a href="#" style={styles.link}>About</a></li>
          <li><a href="#" style={styles.link}>Games</a></li>
          <li><a href="#" style={styles.link}>Contact</a></li>
        </ul>
      </div>
      
      <div style={styles.footerRight}>
        {/* Social Media Icons with Names Aligned Vertically */}
        {footerPictures.slice(3).map((item, index) => (
          <div key={index} style={styles.iconContainer}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
              <img src={item.logo} alt={`${item.name} Icon`} style={styles.icon} />
              <span style={styles.iconText}>{item.name}</span>
            </a>
          </div>
        ))}
      </div>
      
      {/* Scroll-to-Top Button */}
      <button style={styles.scrollTopButton}>&#x25B2;</button>
    </footer>
  );
};

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '80px 20px', // Doubled vertical padding to increase footer height
    backgroundColor: '#f8f8f8',
    borderTop: '1px solid #ddd',
    color: 'black',
    fontSize: '12px',
    width: '100%',
    boxSizing: 'border-box' as const
  },
  footerLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    marginLeft: '260px'
  },
  openProjectIcon: {
    marginRight: '10px', // Space between Open Project logo and EduQuest text
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: '50px',
    marginBottom: '10px'
  },
  eduQuestText: {
    fontSize: '50px',
    fontFamily: 'Jost, sans-serif' as const,
    margin: '0',
    color: 'black'
  },
  divider: {
    width: '50%', // Shortened divider to half width
    borderTop: '1px solid #ddd',
    margin: '10px 0'
  },
  locationContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '100px' // Increased space below the location container
  },
  phoneContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '70px'
  },
  icon: {
    width: '30px',
    height: '30px',
    marginRight: '8px' // Space between icon and text
  },
  contactText: {
    marginTop: '9px',
    color: 'black',
    fontSize: '18px'
  },
  footerNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
    marginLeft: '0px', // Center the navlinks in the footer
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column' as const, // Aligned vertically
    alignItems: 'center', // Center-align items within the list
    gap: '12px', // Space between each link
    margin: '0',
    padding: '0'
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px' // Adjusted font size for better readability
  },
  footerRight: {
    display: 'flex',
    flexDirection: 'column' as const, // Align icons vertically
    alignItems: 'flex-start',
    marginRight: '300px'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px' // Space between each icon-text pair
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black'
  },
  iconText: {
    marginLeft: '8px', // Space between icon and text
    fontSize: '18px'
  },
  scrollTopButton: {
    position: 'fixed' as const,
    right: '20px',
    bottom: '20px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Footer;
