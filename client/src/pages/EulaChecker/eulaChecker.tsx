import { gql, request, Variables } from 'graphql-request';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FolderIcon from '../../components/FolderSVG';
// import SpeedometerSVG from '../components/spedometer';
// import sideBarIcon from '../../assets/sidebar-hide-svgrepo-com.svg';
import classes from '../EulaChecker/eulaChecker.module.css';

const jwtToken = 'token'; // Name of the token in local storage
const token = localStorage.getItem(jwtToken); // Check if the token exists

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
  // const [reasonablenessScore, setReasonablenessScore] = useState<number>(0); // Initialize speed with a default value
  const [eulas, setEulas] = useState<Eula[]>([]);
  const [activeFolders, setActiveFolders] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeEula, setActiveEula] = useState<Eula | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  // const apiUrl = 'http://54.221.26.10:4000/graphql'; // Corrected URL
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

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
      return;
    }
    try {
      const data = await request<EulaData, Variables>(
        // 'http://localhost:4000/graphql',
        apiUrl,
        query,
        {},
        { Authorization: `Bearer ${token}` }
      );
      console.log(data.getAllEulas);
      setEulas(data.getAllEulas);
    } catch (error) {
      console.error('Error fetching EULAs', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        console.log('Token might be expired. Redirecting to login...');
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
        // 'http://localhost:4000/graphql',
        apiUrl,
        query,
        { question: fullQuestion },
        {
          credentials: 'include',
        }
      );
      setResponse(data.aiResponse.response);
      // const reasonablenessScore = data.aiResponse.reasonablenessScore;
      // console.log(`EULA Reasonableness Score: ${reasonablenessScore}`);
      // setReasonablenessScore(reasonablenessScore);
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
      await request<AddEulaData>(
        // 'http://localhost:4000/graphql',
        apiUrl,
        mutation,
        {
          title: fileName,
          description: text,
          status: 'uploaded',
        }
      );
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
        // 'http://localhost:4000/graphql',
        apiUrl,
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
    setActiveFolders((prev) => {
      const newActiveFolders = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as { [key: string]: boolean });

      newActiveFolders[id] = !prev[id];

      return newActiveFolders;
    });

    const selectedEula = eulas.find((eula) => eula.id === id);
    setActiveEula(selectedEula || null);
  };

  useEffect(() => {
    fetchEulas();
  }, []);

  return (
    <>
      <div className={classes['container']}>
        {/* Eulas ---------------- ⬇️*/}
        {/* <div className={classes['eula-list-wrapper']}> */}
        <div
          className={`${classes['eula-list']} ${
            isSidebarOpen ? classes['open'] : ''
          }`}
        >
          <button
            className={classes['close-sidebar-btn']}
            onClick={toggleSidebar}
          >
            x
          </button>
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
          {/* <h2>Your EULAs</h2> */}
          <div>
            {!token ? (
              <h2 className={classes['h2']}>
                Please log in to see your EULAs.
              </h2>
            ) : (
              <div>
                <h2>Your EULAS</h2>
              </div>
            )}
          </div>
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
                    <p>
                      Created at:{' '}
                      {new Date(Number(eula.createdAt)).toString() !==
                      'Invalid Date'
                        ? new Date(Number(eula.createdAt)).toLocaleString()
                        : 'N/A'}
                    </p>
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
        {/* </div> */}
        {/* Eulas ---------------- ⬆️*/}

        {/* Eula Checker ---------------- ⬇️*/}

        <div className={classes['eula-checker-wrapper']}>
          <div className={classes['eulareader-container']}>
            {activeEula ? (
              <div>
                <h3>{activeEula.title}</h3>
                <p>{activeEula.description}</p>
                <p>Status: {activeEula.status}</p>
              </div>
            ) : (
              <p>
                Please select a EULA or upload a new .txt-file.
            
                <FolderIcon className={classes['folder-icon-welcome']} /> <br />
              </p>
            )}
          </div>

          <div className={classes['eulachecker-container']}>
            <div className={classes['eulachecker-header']}>
              <h1>Analyse selected EULA</h1>
              {/* <SpeedometerSVG percentage={reasonablenessScore} /> */}
            </div>

            <div className={classes['eulachecker-form']}>
              <label htmlFor='question'></label>
              <textarea
                className={classes['form-input']}
                // placeholder='Is this eula reasonable?'
                // value={question}
                defaultValue='Is this eula reasonable?'
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && question.trim() !== '') {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
                id='question'
                rows={5}
              />

              {/* <button className={classes['kebab-menu']} onClick={toggleSidebar}>
                <img
                  src={sideBarIcon}
                  className={classes['sidebar-icon']}
                  alt='LinkedIn'
                />
              </button> */}

              <div className={classes['foldericon-and-sendbutton-wrapper']}>
                {/* <div className={classes['foldericon-and-sendbutton']}> */}

                <button
                  onClick={toggleSidebar}
                  className={classes['folder-icon-button']}
                >
                  <FolderIcon className={classes['folder-icon']} />
                </button>

                <button
                  onClick={handleSubmit}
                  className={classes['submit-button']}
                >
                  Send
                </button>
                {/* </div> */}
              </div>
            </div>
            {response && (
              <div>
                <h2>Svar:</h2>
                <p className={classes['response']}>{response}</p>
              </div>
            )}
          </div>
        </div>
        {/* Eula Checker ---------------- ⬆️*/}
      </div>
    </>
  );
}

export default EulaChecker;
