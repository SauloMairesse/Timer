import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import GlobalStyle from './styles/globalStyle';
import userContext from './contexts/userContext';

import { Home } from './pages/Home';
import { TimerPage } from './pages/Timer';
import { ToDo } from './pages/ToDo';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  
  return (
    <>
      <GlobalStyle />
      
      <userContext.Provider value = {{ token, setToken, user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/timer' element={<TimerPage/>} />
            <Route path='/todo' element={<ToDo/>} />
          </Routes>
        </BrowserRouter>
      
      </userContext.Provider> 
    </>
  );
}

export default App;
