import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.section`
  margin-top: 90px;
  display: flex;
  align-items: center;
  flex-direction: column;

  #logo {
    cursor: pointer;
    max-width: 100px;
  }
  
  .login_form {
    width: 320px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 8px;
      font-size: 18px;
    }

    input {
      width: 100%;
      margin-bottom: 20px;  
      padding: 6px 10px;
    }

    #login-btn {
      width: 100%;
      height: 36px;
      margin-top: 18px;
      margin-bottom: 20px;
      color: white;
      font-size: 18px;
      background-color: #219FE3;
      border: none;
    }
  }
`;

function Login(props) {
  const navigate = useNavigate();

  // var naver_id_login = new window.naver_id_login(`${process.env.REACT_APP_NAVERLOGIN_CLIENTID}`, "http://localhost:3000");
  // var state = naver_id_login.getUniqState();
  // naver_id_login.setButton("white", 2,40);
  // naver_id_login.setDomain("http://localhost:3000");
  // naver_id_login.setState(state);
  // naver_id_login.setPopup();
  // naver_id_login.init_naver_id_login();

  return (
    <LoginContainer>
      <img 
        id='logo' 
        src={`${process.env.REACT_APP_DATACENTER_URL}paldosan_logo_yeon-black.png`} 
        onClick={() => navigate('/')}
        alt='logo' 
      />
      <div className='login_form'>
        <label htmlFor='id'>아이디</label>
        <input 
          type='text' 
          id='id'
          placeholder='아이디를 입력하세요.'
        />         
        <label htmlFor='password'>비밀번호</label>
        <input 
          type='password' 
          id='password'
          placeholder='비밀번호를 입력하세요.'
        />
        <button id='login-btn'>로그인</button>
        <p>간편 로그인</p>
        <div id="naver_id_login"></div>
      </div>
    </LoginContainer>
  );
}

export default Login;