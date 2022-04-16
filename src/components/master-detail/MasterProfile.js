import styles from './MasterProfile.module.scss';
import { FaStar } from 'react-icons/fa';

function MasterProfile({ master, review }) {
  const { lesson_categories } = master;
  const getTotalAVGGrade = reviews => {
    let total = reviews.map(rev => rev.grade);
    return parseFloat(Math.round((total / reviews.length) * 100) / 100).toFixed(
      1
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.masterImage}>
        <img
          src={
            !master.master_image
              ? `/images/profile/profileNotFound.svg`
              : master.master_image
          }
          alt={!master ? null : master.name}
        />
      </div>
      <div className={styles.masterInfo}>
        <h1>{!master ? null : master.name}</h1>
        <div className={styles.masterCategory}>
          {!lesson_categories ? null : master.lesson_categories[0]}
        </div>
        <div className={styles.masterReview}>
          <span>
            <FaStar size="16px" color="#ffce21" />
          </span>
          <span>{!review[0].name ? '0.0' : getTotalAVGGrade(review)}</span>
          <span>({!review[0].name ? 0 : review.length})</span>
        </div>
      </div>
    </div>
  );
}

export default MasterProfile;
