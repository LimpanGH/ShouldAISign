const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer>
        <p>Should I Sign</p>
        <p>{currentYear}</p>
      </footer>
    </div>
  );
};

export default Footer;
