import classes from '../css/About.module.css';
  import { loremIpsum } from 'lorem-ipsum';

  const About = () => {
    return (
        // <div>
        <div className={classes['about-container']}>
            <h1 className={classes.h1}>About</h1>
            <div>
                <p>{loremIpsum({count: 4, units: 'paragraphs'})}</p>
                <p>{loremIpsum({count: 4, units: 'paragraphs'})}</p>


            </div>
        </div>
    )
  }

  export default About;
