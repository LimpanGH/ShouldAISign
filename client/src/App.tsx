import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { SignIn } from './pages/SignIn';
import SignUp from './pages/SignUp';
import EulaChecker from './pages/eulaChecker';
import About from './pages/About';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Contact from './pages/Contact';

import './App.css';

// function App() {
//   return (
//     <>
//       <div>
//         <NavBar />
//       </div>

//       <div className='pages-container'>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/signin' element={<SignIn />} />
//           <Route path='/signup' element={<SignUp />} />
//           <Route path='/eula-checker' element={<EulaChecker />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/contact' element={<Contact />} />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <div className="pages-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/eula-checker' element={<EulaChecker />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <div className='footer-container'>
      <Footer />
      </div>
    </div>
  );
}

export default App;