import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MasterDetail.module.scss';
import MasterRequest from '../../components/master-detail/MasterRequest';
import MasterProfile from '../../components/master-detail/MasterProfile';
import MasterDetailNav from '../../components/master-detail/MasterDetailNav';
import MasterInfo from '../../components/master-detail/MasterInfo';
import MasterCategory from '../../components/master-detail/MasterCategory';
import MasterImage from '../../components/master-detail/MasterImage';
import MasterReview from '../../components/master-detail/MasterReview';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function MasterDetail() {
  const params = useParams();
  const [master, setMaster] = useState({});
  const [reviews, setReviews] = useState([{ name: '' }]);
  const masterInfo = useRef('');
  const masterMedia = useRef('');
  const masterReview = useRef('');
  const PORT = process.env.REACT_APP_SERVER_PORT;
  //get master profile fetch
  useEffect(() => {
    fetch(`${PORT}/master/users/${params.id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMaster(data);
      });
  }, []);

  //get reviews
  useEffect(() => {
    fetch(`${PORT}/review/${params.id}`, { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        if (data.reviews.length === 0) {
          data.reviews = [{ name: '' }];
        }
        setReviews(data.reviews);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.detailContainer}>
        <div className={styles.masterProfile}>
          <MasterProfile master={master} review={reviews} />
        </div>
        <div className={styles.pageNav}>
          <MasterDetailNav
            master={master}
            masterInfo={masterInfo}
            masterReview={masterReview}
            reviewCounts={reviews}
            masterMedia={masterMedia}
          />
        </div>
        <div ref={masterInfo} className={styles.masterIntro}>
          <h2>한줄소개</h2>
          <div>
            {!master.info
              ? `아직 ${
                  !master.name ? '' : master.name
                } 고수님의 소개가 없습니다.`
              : master.intro}
          </div>
        </div>
        <div className={styles.masterInfoContainer}>
          <MasterInfo
            master={master}
            masterInfo={masterInfo}
            review={reviews}
          />
        </div>
        <div className={styles.lessonCategory}>
          <div>
            <MasterCategory master={master} />
          </div>
        </div>
        <div ref={masterMedia} className={styles.masterImages}>
          <div>
            <MasterImage master={master} />
          </div>
        </div>
        <div ref={masterReview} className={styles.masterReview}>
          <div>
            <MasterReview master={master} reviews={reviews} />
          </div>
        </div>
      </div>
      <div className={styles.requestContainer}>
        <MasterRequest master={master} />
      </div>
      <Footer />
    </div>
  );
}

export default MasterDetail;
