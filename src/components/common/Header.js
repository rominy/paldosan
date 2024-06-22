import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdSearch } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const HeaderContainer = styled.header`
  height: 70px;
  background-color: #222;
  display: flex;
  align-items: center;
  font-family: 'Kirang Haerang', cursive;

  .header-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    #logo {
      max-width: 120px;
      height: 28px;
    }
    
    ul {
      display: flex;
      align-items: center;

      li {
        cursor: pointer;
        padding: 4px;
        color: #E4EDEC;
        
        &:hover {
          color: #219FE3;
        }
      }
    } 
    
    .menu {
      font-size: 22px;
      
      li {
        margin: 0 14px;
      }
    }
    
    .member {
      font-size: 18px;
      
      #search-icon {
        font-size: 20px;
      }

      span {
        font-size: 20px;
      }

      .search-box {
        position: relative;
        margin: 0;
        font-size: 14px;

        span {
          position: absolute;
          /* left: 0; */
          right: 10px;
          bottom: 10px;
          font-size: 16px;
          color: #666;
        }
      }
    }
      
    li {
      margin: 0 10px;

      &:last-child {
        margin-right: 14px;
      }
    }
  }
`;

const SearchInput = styled.input`
  max-width: ${props => props.$isVisible ? '180px' : '0'};
  height: 32px;
  padding: ${props => props.$isVisible ? '2px 26px 2px 6px' : '0'}; 
  font-family: 'Noto Sans KR', sans-serif;
  border-radius: 5px;
  border: none;
  transition: max-width 0.3s ease-out;

  &::placeholder {
    font-size: 14px;
  }
`;

function Header(props) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [searchValue, setSearchValue] = useState('');
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

  // searchIcon 클릭 시(isSearchBoxVisible === true) input에 focus
  useEffect(() => {
    if (isSearchBoxVisible) {
      inputRef.current.focus();
    }
  }, [isSearchBoxVisible]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearchSubmit = () => {
    console.log('클릭');
  }

  return (
    <>
      <HeaderContainer>
        <nav className='header-inner'>
          <ul className='menu'>
            <li onClick={() => navigate('/')}>
              <img 
                id='logo' 
                src={`${process.env.REACT_APP_DATACENTER_URL}paldosan_logo-white.png`} 
                alt='logo' 
              />
            </li>
            <li onClick={() => navigate('/')}>소개</li>
            <li onClick={() => navigate('/map')}>지도</li>
          </ul>
          <ul className='member'>
            <li className='search-box'>
              <SearchInput
                ref={inputRef}
                $isVisible={isSearchBoxVisible}
                onChange={handleInputChange}
                value={searchValue}
                placeholder={isSearchBoxVisible ? '검색어를 입력하세요.' : null}
              />
              {searchValue && <span onClick={() => setSearchValue('')}><MdOutlineCancel /></span>}
            </li>
            <li 
              id='search-icon'
              onClick={searchValue ? handleSearchSubmit : () => setIsSearchBoxVisible(!isSearchBoxVisible)}
            >
              <IoMdSearch />
            </li>
            <li>로그인</li>
            <li>회원가입</li>
          </ul>
        </nav>
      </HeaderContainer>
      <Outlet />
    </>
  );
}

export default Header;