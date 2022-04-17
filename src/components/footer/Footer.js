import { React, useState } from 'react';
import styles from './Footer.module.scss';
import FooterModal from './FooterModal';
import { useNavigate } from 'react-router-dom';
import { GrApple, GrGithub, GrInstagram } from 'react-icons/gr';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { VscGithub } from 'react-icons/vsc';
import { FaSlack, FaFacebook } from 'react-icons/fa';

function Footer() {
  const navigate = useNavigate();
  const [isModalClicked, setIsModalClicked] = useState(false);

  function handleNavigate(path) {
    navigate(path);
  }

  function handleModalClick() {
    !isModalClicked ? setIsModalClicked(true) : setIsModalClicked(false);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLine} />
      <div className={styles.infoBox}>
        <div className={styles.contacts}>
          <p className={styles.gen}>1234-5678</p>
          평일 10:00 - 18:00 <br />
          (점심시간 13:00 - 14:00 제외 · 주말/공휴일 제외)
          <div className={styles.stores}>
            <div className={styles.storeBtn}>
              <GrApple /> &nbsp; APP STORE
            </div>
            <div className={styles.storeBtn}>
              <IoLogoGooglePlaystore /> &nbsp; PLAY STORE
            </div>
          </div>
        </div>
        <div className={styles.footerLink}>
          <ul>
            <li
              className={`${styles.footerTitle} ${styles.clickable}`}
              onClick={() => handleNavigate('/')}
            >
              숭고소개
            </li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate('/')}
            >
              팀 소개
            </li>
            <li className={styles.clickable} onClick={handleModalClick}>
              팀원 안내
              {isModalClicked && (
                <FooterModal handleModalClick={handleModalClick} />
              )}
            </li>
          </ul>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고객 안내
            </li>
            <li className={styles.disabled}>이용안내</li>
            <li className={styles.disabled}>안전정책</li>
            <li className={styles.disabled}>예상금액</li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate('/master/list')}
            >
              고수찾기
            </li>
            <li className={styles.disabled}>숭고보증</li>
            <li className={styles.disabled}>고수에게묻다</li>
          </ul>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고수안내
            </li>
            <li className={styles.disabled}>이용안내</li>
            <li className={styles.disabled}>고수가이드</li>
            <li
              className={styles.clickable}
              onClick={() => handleNavigate('/pro')}
            >
              고수가입
            </li>
            <li className={styles.disabled}>고수센터</li>
          </ul>
          <div className={styles.hiddenLine} />
          <ul>
            <li className={`${styles.footerTitle} ${styles.disabled}`}>
              고객센터
            </li>
            <li className={styles.disabled}>공지사항</li>
            <li className={styles.disabled}>자주묻는질문</li>
          </ul>
          <div className={styles.hiddenLine} />
        </div>
      </div>
      <div className={styles.explanation}>
        <div className={styles.textBox}>
          <ul className={styles.documents}>
            <li>이용약관</li>
            <li>개인정보처리방침</li>
            <li>사업자 정보확인</li>
          </ul>
          <div className={styles.copyright}>
            이 사이트는 숨고 사이트를 참조하여 학습목적으로 만들었습니다.
            <br />
            실무수준의 프로젝트이지만 학습용으로 만들었기 때문에
            <br />이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로
            문제될 수 있습니다.
            <br />
            Copyright ©OMM Team. All Rights Reserved.
          </div>
        </div>
        <div className={styles.icons}>
          <a
            href="https://github.com/wecode-bootcamp-korea/justcode-4-1st-omm-front"
            target="_blank"
            rel="noreferrer"
          >
            <VscGithub className={styles.icon} />
          </a>
          <a
            href="https://github.com/wecode-bootcamp-korea/justcode-4-1st-omm-back"
            target="_blank"
            rel="noreferrer"
          >
            <GrGithub className={styles.icon} />
          </a>
          <FaSlack className={`${styles.icon} ${styles.disabled}`} />
          <FaFacebook className={`${styles.icon} ${styles.disabled}`} />
          <GrInstagram className={`${styles.icon} ${styles.disabled}`} />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
