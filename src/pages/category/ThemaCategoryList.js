import ThemaCategory from '../../components/thema_category/ThemaCategory';
import styles from './ThemaCategoryList.module.scss';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThemaLessons from '../../components/thema_lesson/ThemaLesson';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function ThemaCategoryList() {
  const location = useLocation();
  const [imgAddr, setImgAddr] = useState('');
  const { category } = location.state;

  const settingImg = category => {
    switch (category) {
      case '레슨':
        setImgAddr('/images/thump/lesson_main.jpg');
        break;
      case '디자인/개발':
        setImgAddr('/images/thump/develop_main.jpg');
        break;
      default:
        setImgAddr('');
    }
  };
  useEffect(() => {
    settingImg(category);
  }, [category]);

  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    //fetch('data/hwseol/thema_category_list.json')
    fetch('/category')
      .then(res => res.json())
      .then(data => {
        setLessons(data);
      });
  }, []);
  let lesson = [];
  if (lessons.hasOwnProperty('categories')) {
    lesson = lessons.categories.filter(value => value.name === category);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.imgWrap}>
          <img
            src={imgAddr}
            alt="category_main"
            className={styles.categoryMain}
          />
          <h2 className={styles.category_title}>{category}</h2>
          <p className={styles.description}>지금 숨고와 함께 시작해 보세요</p>
          <div className={styles.search_wrap}>
            <input
              type="text"
              placeholder="어떤 분야의 전문가를 찾으시나요?"
              className={styles.searchBar}
            />
            <button className={styles.searchBtn}>고수찾기</button>
          </div>
        </div>
        <ThemaCategory />
        <ThemaLessons lesson={lesson} />
      </div>
      <Footer />
    </>
  );
}

export default ThemaCategoryList;
