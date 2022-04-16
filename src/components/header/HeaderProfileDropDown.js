import React, { useState, useEffect } from 'react';
import styles from './HeaderProfileDropDown.module.scss';
import { SERVER_PORT } from '../../config';
const token = localStorage.getItem('access_token');

function HeaderProfileDropDownFetch(props) {
  const [user, setUser] = useState();

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

  return user ? <HeaderProfileDropDown user={user} {...props} /> : '';
}

function HeaderProfileDropDown(props) {
  const { user, handleNavigate, logoutBtn } = props;
  const [isMaster, setIsMaster] = useState(false);

  return (
    <div className={styles.dropDownMain}>
      <div className={styles.dropDownWrapper}>
        <div className={styles.dropDownHeader}>
          <span>{user.name}님</span>
        </div>
        <div className={styles.dropDownContent}>
          <ul>
            {!isMaster ? (
              <>
                <li onClick={() => handleNavigate('/received_report')}>
                  받은 견적
                </li>
                <li onClick={() => setIsMaster(true)}>고수로 전환</li>
              </>
            ) : (
              <>
                <li onClick={() => handleNavigate('/master/profile')}>
                  프로필 관리
                </li>
                <li onClick={() => setIsMaster(false)}>고객으로 전환</li>
              </>
            )}
            <li onClick={logoutBtn}>로그아웃</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfileDropDownFetch;
