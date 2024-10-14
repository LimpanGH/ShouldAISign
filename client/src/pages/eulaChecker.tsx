import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { request, gql, Variables } from 'graphql-request';
import SpeedometerSVG from '../components/spedometer';
import classes from '../css/eulaChecker.module.css';
import FolderIcon from '../components/FolderSVG';

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

type Eula = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

type EulaData = {
  getAllEulas: Eula[];
};

function EulaChecker() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [speed] = useState(50);
  const [eulas, setEulas] = useState<Eula[]>([]);
  const [activeFolders, setActiveFolders] = useState<{
    [key: string]: boolean;
  }>({});

  const [fileContent, setFileContent] = useState<string | null>(null);

  const fetchEulas = async () => {
    const query = gql`
      query GetAllEulas {
        getAllEulas {
          id
          title
          description
          status
          createdAt
        }
      }
    `;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User might need to log in.');
      // Redirect to login page or handle unauthorized state
      return;
    }

    try {
      const data = await request<EulaData, Variables>(
        'http://localhost:4000/graphql',
        query,
        {},
        { Authorization: `Bearer ${token}` }
      );

      setEulas(data.getAllEulas);
    } catch (error) {
      console.error('Error fetching EULAs', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        // Handle unauthorized error (e.g., redirect to login)
        console.log('Token might be expired. Redirecting to login...');
        // Implement redirect logic here
      }
    }
  };

  useEffect(() => {
    fetchEulas();
  }, []);

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

  const toggleFolderColor = (id: string) => {
    setActiveFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchEulas();
  }, []);

  return (
    <>
      <div className={classes['eula-list']}>
        <h2>Your EULAs</h2>
        {eulas.length > 0 ? (
          <ul>
            {eulas.map((eula) => (
              <li
                className={classes['eula-cards']}
                key={eula.id}
                onClick={() => toggleFolderColor(eula.id)}
              >
                <FolderIcon
                  className={`${classes['folder-icon']} ${
                    activeFolders[eula.id] ? classes.active : ''
                  }`}
                  active={activeFolders[eula.id]}
                />

                <div>
                  <h3>{eula.title}</h3>
                  <p>{eula.description}</p>
                  <p>Status: {eula.status}</p>
                  <p>Created at: {new Date(eula.createdAt).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No EULAs uploaded yet.</p>
        )}
      </div>
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
    </>
  );
}

export default EulaChecker;

