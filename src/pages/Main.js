import React from 'react';
import Map from '../components/Map';
import styled from 'styled-components';
import { IoIosArrowForward } from "react-icons/io";

const MainContainer = styled.section`
  width: 100%;
  height: calc(100vh - 70px);
  background-image: url('https://raw.githubusercontent.com/rominy/data-center/main/images/paldosan_main-bg2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  
  .main-info {
    height: 36%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(34, 34, 34, 0.1);
    color: #fff;
    overflow: hidden;

    p {
      font-size: 36px;
    }

    button {
      margin-top: 16px;
      padding: 4px 8px;
      display: flex;
      align-items: end;
      font-size: 24px;
      background-color: transparent;
      border: none;

      &:hover {
        opacity: 0.5;
      }

      span {
        width: 0.7em;
      }
    }
  }
`;

function Main(props) {
  
  return (
    <MainContainer>
      <div className='main-info'>
        <p>전국 팔도의 산을 담다.</p>
        <button>더 알아 보기 <span><IoIosArrowForward /></span></button>
      </div>
    </MainContainer>
  );
}

export default Main;