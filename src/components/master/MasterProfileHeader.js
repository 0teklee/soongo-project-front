import styles from './MasterProfileHeader.module.scss';
import { FRONT_PORT } from '../../config';

const MasterProfileHeader = props => {
  const { myInfo } = props;
  const masterImage = myInfo.master_image
    ? FRONT_PORT + myInfo.master_image
    : FRONT_PORT + '/images/profile/profileNotFound.svg';
  return (
    <div className={styles.masterProfileHeaderWrapper}>
      <picture className={styles.profileImageWrapper}>
        <img alt={myInfo.name} src={masterImage} />
      </picture>
      <div className={styles.profileSomeWrapper}>
        <div className={styles.profileSomeCounts}>
          <div>
            <span>{myInfo.reviewAverage}</span>
            <span>리뷰 평점</span>
          </div>
          <div>
            <span>{myInfo.reviews.length}</span>
            <span>리뷰 수</span>
          </div>
          <div>
            <span>{'0'}</span>
            <span>고용수</span>
          </div>
        </div>
        <div className={styles.profileServiceWrapper}>
          <div className={styles.profileActiveAssay}>
            <span>활동분석</span>
          </div>
          <div className={styles.profilePreview}>
            <span>미리보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterProfileHeader;
