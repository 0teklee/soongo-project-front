import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BsStarFill } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';

import styles from './MasterItem.module.scss';

const PORT = process.env.REACT_APP_SERVER_PORT;

const MasterItem = props => {
  const { master } = props;
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/profile/users/${master.id}`);
  }
  const isReviewEmpty = master.reviews.length === 0;

  let reviewerNameTrans =
    !isReviewEmpty && master.reviews[0].users.name.slice(0, 1) + '**';
  let recentReviewComment = !isReviewEmpty && master.reviews[0].comment;

  // 리뷰 평점 구하기
  let reviewAvg = 0;
  if (!isReviewEmpty) {
    let sum = 0;
    master.reviews.forEach(review => {
      sum = review.grade + sum;
    });
    reviewAvg = Math.round(sum / master.reviews.length);
  }

  let masterImage = master.master_image
    ? PORT + master.master_image
    : PORT + '/images/profile/profileNotFound.svg';

  return (
    <div onClick={handleNavigate} className={styles.masterItem}>
      <picture className={styles.imageWrapper}>
        <img src={masterImage} alt={master.name} />
      </picture>
      <div className={`${styles.masterInfoWrapper} ${styles.textTruncate}`}>
        <span className={styles.masterInfoName}>{master.name}</span>
        <span className={`${styles.masterInfoIntro} ${styles.textTruncate}`}>
          {master.intro ? master.intro : '소개가 없습니다.'}
        </span>
        <span className={styles.masterInfoReview}>
          <span>
            <BsStarFill color="#fadb14" size="12px" /> {reviewAvg}
          </span>
          <span>({master.reviews.length})</span>
        </span>
        {!isReviewEmpty && (
          <span
            className={`${styles.masterInfoRecentReview} ${styles.textTruncate}`}
          >
            <span>
              <FaRegCommentDots size="12px" color="#666" />
            </span>
            <span>{reviewerNameTrans}</span>
            <span className={styles.textTruncate}>{recentReviewComment}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default MasterItem;
