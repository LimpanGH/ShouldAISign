
  import { loremIpsum } from 'lorem-ipsum';

  const About = () => {
    return (
        <div>
            <h1>About</h1>
            <div>
                <p>{loremIpsum({count: 4, units: 'paragraphs'})}</p>
                <p>{loremIpsum({count: 4, units: 'paragraphs'})}</p>


            </div>
        </div>
    )
  }

  export default About;
