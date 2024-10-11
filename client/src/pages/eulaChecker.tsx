import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { request, gql } from 'graphql-request';
// import { convertFileWithPandoc } from '../../../server/src/db/pandoc/pandoc'; // Import the pandoc function

import SpeedometerSVG from '../spedometer';

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

type ConvertFileResponse = {
  convertFileWithPandoc: {
    convertedContent: string;
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
    console.log('ondrop');
    const file = acceptedFiles[0];

    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result?.toString() || '';
        console.log('File content:', text);
        setFileContent(text);

        // Send file content to backend for Pandoc conversion
        await convertFileOnBackend(text, file.name);
        await saveEulaToDB(text, file.name);
      };
      reader.readAsText(file);
    } else {
      console.error('Please drop a .txt file');
    }
  };

  const convertFileOnBackend = async (text: string, fileName: string) => {
    const mutation = gql`
      mutation ConvertFile($fileContent: String!, $fileName: String!) {
        convertFileWithPandoc(fileContent: $fileContent, fileName: $fileName) {
          convertedContent
        }
      }
    `;

    try {
      const data = await request<ConvertFileResponse>('http://localhost:4000/graphql', mutation, {
        fileContent: text,
        fileName,
      });
      console.log(
        'Converted file content:',
        data.convertFileWithPandoc.convertedContent
      );
    } catch (error) {
      console.error('Error converting file on backend', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
  });

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

  return (
    <>
      <div>
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
      <a href='/'>Home</a>
      <br></br>
      <a href='/login'>Login</a>
      <br></br>
      <a href='/signup'>Sign Up</a>
    </>
  );
}

export default EulaChecker;
