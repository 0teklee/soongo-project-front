import React, { useEffect, useState } from 'react';
import styles from './MasterSignUp.module.scss';
import MasterCategory from '../../components/master-signup/MasterCategory';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { SERVER_PORT } from '../../config';

function MasterSignUp() {
  // infoStage에서 글자 줄바꿈으로 인해 생기는 이미지 높낮이 차이 해결할 것

  const [statistic, setStatistic] = useState([]);
  // 누적 요청서, 등록된 고수, 평균 리뷰별점을 어떻게 select하여 가져오는 지에 따라 다른 형태 - 3 항목의 갯수만 가져오면됨.

  const [master, setMaster] = useState([
    { masterProfile: '', masterCategories: '', masterReview: '' },
  ]);
  // 고수 테이블에서 프로필 사진, 카테고리 가져오기. 고수 리뷰는 고수들이 직접 작성
  useEffect(() => {
    fetch(
      SERVER_PORT +
        '누적 요청서의 총 갯수, 등록된 고수의 모든 수, 평균 리뷰별점 API',
      {
        method: 'GET',
      }
    )
      .then(res => res.json())
      .then(data => setStatistic(data));
  }, []);

  return (
    <section className={styles.section}>
      <Header />
      <div className={styles.imageHeader}>
        <h2 className={styles.imageHeaderH2}>
          고수로 등록하고,
          <br />
          숭고에서 고객을 만나보세요!
        </h2>
        <p className={styles.imageHeaderP}>
          숭고는 국내 최대 규모의 생활서비스 플랫폼입니다. <br />
          가장 빠르고 간편하게 고객을 찾을 수 있습니다.
        </p>
      </div>
      <div className={styles.categories}>
        <MasterCategory />
      </div>
      <div className={styles.statisticContainer}>
        <div className={styles.statisticCaption}>
          <h2 className={styles.statisticH2}>
            많은 사람들이 당신의 서비스를 기다립니다
          </h2>
          <p className={styles.caption}>
            많은 고객들이 조건에 딱! 맞는 고수를 찾고 있어요. 고객에게 필요한
            딱! 맞는 고수가 되어보세요.
          </p>
        </div>
        <div className={styles.statisticWrapper}>
          <div className={styles.statisticData}>
            {/* <p className={styles.statics}>{statistic[0]}</p> */}
            <p className={styles.statics}>9,941,032</p>
            <p>누적 요청서</p>
          </div>
          <div className={styles.statisticData}>
            {/* <p className={styles.statics}>{statistic[1]}</p> */}
            <p className={styles.statics}>720,093</p>
            <p>등록된 고수</p>
          </div>
          <div className={styles.statisticData}>
            {/* <p className={styles.statics}>{statistic[2]}</p> */}
            <p className={styles.statics}>4.9 / 5점</p>
            <p>평균 리뷰별점</p>
          </div>
        </div>
      </div>
      <div className={styles.Info}>
        <h2 className={styles.infoH2}>숭고는 어떻게 운영되나요?</h2>
        <ul className={styles.infoStage}>
          <li className={styles.infoCaption}>
            <img
              className={styles.infoImg}
              src="/images/thump/1-logo.png"
              alt="first-step"
            />
            <h4 className={styles.infoStageH4}>고객의 요청을 받아보세요.</h4>
            고객이 필요한 서비스의 요청서를 작성하면 숨고가 검토 후 고수님께
            무료로 보내드려요.
          </li>
          <li className={styles.infoCaption}>
            <img
              className={styles.infoImg}
              src="/images/thump/2-logo.png"
              alt="second-step"
            />
            <h4 className={styles.infoStageH4}>맞춤 견적을 보내세요</h4>
            요청서 확인 후 간단히 견적금액만 입력하면 프로필과 함께 고객에게
            메시지로 전송돼요.
          </li>
          <li className={styles.infoCaption}>
            <img
              className={styles.infoImg}
              src="/images/thump/3-logo.png"
              alt="third-step"
            />
            <h4 className={styles.infoStageH4}>상담 후 거래하세요</h4>
            원하는 고객과 채팅 및 전화(안심번호)로 자세한 사항을 협의하고
            거래하세요.
          </li>
        </ul>
      </div>
      <Footer />
    </section>
  );
}
export default MasterSignUp;
