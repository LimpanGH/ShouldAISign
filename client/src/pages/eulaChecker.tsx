// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { request, gql } from 'graphql-request';
// import SpeedometerSVG from '../spedometer';
// import classes from '../css/eulaChecker.module.css';

// type AIResponseData = {
//   aiResponse: {
//     response: string;
//   };
// };

// type AddEulaData = {
//   addEula: {
//     id: string;
//   };
// };

// function EulaChecker() {
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [speed] = useState(50);
//   const [fileContent, setFileContent] = useState<string | null>(null);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setQuestion(event.target.value);
//   };

//   const handleSubmit = async () => {
//     const query = gql`
//       mutation AuthenticatorResponse($question: String!) {
//         aiResponse(question: $question) {
//           response
//         }
//       }
//     `;

//     try {
//       const data = await request<AIResponseData>(
//         'http://localhost:4000/graphql',
//         query,
//         { question },
//         {
//           credentials: 'include', // Ensures cookies are sent with requests
//         }
//       );
//       setResponse(data.aiResponse.response);
//     } catch (error) {
//       console.error('Error fetching AI response', error);
//     }
//   };

//   const onDrop = async (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];

//     if (file && file.type === 'text/plain') {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const text = e.target?.result?.toString() || '';
//         setFileContent(text);
//         await saveEulaToDB(text, file.name);
//       };
//       reader.readAsText(file);
//     } else {
//       console.error('Please drop a .txt file');
//     }
//   };

//   const saveEulaToDB = async (text: string, fileName: string) => {
//     const mutation = gql`
//       mutation AddEula(
//         $title: String!
//         $description: String!
//         $status: String!
//       ) {
//         addEula(title: $title, description: $description, status: $status) {
//           id
//         }
//       }
//     `;

//     try {
//       await request<AddEulaData>('http://localhost:4000/graphql', mutation, {
//         title: fileName,
//         description: text,
//         status: 'uploaded',
//       });
//     } catch (error) {
//       console.error('Error saving EULA', error);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: { 'text/plain': ['.txt'] },
//   });

//   return (
//     <div className='eulachecker-container'>
//       <div className='eulachecker-header'>
//         <h1>EULA-CHECKER</h1>
//         <SpeedometerSVG percentage={speed} />
//       </div>

//       <div className='eulachecker-form'>
//         <label htmlFor='question'>
//           Ställ din fråga
//           <input
//             type='text'
//             className='form-input'
//             value={question}
//             onChange={handleInputChange}
//             id='question'
//           />
//         </label>
//         <button onClick={handleSubmit} className='submit-button'>
//           Skicka
//         </button>
//         {response && (
//           <div>
//             <h2>Svar:</h2>
//             <p>{response}</p>
//           </div>
//         )}
//       </div>

//       <div
//         {...getRootProps({
//           className: `dropzone ${isDragActive ? 'active' : ''}`,
//         })}
//       >
//         <input {...getInputProps()} />
//         {isDragActive
//           ? 'Drop here'
//           : 'Drag and drop a .txt file here, or click to select a file'}
//       </div>

//       {fileContent && (
//         <div className='file-content'>
//           <h2>File Content</h2>
//           <pre>{fileContent}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EulaChecker;

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { request, gql } from 'graphql-request';
import SpeedometerSVG from '../spedometer';
import classes from '../css/eulaChecker.module.css';

type AIResponseData = {
  aiResponse: {
    response: string;
  };
};

type AddEulaData = {
  addEula: {
    id: string;
  };
};

function EulaChecker() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [speed] = useState(50);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    const query = gql`
      mutation AuthenticatorResponse($question: String!) {
        aiResponse(question: $question) {
          response
        }
      }
    `;

    try {
      const data = await request<AIResponseData>(
        'http://localhost:4000/graphql',
        query,
        { question },
        {
          credentials: 'include', // Ensures cookies are sent with requests
        }
      );
      setResponse(data.aiResponse.response);
    } catch (error) {
      console.error('Error fetching AI response', error);
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result?.toString() || '';
        setFileContent(text);
        await saveEulaToDB(text, file.name);
      };
      reader.readAsText(file);
    } else {
      console.error('Please drop a .txt file');
    }
  };

  const saveEulaToDB = async (text: string, fileName: string) => {
    const mutation = gql`
      mutation AddEula(
        $title: String!
        $description: String!
        $status: String!
      ) {
        addEula(title: $title, description: $description, status: $status) {
          id
        }
      }
    `;

    try {
      await request<AddEulaData>('http://localhost:4000/graphql', mutation, {
        title: fileName,
        description: text,
        status: 'uploaded',
      });
    } catch (error) {
      console.error('Error saving EULA', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
  });

  return (
    <div className={classes['eulachecker-container']}>
      <div className={classes['eulachecker-header']}>
        <h1>EULA-CHECKER</h1>
        <SpeedometerSVG percentage={speed} />
      </div>

      <div className={classes['eulachecker-form']}>
        <label htmlFor='question'>
          <input
            placeholder='Ask your question'
            type='text'
            className={classes['form-input']}
            value={question}
            onChange={handleInputChange}
            id='question'
          />
        </label>
        <button onClick={handleSubmit} className={classes['submit-button']}>
          Send
        </button>
        {response && (
          <div>
            <h2>Svar:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>

      <div
        {...getRootProps({
          className: `${classes.dropzone} ${
            isDragActive ? classes.active : ''
          }`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive
          ? 'Drop here'
          : 'Drag and drop a .txt file here, or click to select a file'}
      </div>

      {fileContent && (
        <div className={classes['fileContent']}>
          <h2>File Content</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
}

export default EulaChecker;
