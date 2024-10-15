import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { request, gql, Variables } from 'graphql-request';
import SpeedometerSVG from '../components/spedometer';
import classes from '../css/eulaChecker.module.css';
import FolderIcon from '../components/FolderSVG';

type AIResponseData = {
  aiResponse: {
    response: string;
    reasonablenessScore: number;
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
  // const [speed] = useState(50);
  const [reasonablenessScore, setReasonablenessScore] = useState<number>(0); // Initialize speed with a default value

  const [eulas, setEulas] = useState<Eula[]>([]);
  const [activeFolders, setActiveFolders] = useState<{
    [key: string]: boolean;
  }>({});
  const [fileContent, setFileContent] = useState<string | null>(null);

  const [activeEula, setActiveEula] = useState<Eula | null>(null);

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    let fullQuestion = question;

    if (activeEula) {
      fullQuestion += `\nEULA Description: ${activeEula.description}`;
    }

    const query = gql`
      mutation AuthenticatorResponse($question: String!) {
        aiResponse(question: $question) {
          response
          reasonablenessScore
        }
      }
    `;

    try {
      const data = await request<AIResponseData>(
        'http://localhost:4000/graphql',
        query,
        { question: fullQuestion },
        {
          credentials: 'include', // Ensures cookies are sent with requests
        }
      );
      setResponse(data.aiResponse.response);

      // Set speed based on reasonableness score
      const reasonablenessScore = data.aiResponse.reasonablenessScore;

      console.log(`EULA Reasonableness Score: ${reasonablenessScore}`);
      setReasonablenessScore(reasonablenessScore);
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
      fetchEulas();
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

  const deleteEula = async (id: string) => {
    const mutation = gql`
      mutation DeleteEula($id: ID!) {
        deleteEula(id: $id) {
          id
        }
      }
    `;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await request(
        'http://localhost:4000/graphql',
        mutation,
        { id },
        { Authorization: `Bearer ${token}` }
      );
      setEulas((prevEulas) => prevEulas.filter((eula) => eula.id !== id));
    } catch (error) {
      console.error('Error deleting EULA', error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/plain': ['.txt'] },
  });

  const toggleFolderColor = (id: string) => {
    const selectedEula = eulas.find((eula) => eula.id === id);
    setActiveEula(selectedEula || null);
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
                  {/* <p>{eula.description}</p> */}
                  <p>Status: {eula.status}</p>
                  <p>Created at: {new Date(eula.createdAt).toLocaleString()}</p>
                  <button
                    onClick={() => deleteEula(eula.id)}
                    className={classes['delete-button']}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No EULAs uploaded yet.</p>
        )}
      </div>

      <div className={classes['eula-checker-wrapper']}>
        <div className={classes['eulareader-container']}>
          {activeEula ? (
            <div>
              <h3>{activeEula.title}</h3>
              <p>{activeEula.description}</p>
              <p>Status: {activeEula.status}</p>
              {/* <p>Created at: {new Date(eula.createdAt).toLocaleString()}</p> */}
            </div>
          ) : (
            <p>Please select a EULA to the left, or upload a new .txt-file.</p>
          )}
        </div>

        <div className={classes['eulachecker-container']}>
          <div className={classes['eulachecker-header']}>
            <h1>EULA-CHECKER</h1>
            <SpeedometerSVG percentage={reasonablenessScore} />
          </div>

          <div className={classes['eulachecker-form']}>
            <label htmlFor='question'></label>
            <textarea
              placeholder='Is this eula reasonable?'
              className={classes['form-input']}
              value={question}
              onChange={handleInputChange}
              id='question'
              rows={5}
            />

            <button onClick={handleSubmit} className={classes['submit-button']}>
              Send
            </button>
            {response && (
              <div>
                <h2>Svar:</h2>
                <p className={classes['response']}>{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EulaChecker;
