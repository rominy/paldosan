import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  margin-bottom: 60px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;

  #logo {
    max-width: 120px;
    height: 50px;
    cursor: pointer;
  }
`;

function Header(props) {
  return (
    <>
      <HeaderContainer>
        <a href='/'>
          <img id='logo' src='https://github.com/rominy/data-center/blob/main/images/paldosan_logo.png?raw=true' alt='logo' />
        </a>
      </HeaderContainer>
      <Outlet />
    </>
  );
}

export default Header;