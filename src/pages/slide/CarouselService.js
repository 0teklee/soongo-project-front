import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CarouselService.module.scss';

const slideWidth = 15;

const sleep = (ms = 0) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createItem = (position, idx, activeIdx, _items) => {
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
      transitionDuration: '1000ms',
    },
    service: _items[idx],
  };
  const length = 5;

  switch (position) {
    case length - 1:
    case length:
    case length + 1:
    case length + 2:
      break;
    default:
      item.styles = { ...item.styles, opacity: 0 };
      break;
  }

  return item;
};

const CarouselSlideItem = ({ pos, idx, activeIdx, _items }) => {
  const navigate = useNavigate();

  const item = createItem(pos, idx, activeIdx, _items);

  return (
    <li className={styles.carouselSlideItem} style={item.styles}>
      <div className={styles.carouselSlideItemImgLink}>
        <img
          className={styles.imageDiv}
          src={item.service.image}
          alt={item.service.title}
          onClick={() => navigate('/lesson')}
        />
      </div>
      <div className={styles.carouselSlideItemBody}>
        <h4>{item.service.title}</h4>
        <p>{item.service.request}명 요청</p>
      </div>
    </li>
  );
};

function CarouselService() {
  const [_items, _setItems] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/data/hwseol/main_carousel.json', {
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
    setNextBtn(activeIdx === length - 1 ? false : true);
  }, [items, activeIdx, length]);

  return (
    <div className={styles.carouselComponent}>
      <h3 className={styles.slideTitle}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;XXX님을 위한 추천 서비스
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
            <i className={` ${styles.carouselBtnArrow} ${styles.left}`} />
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
            <i className={`${styles.carouselBtnArrow} ${styles.right}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarouselService;
