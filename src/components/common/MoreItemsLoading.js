import React from 'react';
import * as LottiePlayer from "@lottiefiles/lottie-player";
import styled from 'styled-components';

const MoreItemsLoadingContainer = styled.div`
  height: 105px;
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


function MoreItemsLoading(props) {
  return (
    <MoreItemsLoadingContainer>
      <lottie-player 
        autoplay
        loop
        src="https://lottie.host/35868229-ee86-49e3-80dc-6329ec4664d6/0FwmHiYSzd.json"
        style={{ height: '100px', width: '100px' }}
      />
      <div className='text-box'>
        <p>더 불러오는 중입니다.</p>  
      </div> 
    </MoreItemsLoadingContainer>
  );
}

export default MoreItemsLoading;