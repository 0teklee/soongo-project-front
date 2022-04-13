import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './MasterReview.module.scss';
// 64~ API 수정 이후 빠진 데이터 추가하기

function MasterReview({ reviews }) {
  const rateStar = number => {
    const star = [];
    if (5 < number) {
      return;
    }
    for (let i = 1; i <= number; i++) {
      star.push(<FaStar color="#ffce21" key={i} />);
    }
    for (let i = 1; i <= 5 - number; i++) {
      star.push(<FaStar color="#e1e1e1" key={star.length + i} />);
    }
    return star;
  };

  const getTotalAVGGrade = review => {
    let totalGrade = review.map(rv => rv.grade);
    totalGrade = totalGrade.reduce((acc, cur) => acc + cur);
    return totalGrade / review.length;
  };

  const nameChange = string => {
    return string.slice(0, 1) + '**';
  };

  const dateFormat = date => {
    let reDate = new Date(date);
    return `${reDate.getFullYear()}.${reDate.getMonth()}.${reDate.getDate()}`;
  };

  return (
    <div>
      <h2>리뷰</h2>
      <div className={styles.summary}>
        <div className={styles.summaryNumber}>
          {!reviews[0].name
            ? '0.0'
            : parseFloat(
                Math.round(getTotalAVGGrade(reviews) * 100) / 100
              ).toFixed(1)}
        </div>
        <div className={styles.summaryInfo}>
          {!reviews[0].name ? rateStar(0) : rateStar(getTotalAVGGrade(reviews))}
          <p>{!reviews[0].name ? 0 : reviews.length}개 리뷰</p>
        </div>
      </div>
      <hr className={styles.breakLine} />
      <div>
        {!reviews[0].name
          ? '리뷰가 없습니다. 첫 리뷰를 남겨주세요.'
          : reviews.map(rvw => {
              return (
                <div key={rvw.userId}>
                  <div>
                    <div className={styles.reviewUser}>
                      <div className={styles.reviewNameStar}>
                        <span>{nameChange(rvw.name)}</span>
                        <span>{rateStar(rvw.grade)}</span>
                      </div>
                      <div className={styles.reviewDate}>
                        <span>
                          {!rvw.created_at ? null : dateFormat(rvw.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.reviewContent}>{rvw.comment}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default MasterReview;
