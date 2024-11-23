import classes from './Home.module.css';

const Home = () => {
  return (
    <div className={classes['home-container']}>
      <div>
        <h1>Welcome to ShouldAISign!</h1>
        <p>
          This is a web application that allows you to upload End User Licence
          Agreements and have them analyzed by AI. It aims to make the process
          of reading and understanding EULAs easier and more efficient. As a
          consumer it can be difficult to understand the legal terms and their
          implications. ShouldAISign is here to help you with that.
        </p>
      
      
      <button className={classes['get-started-btn']} >
        <a href='/sign-in'>Get Started</a>
      </button>


      </div>
    </div>
  );
};

export default Home;
