import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MasterProfileHeader from '../../components/master/MasterProfileHeader';
import MasterProfileService from '../../components/master/MasterProfileService';
// import MasterProfilePosts from '../../components/master/MasterProfilePosts';
import MasterProfileName from '../../components/master/MasterProfileName';
import MasterProfileMainService from '../../components/master/MasterProfileMainService';
import MasterProfileIntro from '../../components/master/MasterProfileIntro';
import MasterProfileAddress from '../../components/master/MasterProfileAddress';
import MasterProfileActiveTime from '../../components/master/MasterProfileActiveTime';
import MasterProfileWorkEx from '../../components/master/MasterProfileWorkEx';
import MasterProfileEmployeeNum from '../../components/master/MasterProfileEmployeeNum';
import { SERVER_PORT } from '../../config';

import styles from './MasterProfile.module.scss';
const token = localStorage.getItem('access_token');

const MasterProfileDelay = props => {
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    fetch(SERVER_PORT + '/master/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(response => response.json())
      .then(data => {
        const { master } = data;
        // 리뷰 평점 구하기
        let reviewAverage = 0;
        if (master.reviews.length > 0) {
          let sum = 0;
          master.reviews.forEach(review => {
            sum = review.grade + sum;
          });
          reviewAverage = Math.round(sum / master.reviews.length);
        }

        master.reviewAverage = reviewAverage;
        master.address.details = master.detailAddress;
        delete master.detailAddress;

        setMyInfo(master);
      });
  }, []);

  return (
    myInfo && (
      <>
        <Header />
        <MasterProfile myInfo={myInfo} />
        <Footer />
      </>
    )
  );
};

const MasterProfile = props => {
  const { myInfo } = props;

  function handleClickUpdate(title, value) {
    // let obj = {};
    // switch (title) {
    // case '이름':
    //   obj.type = 'name';
    //   obj.value = value;
    //   obj.token = '';
    //   break;
    // case '대표 서비스':
    //   console.log(useMainCategory);
    //   break;
    // case '한줄 소개':
    //   console.log(useIntro);
    //   break;
    // case '활동 지역':
    //   console.log(useAddress);
    //   break;
    // case '연락 가능 시간':
    //   console.log(useStartTime, useEndTime);
    //   break;
    // case '경력':
    //   console.log(useWorkEx);
    //   break;
    // case '직원수':
    //   console.log(useEmployeeNum);
    //   break;
    // case '제공 서비스':
    //   console.log(useCategories);
    //   break;
    //   default:
    //     return;
    // }
    // fetch('/master/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(obj),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then(response => console.log('response >> ', response));
  }

  return (
    <main className={styles.masterProfile}>
      <div className={styles.masterProfileHeader}>
        <MasterProfileHeader myInfo={myInfo} />
      </div>
      <div className={styles.masterProfileContents}>
        <MasterProfileName
          title="이름"
          value={myInfo.name}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileMainService
          title="대표 서비스"
          data={myInfo.mastersCategories}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileIntro
          title="한줄 소개"
          value={myInfo.intro ? myInfo.intro : ''}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileAddress
          title="활동 지역"
          value={myInfo.address}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileActiveTime
          title="연락 가능 시간"
          value={{ start: myInfo.start_time, end: myInfo.end_time }}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileWorkEx
          title="경력"
          value={myInfo.work_experience}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileEmployeeNum
          title="직원수"
          value={myInfo.employee_number}
          handleClickUpdate={handleClickUpdate}
        />
        <MasterProfileService
          title="제공 서비스"
          data={myInfo.mastersCategories}
          handleClickUpdate={handleClickUpdate}
        />
        {/* <MasterProfilePosts title="사진 및 동영상" data={myInfo.masterPosts} /> */}
        {/* <MyReviews/>  */}
      </div>
    </main>
  );
};

export default MasterProfileDelay;
