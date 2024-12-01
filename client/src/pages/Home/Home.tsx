import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes['home-container']}>
      <div>
        <h1>Welcome to ShouldAISign!</h1>
        <h3>
          Hi! If you actually <span className={classes.emphasized}>read</span> and{' '}
          <span className={classes.emphasized}>understood</span> the{' '}
          <span className={classes.emphasized}>
            End User Licence Agreements{' '} (EULA)
          </span>{' '}
          when you last updated your phone, signed up to Netflix, or bought a
          hoover, great, this site may not be for you.
        </h3>
        <p>
          This is a web application that allows you to upload and store EULAs and have
          them analyzed by AI. It aims to make the process of reading and
          understanding EULAs easier and more efficient. As a consumer, it can
          be difficult to understand the legal terms and their implications.
          ShouldAISign is here to help.
        </p>

        <button >
          <a href='/signin'>Get Started</a>
        </button>
      </div>
    </div>
  );
};

export default Home;
