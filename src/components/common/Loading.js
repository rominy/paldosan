import React from 'react';
import * as LottiePlayer from "@lottiefiles/lottie-player";
import styled from 'styled-components';

const LoadingContainer = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .text-box {
    text-align: center;
    font-weight: bold;
    font-size: 13px;

    p {
      padding: 6px 0;
    }
  }
`;

function Loading({ region }) {
  return (
    <LoadingContainer>
      <lottie-player 
        autoplay
        loop
        src="https://lottie.host/34f84681-42f6-48c8-9c64-7a7af5d07191/NFMlU1F7ml.json"
        style={{ height: '100px', width: '100px' }}
      />
      <div className='text-box'>
        <p>{region}의 산 정보를 불러오는 중 입니다.</p>
        <p>잠시만 기다려주세요!</p>  
      </div> 
    </LoadingContainer>
  );
}

export default Loading;