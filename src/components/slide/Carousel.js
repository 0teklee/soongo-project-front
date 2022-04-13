import React, { useState, useEffect } from 'react';
import CarouselSlideItem from './CarouselSlideItem';

const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

function Carousel({
  _items,
  items,
  setItems,
  styles,
  slideWidth,
  kind,
  count,
  jumped,
}) {
  const length = items.length / count;
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items.length;
  const [prevBtn, setPrevBtn] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);

  const prevClick = (jump = jumped) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };
  const nextClick = (jump = jumped) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    setPrevBtn(activeIdx === 0 ? false : true);
    if (kind === 'goso') setNextBtn(activeIdx === 4 ? false : true);
    else if (kind === 'service')
      setNextBtn(activeIdx === length - 1 ? false : true);
  }, [items, activeIdx, length]);

  const Title = () => {
    if (kind === 'goso') {
      return (
        <h3 className={styles.slideTitle}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;인기 숨은 고수
        </h3>
      );
    } else if (kind === 'service') {
      return (
        <h3 className={styles.slideTitle}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추천 서비스
        </h3>
      );
    }
    return <></>;
  };
  return (
    <div className={styles.carouselComponent}>
      <Title />
      <div className={styles.carouselWrap}>
        <div className={styles.carouselInner}>
          <button
            className={
              prevBtn
                ? `${styles.carouselBtn} ${styles.prev}`
                : `${styles.carouselBtn} ${styles.prev} ${styles.hideBtn}`
            }
            onClick={() => prevClick()}
          >
            <i className={`${styles.carouselBtnArrow} ${styles.left}`} />
          </button>
          <div className={styles.carouselContainer}>
            <ul className={styles.carouselSlideList}>
              {items.map((pos, i) => (
                <CarouselSlideItem
                  key={i}
                  idx={i}
                  pos={pos}
                  activeIdx={activeIdx}
                  _items={_items}
                  styles={styles}
                  slideWidth={slideWidth}
                  kind={kind}
                />
              ))}
            </ul>
          </div>
          <button
            className={
              nextBtn
                ? `${styles.carouselBtn} ${styles.next}`
                : `${styles.carouselBtn} ${styles.next} ${styles.hideBtn}`
            }
            onClick={() => nextClick()}
          >
            <i
              className={`${styles.carouselBtnArrow} ${styles.carouselBtnArrow} ${styles.right}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
