import React, { useState, useEffect } from 'react';
import styles from './HeaderMobile.module.scss';
import { GrClose } from 'react-icons/gr';
import { SERVER_PORT } from '../../config';
const token = localStorage.getItem('access_token');

function HeaderMobile(props) {
  const [user, setUser] = useState('');
  const { handleNavigate, isLogin, logoutBtn, handleBarClick } = props;
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(SERVER_PORT + '/users', {
        headers: {
          token,
        },
      })
        .then(res => res.json())
        .then(data => setUser(data.user));
    }
  }, []);

  return (
    <div className={styles.headerMobileWrapper}>
      <div className={styles.headerMobileBox}>
        <div className={styles.userName}>
          <GrClose
            className={`${styles.closeBtn} ${styles.clickable}`}
            onClick={handleBarClick}
          />
          {isLogin ? (
            <>
              <div>{user.name}님</div>
              {!isMaster ? (
                <div className={styles.underNameText}>안녕하세요</div>
              ) : (
                <div
                  className={`${styles.underNameText} ${styles.clickable}`}
                  onClick={() => handleNavigate('/master/profile')}
                >
                  프로필 관리 &gt;
                </div>
              )}
            </>
          ) : (
            <>
              <div>로그인해주세요.</div>
              <div
                onClick={() => handleNavigate('/login')}
                className={`${styles.underNameText} ${styles.clickable}`}
              >
                로그인 &gt;
              </div>
            </>
          )}
        </div>
        <hr />
        <div className={styles.menu}>
          <ul>
            {isLogin && !isMaster ? (
              <>
                <li
                  onClick={() => handleNavigate('/received_report')}
                  className={styles.clickable}
                >
                  받은 견적
                </li>
                <li className={styles.disabled}>마켓</li>
                <li className={styles.disabled}>채팅</li>
                <li
                  onClick={() => handleNavigate('/master/list')}
                  className={styles.clickable}
                >
                  고수 찾기
                </li>
                <li className={styles.disabled}>마이페이지</li>
                <hr />
                <li
                  onClick={() => setIsMaster(true)}
                  className={styles.clickable}
                >
                  고수로 전환
                </li>
                <li
                  onClick={logoutBtn}
                  className={`${styles.logoutBtn} ${styles.clickable}`}
                >
                  로그아웃
                </li>
              </>
            ) : null}
            {isLogin && isMaster ? (
              <>
                <li className={styles.disabled}>받은요청</li>
                <li className={styles.disabled}>바로견적</li>
                <li className={styles.disabled}>채팅</li>
                <li className={styles.disabled}>마이페이지</li>
                <hr />
                <li
                  onClick={() => setIsMaster(false)}
                  className={styles.clickable}
                >
                  고객으로 전환
                </li>
                <li
                  onClick={logoutBtn}
                  className={`${styles.logoutBtn} ${styles.clickable}`}
                >
                  로그아웃
                </li>
              </>
            ) : null}
            {!isLogin ? (
              <>
                <li
                  onClick={() => handleNavigate('/pro')}
                  className={styles.clickable}
                >
                  고수 가입
                </li>
                <li
                  onClick={() => handleNavigate('/sign-up')}
                  className={styles.clickable}
                >
                  {' '}
                  회원 가입{' '}
                </li>
                <li
                  onClick={() => handleNavigate('/master/list')}
                  className={styles.clickable}
                >
                  고수 찾기
                </li>
                <li className={styles.disabled}> 마켓 </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;
