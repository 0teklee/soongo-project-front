import React, { useState, useEffect } from 'react';
import styles from './CarouselGoso.module.scss';
import { AiFillStar } from 'react-icons/ai';
import { FRONT_PORT } from '../../config';

const slideWidth = 10;

const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createItem = (position, idx, activeIdx, _items) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
      transitionDuration: '1000ms',
    },
    goso: _items[idx],
  };
  const length = 6;

  switch (position) {
    case length - 2:
    case length - 1:
    case length:
    case length + 1:
    case length + 2:
    case length + 3:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx, _items }) => {
  const item = createItem(pos, idx, activeIdx, _items);

  return (
    <li className={styles.carouselSlideItem} style={item.styles}>
      <div className={styles.carouselSlideItemImgLink}>
        <img
          className={styles.imageDiv}
          src={item.goso.image}
          alt={item.goso.name}
        />
      </div>
      <div className={styles.carouselSlideItemBody}>
        <h4>{item.goso.name}</h4>
        <p>{item.goso.category}</p>
        <p className={styles.starfield}>
          <AiFillStar color="#FFCE21" size="1.2em" />
          {item.goso.review.total_grade}({item.goso.review.review_number})
        </p>
      </div>
    </li>
  );
};

function CarouselGoso() {
  const [_items, _setItems] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(FRONT_PORT + '/data/hwseol/goso_carousel.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        let _data = data;
        _data.push(...data);
        _setItems(_data);
        setItems(Array.from(Array(_data.length).keys()));
      });
  }, []);

  const length = items.length / 2;

  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items.length;
  const [prevBtn, setPrevBtn] = useState(true);
  const [nextBtn, setNextBtn] = useState(true);
  const prevClick = (jump = 2) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 2) => {
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
    setNextBtn(activeIdx === 4 ? false : true);
  }, [items, activeIdx, length]);

  return (
    <div className={styles.carouselComponent}>
      <h3 className={styles.slideTitle}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;인기 숨은 고수
      </h3>
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

export default CarouselGoso;
