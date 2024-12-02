import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import classes from '../About/About.module.css';
import cv from '../../assets/CV LINUS JOHANNESSON, CHAS, FULLSTACK JS.pdf';
import stack from '../../assets/Teknik-stack-Linus.jpg';
import sofia from '../../assets/sofia.png';
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
          i Stockholm. Jag söker Lia/praktik från Januari 2025. Jag drivs av att
          bygga produkter tillsammans genom att hitta hållbara lösningar som
          fungerar över tid och ger samhällsnytta. Jag har hög arbetsmoral och
          vill äga mina uppgifter i en miljö där man främjar individens
          kreativitet och utövar frihet under ansvar.
          <br /> <br />
          Jag är en stolt pappa till en dotter, fd sjukgymnast, vinnare av
          Streetdance SM 2004 med min grupp, ex Paris-bo och gitarr-fantast. På
          skolan har jag ofta tagit rollen som scrum-master och arbetsledare när
          det behövts. Jag har även hållit ett flertal{' '}
          <a
            className={classes['link']}
            href='https://www.linkedin.com/posts/chas-academy_chasacademy-itutbildning-versionshantering-activity-7242884215015436288-1mMD?utm_source=share&utm_medium=member_desktop'
            target='_blank'
          >
            Git-workshops
          </a>{' '}
          på skolan då det fanns önskemål om det. På jobbet uppskattar jag
          tydlighet, högt i tak och ett generöst givande och tagande mellan mig,
          kollegor och arbetsgivare. <br />
          <br />
          Jag har driv, och söker ett företag som vill förvalta det på ett bra
          sätt. Med vänlig hälsning, Linus Johannesson <br />
          <br />
          <div className={classes['contact-wrapper']}>
            <div>
              <a className={classes['link']} href='tel:+46707979238'>
                070-7979238
              </a>{' '}
              <br />
              <a className={classes['link']} href='mailto: Linusj555@gmail.com'>
                Linusj555@gmail.com
              </a>{' '}
            </div>
            <div className={classes['info-card']}>
              <button
                className={classes['link-button']}
                onClick={openImageModal}
              >
                My Tech Stack
              </button>

              <button className={classes['link-button']} onClick={openPdfModal}>
                View CV
              </button>
              <a target='blank' href='https://github.com/LimpanGH'>
                <button className={classes['link-button']}>Gihub</button>
              </a>
            </div>
          </div>
        </p>
      </div>

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
          that can help users understand what they sign. Using following
          techniques:
          {/* <div className={classes['list']}>
            <ul>
              <li className={classes['bold-list']}> Frontend</li>
              <li className={classes['bold-list']}>Backend</li>
              <li className={classes['bold-list']}>Database</li>
              <li className={classes['bold-list']}>Hosting</li>
              <li className={classes['bold-list']}>Domain</li>
            </ul>
            <ul>
              <li>Vite, React, Typescript.</li>
              <li>
                GraphQL, Mongoose, React, Typescript, Jsonwebtoken, Bcrypt,
                Express, OpenAI.
              </li>
              <li>Atlas MongoDB.</li>
              <li>AWS EC2 using Ngingx as webserver.</li>
              <li> GleSys.</li>
            </ul>
          </div> */}
          <p className={classes['features']}>
            <strong>Frontend:</strong> Vite, React, Typescript.{' '}
          </p>
          <p>
            <strong>Backend:</strong> GraphQL, Mongoose, React, Typescript,
            Jsonwebtoken, Bcrypt, Express, OpenAI.
          </p>
          <p>
            <strong>DB:</strong> Atlas MongoDB.
          </p>
          <p>
            <strong>Hosted</strong> on AWS EC2 using Ngingx as webserver.
          </p>
          <p>
            <strong>Domain-name</strong> GleSys.
          </p>
          {/* <p className={classes['features-title']}>Kommande Features:</p>
          <ul>
            <li>- Pandoc för konvertering av alla typer av dokument.</li>
            <li>- HTTPS med Let's Encrypt och Cron-job</li>
            <li>
              - System för Retrieval-Augmented Generation (RAG) med
              vektor-sökning
            </li>
            <li>
              - Utöka chat-funtionaliet så att man kan se alla frågor man ställt
              på en specifik EULA
            </li>
            <li>- GDPR kvalitetssäkring</li>
            <li>- WCAG kvalitetssäkring</li>
          </ul> */}
          <p className={classes['features-title']}>Future Features:</p>
          <ul className={classes['features-list']}>
            <li className={classes['feature-item']}>
              Pandoc for converting any type of document.
            </li>
            <li className={classes['feature-item']}>
              HTTPS with Let's Encrypt och Cron-job
            </li>
            <li className={classes['feature-item']}>
              System for Retrieval-Augmented Generation (RAG) with vektor-search
            </li>
            <li className={classes['feature-item']}>
              Expand chat-funktionality enabling user to see all questions
              previously asked regarding a EULA
            </li>
            <li className={classes['feature-item']}>GDPR-proofing</li>
            <li className={classes['feature-item']}>WCAG-proofing</li>
          </ul>
        </p>
      </div>
      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>Babster</h1>
          Chas Challenge is an annual event where students are given a task to
          solve in a limited time. This years topic was of course AI. A small
          team of Fullstack Javascripters like myself, a few .Net students and
          one UX-designers came together to create Babster. A service that helps
          parents to find information about food and allergies regarding their
          children. I was responsible for implementing the OpenAI API,
          promt-engineering, creating the chat-bot and chat-features aswell as
          many design features throughout the app. This project improved my
          technical skills, my ability to plan, structure and follow deadlines
          with standups and Jira aswell as my ability to work in a team with
          other developers. I enjoyed the challenge and the learning experience
          and realized that working together with others is a wonderful way to
          learn and grow.
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
          Yet another team project where we were to create a CI/CD pipeline for
          a Next.JS app. I was responsible for creating Dockerfiles for the
          Playwright tests and for the codebase, aswell as a YML file for
          running both images in a container locally where the tests tested the
          codebase. After that I integrated the pipeline in Github Actions, so
          that creating a pull-request triggers the pushed code to be tested
          with AWS CodeGuru. Confirming the Pullrequest then triggers the
          deployment to AWS Elastic Beanstalk. A fellow student was responsible
          for setting up the AWS Beanstalk aswell as adding authorization and
          authentication from AWS. This project improved my understanding of the
          CI/CD process, how to work with Docker, how to work with AWS and how
          to work with Github Actions. I enjoyed the challenge and the learning
          experience and was fascinated by the power of automation aswell as the
          wast posibilites with cloud.
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

      <div className={classes['about-content']}>
        <p className={classes['shouldaisign-text']}>
          <h1 className={classes.h1}>Portfolio Sofia Masrour</h1>
          <p>
            Sofia is an Stockholm Based architect who needs a website to
            showcase her work. I chose to build it with Vue to add skills to my
            repertoire. I am using Vite as a bundler. I also use the Vue Router
            to create a smooth user experience. I am learing a lot about Vue and
            how to work with it. I also learn how to work with a client and how
            to communicate with them to get the best result. Sofia already had a
            Figma when we started out so I had a good idea of what she wanted.
            It is very nice to to work with a designer and implement their
            design in code and I find it both easier and harder at the same time
            to have someone elses opinion on design than just my own. I am
            looking forward to the final result and I hope Sofia will be happy
            with it.
          </p>
          {/* <div className={classes['contact-wrapper']}> */}
          {/* <div className={classes['info-card']}> */}
          {/* <a target='blank' href='https://sofia-masrour.netlify.app/'>
                <button className={classes['link-button']}>Link</button>
              </a> */}
          <div className={classes['img-container']}>
            <a target='blank' href='https://sofia-masrour.netlify.app/'>
              <img
                className={classes['img-sofia']}
                src={sofia}
                alt='Sofias Portfolio'
              />
              <span className={classes['overlay-text']}>Click to View</span>
            </a>
          </div>
        </p>
      </div>
    </div>
  );
};

export default About;
