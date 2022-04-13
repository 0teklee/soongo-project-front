import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import createItem from './CarouselcreateItem';

const CarouselSlideItem = ({
  pos,
  idx,
  activeIdx,
  _items,
  styles,
  slideWidth,
  kind,
}) => {
  const item = createItem(pos, idx, activeIdx, _items, slideWidth, kind);

  if (kind === 'goso') {
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
  } else if (kind === 'service') {
    return (
      <li className={styles.carouselSlideItem} style={item.styles}>
        <div className={styles.carouselSlideItemImgLink}>
          <img
            className={styles.imageDiv}
            src={item.goso.image}
            alt={item.goso.title}
          />
        </div>
        <div className={styles.carouselSlideItemBody}>
          <h4>{item.goso.title}</h4>
          <p>{item.goso.request}명 요청</p>
        </div>
      </li>
    );
  } else if (kind === 'banner') {
    return (
      <li className={styles.carouselSlideItem} style={item.styles}>
        <div className={styles.carouselSlideItemImgLink}>
          <img
            className={styles.imageDiv}
            src={item.goso.banner}
            alt="banner"
          />
        </div>
      </li>
    );
  }
};

export default CarouselSlideItem;
