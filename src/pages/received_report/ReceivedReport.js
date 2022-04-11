import styles from './ReceivedReport.module.scss';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const PORT = process.env.REACT_APP_SERVER_PORT;

function ReceviedBox({ _data, index }) {
  let img_datas = _data.goso_images.slice(0, 6);
  let time = new Date();
  time.setDate(time.getDate());
  time = Date.parse(time) / 1000; //timestamp

  let requestStyle = _data.ended_at > time ? styles.trueReq : styles.falseReq;
  let figure = _data.ended_at > time ? styles.triangle : styles.square;
  return (
    <div key={index} className={styles.box}>
      <div className={styles.line}>
        <div className={requestStyle}>
          <div className={figure}> </div>
          {_data.ended_at > time ? '견적요청' : '요청마감'}
        </div>
        <div className={styles.date}>{_data.created_at}</div>
      </div>
      <div>
        <h4 className={styles.category}>{_data.category}</h4>
      </div>
      <div className={styles.img_box} key={index}>
        {img_datas.map((imgData, index) => (
          <img
            src={
              imgData.image
                ? PORT + imgData.image
                : PORT + '/images/profile/profileNotFound.svg'
            }
            alt="goso_img"
            className={styles.img}
            key={index}
          />
        ))}
      </div>
      <Link
        to="/complete"
        state={{
          quest: _data.choice_question,
          category: _data.category,
          image: _data.image,
          flag: 0,
          ended_at: _data.ended_at,
        }}
      >
        <button className={styles.btn}>자세히 보기</button>
      </Link>
    </div>
  );
}

function ReceivedReport() {
  const [data, setData] = useState();
  const navigate = useNavigate();

  if (localStorage.length === 0) {
    navigate('/login');
  }
  useEffect(() => {
    fetch(`/receive/estimate/${localStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {
        token: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message !== 'SUCCESS') {
          alert(data.message);
          navigate('/login');
        }
        setData(data.questions);
      });
  }, []);
  if (data === undefined) return true;
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrap}>
          <h1 className={styles.title}>받은 견적</h1>
          {data.map((_data, index) => ReceviedBox({ _data, index }))}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ReceivedReport;
