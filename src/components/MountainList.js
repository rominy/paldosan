import React from 'react';
import styled from 'styled-components';

const MountainListContainer = styled.div`

  .inner {
    padding: 12px;
    display: flex;
    /* align-items: center; */
    border-bottom: 1px solid #ccc;

    img {
      min-width: 140px;
      max-width: 140px;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  .info-box {
    padding-left: 10px;

    p {
      padding: 8px 0;
    }

    .info__data {
      display: flex;
      
      p {
        padding-right: 10px;
        }
        
      #info__data-name {
        font-weight: bold;  
      }

      #info__data-hg {
        font-size: 14px;
        color: #aaa;
      }
    }

    .info__data2 {

      p {
        font-size: 14px;
      }
    }
  }
`;

function MountainList(props) {
  const { mntnnm, mntnattchimageseq, mntninfohght, mntninfopoflc } = props.list;

  // 이미지 유/무 검사 -> 아래 handleImageError로 대체
  // const filterStr = 'atchFileId=';
  // let ImgUrlIndex = mntnattchimageseq.indexOf(filterStr);
  // let searchImgUrlIndex = mntnattchimageseq.substr(ImgUrlIndex + filterStr.length, 4);
  const handleImageError = (event) => {
    event.target.src = 'https://github.com/rominy/data-center/blob/main/images/noimage.png?raw=true';
  };

  return (
    <MountainListContainer>
      <div className='inner'>
        <img 
          src={mntnattchimageseq} 
          onError={handleImageError}
          alt='image' />
        <div className='info-box'>
          <div className='info__data'>
            <p id='info__data-name'>{mntnnm} </p>
            <p id='info__data-hg'>{mntninfohght.toLocaleString()}m</p>  
          </div>
          <div className='info__data2'>
            <p>{mntninfopoflc}</p>
          </div>
        </div>
      </div>
    </MountainListContainer>
  );
}

export default MountainList;