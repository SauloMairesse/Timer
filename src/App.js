import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import GlobalStyle from './styles/globalStyle';
import userContext from './contexts/userContext';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  
  return (
    <>
      <GlobalStyle />
      <userContext.Provider value = {{ token, setToken, user, setUser }}>
        
        <BrowserRouter>
          <Routes>
            {/* <Route path='/home' element={} /> */}
            {/* <Route path='/home' element={} /> */}
            {/* <Route path='/home' element={} /> */}
          </Routes>
        </BrowserRouter>
      
      </userContext.Provider> 
    </>
  );
}

export default App;
