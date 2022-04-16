import React, { useState, useEffect } from 'react';
import styles from './Banner.module.scss';
import { FRONT_PORT } from '../../config';

const slideWidth = 62;

const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const createItem = (position, idx, activeIdx, _items) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
      transitionDuration: '1000ms',
    },
    banner: _items[idx].banner,
  };
  const length = 2;

  switch (position) {
    case length - 1:
    case length:
    case length + 1:
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
        <img className={styles.imageDiv} src={item.banner} alt="banner" />
      </div>
    </li>
  );
};

function Banner() {
  const [_items, _setItems] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(FRONT_PORT + '/data/hwseol/banner.json', {
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

  const length = items.length / 4;

  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = items.length;

  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems(prev => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
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
  }, [items, activeIdx, length]);

  const [btn, setBtn] = useState(false);
  const btnShow = () => {
    setBtn(true);
  };
  const btnHide = () => {
    setBtn(false);
  };
  return (
    <div className={styles.carouselComponent}>
      <div className={styles.carouselWrap}>
        <div
          className={styles.carouselInner}
          onMouseOver={btnShow}
          onMouseLeave={btnHide}
        >
          <button
            className={
              btn
                ? `${styles.carouselBtn} ${styles.prev}`
                : `${styles.carouselBtn} ${styles.prev} ${styles.btnHide}`
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
              btn
                ? `${styles.carouselBtn} ${styles.next}`
                : `${styles.carouselBtn} ${styles.next} ${styles.btnHide}`
            }
            onClick={() => nextClick()}
          >
            <i className={`${styles.carouselBtnArrow} ${styles.right}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
