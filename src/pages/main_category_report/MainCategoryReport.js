import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MainCategoryReport.module.scss';
import ReportForm from '../../components/step/ThemaCategoryForm';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import WaringModal from '../../components/modal/WaringModal';
import { AiFillStar } from 'react-icons/ai';
import { SERVER_PORT } from '../../config';

function MainCategoryReport() {
  const location = useLocation();
  const { category, image, lecture_id } = location.state;
  const [question, setQuestion] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState();
  useEffect(() => {
    fetch(
      `${SERVER_PORT}/form/questions/${lecture_id}/${localStorage.getItem(
        'userId'
      )}`,
      {
        method: 'GET',
        headers: {
          token: localStorage.getItem('access_token'),
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.message === 'LESSON ALEADY EXIST') {
          setShowModal(1);
          setMessage(
            '이미 같은 서비스 요청이 진행중이에요. 이 요청이 마감된 후 다시 요청을 보낼 수 있어요.'
          );
          setQuestion(data.questions);
        } else if (data.message === 'TOKEN_UNDEFINED') {
          setShowModal(2);
          setMessage('로그인 하신 후 이용부탁드립니다');
        } else if (data.message !== 'SUCCESS') {
          setShowModal(1);
          setMessage(data.message);
        } else {
          setQuestion(data.questions);
        }
      });
  }, [lecture_id]);
  console.log('aa :', question);
  let imgUrl = '/' + image;

  if (question === undefined) return true;
  return (
    <>
      <WaringModal show={showModal} setShow={setShowModal} message={message} />
      <Header />
      <div className={styles.root_container}>
        <img src={imgUrl} alt="banner" className={styles.banner} />
        <div className={styles.container}>
          <h2>{category}</h2>
          <div className={styles.star_list}>
            <AiFillStar color="#FFCE21" size="1.1em" />
            <AiFillStar color="#FFCE21" size="1.1em" />
            <AiFillStar color="#FFCE21" size="1.1em" />
            <AiFillStar color="#FFCE21" size="1.1em" />
            <AiFillStar color="#FFCE21" size="1.1em" />
          </div>
          <div className={styles.calc_num}>
            <table>
              <tbody>
                <tr>
                  <td>19,181</td>
                  <td>24,865</td>
                  <td className={styles.table_end}>12,333</td>
                </tr>
                <tr>
                  <td>활동고수</td>
                  <td>누적 요청서</td>
                  <td className={styles.table_end}>리뷰 수</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.wrap}>
            <ReportForm category={category} image={image} question={question} />
            <div className={styles.text_container}>
              <div className={styles.strong_div}>
                <strong>숨고는 어떤 곳인가요?</strong>
              </div>
              <br />
              <p className={styles.text_wrap}>
                서비스가 필요한 고객과 서비스를 제공하는 숨은 고수를 쉽고 빠르게
                연결해드리는 전문가 매칭 서비스입니다. 1분 내외의 요청서를
                작성하면, 여러 고수님들이 맞춤형 견적을 보내드려요. 맘에 쏙 드는
                고수의 맞춤형 서비스를 받아보세요.
              </p>

              <div className={styles.strong_div}>
                <strong>방송댄스 레슨 고수만을 모았다!</strong>
              </div>
              <p>
                <br /> 방송 댄스에 관심이 있는데 시작이 어려웠나요? 퇴근 후 취미
                생활, 원데이 클래스 등 방송 댄스를 배워보고 싶다면 요청서를
                작성해보세요. 선생님 프로필, 커리큘럼, 비용 비교하고 결정할 수
                있어요. 숨고를 통해 지금 바로 방송 댄스를 시작하세요!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainCategoryReport;
