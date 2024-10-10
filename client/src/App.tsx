import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { request, gql } from 'graphql-request';
import './App.css';
import SpeedometerSVG from './spedometer';

import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';

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

// type login = {
//   login: {
//     email: string;
//     password: string;
//   };
// };

function App() {
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
    console.log('ondrop');
    const file = acceptedFiles[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result?.toString() || '';
        console.log('File content:', text);
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
      console.log('Saving EULA to DB:', { title: fileName, description: text });

      const data = await request<AddEulaData>(
        'http://localhost:4000/graphql',
        mutation,
        {
          title: fileName,
          description: text,
          status: 'uploaded',
        }
      );

      console.log('EULA saved to DB:', data.addEula.id);
    } catch (error) {
      console.error('Error saving EULA', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
  });

  // const Login = async () => {
  //   const data = await request<login>(
  //     'http://localhost:4000/graphql',
  //     mutation,
  //     {
  //       email: '  ',
  //       password: 'password',
  //     }
  //   );
  // };

  return (
    <>
      <div>
        {/* <button onClick={Login}>Logga in</button> */}
        <h1>EULA-CHECKER</h1>
        <SpeedometerSVG percentage={speed} />
        <label htmlFor='question'>
          Ställ din fråga
          <input
            type='text'
            value={question}
            onChange={handleInputChange}
            id='question'
          />
        </label>
        <button onClick={handleSubmit}>Skicka</button>
        {response && (
          <div>
            <h2>Svar:</h2>
            <p>{response}</p>
          </div>
        )}

        <div
          {...getRootProps({
            style: {
              transform: isDragActive ? 'scale(1.5)' : 'scale(1)',
              border: '2px dashed #000',
              padding: '20px',
              marginTop: '20px',
              textAlign: 'center',
            },
          })}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? 'Drop here'
            : 'Drag and drop a .txt file here, or click to select a file'}
          {/* <p>Drag and drop a .txt file here, or click to select a file</p> */}
        </div>

        {fileContent && (
          <div>
            <h2>File Content</h2>
            <pre>{fileContent}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
