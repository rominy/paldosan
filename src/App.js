import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import { useEffect, useState } from 'react';
import FirstVisit from './components/FirstVisit';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import reset from "styled-reset";
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsFirstVisit(true);

      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <>
      {/* reset css */}
      <GlobalStyle />
      
      {isFirstVisit 
        ? <FirstVisit /> 
        :       
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Main />} />
          </Route>
      </Routes>
      }
    </>
  );
}

export default App;
