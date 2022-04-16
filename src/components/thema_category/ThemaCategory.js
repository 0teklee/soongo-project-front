import styles from './ThemaCategory.module.scss';
import { useNavigate } from 'react-router-dom';

function ThemaCategory() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.first_line}>
        <div>
          <div className={styles.box1}>
            <img
              src="/images/thump/lesson.png"
              className={styles.lesson}
              alt="lesson"
              onClick={() => {
                navigate('/lesson', { state: { category: '레슨' } });
              }}
            />
            <p>레슨</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img
              src="/images/thump/home.png"
              className={styles.home}
              alt="home"
            />
            <p>홈/리빙</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img
              src="/images/thump/event.png"
              className={styles.event}
              alt="event"
            />
            <p>이벤트</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img
              src="/images/thump/business.png"
              className={styles.business}
              alt="business"
            />
            <p>비지니스</p>
          </div>
        </div>
      </div>
      <div className={styles.second_line}>
        <div>
          <div className={styles.box1}>
            <img
              src="/images/thump/design.png"
              className={styles.design}
              alt="design"
              onClick={() => {
                navigate('/design_develop', {
                  state: { category: '디자인/개발' },
                });
              }}
            />
            <p>디자인/개발</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img
              src="/images/thump/health.png"
              className={styles.health}
              alt="health"
            />
            <p>건강/미용</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img
              src="/images/thump/part_time.png"
              className={styles.partTime}
              alt="part_time"
            />
            <p>알바</p>
          </div>
        </div>
        <div>
          <div className={styles.box2}>
            <img src="/images/thump/etc.png" className={styles.etc} alt="etc" />
            <p>기타</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ThemaCategory;
