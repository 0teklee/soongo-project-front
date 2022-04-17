import styles from './FooterModal.module.scss';
import { GrClose } from 'react-icons/gr';

function FooterModal(props) {
  const { handleModalClick } = props;

  return (
    <div className={styles.FooterModalWrapper}>
      <div className={styles.FooterMoalBox}>
        <div>
          <GrClose
            className={`${styles.closeBtn} ${styles.clickable}`}
            onClick={handleModalClick}
          />
          <div>OMM Team! 😎오늘 뭐했는지 말해봐 🎵</div>
        </div>
        <hr />
        <div className={styles.teammate}>
          <ul>
            <li>
              손성호
              <a
                href="https://devshon.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                https://devshon.github.io/
              </a>
            </li>
            <li>
              설혜원
              <a
                href="https://velog.io/@shw779"
                target="_blank"
                rel="noreferrer"
              >
                https://velog.io/@shw779
              </a>
            </li>
            <li>
              김연주
              <a
                href="https://velog.io/@yeonjoo7"
                target="_blank"
                rel="noreferrer"
              >
                https://velog.io/@yeonjoo7
              </a>
            </li>
            <li>
              마승우
              <a
                href="https://velog.io/@hereright"
                target="_blank"
                rel="noreferrer"
              >
                https://velog.io/@hereright
              </a>
            </li>
            <li>
              이택우
              <a
                href="https://0teklee.github.io/"
                target="_blank"
                rel="noreferrer"
              >
                https://0teklee.github.io/
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterModal;
