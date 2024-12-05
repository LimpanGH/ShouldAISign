import iconmonstrLinkedin from '../../components/SVG/iconmonstr-linkedin-3.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer className="footer-container">
        <p className="footer">ShouldAISign</p>
        <p className="footer">{currentYear}</p>
        <a
          href="https://www.linkedin.com/in/linus-johannesson-a9173b237/"
          className="linkedin-icon-container"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconmonstrLinkedin} alt="LinkedIn" />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
