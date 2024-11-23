import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import classes from '../About/About.module.css';
import cv from '../../assets/CV LINUS JOHANNESSON, CHAS, FULLSTACK JS.pdf';
import stack from '../../assets/Teknik-stack-Linus.jpg';
// import { LoremIpsum } from 'lorem-ipsum';

const About = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  // const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  // const navigate = useNavigate();

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // const openVideoModal = () => {
  //   setIsVideoModalOpen(true);
  // };

  // const closeVideoModal = () => {
  //   setIsVideoModalOpen(false);
  // };

  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  // const goToCVPage = () => {
  //   navigate('/cv');
  // };
  return (
    <div className={classes['about-container']}>
      {/* <section className={classes['about-content']}> */}
      {/* <div className={classes['shouldaisign-text']}> */}
      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>About Me</h1>
          
            Hej! <br></br>Jag heter Linus Johannesson och läser Fullstack
            Javascript på {''}
            <a
              className={classes['link']}
              href='https://chasacademy.se/program/fullstackutvecklare-javascript'
              target='_blank'
            >
              Chas Academy
            </a>{' '}
          
          
            i Stockholm. Jag söker Lia/praktik från Januari 2025. Jag drivs av
            att bygga produkter tillsammans genom att hitta hållbara lösningar
            som fungerar över tid och ger samhällsnytta. Jag har hög arbetsmoral
            och vill äga mina uppgifter i en miljö där man främjar individens
            kreativitet och utövar frihet under ansvar.
          <br />  <br />       
            Jag är en stolt pappa till en dotter, fd sjukgymnast, vinnare av
            Streetdance SM 2004 med min grupp, ex Paris-bo och gitarr-fantast.
            På skolan har jag ofta tagit rollen som scrum-master och
            arbetsledare när det behövts. Jag har även hållit ett flertal
            Git-workshops på skolan då det fanns önskemål om det. På jobbet
            uppskattar jag tydlighet, högt i tak och ett generöst givande och
            tagande mellan mig, kollegor och arbetsgivare.{' '}
          {' '}
          <br /><br />
            Jag har driv, och söker ett företag som vill förvalta det på ett bra
            sätt. Med vänlig hälsning, Linus Johannesson{' '}
          
          <br /><br />
          <a className={classes['link']} href='tel:+46707979238'>
            070-7979238
          </a>{' '}
          <br />
          <a className={classes['link']} href='mailto: Linusj555@gmail.com'>
            Linusj555@gmail.com
          </a>{' '}
          <div className={classes['info-card']}>
            <button className={classes['link-button']} onClick={openImageModal}>
              My Tech Stack
            </button>

            {/* <button
                className={classes['link-button']}
                onClick={openVideoModal}
                >
                View demo of Babster
                </button> */}

            <button className={classes['link-button']} onClick={openPdfModal}>
              View and download CV
            </button>

            {/* <button className={classes['link-button']} onClick={goToCVPage}>
                View and download CV
                </button> */}
          </div>
        </p>
      </div>
      {/* </section> */}

      {/* <div className={classes['separator']}></div> */}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className={classes.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeImageModal();
            }
          }}
        >
          <div className={classes.modalContent}>
            <span className={classes.close} onClick={closeImageModal}>
              &times;
            </span>
            <img src={stack} alt='Stack' className={classes['modal-image']} />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {/* {isVideoModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <span className={classes.close} onClick={closeVideoModal}>
              &times;
            </span>
            <div className={classes['modal-video']}>
              <iframe
                src='https://player.vimeo.com/video/1023662662?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
                style={{ width: '100%', height: '100%' }}
                title='Demo Babster 2024-06-04'
              ></iframe>
            </div>
          </div>
        </div>
      )} */}

      {/* PDF Viewer */}
      {isPdfModalOpen && (
        <div className={classes.modal} onClick={closePdfModal}>
          <div className={classes.modalContent}>
            <span className={classes.close} onClick={closePdfModal}>
              &times;
            </span>
            {/* <div className={classes['modal-pdfViewer']}> */}
            {/* <iframe src={cv} width='100%' height='500px' title='PDF Viewer'> */}
            <iframe src={cv} className={classes['iframe']} title='PDF Viewer'>
              This browser does not support PDFs. Please download the PDF to
              view it:
              <a href={cv} download>
                Download PDF
              </a>
              .
            </iframe>
            {/* </div> */}
          </div>
        </div>
      )}
      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>ShouldAISign</h1>
          Combining my current passion-project with an about me section. User
          agreements are hard to grasp and that inspired me to develop a service
          that can help users understand what they sign. Frontend: Vite, React,
          Typescript. Backend: GraphQL, Mongoose, React, Typescript,
          Jsonwebtoken, Bcrypt, Express, OpenAI. DB: Atlas MongoDB. Hosted on
          AWS EC2 using Ngingx as webserver. Domain-name from GleSys.
        </p>
      </div>
      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>Babster</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          sapiente pariatur quos aliquam quia temporibus ullam ipsam similique
          minima placeat laborum ratione veniam totam nemo! Sapiente aliquid
          temporibus, repudiandae officiis, dolorem dignissimos, quo suscipit
          totam quidem repellendus facilis sunt sint sequi provident quam ipsam
          praesentium illum? Ipsa, amet soluta nam laudantium, ratione eum iure
          deleniti aperiam inventore excepturi officiis et magni aliquid. Et
          delectus in odit, expedita quaerat nostrum fugit consectetur
          accusamus? Laborum dolor
          <div className={classes['test']}>
            <iframe
              className={classes['iframe']}
              src='https://player.vimeo.com/video/1023662662?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
              style={{ width: '100%', height: '100%' }}
              title='Demo Babster 2024-06-04'
            ></iframe>
          </div>
        </p>
      </div>
      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>CI/Cd</h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          sapiente pariatur quos aliquam quia temporibus ullam ipsam similique
          minima placeat laborum ratione veniam totam nemo! Sapiente aliquid
          temporibus, repudiandae officiis, dolorem dignissimos, quo suscipit
          totam quidem repellendus facilis sunt sint sequi provident quam ipsam
          praesentium illum? Ipsa, amet soluta nam laudantium, ratione eum iure
          deleniti aperiam inventore excepturi officiis et magni aliquid. Et
          delectus in odit, expedita quaerat nostrum fugit consectetur
          accusamus? Laborum dolor
          <div className={classes['test']}>
            <iframe
              className={classes['iframe']}
              src='https://player.vimeo.com/video/1029596745?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58480'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture; clipboard-write'
              style={{ width: '100%', height: '100%' }}
              title='Demo CI/CD 2024-10-15'
            ></iframe>
          </div>
        </p>
      </div>
    </div>
  );
};

export default About;
