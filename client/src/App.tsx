import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import {SignIn} from './pages/SignIn';
import SignUp from './pages/SignUp';
import EulaChecker from './pages/eulaChecker';

import './App.css';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/eula-checker' element={<EulaChecker />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
