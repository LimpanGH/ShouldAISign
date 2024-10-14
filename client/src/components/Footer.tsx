// import classes from '../css/Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    // <div className={classes['footer-container']}></div>
    <div>
      <footer>
        <p>Should I Sign</p>
        <p>{currentYear}</p>
      </footer>
    </div>
  );
};

export default Footer;
