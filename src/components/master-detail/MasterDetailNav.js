import React, { useState } from 'react';
import styles from './MasterDetailNav.module.scss';

function MasterDetailNav(props) {
  // navbar 이동 추가 구현
  const { master, masterInfo, masterReview, masterMedia, reviewCounts } = props;
  const { review } = master;
  const [active, setActive] = useState('');

  const scroll = ref => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    // header, detail nav bar height 제외하고 이동
    // window.scroll(0, 100);
  };

  const select = e => {
    setActive(e.target.innerText);
  };

  return (
    <ul className={styles.container}>
      <li
        onClick={e => {
          select(e);
          scroll(masterInfo);
        }}
        className={active === '고수 정보' ? `${styles.active}` : null}
      >
        <span>고수 정보</span>
      </li>
      <li
        onClick={e => {
          select(e);
          scroll(masterMedia);
        }}
        className={active === '사진/동영상' ? `${styles.active}` : null}
      >
        <span>사진/동영상</span>
      </li>
      <li
        onClick={() => {
          setActive('리뷰');
          scroll(masterReview);
        }}
        className={active === '리뷰' ? `${styles.active}` : null}
      >
        <span>{`리뷰 ${!reviewCounts[0].name ? 0 : reviewCounts.length}`}</span>
      </li>
      <li
        onClick={e => {
          select(e);
          scroll(masterInfo);
        }}
        className={active === '질문 답변' ? `${styles.active}` : null}
      >
        <span>질문 답변</span>
      </li>
    </ul>
  );
}

export default MasterDetailNav;
