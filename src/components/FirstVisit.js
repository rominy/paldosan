import React, { useState } from 'react';
import Main from '../pages/Main';
import styled from 'styled-components';

const FirstVisitContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .title-box {
    max-width: 1200px;
    height: 300px;
    text-align: center;
  }
`;

function FirstVisit(props) {
  const [showScreen, setShowScreen] = useState(false);

  useState(() => {
    const timer = setTimeout(() => {
      setShowScreen(true);
    }, 3000);

    return () => clearTimeout(timer)
  }, []);

  if (showScreen) {
    return <Main />
  }

  return (
    <FirstVisitContainer>
      <div className='title-box'> 
        <h3>전국 팔도의 산을 담다.</h3>
        <h1>팔 도 산</h1>
      </div>
    </FirstVisitContainer>
  );
}

export default FirstVisit;