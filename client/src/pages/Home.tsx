import classes from '../css/Home.module.css';

const Home = () => {
  return (
    <div className={classes['home-container']}>
      <h1>Home</h1>
      <img
        src='../src/assets/eula1.jpeg'
        alt='Eula hero image'
        className={classes['hero']}
      />
    </div>
  );
};

export default Home;
