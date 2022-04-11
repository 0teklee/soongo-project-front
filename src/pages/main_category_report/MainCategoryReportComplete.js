import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MainCategoryReport.module.scss';
import { AiFillStar } from 'react-icons/ai';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
const PORT = process.env.REACT_APP_SERVER_PORT;

function MainCategoryReportComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quest, category, image, flag, ended_at } = location.state;
  const [gosoList, setGosoList] = useState([]);
  const [endTime, setEndTime] = useState(true);
  let _result = {};
  let result = [];
  let category_num = 0;
  let bannerUrl = '/' + image;

  let time = new Date();
  time.setDate(time.getDate());
  time = Date.parse(time) / 1000; //timestamp

  switch (category) {
    case '방송댄스 레슨':
      category_num = 1;
      break;
    case '보컬 레슨':
      category_num = 2;
      break;
    case '골프 레슨':
      category_num = 3;
      break;
    case '퍼스널트레이닝(PT)':
      category_num = 4;
      break;
    case '기타 레슨':
      category_num = 5;
      break;
    case '중국어 과외':
      category_num = 6;
      break;
    case '프레젠테이션 디자인':
      category_num = 7;
      break;
    case '인쇄물 디자인':
      category_num = 8;
      break;
    case '앱 디자인':
      category_num = 9;
      break;
    case '일러스트 디자인':
      category_num = 10;
      break;
    case '제품 디자인':
      category_num = 11;
      break;
    case '웹 디자인':
      category_num = 12;
      break;
    default:
      category_num = 0;
  }

  const keys = Object.keys(quest);
  for (let i = 0; i < keys.length; i++) {
    _result.user_id = localStorage.getItem('userId');
    _result.lesson_category_id = category_num;
    if (keys[i] === 'address1' || keys[i] === 'address2') {
      _result.question_id = i + 1;
    } else {
      _result.question_id = Number(keys[i]);
    }
    _result.choice_question_id = quest[keys[i]];
    result = result.concat(_result);
    _result = {};
  }
  useEffect(() => {
    fetch(`/master/main_list/${category_num}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setGosoList(data.getMasters);
      });
  }, [category_num]);

  if (flag === 1) {
    // 1 :요청서 작성한 후 디비에 저장,
    // 0 : 바로 그냥 받은견적으로 들어가는 경우(데이터 저장이 필요 없는 경우)
    PostRequestForm(result);
  }

  function handleNavigate(gosoId) {
    navigate(`../profile/users/${gosoId}`);
  }

  const DeleteRequestForm = () => {
    fetch('/receive/estimate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ ended_at: ended_at }),
    }).then(res => res.json());
    setEndTime(false);
  };

  const settingTime = () => {
    if (ended_at > time) setEndTime(true);
    else setEndTime(false);
  };
  useEffect(() => {
    settingTime();
  }, []);
  return (
    <>
      <Header />
      <img src={bannerUrl} alt="banner" className={styles.img_banner} />
      <div className={styles.goso_container}>
        <div className={styles.headline}>
          {category}
          <div className={styles.button_list}>
            <button className={styles.green_btn}>내 요청서 보기</button>
            {endTime ? (
              <button className={styles.white_btn} onClick={DeleteRequestForm}>
                요청 마감하기
              </button>
            ) : null}
          </div>
        </div>
        <div className={styles.text_line}>
          조건에 맞는 고수님들이 요청을 검토하고 있어요. 먼저 도착한 견적을
          확인해보세요.
        </div>
        {gosoList.map((goso, index) => {
          let masterImage = goso.image
            ? PORT + goso.image
            : PORT + '/images/profile/profileNotFound.svg';
          return (
            <div
              className={styles.goso_wrap}
              key={index}
              onClick={() => handleNavigate(goso.goso_id)}
            >
              <img
                className={styles.img_box}
                src={masterImage}
                alt="profile_photo"
              />
              <div className={styles.text_box}>
                <h4>{goso.goso_name}</h4>
                <div className={styles.goso_line}>
                  <AiFillStar color="#FFCE21" size="1.1em" />
                  <p>{goso.star}</p>({goso.review_sum})&nbsp;&nbsp;
                  <div className={styles.recruit_box}>
                    {goso.recurit}회 고용
                  </div>
                </div>
                {/* <p className={styles.price}>
                총 {goso.price.toLocaleString('ko-KR')}원 부터 ~
              </p> */}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

function PostRequestForm(result) {
  useEffect(() => {
    fetch('/form/questions/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('access_token'),
      },
      body: JSON.stringify(result),
    })
      .then(res => res.json())
      .then(result => {
        //alert(result.message);
      });
  }, []);
}

export default MainCategoryReportComplete;
