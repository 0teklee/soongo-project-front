import React, { useState, useEffect } from 'react';
import styles from './CarouselService.module.scss';
import Carousel from '../../components/slide/Carousel';
import { FRONT_PORT } from '../../config';

function CarouselService() {
  const [_items, _setItems] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(FRONT_PORT + '/data/hwseol/main_carousel.json', {
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
        slideWidth={15}
        kind="service"
        count={4}
        jumped={2}
      />
    </div>
  );
}

export default CarouselService;
