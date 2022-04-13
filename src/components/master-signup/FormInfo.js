import React, { useEffect, useRef, useState } from 'react';
import styles from './FormInfo.module.scss';

function FormInfo({ masterInfo, addressRef }) {
  const [visiblePW, setPwVisible] = useState('password');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState([{}]);
  const [selectAddress, setSelectAddress] = useState(0);
  const [selectDetailAddress, setSelectDetailAddress] = useState(0);
  const [agreeCheck, setAgreeCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    detailAddress: '',
  });

  const { name, email, password, phoneNumber } = info;
  const { lessonCatID } = masterInfo.current;

  masterInfo.current = { ...info, lessonCatID: lessonCatID };

  const emailRef = useRef('');
  const nameRef = useRef('');
  const pwRef = useRef('');

  //state 객체 관리 함수
  const onChange = e => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
  // 핸드폰 번호 '-' 추가하여 db에 전송

  useEffect(() => {
    let isMounted = true;
    fetch('/address', { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        if (isMounted) setAddress(res.address);
      });
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      emailRef.current.style.display = 'none';
      nameRef.current.style.display = 'none';
      pwRef.current.style.display = 'none';
    }
  }, []);
  return (
    <>
      <h3 className={styles.formTitle}>마지막으로 필수 정보를 입력해주세요.</h3>
      <div ref={nameRef} className={styles.inputBox}>
        <p className={styles.inputName}>이름</p>
        <input
          className={
            2 <= name.length || !name
              ? styles.inputValue
              : `${styles.inputValue} ${styles.invalid}`
          }
          type="text"
          name="name"
          placeholder="이름(실명)을 입력해주세요"
          onChange={onChange}
        />
        <div
          className={
            2 <= name.length || !name
              ? `${styles.invalidInput} ${styles.Off}`
              : `${styles.invalidInput}`
          }
        >
          이름을 입력해주세요.
        </div>
      </div>
      <div className={styles.inputBox}>
        <p className={styles.inputName}>성별</p>
        <div className={styles.gender}>
          <div className={styles.genderBtnWrapper}>
            <input
              className={styles.genderRadio}
              id="male"
              type="radio"
              value="male"
              name="male"
              checked={gender === 'male'}
              onChange={() => {
                setGender('male');
              }}
            />{' '}
            <label htmlFor="male">남자</label>
          </div>
          <div className={styles.gap}></div>
          <div className={styles.genderBtnWrapper}>
            <input
              className={styles.genderRadio}
              id="female"
              type="radio"
              value="female"
              name="female"
              checked={gender === 'female'}
              onChange={() => {
                setGender('female');
              }}
            />
            <label htmlFor="female">여자</label>
          </div>
        </div>
        <p className={styles.Off}>성별을 선택해주세요.</p>
      </div>
      <div className={styles.inputBox}>
        <p className={styles.inputName}>주소</p>
        <div className={styles.gender}>
          <div className={styles.genderBtnWrapper}>
            <label htmlFor="address" className={styles.addressLabel}>
              시 / 도
            </label>
            <select
              className={styles.options}
              id="address"
              name="address"
              onChange={e => {
                if (e.target.value !== '0') {
                  setSelectAddress(
                    address.find(name => name.name === e.target.value)
                  );
                  onChange(e);
                } else {
                  setSelectDetailAddress(0);
                  setSelectAddress(0);
                }
              }}
            >
              <option value={0}>선택</option>
              {!address[0].name
                ? null
                : address.map(address => {
                    return (
                      <option value={address.name} key={address.id}>
                        {address.name}
                      </option>
                    );
                  })}
            </select>
          </div>
          <div className={styles.gap} />
          <div className={styles.genderBtnWrapper}>
            <label htmlFor="detailAddress" className={styles.addressLabel}>
              상세 지역
            </label>
            <select
              className={styles.options}
              id="detailAddress"
              name="detailAddress"
              onChange={e => {
                setSelectDetailAddress(e.target.value);
                onChange(e);
              }}
            >
              <option value={0}>선택</option>
              {selectAddress.detailAddress === undefined
                ? null
                : selectAddress.detailAddress.map(detail => {
                    return (
                      <option value={detail.name} key={detail.id}>
                        {detail.name}
                      </option>
                    );
                  })}
            </select>
          </div>
        </div>
        <p ref={addressRef} className={`${styles.invalidInput} ${styles.Off}`}>
          주소를 선택해주세요.
        </p>
      </div>
      <div ref={emailRef} className={styles.inputBox}>
        <p className={styles.inputName}>이메일</p>
        <input
          className={
            emailReg.test(email) || !email
              ? styles.inputValue
              : `${styles.inputValue} ${styles.invalid}`
          }
          type="text"
          name="email"
          placeholder="example@soongo.com"
          onChange={onChange}
        />
        <div
          className={
            emailReg.test(email) || !email
              ? `${styles.invalidInput} ${styles.Off}`
              : `${styles.invalidInput}`
          }
        >
          이메일 주소를 입력해주세요.
        </div>
      </div>
      <div ref={pwRef} className={styles.inputBox}>
        <p className={styles.inputName}>비밀번호</p>
        <div className={styles.pwBox}>
          <input
            className={
              pwReg.test(password) || !password
                ? styles.inputValue
                : `${styles.inputValue} ${styles.invalid}`
            }
            type={visiblePW}
            placeholder="영문+숫자 조합 8자리 이상 입력해주세요"
            name="password"
            onChange={onChange}
          />
          <button
            className={`${styles.pwType}`}
            value="표시"
            onClick={e => {
              e.preventDefault();
              if (e.target.childNodes[0].data === '표시') {
                setPwVisible('text');
                e.target.childNodes[0].data = '숨김';
              } else {
                setPwVisible('password');
                e.target.childNodes[0].data = '표시';
              }
            }}
          >
            표시
          </button>
        </div>
        <div
          className={
            pwReg.test(password) || !password
              ? `${styles.invalidInput} ${styles.Off}`
              : `${styles.invalidInput}`
          }
        >
          비밀번호를 입력해주세요.
        </div>
      </div>
      <div className={styles.inputBox}>
        <p className={styles.inputName}>핸드폰 번호</p>
        <input
          className={
            phoneReg.test(phoneNumber) || !phoneNumber
              ? styles.inputValue
              : `${styles.inputValue} ${styles.invalid}`
          }
          type="text"
          placeholder="핸드폰 번호를 입력해주세요 (- 없이)"
          name="phoneNumber"
          onChange={onChange}
        />
        <div
          className={
            phoneReg.test(phoneNumber) || !phoneNumber
              ? `${styles.invalidInput} ${styles.Off}`
              : `${styles.invalidInput}`
          }
        >
          핸드폰 번호를 입력해주세요.
        </div>
      </div>
      <div className={styles.checkBox}>
        <input
          id="checkbox1"
          className={styles.checkboxCSS}
          type="checkbox"
          name="personalInfo"
          value="personalInto"
          checked={agreeCheck}
          onChange={() => {
            setAgreeCheck(prev => !prev);
          }}
        />
        <label htmlFor="checkbox1">
          <span className={styles.checkInner}>✔</span>
        </label>
        이용약관, 개인정보 수집 및 이용 동의 (필수)
        <p className={`${styles.invalidInput} ${styles.Off}`}>
          이용약관에 동의해주세요.
        </p>
      </div>
      <div className={styles.checkBox}>
        <input
          id="checkbox2"
          className={styles.checkboxCSS}
          type="checkbox"
          name="age-check"
          value="age-agreement"
          checked={ageCheck}
          onChange={() => setAgeCheck(prev => !prev)}
        />
        <label htmlFor="checkbox2">
          <span className={styles.checkInner}>✔</span>
        </label>
        만 14세 이상 (필수)
        <p className={`${styles.invalidInput} ${styles.Off}`}>
          만 14세 이상 가입에 동의해주세요.
        </p>
      </div>
    </>
  );
}

export default FormInfo;
