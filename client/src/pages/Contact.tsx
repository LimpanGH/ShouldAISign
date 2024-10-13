import { loremIpsum } from 'lorem-ipsum';

const Contact = () => {
  return (
    <div>
      <h1>Contact</h1>
      <div>
        <p>{loremIpsum({ count: 4, units: 'paragraphs' })}</p>
      </div>
    </div>
  );
};

export default Contact;
