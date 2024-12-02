import { gql, request, Variables } from 'graphql-request';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import FolderIcon from '../../components/SVG/FolderSVG';
import FolderIcon2 from '../../components/SVG/FolderSVG2';
// import SpeedometerSVG from '../components/spedometer';
// import sideBarIcon from '../../assets/sidebar-hide-svgrepo-com.svg';
import classes from '../EulaChecker/eulaChecker.module.css';
import { jwtDecode } from 'jwt-decode';
// import CloseCircleIcon from '../../components/SVG/CollapseSVG';
import CloseCircleIcon from '../../components/SVG/CollapseSVG';
import ExpandCircleIcon from '../../components/SVG/ExpandSVG';

// const jwtToken = 'token';
// const token = localStorage.getItem(jwtToken);



type DecodedToken = {
  userId: string;
  exp: number;
  iat: number;
};

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
  // getAllEulas: Eula[];
  getEulasAssignedToUserId: Eula[];
};

function EulaChecker() {
  const [userId, setUserId] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  // const [reasonablenessScore, setReasonablenessScore] = useState<number>(0); // Initialize speed with a default value
  const [eulas, setEulas] = useState<Eula[]>([]);
  const [activeFolders, setActiveFolders] = useState<{
    [key: string]: boolean;
  }>({});
  const [activeEula, setActiveEula] = useState<Eula | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // const apiUrl = 'http://54.221.26.10:4000/graphql';
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        // console.log('Decoded Token:', decoded);
        setUserId(decoded.userId); // Extract user ID
        if (decoded.exp * 1000 < Date.now()) {
          console.warn('Token has expired. Redirecting to login...');
          localStorage.removeItem('token');
          // Redirect user to login page
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.warn('No token found in localStorage');
    }
  }, []);
  // console.log('Logged in User ID:', userId);

  // console.log('Token:', token);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  const fetchEulas = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const query = gql`
      query GetEulasAssignedToUserId($assignedTo: ID!) {
        getEulasAssignedToUserId(assignedTo: $assignedTo) {
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
        apiUrl,
        query,
        { assignedTo: userId }, // Pass userId here
        { Authorization: `Bearer ${token}` }
      );
      // console.log('Fetched EULAs:', data.getEulasAssignedToUserId);
      setEulas(data.getEulasAssignedToUserId);
    } catch (error) {
      console.error('Error fetching EULAs:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        console.log('Token might be expired. Redirecting to login...');
      }
    }
  };

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
        alert('EULA saved to your account!');
      };
      reader.readAsText(file);
      fetchEulas();
    } else {
      console.error('Please drop a .txt file');
    }
  };

  const saveEulaToDB = async (text: string, fileName: string) => {
    const mutation = gql`
      mutation addEulaToUserId(
        $title: String!
        $description: String!
        $status: String!
        $assignedTo: ID!
      ) {
        addEula(
          title: $title
          description: $description
          status: $status
          assignedTo: $assignedTo
        ) {
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
          assignedTo: userId,
        }
      );
    } catch (error) {
      console.error('Error saving EULA', error);
    }
    fetchEulas();
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
    //   fetchEulas();
    // }, []);
    if (userId) {
      fetchEulas(); // Fetch EULAs assigned to the current user
    }
  }, [userId]);



  return (
    <>
      <div className={classes['container']}>
        {/* Eulas ---------------- ⬇️*/}
        {/* <div className={classes['eula-list-wrapper']}> */}
        <div
          ref={sidebarRef} // Attach the ref to the sidebar
          className={`${classes['eula-list']} ${
            isSidebarOpen ? classes['open'] : ''
          }`}
        >
          <button
            className={classes['close-sidebar-btn']}
            onClick={toggleSidebar}
          >
            X
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
          <h2>Your EULAs</h2>
          {/* <div>
            {!token ? (
              <h2 className={classes['h2']}>
                Please log in to see your EULAs.
              </h2>
            ) : (
              <div>
                <h2>Your EULAS</h2>
              </div>
            )}
          </div> */}
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
          <div>
            {isCollapsed ? (
              <ExpandCircleIcon
                width='24'
                height='24'
                fill=''
                onClick={toggleCollapse}
                className={classes['collapse-btn']}
              >
                {isCollapsed ? 'Expand' : 'Collapse'}{' '}
              </ExpandCircleIcon>
            ) : (
              <CloseCircleIcon
                width='24'
                height='24'
                fill=''
                onClick={toggleCollapse}
                className={classes['collapse-btn']}
              >
                {isCollapsed ? 'Expand' : 'Collapse'}{' '}
              </CloseCircleIcon>
            )}
          </div>

          <div
            className={`${classes['eulareader-container']} ${
              isCollapsed ? classes.collapse : ''
            }`}
          >
            {activeEula ? (
              <div>
                <h3>{activeEula.title}</h3>
                <p>{activeEula.description}</p>
                <p>Status: {activeEula.status}</p>
              </div>
            ) : (
              <p>
                Please select a EULA or upload a new .txt-file.
                <br />
                The Eula will be displayed here once selected.
                {/* <FolderIcon className={classes['folder-icon-welcome']} /> <br /> */}
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
                  <FolderIcon2
                    color='black'
                    className={classes['folder-icon']}
                  />
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
                {/* // <div className={classes['response-area']}> */}
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
