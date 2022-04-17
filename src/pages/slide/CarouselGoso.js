import React, { useState, useEffect } from 'react';
import styles from './CarouselGoso.module.scss';
import Carousel from '../../components/slide/Carousel';

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
  if (items.length === 0) return null;
  return (
    <div>
      <Carousel
        _items={_items}
        items={items}
        setItems={setItems}
        styles={styles}
        slideWidth={10}
        kind="goso"
        count={2}
        jumped={2}
      />
    </div>
  );
}

export default CarouselGoso;
