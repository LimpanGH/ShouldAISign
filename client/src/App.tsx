import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import EulaChecker from './pages/eulaChecker';

import './App.css';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/eula-checker' element={<EulaChecker />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
