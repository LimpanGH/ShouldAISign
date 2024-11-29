import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './helpers/AutContext';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { SignIn } from './pages/User-account/SignIn';

import SignUp from './pages/User-account/SignUp';
import EulaChecker from './pages/EulaChecker/eulaChecker';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import CVPage from './pages/CVPage/cvPage';

import './App.css';

function App() {
  const { isAuthenticated } = useAuth(); // Get auth state

  return (
    <div className='app-container'>
      <NavBar />
      <div className='pages-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/signin'
            element={
              !isAuthenticated ? <SignIn /> : <Navigate to='/eula-checker' />
            }
          />
          <Route
            path='/signup'
            element={!isAuthenticated ? <SignUp /> : <Navigate to='/' />}
          />
          <Route
            path='/eula-checker'
            element={
              isAuthenticated ? <EulaChecker /> : <Navigate to='/signin' />
            }
          />
          <Route path='/about' element={<About />} />
          <Route path='/cv-page' element={<CVPage />} />
        </Routes>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
