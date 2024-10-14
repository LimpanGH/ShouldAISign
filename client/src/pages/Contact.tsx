import classes from '../css/Contact.module.css';

const Contact = () => {
  return (
    <div className={classes['contact-container']}>
      <h1>Contact Me</h1>
      <h3>Linus Johannesson</h3>
      <p>
        If you have any questions, feel free to reach out to me through the
        links below.
      </p>
      <div className={classes['contact-links']}>
        <a
          className={classes['contact-link']}
          href='https://www.linkedin.com/in/linus-johannesson/'
          target='_blank'
          rel='noopener noreferrer'
        >
          LinkedIn
        </a>
        <a
          className={classes['contact-link']}
          href='mailto:Linusj555@gmail.com'
        >
          Email Me
        </a>
      </div>
    </div>
  );
};

export default Contact;
