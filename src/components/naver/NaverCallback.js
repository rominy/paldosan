import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NaverCallback(props) {
  const navigate = useNavigate();
  const { naver } = window;

  useEffect(() => {
    const handleNaverCallback = () => {
      if (window.location.href.includes('access_token')) {
        naver.LoginWithNaverId().getLoginStatus(status => {
          if (status) {
            console.log('Naver user info:', naver.user);
            // 추가 로그인 처리 로직
            navigate('/');
          } else {
            console.log('Naver login failed');
          }
        });
      }
    };

    handleNaverCallback();
  }, [naver]);

  return (
    <div>
      <h2>Naver Login Callback</h2>
    </div>
  );
}

export default NaverCallback;