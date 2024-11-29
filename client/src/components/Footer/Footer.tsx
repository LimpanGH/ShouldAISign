// import iconmonstrLinkedin from '../assets/iconmonstr-linkedin-3.svg';
import iconmonstrLinkedin from '../../assets/iconmonstr-linkedin-3.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer>
        <p>ShouldAISign</p>
        <p>{currentYear}</p>
        <a
          href='https://www.linkedin.com/in/linus-johannesson-a9173b237/'
          className='linkedin-icon-container'
        >
          <img src={iconmonstrLinkedin} alt='LinkedIn' />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
