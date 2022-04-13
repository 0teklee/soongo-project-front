import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MasterSignUpFooter.module.scss';

function MasterSignUpFooter({
  setFormPage,
  pageNumber,
  allData,
  checkLesson,
  addressRef,
}) {
  const navigate = useNavigate();

  // 입력 정보 유효성 검사
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneReg = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  // 모든 데이터를 취합하여 보내는 footer
  const sendMasterInfo = (data, router) => {
    fetch(`http://localhost:8000/master/${router}`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response;
      })
      .then(res => res.json())
      .then(() => {
        alert('회원가입 성공');
        navigate('/');
      })
      .catch(error => error.json())
      .then(err => {
        alert(`Error : ${err.message}`);
      });
  };
  return (
    <div className={styles.FooterContainer}>
      <div className={styles.btnWrapper}>
        <button
          className={styles.btnPrev}
          onClick={() => {
            if (pageNumber === 0) {
              navigate('/pro');
            }
            setFormPage(prev => (prev === 0 ? prev : prev - 1));
          }}
        >
          이전
        </button>
        <button
          className={styles.btnNext}
          onClick={e => {
            if (checkLesson.length === 0) {
              return;
            }

            setFormPage(prev => (prev === 1 ? prev : prev + 1));
            if (e.target.innerText === '가입하기') {
              if (
                pwReg.test(allData.current.password) &&
                emailReg.test(allData.current.email) &&
                phoneReg.test(allData.current.phoneNumber) &&
                2 <= allData.current.name.length &&
                !!allData.current.address &&
                !!allData.current.detailAddress
              ) {
                // fetch 보내기
                sendMasterInfo(allData.current, 'signupdirect');
              } else if (
                !!localStorage.getItem('access_token') &&
                phoneReg.test(allData.current.phoneNumber) &&
                !!allData.current.address &&
                !!allData.current.detailAddress
              ) {
                sendMasterInfo(
                  {
                    ...allData.current,
                    address: allData.current.address,
                    detailAddress: allData.current.detailAddress,
                    phoneNumber: allData.current.phoneNumber,
                  },
                  'signup'
                );
              } else {
                if (
                  !(allData.current.address || allData.current.detailAddress)
                ) {
                  addressRef.current.style.display = 'block';
                }
                alert('모든 정보를 올바르게 입력해주세요');
              }
            }
            return;
          }}
        >
          {pageNumber === 1 ? '가입하기' : '다음'}
        </button>
      </div>
    </div>
  );
}

export default MasterSignUpFooter;
