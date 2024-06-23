import React from 'react';
import Footer from '../components/Footer';

const styles = {
  aboutContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '10px', // Add padding for smaller screens
    backgroundColor: 'inherit' // Ensuring it inherits the main background color
  },
  card: {
    width: '100%', // Full width on small screens
    maxWidth: '600px', // Limit width on larger screens
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 30px rgba(0, 123, 255, 0.4)',
    backgroundColor: 'inherit', // Matching the card's background to the main background
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  },
  heading: {
    color: '#333'
  },
  section: {
    marginBottom: '20px'
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none'
  }
};

export default function About() {
  return (
    <div style={styles.aboutContainer}>
      <div style={styles.card}> 
        <section style={styles.section}>
          <h1 style={styles.heading} className='text-success'>About Me</h1>
          <p>Hii there! The developer and designer of this website is me, Akanksh Rakesh, thank you for checking out my site. To continue surfing the website, <a style={styles.link} href="/">Click here.</a></p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading} className='text-success'>Contact Me</h2>
          <p>Feel free to reach out to me at <a href="mailto:akankshrakesh@gmail.com" style={styles.link}>akankshrakesh@gmail.com</a> or connect with me on <a href="https://www.linkedin.com/in/akankshrakesh" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>.</p>
        </section>
        <Footer />
      </div>
    </div>
  );
}
