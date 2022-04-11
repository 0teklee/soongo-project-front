import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Login() {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');

  const navigate = useNavigate();
  const gotomain = () => {
    navigate('/');
  };
  const dataFetch = () => {
    // try {
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: id,
        password: pw,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('userId', res.userId);
        } else {
          const error = new Error('잘못된 이메일이거나 비밀번호입니다.');
          error.statusCode = 400;
          throw error;
        }
      })
      .then(() => {
        gotomain();
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;

  let abledButton = emailReg.test(id) && pwReg.test(pw);

  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.loginText}>로그인</div>
        <section className={styles.section}>
          <div>
            <div className={styles.email}>이메일</div>
            <input
              onChange={e => setId(e.target.value)}
              value={id}
              className={
                emailReg.test(id) || !id
                  ? styles.id
                  : `${styles.id} ${styles.invalid}`
              }
              type="email"
              placeholder="example@soongo.com"
            />
            <div
              className={
                !id || id.includes('@')
                  ? `${styles.invalidInput} ${styles.off}`
                  : `${styles.invalidInput}`
              }
            >
              이메일 주소를 입력해주세요.
            </div>
            <div
              className={
                emailReg.test(id) || !id.includes('@')
                  ? `${styles.invalidInput} ${styles.off}`
                  : `${styles.invalidInput}`
              }
            >
              올바른 이메일 주소를 입력해주세요.
            </div>
            <div className={styles.password}>비밀번호</div>
            <input
              onChange={e => setPw(e.target.value)}
              value={pw}
              className={
                pwReg.test(pw) || !pw
                  ? styles.pw
                  : `${styles.pw} ${styles.invalid}`
              }
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <div
              className={
                !pw || pw.length >= 8
                  ? `${styles.invalidInput} ${styles.off}`
                  : `${styles.invalidInput}`
              }
            >
              비밀번호를 입력해주세요.
            </div>
            <div
              className={
                !pw || pw.length < 8 || pwReg.test(pw)
                  ? `${styles.invalidInput} ${styles.off}`
                  : `${styles.invalidInput}`
              }
            >
              영문+숫자 조합 8자리 이상 입력해주세요.
            </div>
            <Link to="./findpw" className={styles.findPw}>
              비밀번호찾기
            </Link>
            <button
              className={styles.loginBtn}
              disabled={!abledButton}
              onClick={dataFetch}
            >
              이메일 로그인
            </button>
            <button className={styles.kakaoBtn}>Kakao로 시작하기</button>
            <button className={styles.facebookBtn}>
              Facebook으로 시작하기
            </button>
            <Link to="../sign-up" className={styles.goToSignUp}>
              계정이 없으신가요?
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default Login;
