import React, { useState, useEffect } from 'react';
import MasterListHeader from '../../components/master/MasterListHeader';
import MasterListContents from '../../components/master/MasterListContents';
import styles from './MasterList.module.scss';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { SERVER_PORT } from '../../config';

const MasterList = () => {
  const [masters, setMasters] = useState([]);
  const [useCategory, setUseCategory] = useState(null);
  const [useAddress, setUseAddress] = useState(null);
  const [useSort, setUseSort] = useState('리뷰순');
  const [useTake, setUseTake] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(
      `${SERVER_PORT}/master/list?addressId=${
        useAddress ? useAddress.details.id : null
      }&lessonId=${useCategory ? useCategory.lessons.id : null}&take=${useTake}`
    )
      .then(response => response.json())
      .then(data => {
        setMasters(data);
      });
  }, [useAddress, useCategory, useTake]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll(event) {
    let element = event.target.scrollingElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (masters.length >= useTake) {
        setIsLoading(true);
        setTimeout(() => {
          setUseTake(useTake + 10);
          setIsLoading(false);
        }, 500);
      }
    }
  }
  return (
    <>
      <Header />
      <main className={styles.masterList}>
        <MasterListHeader
          masterNumber={masters.length}
          useSort={useSort}
          setUseSort={setUseSort}
          useCategory={useCategory}
          setUseCategory={setUseCategory}
          useAddress={useAddress}
          setUseAddress={setUseAddress}
        />
        {masters.length > 0 ? (
          <>
            <MasterListContents masters={masters} />
            <Loading isLoading={isLoading} />
          </>
        ) : (
          <div className={styles.notFoundMaster}>
            <span>고수가 없어요!</span>
          </div>
        )}
      </main>
      <div className={styles.masterListFooter}>
        <Footer />
      </div>
    </>
  );
};

const Loading = props => {
  const { isLoading } = props;
  return <div className={isLoading ? styles.loading : styles.unloading} />;
};
export default MasterList;
