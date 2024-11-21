import cv from '../../assets/CV LINUS JOHANNESSON, CHAS, FULLSTACK JS.pdf';
import classes from './cvPage.module.css';

const CVPage = () => {
  return (
    <div className={classes['cv-wrapper']}>

      <div>
        <iframe
          src={cv}
          className={classes['iframe']}
          title='PDF Viewer'
          allowFullScreen
        >
          {/* <a href={cv} download>
            Download PDF
          </a> */}
          .
        </iframe>
      </div>
    </div>
    

    // <div>
    //   <iframe
    //     src={cv}
    //     className={classes['iframe']}
    //     title='PDF Viewer'
    //     allowFullScreen
    //   ></iframe>
    // </div>
  );
};

export default CVPage;
