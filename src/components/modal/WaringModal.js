import React from 'react';
import styles from './WarningModal.module.scss';
import { useNavigate } from 'react-router-dom';

function WarningModal({ show, setShow, message }) {
  const navigate = useNavigate();
  if (show === 1) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p>{message}</p>
          <button
            className={styles.btn}
            onClick={() => {
              setShow(false);
              navigate('/');
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  } else if (show === 2) {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <p>{message}</p>
          <button
            className={styles.btn}
            onClick={() => {
              setShow(false);
              navigate('/login');
            }}
          >
            확인
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default WarningModal;
